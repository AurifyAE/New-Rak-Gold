import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  const [goldBidDir, setGoldBidDir] = useState("neutral");
  const [goldAskDir, setGoldAskDir] = useState("neutral");
  const [silverBidDir, setSilverBidDir] = useState("neutral");
  const [silverAskDir, setSilverAskDir] = useState("neutral");

  const prev = useRef({
    goldBid: null,
    goldAsk: null,
    silverBid: null,
    silverAsk: null,
    platinumBid: null,
    platinumAsk: null,
  });

  const detectChange = (prevVal, currVal, setDir) => {
    if (prevVal === null) return currVal;

    if (currVal > prevVal) {
      setDir("rise");
      setTimeout(() => setDir("neutral"), 800);
    } else if (currVal < prevVal) {
      setDir("fall");
      setTimeout(() => setDir("neutral"), 800);
    }

    return currVal;
  };

  useEffect(() => {
    prev.current.goldBid = detectChange(
      prev.current.goldBid,
      goldData.bid,
      setGoldBidDir,
    );
  }, [goldData.bid]);

  useEffect(() => {
    prev.current.goldAsk = detectChange(
      prev.current.goldAsk,
      goldData.ask,
      setGoldAskDir,
    );
  }, [goldData.ask]);

  useEffect(() => {
    prev.current.silverBid = detectChange(
      prev.current.silverBid,
      silverData.bid,
      setSilverBidDir,
    );
  }, [silverData.bid]);

  useEffect(() => {
    prev.current.silverAsk = detectChange(
      prev.current.silverAsk,
      silverData.ask,
      setSilverAskDir,
    );
  }, [silverData.ask]);

  const getColors = (dir) => {
    if (dir === "rise")
      return { bgColor: "#00FF15", border: "1px solid #00ff9d" };
    if (dir === "fall")
      return { bgColor: "#FF0040", border: " 1px solid #ff3366" };
    return { bgColor: "#F0F8FF00", border: " 1px solid #FFFFFF" };
  };

  const PricePulse = ({ label, value, dir }) => {
    const { bgColor, border } = getColors(dir);
    const hasPulse = dir !== "neutral";

    return (
      <Box
        sx={{
          position: "relative",
          flex: 1,
          mb: "1vw",

          overflow: "hidden",
          ...(hasPulse && {
            animation:
              dir === "rise"
                ? "pulseRise 0.8s ease-out"
                : "pulseFall 0.8s ease-out",
            bgcolor:
              dir === "rise"
                ? "0 0 0 0 rgba(0,255,157,0.6)"
                : "0 0 0 0 rgba(255,51,102,0.6)",
          }),
        }}
      >
        <Typography
          sx={{
            // fontSize: "1vw",

            fontSize: {
              xs: "3vw", // mobile
              sm: "2.5vw", // small tablets
              md: "1.6vw", // laptops
            },
            letterSpacing: "0.25vw",
            color: "#FFFFFF",
            mb: "0.5vw",
            textShadow: "0 0 0.8vw rgba(255 255 255 / 0.53)",
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            // fontSize: "2.4vw",
            fontSize: {
              xs: "3vw", // mobile
              sm: "2.5vw", // small tablets
              md: "1.8vw", // laptops
              lg: "2.4vw", // desktop
              xl: "2.4vw", // large screens
            },
            fontWeight: 800,
            letterSpacing: "0.18vw",
            textAlign: "center",
            bgcolor: bgColor,
            color: "white",
            border: border,
            borderRadius: "0.8vw",
            fontVariantNumeric: "tabular-nums",
            transition: "all 0.4s ease",
          }}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  const MetalPanel = ({ data, bidDir, askDir, theme }) => {
    const isGold = theme === "gold";
    const isSilver = theme === "silver";

    let title = "GOLD";
    let gradient = "linear-gradient(90deg, #FFF098)";
    let shadow = "0 0 3vw rgba(255 217 0 / 0.11) inset";

    if (isSilver) {
      title = "SILVER";
      gradient = "linear-gradient(90deg, #FFFFFF )";
      shadow = "0 0 3vw rgba(160,180,255,0.15) inset";
    }

    return (
      <Box>
        <Typography
          sx={{
            fontSize: {
              xs: "3vw", // mobile
              sm: "2.5vw", // small tablets
              md: "1.8vw", // laptops
              lg: "1.6vw", // desktop
              xl: "2vw", // large screens
            },

            fontWeight: 800,
            letterSpacing: "0.1vw",
            background: gradient,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
            mb: "1vw",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            position: "relative",
            border: "0.1vw solid rgba(255 255 255 / 0.21)",
            overflow: "hidden",
            display: "grid",
            gap: "2vw",
            padding: { xs: " 2vw 1vw", md: " 0.5vw 2vw" },
            gridTemplateColumns: "  1fr 1fr",
            borderRadius: "1vw",
            backdropFilter: "blur(0.4vw)",
           
          }}
        >
          <Box
            sx={{
              fontSize: {
                xs: "3vw", // mobile
                sm: "2.5vw", // small tablets
                md: "1.8vw", // laptops
                lg: "1.6vw", // desktop
                xl: "1.4vw", // large screens
              },

              fontWeight: "700",
            }}
          >
            <PricePulse label="BID" value={data.bid} dir={bidDir} />
            LOW <span className="hl-value-low text-[#ff1818]">{data.low}</span>

          </Box>

          {/* Price Boxes */}
          <Box
            sx={{
              fontSize: {
                xs: "3vw", // mobile
                sm: "2.5vw", // small tablets
                md: "1.8vw", // laptops
                lg: "1.6vw", // desktop
                xl: "1.4vw", // large screens
              },
              fontWeight: "700",
            }}
          >
            <PricePulse label="ASK" value={data.ask} dir={askDir} />
            
            HIGH{" "}
            <span className="hl-value-high text-[#43ff1e]">{data.high}</span>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "grid",
        gap: "2vw",
        width: "100%",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <MetalPanel
        data={goldData}
        bidDir={goldBidDir}
        askDir={goldAskDir}
        theme="gold"
      />

      <MetalPanel
        data={silverData}
        bidDir={silverBidDir}
        askDir={silverAskDir}
        theme="silver"
      />
    </Box>
  );
};

export default SpotRate;
