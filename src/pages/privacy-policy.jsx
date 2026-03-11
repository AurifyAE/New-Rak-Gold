import { Box, Typography, Divider } from "@mui/material";
import backgroundImage from "/images/background1.png";
import Navbar from "../components/Navbar";

/* ─── THEME ───────────────── */
const C = {
  bg: "#0d0018",
  card: "rgba(30, 0, 45, 0.7)",
  gold: "#FFB300",
  text: "#FFFFFF",
  muted: "rgba(255,255,255,0.65)",
  dim: "rgba(255,255,255,0.35)",
  line: "rgba(255,255,255,0.08)",
};

/* ─── CONTENT ───────────────── */
const SECTIONS = [
  {
    title: "What Information is Collected About You?",
    items: [
      {
        sub: "Information you provide directly",
        body: "When you register for services or use certain Application features, we may ask for personal data such as your name, contact number, postal address, email address, username, and password.",
      },
      {
        sub: "Information automatically collected",
        body: "When you visit the Application, we may collect your IP address, browser type, operating system, pages visited, advertisements viewed, bandwidth speed, and standard server log information.",
      },
      {
        sub: "Information from other sources",
        body: "We may receive information about you from publicly or commercially available sources, or from third-party social networking services when you choose to connect with them.",
      },
    ],
  },
  {
    title: "How We Use the Information We Collect",
    items: [
      {
        sub: "General",
        body: "We use your information to register your device for a service, fulfill feature requests, provide customized content, and make recommendations based on your activity.",
      },
      {
        sub: "Advertisements",
        body: "We may use your information to send product updates, newsletters, and other communications via post, email, telephone, or SMS, where permitted by applicable law.",
      },
      {
        sub: "Statistics and Research",
        body: "We may create anonymous, aggregated statistics about the use of our products and services, which may be shared with third parties or made publicly available.",
      },
      {
        sub: "Product & Service Improvement",
        body: "We may use your information to improve existing products and services, develop new offerings, and better understand customer preferences.",
      },
      {
        sub: "Publishing Reviews & Content",
        body: "Where you have made product reviews or content publicly visible on our Application, we may link to, publish, or publicize these materials in our own advertisements.",
      },
    ],
  },
  {
    title: "To Whom Do We Disclose Your Personal Data?",
    items: [
      {
        body: "We may employ third-party entities to facilitate our services (e.g. maintenance, analysis, marketing, and development). These parties have limited access to your information solely to perform tasks on our behalf.",
      },
      {
        body: "We may also disclose your information to comply with legal obligations, respond to legal processes, or protect the rights, property, or safety of New RakGold Jewellery Trading L.L.C.",
      },
    ],
  },
  {
    title: "Your Choices",
    items: [
      {
        body: "You can opt out of promotional communications by following the unsubscribe instructions included in any message.",
      },
    ],
  },
  {
    title: "Security",
    items: [
      {
        body: "We have put in place reasonable physical and technical measures to safeguard your information. However, no website, Internet transmission, computer system, or wireless connection is completely secure.",
      },
    ],
  },
  {
    title: "Links to Other Websites",
    items: [
      {
        body: "Our Application may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.",
      },
    ],
  },
  {
    title: "Changes to This Privacy Policy",
    items: [
      {
        body: "We may update this Privacy Policy at any time. When we do, we will update the effective date and notify you of material changes.",
      },
    ],
  },
];

/* ─── SECTION ───────────────── */
function Section({ title, items, showDivider }) {
  return (
    <Box sx={{ mb: { xs: 4, md: 5 } }}>
      {/* Title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 2,
        }}
      >
        <Box sx={{ width: 3, height: 20, background: C.gold }} />

        <Typography
          sx={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            letterSpacing: "0.1em",
            color: C.text,
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Items */}
      <Box sx={{ pl: { xs: 1, md: 2 } }}>
        {items.map((item, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            {item.sub && (
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", md: "0.85rem" },
                  fontWeight: 700,
                  color: C.gold,
                  mb: 0.4,
                }}
              >
                {item.sub}
              </Typography>
            )}

            <Typography
              sx={{
                fontSize: { xs: "0.9rem", md: "0.95rem" },
                color: C.muted,
                lineHeight: 1.8,
              }}
            >
              {item.body}
            </Typography>
          </Box>
        ))}
      </Box>

      {showDivider && <Divider sx={{ borderColor: C.line, mt: 3 }} />}
    </Box>
  );
}

/* ─── PAGE ───────────────── */
export default function PrivacyPolicy() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: C.bg,
        position: "relative",
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
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        {/* CONTAINER */}
        <Box
          sx={{
            maxWidth: "1100px",
            mx: "auto",
            px: { xs: 2.5, md: 4 },
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              pt: { xs: 4, md: 5 },
              pb: 3,
              borderBottom: `1px solid ${C.line}`,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",
                letterSpacing: "0.35em",
                color: C.dim,
                mb: 1,
              }}
            >
              NEW RAK GOLD · LEGAL
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: { xs: "2rem", md: "2.8rem" },
                letterSpacing: "0.1em",
                color: C.text,
              }}
            >
              PRIVACY{" "}
              <Box component="span" sx={{ color: C.gold }}>
                POLICY
              </Box>
            </Typography>
          </Box>

          {/* INTRO */}
          <Box
            sx={{
              background: C.card,
              border: `1px solid ${C.line}`,
              borderLeft: `3px solid ${C.gold}`,
              p: { xs: 2.2, md: 3 },
              mt: 4,
              mb: 5,
              borderRadius: "6px",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.9rem", md: "0.95rem" },
                color: C.muted,
                lineHeight: 1.85,
              }}
            >
              <Box component="span" sx={{ color: C.text, fontWeight: 600 }}>
                New RakGold Jewellery Trading L.L.C
              </Box>{" "}
              is committed to compliance with applicable Privacy Laws. Protecting the privacy and
              security of your personal data is of prime importance to us.
            </Typography>
          </Box>

          {/* SECTIONS */}
          {SECTIONS.map((s, i) => (
            <Section
              key={i}
              title={s.title}
              items={s.items}
              showDivider={i < SECTIONS.length - 1}
            />
          ))}
        </Box>

        {/* FOOTER */}
        <Box
          sx={{
            
            py: 1.2,
            textAlign: "center",
            background: "#270122",
            borderTop: `1px solid ${C.line}`,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "11px", md: "12px" },
              letterSpacing: "0.08em",
              color: C.dim,
            }}
          >
            Copyrights © New RakGold Jewellery Trading L.L.C · v1.0.2
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
