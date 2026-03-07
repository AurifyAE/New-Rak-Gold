import React from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";


const OUNCE = 31.103;
const AED = 3.674;

const UNIT_MULTIPLIER = {
  GM: 1,
  KG: 1000,
  TTB: 116.64,
  TOLA: 11.664,
  OZ: 31.103,
};

const CommodityTable = ({ commodities }) => {
  const { goldData, silverData } = useSpotRate();

  const getSpot = (metal) => {
    const lower = metal.toLowerCase();
    if (lower.includes("gold")) return goldData;
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

  const rows = commodities
    ?.map((item) => {
      const spot = getSpot(item.metal);
      if (!spot) return null;

      const mult = UNIT_MULTIPLIER[item.weight] || 1;
      const pur = purityFactor(item.purity);

      const baseBid = (spot.bid / OUNCE) * AED * mult * item.unit * pur;
      const baseAsk = (spot.ask / OUNCE) * AED * mult * item.unit * pur;

      const bid = baseBid + (Number(item.buyCharge) || 0) + (Number(item.buyPremium) || 0);
      const ask = baseAsk + (Number(item.sellCharge) || 0) + (Number(item.sellPremium) || 0);

      return {
        purity: item.purity,
        metal: item.metal,
        unit: `${item.unit} ${item.weight}`,
        bid,
        ask,
      };
    })
    .filter(Boolean) ?? [];

  return (
    <Box
      sx={{
        width: "100%",
        mt: "1.2vw",
        overflow: "hidden",

      }}
    >

      {/* header */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.4fr 0.8fr 0.8fr 0.8fr",
          py: "0.9vw",
          px: "1.5vw",
          borderRadius: "0.5vw",
          alignItems: "end",
          margin: '0.3vw',
          borderRadius: "0.8vw",
          backdropFilter: "blur(0.3vw)",
          border: "0.1vw solid #DDFDFF59",
        }}
      >
        <Typography
          sx={{
            // fontSize: "1.2vw",
            fontSize: {
              xs: "16px",
              lg: "1.2vw",
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
              xs: "16px",
              lg: "1.2vw",
            }, fontWeight: 600,
            color: "#FFFFFF",
            textAlign: "start",
          }}
        >
          UNIT
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "16px",
              lg: "1.2vw",
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
              xs: "16px",
              lg: "1.2vw",
            },
            fontWeight: 600,
            color: "#FFFFFF",
            textAlign: "center",
          }}
        >
          ASK
        </Typography>
      </Box>

      {/* Rows */}
      {rows.length === 0 ? (
        <Typography
          sx={{
            py: "3vw",
            textAlign: "center",
            color: "rgb(226 254 255)",
            fontSize: "1.25vw",
          }}
        >
          No data available
        </Typography>
      ) : (
        rows.map((row, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "1.4fr 0.8fr 0.8fr 0.8fr",
              alignItems: "end",
              py: "1.1vw",
              px: "1.5vw",


            }}
          >
            <Typography
              sx={{
                // fontSize: "1.24vw",
                fontSize: {
                  xs: "16px",
                  lg: "1.6vw",
                },
                fontWeight: 800,
                color: "#FFFFFF",
                display: 'flex',
                alignItems: 'center ',
                justifyContent: 'start',
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
                  xs: "15px",
                  lg: "1.5vw",
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
                  xs: "15px",
                  lg: "1.5vw",
                },
                fontWeight: 600,
                color: "#FFFFFF", // soft pink ASK
              }}
            >
              {formatPrice(row.ask)}
            </Typography>


          </Box>
        ))
      )}
    </Box>
  );
};

export default CommodityTable;