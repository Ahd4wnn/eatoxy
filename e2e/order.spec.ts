import { expect, test } from "@playwright/test";

test("salad order carries item, dressing and total into the WhatsApp link", async ({ page }) => {
  await page.goto("/shop");
  await page.getByRole("button", { name: "Protein Crave, ₹149" }).click();
  const sheet = page.getByRole("dialog", { name: "Protein Crave" });
  // Without a dressing the button points back to the step instead of adding.
  await sheet.getByRole("button", { name: "Choose a dressing" }).click();
  await expect(page.getByRole("dialog", { name: "Your order" })).toHaveCount(0);
  await sheet.getByRole("button", { name: "Honey Mustard" }).click();
  await sheet.getByRole("button", { name: "More" }).click();
  await sheet.getByRole("button", { name: "Add to order · ₹298" }).click();

  const href = (await page.getByRole("link", { name: /Send on WhatsApp/ }).getAttribute("href"))!;
  expect(href).toContain("https://wa.me/919895556180?text=");
  const text = decodeURIComponent(href);
  expect(text).toContain("2× Protein Crave (Honey Mustard)  ₹298");
  expect(text).toContain("Total: ₹298");
});

test("oats skip the dressing step", async ({ page }) => {
  await page.goto("/shop");
  await page.getByRole("button", { name: "Classic Oats, ₹59" }).click();
  const sheet = page.getByRole("dialog", { name: "Classic Oats" });
  await expect(sheet.getByText("Choose a dressing")).toHaveCount(0);
  await expect(sheet.getByRole("button", { name: "Add to order · ₹59" })).toBeEnabled();
});

test.describe("phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("product sheet scrolls with a touch swipe so dressings are reachable", async ({ page, context }) => {
    await page.goto("/shop");
    await page.getByRole("button", { name: "Protein Crave, ₹149" }).tap();
    const sheet = page.getByRole("dialog", { name: "Protein Crave" });
    await expect(sheet).toBeVisible();
    await page.waitForTimeout(600); // let the open animation settle before measuring
    const box = (await sheet.boundingBox())!;
    // A real finger drag (raw touch events), not Playwright's programmatic scrollIntoView.
    // Lenis is stopped while the sheet is open and cancels touchmove unless the sheet opts out.
    const cdp = await context.newCDPSession(page);
    const x = box.x + 40, y = box.y + box.height * 0.7;
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (let i = 1; i <= 15; i++) {
      await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y - (250 * i) / 15 }] });
      await page.waitForTimeout(40);
    }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => sheet.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
  });
});

test("footer credit card opens and Start a project goes to f13s contact", async ({ page, context }) => {
  await context.route("https://f13s.com/**", (r) => r.fulfill({ body: "f13s stub", contentType: "text/html" }));
  await page.goto("/");
  const credit = page.getByRole("link", { name: /Website made by f13s/ });
  await expect(credit).toHaveAttribute("href", "https://f13s.com");
  await credit.hover();
  const card = page.getByRole("group", { name: "About f13s" });
  await expect(card).toContainText("Independent minds. Shared ambition.");

  // Travel up across the gap like a real pointer; the card must stay open.
  const cta = card.getByRole("link", { name: /Start a project/ });
  const box = (await cta.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
  const [popup] = await Promise.all([context.waitForEvent("page"), cta.click()]);
  await expect(popup).toHaveURL("https://f13s.com/contact");
});
