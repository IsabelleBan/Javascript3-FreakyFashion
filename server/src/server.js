import express from "express";
import Database from "better-sqlite3";
import path from "path";
import cors from "cors";
import { getAllProducts } from "../db/db.js";
import { saveProduct } from "../db/db.js";
const app = express();
const PORT = 8000; // Kör backend på port 8000
 
app.use(cors());
app.use(express.json());
 
// Route för att hämta alla produkter
app.get("/api/products", (req, res) => {
  const products = getAllProducts();
  res.json(products);
});
 
app.post("/api/products", (req, res) => {
  const newProduct = req.body;
 
  if (!newProduct || !newProduct.name || !newProduct.sku) {
    return res
      .status(400)
      .json({ error: "Produktdata saknas eller är ofullständig." });
  }
 
  const saved = saveProduct(newProduct); // Spara till databasen
  res.status(201).json(saved);
});

// CORS-konfiguration för att tillåta requests från både React och Angular
app.use(
  cors({
    origin: "*", // Tillåt alla ursprung temporärt under utveckling
    credentials: true,
  })
);
 
// Gör bilder i public-mappen tillgängliga
app.use(express.static("public"));
 
// Middleware för att hantera JSON-data
app.use(express.json());
 
const dbPath = "./db/freakyfashion.db";
 
// Initiera databasen
function setupDb() {
  const db = new Database(dbPath, { verbose: console.log });
 
  // Skapa tabellen om den inte finns
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price TEXT NOT NULL,
      brand TEXT NOT NULL,
      image TEXT,
      isNew INTEGER DEFAULT 0,
      slug TEXT,
      description TEXT,
      sku TEXT NOT NULL,
      isFavorite INTEGER DEFAULT 0
    )
  `);
 
  // Kontrollera om det finns produkter
  const count = db.prepare("SELECT COUNT(*) as count FROM products").get();
 
  // Om tabellen är tom, lägg till produkter
  if (count.count === 0) {
    const insertStmt = db.prepare(`
      INSERT INTO products (name, price, brand, image, isNew, slug, description, sku, isFavorite)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
 
    // Produktdata
    const products = [
      {
        name: "Vit Skjorta",
        price: "299",
        brand: "Levis",
        image: "/images/vit-skjorta.png",
        isNew: 1,
        slug: "Vit-Skjorta",
        description: "En vit skjorta i glatt material",
        sku: "AAA111",
        isFavorite: 1,
      },
      {
        name: "Svart Skjorta",
        price: "299",
        brand: "Levis",
        image: "/images/svart-skjorta.png",
        isNew: 1,
        slug: "Svart-Skjorta",
        description: "Lorem ipsum dolor sit amet",
        sku: "BBB111",
        isFavorite: 0,
      },
      {
        name: "Grön Skjorta",
        price: "299",
        brand: "Levis",
        image: "/images/grön-skjorta.png",
        isNew: 0,
        slug: "Gron-Skjorta",
        description: "Lorem ipsum dolor sit amet",
        sku: "CCC111",
        isFavorite: 0,
      },
      {
        name: "Vit Klänning",
        price: "599",
        brand: "Levis",
        image: "/images/vit-klänning.png",
        isNew: 0,
        slug: "Vit-Klänning",
        description: "Lorem ipsum dolor sit amet",
        sku: "DDD111",
        isFavorite: 0,
      },
      {
        name: "Svart Klänning",
        price: "599",
        brand: "Levis",
        image: "/images/svart-klänning.png",
        isNew: 0,
        slug: "Svart-Klänning",
        description: "Lorem ipsum dolor sit amet",
        sku: "EEE111",
        isFavorite: 0,
      },
      {
        name: "Svart Kjol",
        price: "399",
        brand: "Levis",
        image: "/images/svart-kjol.png",
        isNew: 0,
        slug: "Svart-Kjol",
        description: "Lorem ipsum dolor sit amet",
        sku: "FFF111",
        isFavorite: 0,
      },
      {
        name: "Denim Kjol",
        price: "399",
        brand: "Levis",
        image: "/images/denim-kjol.png",
        isNew: 0,
        slug: "Denim-Kjol",
        description: "Lorem ipsum dolor sit amet",
        sku: "GGG111",
        isFavorite: 0,
      },
      {
        name: "Blå Klänning",
        price: "599",
        brand: "Levis",
        image: "/images/blå-klänning.png",
        isNew: 0,
        slug: "Bla-Klanning",
        description: "Lorem ipsum dolor sit amet",
        sku: "HHH111",
        isFavorite: 0,
      },
    ];
 
    // Lägg till varje produkt
    products.forEach((product) => {
      try {
        insertStmt.run(
          product.name,
          product.price,
          product.brand,
          product.image,
          product.isNew,
          product.slug,
          product.description,
          product.sku,
          product.isFavorite
        );
      } catch (error) {
        console.log(
          `❌ Kunde inte lägga in produkt med SKU ${product.sku}: ${error.message}`
        );
      }
    });
 
    console.log("✅ Produkter har lagts till i databasen!");
  }
 
  return db;
}
 
// Initiera databasen
const db = setupDb();
 
// Test-route för att se om servern fungerar
app.get("/", (req, res) => {
  res.send("Backend fungerar! 🚀");
});
 
// ===== FRONTEND API ROUTES =====
 
// Hämta alla produkter (för frontend ProductGrid)
app.get("/products", (req, res) => {
  try {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  } catch (error) {
    console.error("Fel vid hämtning av produkter:", error);
    res.status(500).json({ error: "Något gick fel med databasen" });
  }
});
 
// Hämta liknande produkter (för SimilarProducts-komponenten)
app.get("/products/similar", (req, res) => {
  const productId = req.query.id;
 
  if (!productId) {
    return res.status(400).json({ error: "Missing product ID" });
  }
 
  try {
    const similarProducts = db
      .prepare("SELECT * FROM products WHERE id != ? LIMIT 3")
      .all(productId);
 
    res.json(similarProducts);
  } catch (error) {
    console.error("Error fetching similar products:", error);
    res
      .status(500)
      .json({ error: "Something went wrong fetching similar products" });
  }
});
 
// Sök efter produkter (för frontend sökning)
app.get("/search", (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    return res.status(400).json({ error: "Ingen sökterm angiven" });
  }
 
  try {
    console.log("Sökterm:", query);
    const sql = `SELECT * FROM products WHERE LOWER(name) LIKE ?`;
    const products = db.prepare(sql).all(`%${query}%`);
    res.json(products);
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Fel vid hämtning av produkter" });
  }
});
 
// Hämta produkt via slug (för ProductDetails)
app.get("/products/:slug", (req, res) => {
  const { slug } = req.params;
  try {
    console.log("Hämtar produkt med slug:", slug);
 
    const product = db
      .prepare("SELECT * FROM products WHERE slug = ?")
      .get(slug);
 
    if (!product) {
      return res.status(404).json({ error: "Produkten hittades inte" });
    }
 
    res.json(product);
  } catch (error) {
    console.error("Fel vid hämtning av produkt:", error);
    res.status(500).json({ error: "Något gick fel vid hämtning av produkt" });
  }
});
 
app.get("/images/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/images/", req.params.filename));
});
 
// SVG-filer för hjärtikoner
app.get("/svg/:filename", (req, res) => {
  const { filename } = req.params;
  // Om din mappstruktur är server/public/svg
  res.sendFile(path.join(__dirname, "../public/svg", filename));
});
 
// Starta servern
app.listen(PORT, () => {
  console.log(`✅ Servern körs på http://localhost:${PORT}`);
});
