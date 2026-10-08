// Static server for D'Moksha Meetings Calendar + Staff portal
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/support-team", (_req, res) => res.sendFile(path.join(__dirname, "staff.html")));
// Old link keeps working: send anyone using /staff to the new address
app.get("/staff", (_req, res) => res.redirect(301, "/support-team"));
app.get("/", (_req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.listen(PORT, () => console.log(`D'Moksha listening on port ${PORT}`));
