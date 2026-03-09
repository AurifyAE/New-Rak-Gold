import React, { useCallback, useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, useMediaQuery } from "@mui/material";
import SpotRate from "../components/SpotRate";
import CommodityTable from "../components/CommodityTable";
import NewsTicker from "../components/News";
import MainLogo from "/images/logo.svg";
import AurifyLogo from "/images/logo.svg";
import backgroundImage from "/images/background1.png";

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

  updateMarketData(
    marketData,
    goldBidSpread,
    goldAskSpread,
    silverBidSpread,
    silverAskSpread,
  );

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

        console.log(newsRes.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("An error occurred while fetching data");
      }
    };

    fetchData();

    // Fetch TV screen data (you can leave this as a separate call)
    fetchTVScreenData(adminId)
      .then((response) => {
        console.log(response);
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
        console.log("Connected to WebSocket server");
        socket.emit("request-data", symbols);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });

      socket.on("market-data", (data) => {
        if (data && data.symbol) {
          setMarketData((prevData) => ({
            ...prevData,
            [data.symbol]: {
              ...prevData[data.symbol],
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

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        }}
      >
        <img src={backgroundImage} alt="" className="object-cover w-full h-full" />
      </Box>
      {/* Grid */}
      <Grid
        container
        spacing={4}
        minHeight="100%"
        // alignItems="flex-start"
        justifyContent="space-between"
        padding="1vw"
        flexWrap="wrap"
        zIndex="1"
        position="relative"
        margin="0"
        columnGap={{ xs: '2vw', md: '0' }}
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
          md={12}
          xs={12}
          display="grid"
          gap="2vw"
          gridTemplateColumns={{ xs: '1fr', md: "1fr 1fr" }}
        >
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            gap={{ xs: '2vw', md: "0" }}

          >
            <Box
              sx={{
                height: "auto",
                width: {
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
            <PoweredByAurify />
          </Box>
          <Box>
            <CommodityTable commodities={commodities} />
          </Box>
        </Grid>

        <Grid
          md={12}
          sx={{
            mt: { xs: "20px", md: "0" },
            position: { xs: "unset", md: "fixed" },

            bottom: "0",
            width: "100%",
            left: "0",
          }}
        >
          <NewsTicker newsItems={news} />

          <Box
            sx={{
              width: "100%",
              height: {
                lg: "1vw",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: "0.8vw",
              overflow: "hidden",
              background: "  #270122",
            }}
          >
            <Typography
              sx={{
                color: "#e6e6e6",
                fontSize: {
                  xs: "12px",
                  sm: "0.7vw",
                },
                fontWeight: 500,
                letterSpacing: "0.08vw",
              }}
            >
              Copyrights © New RakGold Jewellery Trading L.L.C 1.0.2
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box >
  );
}

export default TvScreen;
