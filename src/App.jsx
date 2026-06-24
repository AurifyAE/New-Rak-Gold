import { useState, useEffect, useRef } from "react";
import { SpotRateProvider } from "./context/SpotRateContext";
import "./App.css";
import TvScreen from "./pages/tvscreenView";
import ErrorPage from "./components/ErrorPage";
import { Route, Routes } from "react-router-dom";
import ProductListing from "./pages/product-list";
import PrivacyPolicy from "./pages/privacy-policy";
import ContactUs from "./pages/contact-us";

function App() {
  const [isTvScreen, setIsTvScreen] = useState(window.innerWidth >= 100);
  const initialSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsTvScreen(window.innerWidth >= 100);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let refreshTimer;

    const refreshOnResize = () => {
      const sizeChanged =
        window.innerWidth !== initialSize.current.width ||
        window.innerHeight !== initialSize.current.height;

      if (!sizeChanged) return;

      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        window.location.reload();
      }, 300);
    };

    window.addEventListener("resize", refreshOnResize);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("resize", refreshOnResize);
    };
  }, []);

  return (
    // <SpotRateProvider>
    //   {!isTvScreen ? <ErrorPage /> : <TvScreen />}
    // </SpotRateProvider>

    <SpotRateProvider>
      {!isTvScreen ? (
        <ErrorPage />
      ) : (
        <Routes>
          <Route path="/" element={<TvScreen />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/product-list" element={<ProductListing />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      )}
    </SpotRateProvider>
  );
}

export default App;
