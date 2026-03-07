import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,

} from "@mui/material";

const NAV_LINKS = [
  { label: "LIVE RATES", href: "#" },
  { label: "PRODUCT", href: "#" },
  { label: "PRIVACY POLICY", href: "#" },
  { label: "CONTACT US", href: "#" },
];

const NewBadge = () => (
  <Box
    sx={{
      width: { xs: "28px", lg: "2.2vw" },
      height: { xs: "28px", lg: "2.2vw" },
      minWidth: { xs: "28px", lg: "2.2vw" },
      borderRadius: "50%",
      background: "#1a1a1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <Typography
      sx={{
        color: "#fff",
        fontSize: { xs: "8px", lg: "0.6vw" },
        fontWeight: 800,
        letterSpacing: "0.05em",
        lineHeight: 1,
      }}
    >
      NEW
    </Typography>
  </Box>
);

const Navbar = ({ onNavClick }) => {

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(180deg, #36002F 0%, #270122 100%)",
        borderRadius: "0.5vw",
      }}
    >
      <Toolbar
        sx={{
          height: { xs: "auto", lg: "1.5vw" },
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", lg: "space-between" },
          padding: { xs: "15px 0", lg: "0" },
          gap: { xs: "15px 0", lg: "0" },
          flexWrap: { xs: "wrap", lg: "nowrap" },
        }}
        >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "2.5vw",
            justifyContent: { xs: "center", lg: "space-between" },
            flexWrap: { xs: 'wrap', md: 'nowrap' }
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Typography
              key={label}
              component="a"
              href={href}
              onClick={(e) => {
                e.preventDefault();
                onNavClick?.(label);
              }}
              sx={{
                color: "#fff",
                fontSize: { xs: '14px', md: "0.85vw" },
                fontWeight: 700,
                letterSpacing: "0.08em",
                textDecoration: "none",
                whiteSpace: "nowrap",
                position: "relative",
                transition: "color 0.2s",

                "&:hover": {
                  color: "#D4AF37",
                },
              }
              }
            >
              {label}
            </Typography>
          ))}
        </Box>


        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: "6px", md: "0.5vw" },
          }}
        >
          <NewBadge />
          <Button
            variant="contained"
            disableElevation
            sx={{
              background: "linear-gradient(135deg, #D4AF37 0%, #C49B20 100%)",
              color: "#1a0a00",
              fontSize: { xs: "9px", lg: "0.7vw" },
              fontWeight: 800,
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              borderRadius: "2px",
              px: { xs: "10px", lg: "1.2vw" },
              py: 0,
              height: { xs: "28px", lg: "2.2vw" },
              minHeight: "unset",
              textTransform: "uppercase",
              transition: "all 0.2s",
              "&:hover": {
                background: "linear-gradient(135deg, #E8C84A 0%, #D4AF37 100%)",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(212,175,55,0.4)",
              },
              "&:active": { transform: "translateY(0)" },
            }}
          >
            DOWNLOAD OUR APP
          </Button>
          <NewBadge />
        </Box>
      </Toolbar>
    </AppBar >
  );
};

export default Navbar;
