// Simple static file server for D'Moksha Meetings Calendar
// Serves index.html on the port Render provides.

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Single-page app: serve index.html for root and any other route
app.get("/", (_req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.listen(PORT, () => {
  console.log(`D'Moksha Meetings Calendar listening on port ${PORT}`);
});
