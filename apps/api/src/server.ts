import express from "express";
import app from "./app";

const server = express();
const PORT = process.env.PORT || 3000;

server.use(app);

server.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
