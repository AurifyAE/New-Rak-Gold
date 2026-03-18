import { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import backgroundImage from "/images/background.png";
import Navbar from "../components/Navbar";
import CopyRight from "../components/CopyRight";

const products = [
  {
    id: 1,
    category: "KILO BAR",
    name: "KILO BAR",
    purity: "995, 999.9",
    shape: "Rectangle",
    image: "https://images.pexels.com/photos/8442330/pexels-photo-8442330.jpeg",
  },
  {
    id: 2,
    category: "KILO BAR",
    name: "KILO BAR",
    purity: "995, 999.9",
    shape: "Rectangle",
    image: "https://images.pexels.com/photos/8442326/pexels-photo-8442326.jpeg",
  },
  {
    id: 3,
    category: "KILO BAR",
    name: "KILO BAR",
    purity: "995, 999.9",
    shape: "Rectangle",
    image: "https://images.pexels.com/photos/8442318/pexels-photo-8442318.jpeg",
  },
  {
    id: 4,
    category: "KILO BAR",
    name: "KILO BAR",
    purity: "995, 999.9",
    shape: "Rectangle",
    image: "https://images.pexels.com/photos/366551/pexels-photo-366551.jpeg",
  },
  {
    id: 5,
    category: "KILO BAR",
    name: "KILO BAR",
    purity: "995, 999.9",
    shape: "Rectangle",
    image: "https://images.pexels.com/photos/8442352/pexels-photo-8442352.jpeg",
  },
  {
    id: 6,
    category: "KILO BAR",
    name: "KILO BAR",
    purity: "995, 999.9",
    shape: "Rectangle",
    image:
      "https://images.pexels.com/photos/16055834/pexels-photo-16055834.jpeg",
  },
];

const categories = ["All", "Kilo Bar", "Jewellery", "Tola"];

const theme = {
  bg: "#001718",
  gold: "#FFB300",
  green: "#FFFFFF",
  text: "#FFFFFF",
  muted: "#d9d9d9",
  line: "rgba(255,255,255,0.08)",
};

/* ─── PRODUCT CARD ───────────────── */
function ProductCard({ p, onAdd }) {
  const [ok, setOk] = useState(false);

  return (
    <Box
      sx={{
        background: "#2D464EAF",
        display: "flex",
        flexDirection: "column",
        borderRadius: "15px",
        overflow: "hidden",
        padding: "0.2vw",
        height: "100%",
        transition: "0.3s",
        "&:hover .card-img": {
          transform: "scale(1.05)",
        },
      }}
    >
      {/* IMAGE */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "15px",
        }}
      >
        <Box
          component="img"
          className="card-img"
          src={p.image}
          alt={p.name}
          sx={{
            width: "100%",
            height: { xs: 180, sm: 200, md: 220 },
            objectFit: "cover",
            transition: "0.4s",
          }}
        />

        {p.badge && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              background: theme.green,
              color: "#000",
              fontWeight: "700",
              fontSize: "0.75rem",
              px: 1.5,
              py: 0.5,
              borderRadius: "0 0 15px 0",
            }}
          >
            {p.badge}
          </Box>
        )}
      </Box>

      {/* BODY */}
      <Box
        sx={{
          p: { xs: "1rem", md: "1.3rem" },
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "0.75rem", md: "0.85rem" },
            letterSpacing: "0.1em",
            color: theme.muted,
            mb: 0.5,
          }}
        >
          {p.category}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "1.1rem", md: "1.3rem" },
            color: theme.text,
            mb: 0.6,
            lineHeight: 1.2,
          }}
        >
          {p.name}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "0.9rem", md: "1rem" },
            color: theme.muted,
            mb: 2,
          }}
        >
          Purity : {p.purity}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "0.9rem", md: "1rem" },
            color: theme.muted,
            mb: 2,
          }}
        >
          Shape : {p.shape}
        </Typography>

        {/* BUTTON */}
        <Button
          fullWidth
          onClick={() => {
            setOk(true);
            onAdd();
            setTimeout(() => setOk(false), 1500);
          }}
          sx={{
            background: ok ? theme.green : theme.gold,
            color: "#000",
            fontWeight: 700,
            py: 1.2,
            fontSize: { xs: "0.9rem", md: "1rem" },
            "&:hover": {
              background: ok ? theme.green : "#ffc933",
            },
          }}
        >
          SHOP
        </Button>
      </Box>
    </Box>
  );
}

/* ─── PAGE ───────────────── */
export default function ProductListing() {
  const [active, setActive] = useState("All");
  const [cart, setCart] = useState(0);

  const filtered =
    active === "All"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === active.toLowerCase(),
        );
  return (
    <Box
      sx={{ minHeight: "100vh", background: theme.bg, position: "relative" }}
    >
      {/* BACKGROUND */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src={backgroundImage}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Navbar cartCount={cart} />

        {/* CONTAINER */}
        <Box
          sx={{
            maxWidth: "1400px",
            mx: "auto",
            width: "100%",
            minHeight: "90dvh",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              px: { xs: 2, md: "2.5rem" },
              pt: { xs: "2rem", md: "2.5rem" },
              pb: "1.5rem",
              borderBottom: `1px solid ${theme.line}`,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "2.4rem", md: "2.8rem" },
                letterSpacing: "0.1em",
                color: theme.text,
              }}
            >
              OUR{" "}
              <Box component="span" sx={{ color: theme.gold }}>
                PRODUCTS
              </Box>
            </Typography>
          </Box>

          {/* FILTER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: { xs: 2, md: "2.5rem" },
              overflowX: "auto",
              borderBottom: `1px solid ${theme.line}`,
            }}
          >
            {categories.map((c) => (
              <Button
                key={c}
                onClick={() => setActive(c)}
                sx={{
                  fontSize: { xs: "0.7rem", md: "0.8rem" },
                  px: 2,
                  py: 1.5,
                  color: active === c ? theme.gold : theme.muted,
                  borderBottom:
                    active === c
                      ? `2px solid ${theme.gold}`
                      : "2px solid transparent",
                  whiteSpace: "nowrap",
                }}
              >
                {c}
              </Button>
            ))}
          </Box>

          {/* PRODUCT GRID */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2,1fr)",
                md: "repeat(3,1fr)",
                lg: "repeat(4,1fr)",
              },
              gap: { xs: 2, md: 3 },
              px: { xs: 2, md: "2.5rem" },
              mt: "2rem",
              mb: "5rem",
            }}
          >
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                onAdd={() => setCart((c) => c + 1)}
              />
            ))}
          </Box>
        </Box>

        {/* FOOTER */}
        <CopyRight />
      </Box>
    </Box>
  );
}
