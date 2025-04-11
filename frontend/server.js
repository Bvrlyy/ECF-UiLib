import http from "http";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  let filePath = "./public" + (req.url === "/" ? "/index.html" : req.url);
  let fullPath = path.join(__dirname, filePath);

  try {
    const data = await readFile(fullPath);
    const ext = path.extname(fullPath);
    const contentType =
      {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".json": "application/json",
      }[ext] || "text/plain";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(404);
    res.end("404 Not Found");
  }
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`✨ Frontend server is running at http://localhost:${PORT}`);
});
import cors from "cors";
