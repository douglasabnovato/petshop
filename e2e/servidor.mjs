/* Servidor estático mínimo para os testes: serve out/ em /petshop/, como no GitHub Pages */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const raiz = join(process.cwd(), "out");
const base = "/petshop";
const tipos = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2", ".json": "application/json", ".txt": "text/plain" };

createServer(async (req, res) => {
  const url = decodeURIComponent((req.url || "/").split("?")[0]);
  if (!url.startsWith(base)) { res.writeHead(404).end(); return; }
  let arq = normalize(join(raiz, url.slice(base.length)));
  if (!arq.startsWith(raiz)) { res.writeHead(403).end(); return; }
  try {
    if ((await stat(arq)).isDirectory()) arq = join(arq, "index.html");
    res.writeHead(200, { "content-type": tipos[extname(arq)] || "application/octet-stream" }).end(await readFile(arq));
  } catch {
    res.writeHead(404).end();
  }
}).listen(Number(process.env.PORT || 4174));
/* Fim de servidor.mjs */
