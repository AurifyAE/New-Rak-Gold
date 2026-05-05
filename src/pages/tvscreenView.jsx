import React, { useCallback, useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, useMediaQuery } from "@mui/material";
import SpotRate from "../components/SpotRate";
import CommodityTable from "../components/CommodityTable";
import NewsTicker from "../components/News";
import MainLogo from "/images/logo.svg";
import AurifyLogo from "/images/logo.svg";
// import backgroundImage from "/images/background1.png";
import backgroundImage from "/images/backgroundnew.png";

import {
  fetchSpotRates,
  fetchServerURL,
  fetchNews,
  fetchTVScreenData,
} from "../api/api";
import io from "socket.io-client";
import { useSpotRate } from "../context/SpotRateContext";
import WorldClock from "../components/WorldClock";

import PoweredByAurify from "../components/PoweredByAurify";
import SystemClock from "../components/SystemClock";
import Navbar from "../components/Navbar";
import CopyRight from "../components/CopyRight";

function TvScreen() {
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [serverURL, setServerURL] = useState("");
  const [news, setNews] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [commodities, setCommodities] = useState([]);
  const [goldBidSpread, setGoldBidSpread] = useState("");
  const [goldAskSpread, setGoldAskSpread] = useState("");
  const [silverBidSpread, setSilverBidSpread] = useState("");
  const [silverAskSpread, setSilverAskSpread] = useState("");
  const [symbols, setSymbols] = useState(["GOLD", "SILVER"]);
  const [error, setError] = useState(null);

  const { updateMarketData } = useSpotRate();

  const adminId = import.meta.env.VITE_APP_ADMIN_ID;

  // updateMarketData(
  //   marketData,
  //   goldBidSpread,
  //   goldAskSpread,
  //   silverBidSpread,
  //   silverAskSpread,
  // );
  useEffect(() => {
    updateMarketData(
      marketData,
      goldBidSpread,
      goldAskSpread,
      silverBidSpread,
      silverAskSpread,
    );
  }, [
    marketData,
    goldBidSpread,
    goldAskSpread,
    silverBidSpread,
    silverAskSpread,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spotRatesRes, serverURLRes, newsRes] = await Promise.all([
          fetchSpotRates(adminId),
          fetchServerURL(),
          fetchNews(adminId),
        ]);

        // Handle Spot Rates
        const {
          commodities,
          goldBidSpread,
          goldAskSpread,
          silverBidSpread,
          silverAskSpread,
        } = spotRatesRes.data.info;
        setCommodities(commodities);
        setGoldBidSpread(goldBidSpread);
        setGoldAskSpread(goldAskSpread);
        setSilverBidSpread(silverBidSpread);
        setSilverAskSpread(silverAskSpread);

        // Handle Server URL
        const { serverURL } = serverURLRes.data.info;
        setServerURL(serverURL);

        // Handle News
        setNews(newsRes.data.news.news);
      } catch (error) {
        setError("An error occurred while fetching data");
      }
    };

    fetchData();

    // Fetch TV screen data (you can leave this as a separate call)
    fetchTVScreenData(adminId)
      .then((response) => {
        if (response.status === 200) {
          // Allow TV screen view
          setShowLimitModal(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setShowLimitModal(true); // Show the modal on 403 status
        } else {
          console.error("Error:", error.message);
          alert("An unexpected error occurred.");
        }
      });
  }, [adminId]);

  // Function to Fetch Market Data Using Socket
  useEffect(() => {
    if (serverURL) {
      const socket = io(serverURL, {
        query: { secret: import.meta.env.VITE_APP_SOCKET_SECRET_KEY },
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.on("connect", () => {
        socket.emit("request-data", symbols);
      });

      socket.on("disconnect", () => { });

      // socket.on("market-data", (data) => {
      //   if (data && data.symbol) {
      //     setMarketData((prevData) => ({
      //       ...prevData,
      //       [data.symbol]: {
      //         ...prevData[data.symbol],
      //         ...data,
      //       },
      //     }));
      //   } else {
      //     console.warn("Received malformed market data:", data);
      //   }
      // });

      socket.on("market-data", (data) => {
        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (item.symbol) {
              setMarketData((prev) => ({
                ...prev,
                [item.symbol]: {
                  ...prev[item.symbol],
                  ...item,
                },
              }));
            }
          });
        } else if (data && data.symbol) {
          setMarketData((prev) => ({
            ...prev,
            [data.symbol]: {
              ...prev[data.symbol],
              ...data,
            },
          }));
        } else {
          console.warn("Received malformed market data:", data);
        }
      });

      socket.on("error", (error) => {
        console.error("WebSocket error:", error);
        setError("An error occurred while receiving data");
      });

      // Cleanup function to disconnect the socket
      return () => {
        socket.disconnect();
      };
    }
  }, [serverURL, symbols]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // const goldCommodities = commodities.filter(
  //   (item) =>
  //     item.metal?.toLowerCase().includes("gold") &&
  //     !item.metal?.toLowerCase().includes("minted"),
  // );

  const goldAndSilverCommodities = commodities.filter(
    (item) =>
      (item.metal?.toLowerCase().includes("gold") ||
        item.metal?.toLowerCase().includes("silver")) &&
      !item.metal?.toLowerCase().includes("minted"),
  );
  const mintedBars = commodities.filter((item) =>
    item.metal?.toLowerCase().includes("minted"),
  );

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        color: "white",
        pb: { xs: "0", md: "3vw" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",

          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          transform: { xs: "scaleY(-1)", md: "none" },
        }}
      >
        <img
          src={backgroundImage}
          alt=""
          className="object-cover w-full h-full"
        />
      </Box>

      {/* Grid */}


      <Grid
        container
        spacing={3}
        minHeight="100%"
        // alignItems="flex-start"
        justifyContent="space-between"
        padding="1vw"
        flexWrap="wrap"
        zIndex="1"
        rowGap={{ xs: "1vw" }}
        position="relative"
        margin="0"
        columnGap={{ xs: "2vw", md: "0" }}
        width="100%"
      >
        {/* Side: Commodity Table */}
        <Grid
          xs={12}
          md={12}
          display="flex"
          alignItems="center"
          justifyContent="start"
          marginBottom="0.5vw"
        >
          <SpotRate />
        </Grid>

        <Grid xs={12}>
          <Navbar />
        </Grid>

        {/* Side: SpotRate & Date Time */}
        <Grid
          xs={12}
          display="grid"
          gap={isMobile ? "3vw" : "2vw"}
          // gridTemplateColumns={{ xs: '1fr  ', md: "1fr 1fr" }}

          gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"}
        >
          {/* <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            gap={{ xs: "2vw", md: "0" }}
          >
            <Box
              sx={{
                height: "auto",
               
                width: isMobile
                  ? "20vw"
                  : {
                      xs: "30vw",
                      lg: "20vw",
                    },
                marginTop: {
                  xs: "10px",
                  sm: "0",
                },
                marginBottom: {
                  xs: "10px",
                  lg: "1vw",
                },
              }}
            >
              <img src={MainLogo} alt="" className="object-contain w-full" />
            </Box>
            <WorldClock />
            <SystemClock />
          </Box> */}
          {/* GOLD TABLE */}
          <Box>
            <CommodityTable title="CASTED BARS" items={goldAndSilverCommodities} />
          </Box>

          {/* MINTED BARS TABLE */}
          <Box>
            <CommodityTable title="MINTED BARS" items={mintedBars} />
          </Box>
        </Grid>

        <Grid
          md={12}
          sx={{
            mt: { xs: "20px", md: "0" },
            position: { xs: "unset", md: "fixed" },
            zIndex: "2",
            bottom: "0",
            width: "100%",
            left: "0",
          }}
        >
          <NewsTicker newsItems={news} />
          <CopyRight />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TvScreen;
