import { useState } from "react";

const products = [
  {
    id: 1, category: "Kilo Bar",
    name: "BRPL Fine Gold Bar",
    purity: "999.9",
    weight: "10g",
    shape: "Rectangle",
    price: 60460,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=300&q=80",
    badge: "BESTSELLER",
  },
  {
    id: 2, category: "Kilo Bar",
    name: "Pure Gold Fine Bar",
    purity: "999",
    weight: "10g",
    shape: "Rectangle",
    price: 60454,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=300&q=80",
    badge: null,
  },
  {
    id: 3, category: "Jewellery",
    name: "Gold Jhumka Earrings",
    purity: "999",
    weight: "Varies",
    shape: "Traditional",
    price: 7052,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&q=80",
    badge: "NEW",
  },
  {
    id: 4, category: "Jewellery",
    name: "Bridal Gold Necklace Set",
    purity: "999",
    weight: "Varies",
    shape: "Necklace",
    price: 70584,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80",
    badge: "PREMIUM",
  },
  {
    id: 5, category: "Kilo Bar",
    name: "Suisse Fine Gold Bar",
    purity: "999.9",
    weight: "10 oz",
    shape: "Rectangle",
    price: 604601,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=300&q=80",
    badge: null,
  },
  {
    id: 6, category: "Kilo Bar",
    name: "Lotus Gold Bar",
    purity: "999",
    weight: "10g",
    shape: "Rectangle",
    price: 60460,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=300&q=80",
    badge: null,
  },
  {
    id: 7, category: "Jewellery",
    name: "Gold Chain Necklace",
    purity: "999",
    weight: "Varies",
    shape: "Chain",
    price: 14103,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&q=80",
    badge: null,
  },
  {
    id: 8, category: "Tola",
    name: "Gold Ten TOLA Bar",
    purity: "999",
    weight: "1 TOLA",
    shape: "Rectangle",
    price: 7052,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=300&q=80",
    badge: "HOT",
  },
];

const categories = ["All", "Kilo Bar", "Jewellery", "Tola"];

const badgeColors = {
  BESTSELLER: { bg: "#c8a415", color: "#1a0a00" },
  NEW: { bg: "#22c55e", color: "#fff" },
  PREMIUM: { bg: "#a855f7", color: "#fff" },
  HOT: { bg: "#ef4444", color: "#fff" },
};

export default function ProductListing() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState(null);

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleShop = (id) => {
    setAddedId(id);
    setCartCount((c) => c + 1);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div style={styles.page}>
      {/* Ambient background texture */}
      <div style={styles.bgOverlay} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <rect width="38" height="38" rx="6" fill="#c8a415" opacity="0.15" />
              <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle"
                fill="#c8a415" fontSize="22" fontWeight="900" fontFamily="serif">NR</text>
            </svg>
            <div>
              <div style={styles.logoTitle}>NEW RAK GOLD</div>
              <div style={styles.logoSub}>JEWELLERY TRADING L.L.C</div>
            </div>
          </div>
          <nav style={styles.nav}>
            {["LIVE RATES", "PRODUCT", "PRIVACY POLICY", "CONTACT US"].map((n) => (
              <a key={n} href="#" style={styles.navLink}
                onMouseEnter={e => e.target.style.color = "#e040fb"}
                onMouseLeave={e => e.target.style.color = "#e2d4f5"}>{n}</a>
            ))}
          </nav>
          <div style={styles.headerRight}>
            <div style={styles.timeBlock}>
              <span>🇦🇪</span>
              <span style={styles.timeText}>Mon 1:28 PM</span>
            </div>
            <div style={styles.cartBtn}>
              🛒
              {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div style={styles.heroBanner}>
        <div style={styles.heroGlow} />
        <div style={styles.heroContent}>
          <div style={styles.heroLabel}>EXCLUSIVE COLLECTION</div>
          <h1 style={styles.heroTitle}>Certified Gold Products</h1>
          <p style={styles.heroSub}>Finest purity • Hallmarked • Direct from UAE</p>
        </div>
        {/* Live price ticker */}
        <div style={styles.priceTicker}>
          <span style={styles.tickerLabel}>GOLD SPOT</span>
          <span style={styles.tickerPrice}>AED 5,123.50 / oz</span>
          <span style={styles.tickerArrow}>▲ 0.8%</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={styles.filterBar}>
        <div style={styles.filterLabel}>FILTER BY:</div>
        <div style={styles.filterButtons}>
          {categories.map((cat) => (
            <button key={cat} style={{
              ...styles.filterBtn,
              ...(activeCategory === cat ? styles.filterBtnActive : {})
            }} onClick={() => setActiveCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
        <div style={styles.filterCount}>{filtered.length} Products</div>
      </div>

      {/* Products Grid */}
      <main style={styles.grid}>
        {filtered.map((product) => {
          const isHovered = hoveredId === product.id;
          const isAdded = addedId === product.id;
          return (
            <div key={product.id}
              style={{ ...styles.card, ...(isHovered ? styles.cardHovered : {}) }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}>

              {/* Badge */}
              {product.badge && (
                <div style={{
                  ...styles.badge,
                  background: badgeColors[product.badge]?.bg,
                  color: badgeColors[product.badge]?.color,
                }}>{product.badge}</div>
              )}

              {/* Image area */}
              <div style={styles.imageWrap}>
                <div style={styles.imageShine} />
                <img src={product.image} alt={product.name}
                  style={{ ...styles.productImg, ...(isHovered ? styles.productImgHovered : {}) }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div style={{ ...styles.imgFallback, display: "none" }}>
                  <span style={{ fontSize: 48 }}>🥇</span>
                </div>
              </div>

              {/* Info */}
              <div style={styles.cardBody}>
                <div style={styles.categoryTag}>{product.category}</div>
                <h3 style={styles.productName}>{product.name}</h3>

                <div style={styles.specRow}>
                  <div style={styles.spec}>
                    <span style={styles.specLabel}>Purity</span>
                    <span style={styles.specValue}>{product.purity}</span>
                  </div>
                  <div style={styles.specDivider} />
                  <div style={styles.spec}>
                    <span style={styles.specLabel}>Weight</span>
                    <span style={styles.specValue}>{product.weight}</span>
                  </div>
                  <div style={styles.specDivider} />
                  <div style={styles.spec}>
                    <span style={styles.specLabel}>Shape</span>
                    <span style={styles.specValue}>{product.shape}</span>
                  </div>
                </div>

                <div style={styles.priceRow}>
                  <span style={styles.priceLabel}>ASK PRICE</span>
                  <span style={styles.price}>
                    AED {product.price.toLocaleString()}
                  </span>
                </div>

                <button style={{
                  ...styles.shopBtn,
                  ...(isAdded ? styles.shopBtnAdded : {}),
                  ...(isHovered && !isAdded ? styles.shopBtnHovered : {}),
                }} onClick={() => handleShop(product.id)}>
                  {isAdded ? "✓ ADDED" : "SHOP NOW"}
                </button>
              </div>
            </div>
          );
        })}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerDivider} />
        <p style={styles.footerText}>
          Copyrights © New RakGold Jewellery Trading L.L.C
        </p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#170316",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: "#e2d4f5",
    position: "relative",
    overflow: "hidden",
  },
  bgOverlay: {
    position: "fixed",
    inset: 0,
    background: `
      radial-gradient(ellipse at 15% 15%, rgba(160,80,255,0.18) 0%, transparent 50%),
      radial-gradient(ellipse at 85% 75%, rgba(220,60,180,0.12) 0%, transparent 50%),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 60px,
        rgba(180,100,255,0.018) 60px,
        rgba(180,100,255,0.018) 61px
      )
    `,
    pointerEvents: "none",
    zIndex: 0,
  },
  header: {
    background: "linear-gradient(180deg, #230520 0%, #170316 100%)",
    borderBottom: "2px solid #c040e0",
    position: "relative",
    zIndex: 10,
    boxShadow: "0 4px 24px rgba(192,64,224,0.2)",
  },
  headerInner: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "14px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    flexWrap: "wrap",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: 900,
    color: "#fff",
    letterSpacing: "0.15em",
    lineHeight: 1.1,
    fontFamily: "Impact, sans-serif",
  },
  logoSub: {
    fontSize: 9,
    color: "#d060f0",
    letterSpacing: "0.12em",
    fontFamily: "sans-serif",
  },
  nav: {
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
  },
  navLink: {
    color: "#e2d4f5",
    textDecoration: "none",
    fontSize: 11,
    letterSpacing: "0.12em",
    fontFamily: "sans-serif",
    fontWeight: 600,
    transition: "color 0.2s",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  timeBlock: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(192,64,224,0.1)",
    border: "1px solid rgba(192,64,224,0.3)",
    borderRadius: 6,
    padding: "4px 10px",
  },
  timeText: {
    fontSize: 11,
    color: "#d060f0",
    fontFamily: "monospace",
    letterSpacing: "0.05em",
  },
  cartBtn: {
    position: "relative",
    fontSize: 20,
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: 6,
    background: "rgba(192,64,224,0.12)",
    border: "1px solid rgba(192,64,224,0.3)",
    transition: "background 0.2s",
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    background: "#e040fb",
    color: "#fff",
    borderRadius: "50%",
    width: 18,
    height: 18,
    fontSize: 10,
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
  },
  heroBanner: {
    position: "relative",
    zIndex: 1,
    background: "linear-gradient(135deg, #230520 0%, #2e0a2e 40%, #230520 100%)",
    borderBottom: "1px solid rgba(192,64,224,0.35)",
    padding: "40px 32px 36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 20,
    maxWidth: "100%",
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute",
    top: "50%",
    left: "30%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 220,
    background: "radial-gradient(ellipse, rgba(192,64,224,0.18) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
  },
  heroLabel: {
    fontSize: 10,
    letterSpacing: "0.25em",
    color: "#e040fb",
    fontFamily: "sans-serif",
    fontWeight: 700,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 8px",
    letterSpacing: "0.02em",
    textShadow: "0 2px 16px rgba(192,64,224,0.45)",
  },
  heroSub: {
    fontSize: 13,
    color: "#c080e8",
    fontFamily: "sans-serif",
    letterSpacing: "0.08em",
  },
  priceTicker: {
    position: "relative",
    zIndex: 1,
    background: "rgba(192,64,224,0.1)",
    border: "1px solid rgba(192,64,224,0.4)",
    borderRadius: 10,
    padding: "14px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 180,
  },
  tickerLabel: {
    fontSize: 9,
    letterSpacing: "0.2em",
    color: "#d060f0",
    fontFamily: "sans-serif",
    fontWeight: 700,
  },
  tickerPrice: {
    fontSize: 22,
    fontWeight: 700,
    color: "#fff",
    fontFamily: "monospace",
    letterSpacing: "0.04em",
  },
  tickerArrow: {
    fontSize: 12,
    color: "#22c55e",
    fontFamily: "sans-serif",
    fontWeight: 700,
  },
  filterBar: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1400,
    margin: "28px auto 0",
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  filterLabel: {
    fontSize: 10,
    letterSpacing: "0.2em",
    color: "#d060f0",
    fontFamily: "sans-serif",
    fontWeight: 700,
  },
  filterButtons: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "7px 18px",
    background: "transparent",
    border: "1px solid rgba(192,64,224,0.35)",
    borderRadius: 20,
    color: "#e2d4f5",
    fontSize: 11,
    letterSpacing: "0.1em",
    fontFamily: "sans-serif",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  filterBtnActive: {
    background: "linear-gradient(135deg, #a020c0, #e040fb)",
    color: "#fff",
    border: "1px solid #e040fb",
    boxShadow: "0 0 14px rgba(224,64,251,0.45)",
  },
  filterCount: {
    marginLeft: "auto",
    fontSize: 11,
    color: "rgba(192,64,224,0.6)",
    fontFamily: "sans-serif",
    letterSpacing: "0.08em",
  },
  grid: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1400,
    margin: "24px auto 40px",
    padding: "0 32px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 24,
  },
  card: {
    background: "linear-gradient(145deg, #200418 0%, #2c0624 50%, #200418 100%)",
    border: "1px solid rgba(192,64,224,0.25)",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
    cursor: "pointer",
  },
  cardHovered: {
    transform: "translateY(-6px)",
    boxShadow: "0 16px 48px rgba(192,64,224,0.25), 0 0 0 1px rgba(224,64,251,0.5)",
    borderColor: "rgba(224,64,251,0.6)",
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 2,
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 9,
    fontWeight: 900,
    letterSpacing: "0.12em",
    fontFamily: "sans-serif",
    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
  },
  imageWrap: {
    background: "linear-gradient(135deg, #2e0a2e 0%, #4a1248 50%, #2e0a2e 100%)",
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  imageShine: {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "60%",
    height: "100%",
    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
    pointerEvents: "none",
    animation: "shine 3.5s infinite",
    zIndex: 1,
  },
  productImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease",
    opacity: 0.92,
  },
  productImgHovered: {
    transform: "scale(1.06)",
    opacity: 1,
  },
  imgFallback: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #2e0a2e, #4a1248)",
  },
  cardBody: {
    padding: "18px 20px 20px",
  },
  categoryTag: {
    display: "inline-block",
    fontSize: 9,
    letterSpacing: "0.15em",
    color: "#e040fb",
    fontFamily: "sans-serif",
    fontWeight: 700,
    background: "rgba(224,64,251,0.1)",
    border: "1px solid rgba(224,64,251,0.3)",
    borderRadius: 4,
    padding: "2px 8px",
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 14px",
    letterSpacing: "0.02em",
    lineHeight: 1.3,
  },
  specRow: {
    display: "flex",
    gap: 0,
    marginBottom: 16,
    background: "rgba(0,0,0,0.25)",
    borderRadius: 8,
    border: "1px solid rgba(192,64,224,0.15)",
    overflow: "hidden",
  },
  spec: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px 4px",
    gap: 2,
  },
  specDivider: {
    width: 1,
    background: "rgba(192,64,224,0.2)",
    alignSelf: "stretch",
  },
  specLabel: {
    fontSize: 8,
    letterSpacing: "0.1em",
    color: "rgba(192,64,224,0.7)",
    fontFamily: "sans-serif",
    fontWeight: 600,
  },
  specValue: {
    fontSize: 11,
    color: "#e2d4f5",
    fontFamily: "sans-serif",
    fontWeight: 700,
    letterSpacing: "0.04em",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  priceLabel: {
    fontSize: 9,
    letterSpacing: "0.12em",
    color: "rgba(192,64,224,0.65)",
    fontFamily: "sans-serif",
    fontWeight: 700,
  },
  price: {
    fontSize: 18,
    fontWeight: 700,
    color: "#e040fb",
    fontFamily: "monospace",
    letterSpacing: "0.02em",
    textShadow: "0 0 10px rgba(224,64,251,0.4)",
  },
  shopBtn: {
    width: "100%",
    padding: "11px",
    background: "transparent",
    border: "1.5px solid #a020c0",
    borderRadius: 24,
    color: "#d060f0",
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: "0.2em",
    fontFamily: "sans-serif",
    cursor: "pointer",
    transition: "all 0.25s",
  },
  shopBtnHovered: {
    background: "linear-gradient(135deg, #a020c0, #e040fb)",
    border: "1.5px solid #e040fb",
    color: "#fff",
    boxShadow: "0 4px 18px rgba(224,64,251,0.45)",
  },
  shopBtnAdded: {
    background: "#22c55e",
    border: "1.5px solid #22c55e",
    color: "#fff",
  },
  footer: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    padding: "0 0 20px",
  },
  footerDivider: {
    height: 1,
    background: "linear-gradient(90deg, transparent, #c040e0, transparent)",
    margin: "0 0 18px",
    opacity: 0.45,
  },
  footerText: {
    fontSize: 11,
    color: "rgba(192,64,224,0.5)",
    fontFamily: "sans-serif",
    letterSpacing: "0.08em",
    margin: 0,
  },
};