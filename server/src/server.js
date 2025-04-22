import express from "express";
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
    return res.status(400).json({ error: "Produktdata saknas eller är ofullständig." });
  }

  const saved = saveProduct(newProduct); // Spara till databasen
  res.status(201).json(saved);
});

app.listen(PORT, () => {
  console.log(`✅ Servern körs på http://localhost:${PORT}`);
});

