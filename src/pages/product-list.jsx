import { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import backgroundImage from "/images/background1.png";
import Navbar from "../components/Navbar";

const products = [
  {
    id: 1,
    category: "Kilo Bar",
    name: "BRPL Fine Gold Bar",
    purity: "999.9",
    weight: "10g",
    price: 60460,
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&q=80",
    badge: "BESTSELLER",
  },
  {
    id: 2,
    category: "Kilo Bar",
    name: "Pure Gold Fine Bar",
    purity: "999",
    weight: "10g",
    price: 60454,
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&q=80",
  },
  {
    id: 3,
    category: "Jewellery",
    name: "Gold Jhumka Earrings",
    purity: "999",
    weight: "Varies",
    price: 7052,
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80",
    badge: "NEW",
  },
  {
    id: 4,
    category: "Tola",
    name: "Classic Tola Bar",
    purity: "999.9",
    weight: "11.66g",
    price: 69850,
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&q=80",
  },
];

const categories = ["All", "Kilo Bar", "Jewellery", "Tola"];

const theme = {
  bg: "#0d0018",
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
        background: "#32012c",
        display: "flex",
        flexDirection: "column",
        borderRadius: "15px",
        overflow: "hidden",
        height: "100%",
        transition: "0.3s",
        "&:hover .card-img": {
          transform: "scale(1.05)",
        },
      }}
    >
      {/* IMAGE */}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
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
          Purity {p.purity} · Wt {p.weight}
        </Typography>

        {/* PRICE */}
        <Box
          sx={{
            display: "flex",
            border: "1px solid rgba(255,255,255,0.1)",
            mt: "auto",
            mb: 1.2,
          }}
        >
          <Box
            sx={{
              px: 1.5,
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.05)",
              fontSize: "0.9rem",
              color: "#FFFFFF",

            }}
          >
            ASK
          </Box>

          <Box
            sx={{
              flex: 1,
              py: 1.2,
              px: 1.5,
              background: theme.green,
              color: "#000",
              fontWeight: "700",
              textAlign: "center",
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            AED {p.price.toLocaleString()}
          </Box>
        </Box>

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
          {ok ? "✓ Added" : "Buy Now"}
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
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <Box sx={{ minHeight: "100vh", background: theme.bg, position: "relative" }}>
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
                fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
                letterSpacing: "0.1em",
                color: theme.text,
              }}
            >
              OUR <Box component="span" sx={{ color: theme.gold }}>PRODUCTS</Box>
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
              <ProductCard key={p.id} p={p} onAdd={() => setCart((c) => c + 1)} />
            ))}
          </Box>
        </Box>

        {/* FOOTER */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            background: "#270122",
            py: 1,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "12px", md: "0.8rem" },
              color: "#e6e6e6",
            }}
          >
            Copyrights © New RakGold Jewellery Trading L.L.C 1.0.2
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
