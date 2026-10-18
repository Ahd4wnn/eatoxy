import { Route, Routes } from "react-router";
import { CartProvider } from "./lib/cart";
import { SmoothScroll } from "./lib/scroll";
import { FloatingNav } from "./components/FloatingNav";
import { OrderSheet } from "./components/OrderSheet";
import { ProductSheet } from "./components/ProductSheet";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";

export default function App() {
  return (
    <CartProvider>
      <SmoothScroll />
      <FloatingNav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <ProductSheet />
      <OrderSheet />
    </CartProvider>
  );
}
