import "./App.css";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Footer from "./components/Footer";
import { useEffect } from "react";
import ModalPortal from "./components/ModalPortal";
import Modal from "./components/Modal";
import useCartStore from "./store/useCartStore";
import useModalStore from "./store/useModalStore";

function App() {
  const { cartItems, calculateTotals } = useCartStore();
  const { isOpen } = useModalStore();

  // cartItems 변경 시 총합 계산
  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <CartContainer />
        {isOpen && (
          <ModalPortal>
            <Modal />
          </ModalPortal>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
