import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const isDevMode = process.argv.includes("--dev");
const port = Number(process.env.PORT) || (isDevMode ? 5173 : 5500);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json",
  ".txt": "text/plain; charset=utf-8",
};

function safeResolvePath(requestPath) {
  const decodedPath = decodeURIComponent(requestPath.split("?")[0]);
  const normalized = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const resolved = path.join(rootDir, normalized);
  if (!resolved.startsWith(rootDir)) {
    return null;
  }
  return resolved;
}

function send(
  res,
  statusCode,
  content,
  contentType = "text/plain; charset=utf-8",
) {
  res.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
  });
  res.end(content);
}

const server = http.createServer((req, res) => {
  const urlPath = req.url === "/" ? "/index.html" : req.url || "/index.html";
  const resolvedPath = safeResolvePath(urlPath);

  if (!resolvedPath) {
    send(res, 400, "Bad request.");
    return;
  }

  fs.stat(resolvedPath, (statErr, stat) => {
    if (statErr || !stat) {
      send(res, 404, "Not found.");
      return;
    }

    const targetPath = stat.isDirectory()
      ? path.join(resolvedPath, "index.html")
      : resolvedPath;

    fs.readFile(targetPath, (readErr, data) => {
      if (readErr) {
        send(res, 404, "Not found.");
        return;
      }

      const ext = path.extname(targetPath).toLowerCase();
      const type = mimeTypes[ext] || "application/octet-stream";
      res.writeHead(200, {
        "Content-Type": type,
        "Cache-Control": "no-store",
      });
      res.end(data);
    });
  });
});

server.listen(port, () => {
  const modeLabel = isDevMode ? "dev" : "start";
  console.log(
    `[${modeLabel}] MANSORY showroom served at http://localhost:${port}`,
  );
});
