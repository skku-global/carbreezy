import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Ticker from "./components/Ticker";
import Modal from "./components/Modal";
import PaymentModal from "./components/PaymentModal";
import Toast from "./components/Toast";
import Home from "./views/Home";
import Listing from "./views/Listing";
import Brands from "./views/Brands";
import Offers from "./views/Offers";
import Gallery from "./views/Gallery";
import About from "./views/About";
import Contact from "./views/Contact";
import Queries from "./views/Queries";
import Sitemap from "./views/Sitemap";
import { CARS } from "./data/cars";

// Owned by: Person D — final integration point
export default function App() {
  const [view, setView] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalCarId, setModalCarId] = useState(null);
  const [paymentCarId, setPaymentCarId] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [visitorCount, setVisitorCount] = useState(12408);

  const goto = (v) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openModal = (id) => setModalCarId(id);
  const closeModal = () => setModalCarId(null);

  // "Reserve This Car" inside Modal opens the PaymentModal on top of it,
  // without losing the underlying car detail modal.
  const openPayment = (car) => setPaymentCarId(car.id);
  const closePayment = () => setPaymentCarId(null);

  const confirmPayment = (car, method) => {
    closePayment();
    closeModal();
    showToast(
      method === "finance"
        ? `Finance application received for ${car.name} — an advisor will call within 24h.`
        : `Reservation confirmed for ${car.name} — check your email for next steps.`
    );
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2200);
  };

  useEffect(() => {
    const id = setInterval(
      () => setVisitorCount((v) => v + Math.floor(Math.random() * 3)),
      4000,
    );
    return () => clearInterval(id);
  }, []);

  const modalCar = modalCarId ? CARS.find((c) => c.id === modalCarId) : null;
  const paymentCar = paymentCarId ? CARS.find((c) => c.id === paymentCarId) : null;

  return (
    <>
      <Header
        view={view}
        goto={goto}
        visitorCount={visitorCount}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {view === "home" && (
        <Home goto={goto} openModal={openModal} showToast={showToast} />
      )}
      {view === "new" && (
        <Listing
          condition="new"
          title="New Cars"
          tag="BRAND NEW STOCK"
          blurb="Zero-mileage vehicles, fresh off the lot, with full manufacturer warranty."
          openModal={openModal}
        />
      )}
      {view === "used" && (
        <Listing
          condition="used"
          title="Used Cars"
          tag="CERTIFIED PRE-OWNED"
          blurb="Inspected, verified, and priced fairly — every used car comes with a condition report."
          openModal={openModal}
        />
      )}
      {view === "brands" && <Brands openModal={openModal} />}
      {view === "offers" && <Offers openModal={openModal} />}
      {view === "gallery" && <Gallery />}
      {view === "about" && <About goto={goto} />}
      {view === "contact" && <Contact goto={goto} />}
      {view === "queries" && <Queries showToast={showToast} />}
      {view === "sitemap" && <Sitemap goto={goto} />}

      <Footer goto={goto} />
      <Ticker />
      <Modal
        car={modalCar}
        onClose={closeModal}
        onBuy={openPayment}
        onOpenCar={openModal}
      />
      <PaymentModal car={paymentCar} onClose={closePayment} onConfirm={confirmPayment} />
      <Toast message={toastMsg} />
    </>
  );
}
