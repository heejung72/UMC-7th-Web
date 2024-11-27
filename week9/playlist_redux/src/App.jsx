import './App.css';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals } from './features/cart/cartSlice';
import { useEffect } from 'react';
import ModalPortal from './components/ModalPortal';
import Modal from './components/Modal';
import ModalButton from './components/ModalButton';  // ModalButton 추가

function App() {
  const dispatch = useDispatch();

  // Redux state에서 필요한 값 가져오기
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  // cartItems 변경 시 총합 계산 디스패치
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <CartContainer />
        {isOpen && (
          <ModalPortal>
            <Modal>
              <h4>담아주신 모든 음반을 삭제하시겠습니까?</h4>
              <ModalButton />  {/* ModalButton 추가 */}
            </Modal>
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
