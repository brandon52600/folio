// Optional static preview server. GitHub Pages serves dist directly.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root=resolve('dist'), base=process.env.BASE_PATH || '/';
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webmanifest':'application/manifest+json','.json':'application/json','.svg':'image/svg+xml','.png':'image/png'};
const server=http.createServer(async(req,res)=>{
  const path=new URL(req.url,'http://localhost').pathname;
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
  if(!path.startsWith(base)){res.writeHead(404);return res.end('Not found');}
  const relative=path.slice(base.length)||'index.html';
  const target=resolve(root,relative);
  if(!target.startsWith(root+sep)||relative.split('/').some(s=>s.startsWith('.'))){res.writeHead(404);return res.end('Not found');}
  try{
    const body=await readFile(target);
    res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream','Cache-Control':relative.startsWith('assets/')?'public,max-age=31536000,immutable':'no-cache','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','Permissions-Policy':'camera=(), microphone=(), geolocation=()'});
    res.end(req.method==='HEAD'?undefined:body);
  }catch{res.writeHead(404);res.end('Not found');}
});
const port=Number(process.env.PORT||5173), host=process.env.HOST||'127.0.0.1';
server.listen(port,host,()=>console.log(`Folio is ready at http://${host}:${port}${base}`));
