import React from "react";
import { Box, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";

const NewsTicker = ({ newsItems = [] }) => {
  const items =
    newsItems.length > 0
      ? newsItems
      : [{ description: "Welcome to New Rak Gold" }];

  return (
    <Box
      sx={{
        width: "100%",
        height: {
          xs: "35px",
          lg: "3vw",
        },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#04090b",
      }}
    >
      {/* LEFT BRAND */}
      <Typography
        sx={{
          color: "#FFFFFF",
          background: "#2D464E",
          fontSize: {
            xs: "12px",
            lg: "1.2vw",
          },
          fontWeight: 700,
          whiteSpace: "nowrap",
          padding: "0 3.5vw",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        NEW RAK GOLD
      </Typography>

      {/* NEWS TICKER */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Marquee
          speed={40}
          gradient={false}
          autoFill
          pauseOnHover={false}
          pauseOnClick={false}
          direction="left"
        >
          {items.map((item, index) => (
            <Typography
              key={index}
              component="span"
              sx={{
                color: "#e6e6e6",
                fontSize: {
                  xs: "12px",
                  lg: "1.3vw",
                },
                fontWeight: 500,
                whiteSpace: "nowrap",
                mx: "4vw",
              }}
            >
              {item?.description}
            </Typography>
          ))}
        </Marquee>
      </Box>
    </Box>
  );
};

export default NewsTicker;