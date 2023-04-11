const express = require("express");
const path = require("path");

const app = express();
let indexFilePath = "";
indexFilePath = indexFilePath || process.env.INDEX || "index.html";

// Rewrite url for explicit request to the index file
app.get(indexFilePath, (req, res, next) => res.redirect("/"));
app.get("/", (req, res, next) =>
  res.status(200).sendFile(path.join(__dirname, "../..", indexFilePath))
);

// Serve requested static files
app.use(express.static(path.join(__dirname, "../..")));

// Log all other incoming request urls.
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

// Send a 404 response to requests for non-existent files under paths "/content/*", "/src/*", and "/_*".
// For other requests, serve index file as a response.
app.get("/content/*", (req, res, next) => res.status(404).end());
app.get("/src/*", (req, res, next) => res.status(404).end());
app.get("/_*", (req, res, next) => res.status(404).end());
app.get("*", (req, res, next) =>
  res.status(200).sendFile(path.join(__dirname, "../..", indexFilePath))
);

// Start server
app.listen(3000, () => console.log("'dev-server' listening at http://localhost:3000"));
