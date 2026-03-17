import { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import backgroundImage from "/images/background.png";
import Navbar from "../components/Navbar";
import CopyRight from "../components/CopyRight";

/* ─── THEME ─────────────────────────────────────── */
const C = {
  bg: "#0d0018",
  card: "rgba(30,0,45,0.85)",
  gold: "#FFB300",
  text: "#FFFFFF",
  muted: "rgba(255,255,255,0.55)",
  dim: "rgba(255,255,255,0.25)",
  line: "rgba(255,255,255,0.08)",
  input: "rgba(255,255,255,0.05)",
};

/* ─── INPUT FIELD ────────────────────────────────── */
function Field({ label, name, multiline = false, rows = 1, value, onChange }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: { xs: "0.8rem", md: "0.9rem" },
          letterSpacing: "0.08em",
          color: C.muted,
          mb: 0.8,
          textTransform: "uppercase",
        }}
      >
        {label}{" "}
        <Box component="span" sx={{ color: C.gold }}>
          *
        </Box>
      </Typography>

      <TextField
        fullWidth
        name={name}
        multiline={multiline}
        rows={rows}
        value={value}
        onChange={onChange}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            background: C.input,
            borderRadius: 0,
            color: C.text,
            fontSize: { xs: "1rem", md: "1.1rem" },

            "& fieldset": {
              borderColor: C.line,
            },

            "&:hover fieldset": {
              borderColor: "rgba(255,179,0,0.35)",
            },

            "&.Mui-focused fieldset": {
              borderColor: C.gold,
            },
          },

          "& .MuiInputBase-input": {
            color: C.text,
            py: 1.4,
            px: 1.8,
          },
        }}
      />
    </Box>
  );
}

/* ─── INFO ROW ───────────────────────────────────── */
function InfoRow({ icon, label, children }) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          background: "rgba(255,179,0,0.1)",
          border: `1px solid rgba(255,179,0,0.25)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: C.gold,
          mt: 0.3,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: { xs: "1.1rem", md: "1.2rem" },
            letterSpacing: "0.05em",
            textAlign: "start",
            color: C.gold,
            mb: 0.6,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            textAlign: "start",
          }}
        >
          {children}
        </Typography>
      </Box>
    </Box>
  );
}

/* ─── PAGE ───────────────────────────────────────── */
export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !form.message) return;

    setSent(true);

    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: C.bg,
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Background */}
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
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        {/* MAX WIDTH CONTAINER */}
        <Box
          sx={{
            maxWidth: "1400px",
            mx: "auto",
            width: "100%",
          }}
        >
          {/* ─── HEADER ───────────────── */}
          <Box
            sx={{
              px: { xs: 2, sm: 4, md: "4rem" },
              pt: "2.5rem",
              pb: "2rem",
              borderBottom: `1px solid ${C.line}`,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.75rem", md: "0.9rem" },
                letterSpacing: "0.12em",
                color: C.dim,
                mb: 1,
                textTransform: "uppercase",
              }}
            >
              NEW RAK GOLD · GET IN TOUCH
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "2.4rem", md: "2.8rem" },
                letterSpacing: "0.05em",
                lineHeight: 1,
                color: C.text,
              }}
            >
              CONTACT{" "}
              <Box component="span" sx={{ color: C.gold }}>
                US
              </Box>
            </Typography>
          </Box>

          {/* ─── MAP ───────────────── */}
          <Box
            sx={{
              height: { xs: 260, sm: 320, md: 380 },
              borderBottom: `1px solid ${C.line}`,
            }}
          >
            <iframe
              title="New Rak Gold Location"
              src="https://www.google.com/maps?q=Deira%20Gold%20Souk%20Dubai&output=embed"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "invert(90%) hue-rotate(180deg)",
              }}
              loading="lazy"
              allowFullScreen
            />
          </Box>

          {/* ─── MAIN CONTENT ───────────────── */}
          <Grid
            container
            sx={{
              borderBottom: `1px solid ${C.line}`,
              mb: "36px",
            }}
          >
            {/* FORM */}
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                px: { xs: 3, md: "4rem" },
                py: { xs: 3, md: "3rem" },
                borderRight: { lg: `1px solid ${C.line}` },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "20px", sm: "2.4rem", md: "2.8rem" },
                  letterSpacing: "0.05em",
                  color: C.text,
                  mb: 0.5,
                }}
              >
                SEND US A MESSAGE
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  color: C.muted,
                  mb: 3.5,
                  lineHeight: 1.6,
                }}
              >
                Contact us or give us a call to discover how we can help.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                }}
              >
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
                <Field
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                <Field
                  label="Phone No."
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
                <Field
                  label="Message"
                  name="message"
                  multiline
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                />

                <Button
                  fullWidth
                  onClick={handleSubmit}
                  sx={{
                    background: sent ? "#00E676" : C.gold,
                    color: "#000",
                    fontSize: { xs: "1rem", md: "1.05rem" },
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    borderRadius: 0,
                    py: 1.6,

                    "&:hover": {
                      background: sent ? "#00E676" : "#ffc933",
                    },
                  }}
                >
                  {sent ? "✓ Message Sent!" : "Send Message"}
                </Button>
              </Box>
            </Grid>

            {/* CONTACT INFO */}
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                px: { xs: 3, md: "4rem" },
                py: { xs: 3, md: "3rem" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "20px", sm: "2.4rem", md: "2.8rem" },
                  letterSpacing: "0.05em",
                  color: C.text,
                  mb: 3,
                }}
              >
                CORPORATE{" "}
                <Box component="span" sx={{ color: C.gold }}>
                  HEADQUARTERS
                </Box>
              </Typography>

              <InfoRow
                icon={<LocationOnIcon fontSize="small" />}
                label="Address"
              >
                <Typography
                  sx={{
                    fontSize: { xs: "0.95rem", md: "1.05rem" },
                    color: C.muted,
                    lineHeight: 1.8,
                  }}
                >
                  New RakGold Jewellery Trading L.L.C
                  <br />
                  Shop 4, Near Womens' Museum,
                  <br />
                  Deira Gold Souq, Dubai (UAE)
                </Typography>
              </InfoRow>

              <InfoRow
                icon={<EmailIcon fontSize="small" />}
                label="Email Address"
              >
                <Typography
                  sx={{
                    fontSize: { xs: "0.95rem", md: "1.05rem" },
                    color: C.muted,
                  }}
                >
                  › newrakgoldllc@gmail.com
                </Typography>
              </InfoRow>

              <InfoRow icon={<PhoneIcon fontSize="small" />} label="Contact Us">
                {["+971043442322", "+971563067373", "+971503712326"].map(
                  (num) => (
                    <Typography
                      key={num}
                      sx={{
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                        color: C.muted,
                        mb: 0.6,
                      }}
                    >
                      › {num}
                    </Typography>
                  ),
                )}
              </InfoRow>
            </Grid>
          </Grid>
        </Box>

        {/* FOOTER */}
        <CopyRight />

      </Box>
    </Box>
  );
}
