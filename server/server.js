import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import recipesRoutes from "./routes/recipes.js"; // ✅ Fixed spelling from "recepiesRoutes" to "recipesRoutes"

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use("/recipes", recipesRoutes);

app.get("/", (req, res) => res.send("Hello from the home page of recipes."));

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));
console.log("[TEST] Server started successfully!");
