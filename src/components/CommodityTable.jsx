import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

const OUNCE = 31.103;
const AED = 3.674;

const UNIT_MULTIPLIER = {
  GM: 1,
  KG: 1000,
  TTB: 116.64,
  TOLA: 11.664,
  OZ: 31.103,
};

const CommodityTable = ({ title, items }) => {
  const { goldData, silverData } = useSpotRate();

  // ✅ FIXED: Minted bars treated as gold
  const getSpot = (metal) => {
    const lower = metal?.toLowerCase() || "";

    if (lower.includes("gold") || lower.includes("minted")) {
      return goldData; // ✅ minted uses gold spot
    }

    if (lower.includes("silver")) return silverData;

    return null;
  };

  const purityFactor = (purity) =>
    purity ? purity / 10 ** String(purity).length : 1;

  const formatPrice = (value) => {
    if (value == null || isNaN(value)) return "—";

    const intLen = Math.floor(Math.abs(value)).toString().length;

    let decimals = 3;
    if (intLen >= 4) decimals = 0;
    else if (intLen === 3) decimals = 2;

    return value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // ✅ Build rows with fallback
  // const rows =
  //   items
  //     ?.map((item) => {
  //       const spot = getSpot(item.metal);

  //       // 🔥 fallback important
  //       const effectiveSpot = spot || goldData;
  //       if (!effectiveSpot) return null;

  //       const mult = UNIT_MULTIPLIER[item.weight] || 1;
  //       const pur = purityFactor(item.purity);

  //       const baseBid =
  //         (effectiveSpot.bid / OUNCE) * AED * mult * item.unit * pur;

  //       const baseAsk =
  //         (effectiveSpot.ask / OUNCE) * AED * mult * item.unit * pur;

  //       return {
  //         purity: item.purity,
  //         metal: item.metal,
  //         unit: `${item.unit} ${item.weight}`,
  //         bid:
  //           baseBid +
  //           (Number(item.buyCharge) || 0) +
  //           (Number(item.buyPremium) || 0),
  //         ask:
  //           baseAsk +
  //           (Number(item.sellCharge) || 0) +
  //           (Number(item.sellPremium) || 0),
  //       };
  //     })
  //     .filter(Boolean) ?? [];

  const rows =
    items
      ?.map((item) => {
        const spot = getSpot(item.metal);

        // 🔥 IMPORTANT: fallback to goldData
        const effectiveSpot = spot || goldData;
        if (!effectiveSpot) return null;

        const mult = UNIT_MULTIPLIER[item.weight] || 1;
        const pur = purityFactor(item.purity);
        const unitValue = Number(item.unit) || 1;

        const baseBid =
          (effectiveSpot.bid / OUNCE) * AED * mult * unitValue * pur;

        const baseAsk =
          (effectiveSpot.ask / OUNCE) * AED * mult * unitValue * pur;

        return {
          purity: item.purity,
          metal: item.metal,
          unit: `${unitValue} ${item.weight}`,
          bid:
            baseBid +
            (Number(item.buyCharge) || 0) +
            (Number(item.buyPremium) || 0),
          ask:
            baseAsk +
            (Number(item.sellCharge) || 0) +
            (Number(item.sellPremium) || 0),
        };
      })
      .filter(Boolean) ?? [];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // ❌ No data → don't render section
  if (!rows.length) return null;

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* 🔥 TITLE */}
      <Box
        sx={{
          textAlign: "center",
          py: ".8vw",
          borderRadius: ".5vw",
          background: "rgba(255,255,255,0.08)",
          mb: ".5vw",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "14px", lg: "1vw" },
            fontWeight: 800,
            color: "#fff",
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.4fr 0.8fr 0.8fr 0.8fr",
          py: "0.9vw",
          px: "1.5vw",
          borderRadius: "0.5vw",
          alignItems: "end",
          borderRadius: "0.8vw",
          backdropFilter: "blur(0.3vw)",
          border: "0.1vw solid #DDFDFF59",
        }}
      >
        <Typography
          sx={{
            // fontSize: "1.2vw",
            fontSize: {
              xs: "14px",
              lg: "1.2vw",
              xl: "1.5vw",
            },
            fontWeight: 600,
            color: "#FFFFFF",
            letterSpacing: "0.04vw",
            textAlign: "start",
          }}
        >
          COMMODITY
        </Typography>

        <Typography
          sx={{
            // fontSize: "1.2vw",
            fontSize: {
              xs: "14px",
              lg: "1.2vw",
              xl: "1.5vw",

            },
            fontWeight: 600,
            color: "#FFFFFF",
            textAlign: "start",
          }}
        >
          UNIT
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "14px",
              lg: "1.2vw",
              xl: "1.5vw",

            },
            fontWeight: 600,
            color: "#FFFFFF",
            textAlign: "center",
          }}
        >
          BID
        </Typography>

        <Typography
          sx={{
            // fontSize: "1.2vw",
            fontSize: {
              xs: "14px",
              lg: "1.2vw",
              xl: "1.5vw",

            },
            fontWeight: 600,
            color: "#FFFFFF",
            textAlign: "center",
          }}
        >
          ASK
        </Typography>
      </Box>

      <Box
        sx={{
          maxHeight: { xs: "auto", sm: "18vw" },
        }}
      >
        {rows.length === 0 ? (
          <Typography
            sx={{
              py: "3vw",
              textAlign: "center",
              color: "rgba(227,192,120,0.4)",
              fontSize: "1.25vw",
            }}
          >
            No data available
          </Typography>
        ) : (
          <Swiper
            direction="vertical"
            slidesPerView={4}
            spaceBetween={10}
            loop={true}
            // modules={[Autoplay]} // 👈 Register it here
            // autoplay={{
            //   delay: 0,
            //   disableOnInteraction: false,
            // }}
            speed={3000} // 👈 higher = smoother slow scroll
            // allowTouchMove={false} // important for TV
            style={{ height: isMobile ? "35vw" : "18vw" }}
          >
            {rows.map((row, index) => (
              <SwiperSlide key={index}>
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 0.8fr 0.8fr 0.8fr",
                    alignItems: "end",
                    borderRadius: ".5vw",
                    py: ".7vw",
                    px: "1.5vw",
                    border: "1px solid rgba(255, 255, 255, 0.3)", // 👈 mild bg
                  }}
                >
                  <Typography
                    sx={{
                      // fontSize: "1.24vw",
                      fontSize: {
                        xs: "14px",
                        sm: "12px",
                        lg: "1.6vw",
                        xl: "1.8vw",
                      },
                      fontWeight: 800,
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center ",
                      justifyContent: "start",
                      gap: {
                        xs: "7px",
                        lg: "0.3vw",
                      },
                    }}
                  >
                    {row.metal}
                    <Typography
                      sx={{
                        // fontSize: "1vw",
                        fontSize: {
                          xs: "12px",
                          sm: "10px",
                          lg: "1.2vw",
                        },
                        fontWeight: 400,
                        color: "#FFFFFF",
                        // mb:'-0.5vw'
                      }}
                    >
                      {row.purity}
                    </Typography>
                  </Typography>

                  <Typography
                    sx={{
                      // fontSize: "1.18vw",
                      fontSize: {
                        xs: "14px",
                        lg: "1.3vw",
                        xl: "1.8vw",

                      },
                      color: "#FFFFFF",
                      textAlign: "start",
                    }}
                  >
                    {row.unit}
                  </Typography>

                  <Typography
                    sx={{
                      // fontSize: "1.32vw",
                      fontSize: {
                        xs: "14px",
                        lg: "1.5vw",
                        xl: "1.8vw",

                      },
                      fontWeight: 600,
                      color: "#FFFFFF", // soft pink ASK
                    }}
                  >
                    {formatPrice(row.bid)}
                  </Typography>

                  <Typography
                    sx={{
                      // fontSize: "1.32vw",
                      fontSize: {
                        xs: "14px",
                        lg: "1.5vw",
                        xl: "1.8vw",

                      },
                      fontWeight: 600,
                      color: "#FFFFFF", // soft pink ASK
                    }}
                  >
                    {formatPrice(row.ask)}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </Box>
  );
};

export default CommodityTable;
