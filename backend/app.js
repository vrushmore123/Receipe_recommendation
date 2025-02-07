const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());

// Middleware
app.use(express.json());

const userRoutes = require("./routes/userRoute");
const recipeRoute = require("./routes/recipeRoutes");


app.use("/api/users", userRoutes);
app.use("/api/main", recipeRoute);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});
module.exports = app;
