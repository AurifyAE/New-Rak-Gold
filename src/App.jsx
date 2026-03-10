import { useState, useEffect } from "react";
import { useConnectionState } from "use-connection-state";
import { SpotRateProvider } from "./context/SpotRateContext";
import "./App.css";
import TvScreen from "./pages/tvscreenView";
import ErrorPage from "./components/ErrorPage";
import { Route, Routes } from "react-router-dom";
import ProductListing from "./pages/product-list";
import PrivacyPolicy from "./pages/privacy-policy";
import ContactUs from "./pages/contact-us";

function App() {
  const [isTvScreen, setIsTvScreen] = useState(window.innerWidth >= 200);

  useEffect(() => {
    // Function to check the window size and update state
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 200;
      setIsTvScreen(isLargeScreen);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
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
