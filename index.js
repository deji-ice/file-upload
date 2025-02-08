import express from "express";
import connectDB from "./db/conn.js";
import uploadRoute from "./routes/uploadRoute.js";

const app = express();
const port = 3000;

connectDB();

// Middeware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
// Basic route
app.get("/", (_req, res) => {
  res.send("Hello World!");
});
// Use the uploadRoute for all routes starting with /api (uploadRoute.js)
app.use("/api", uploadRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
