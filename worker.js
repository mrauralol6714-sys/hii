// Cloudflare Worker: serves the menu at "/" and proxies each site under its own path.
// /duckmath/ -> https://duckmath.org
// /cloud/    -> https://ixlisfun.b-cdn.net
// /mc/       -> https://mantle-menu.pages.dev

const SITES = {
  duckmath: 'https://duckmath.org',
  cloud: 'https://ixlisfun.b-cdn.net',
  mc: 'https://mantle-menu.pages.dev',
};

const HOME = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>What site do you want?</title>
<style>
  :root{--bg:#f3f6fb;--surface:#fff;--ink:#14213d;--muted:#5c6b8a;--line:#d5dcea;--accent:#2f5bea;--accent-ink:#fff}
  @media (prefers-color-scheme:dark){:root{--bg:#0e1424;--surface:#172038;--ink:#eef2fb;--muted:#98a6c6;--line:#28345a;--accent:#6f93ff;--accent-ink:#0e1424}}
  *{box-sizing:border-box}
  html,body{height:100%;margin:0}
  body{background:var(--bg);color:var(--ink);font-family:"Trebuchet MS","Segoe UI",system-ui,sans-serif;display:flex;align-items:center;justify-content:center;padding:24px}
  .screen{width:100%;max-width:440px;text-align:center}
  h1{font-size:clamp(2.4rem,9vw,3.6rem);margin:0 0 12px;letter-spacing:-.02em;animation:rise .9s ease both}
  p{color:var(--muted);margin:0 0 32px;animation:rise .9s .2s ease both}
  @keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  button,a.option{font:inherit;cursor:pointer;border-radius:14px;padding:16px 22px;width:100%;font-size:1.05rem;transition:transform .12s ease}
  button:focus-visible,a:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
  .primary{background:var(--accent);color:var(--accent-ink);border:0;font-weight:700}
  #picker{display:none}
  h2{font-size:1.9rem;margin:0 0 24px}
  .options{display:flex;flex-direction:column;gap:12px}
  a.option{display:block;text-decoration:none;background:var(--surface);color:var(--ink);border:2px solid var(--line);font-weight:600}
  a.option:hover{border-color:var(--accent);transform:translateY(-2px)}
  .back{margin-top:20px;width:auto;background:none;border:0;color:var(--muted);font-size:.95rem;padding:8px 12px}
  @media (prefers-reduced-motion:reduce){h1,p{animation:none}}
</style></head><body>
<main class="screen" id="intro">
  <h1>Welcome</h1>
  <p>Pick a site and jump right in.</p>
  <button class="primary" id="start">Get started</button>
</main>
<main class="screen" id="picker">
  <h2>What site do you want?</h2>
  <div class="options">
    <a class="option" href="/duckmath/">DuckMath</a>
    <a class="option" href="/cloud/">Cloud Games</a>
    <a class="option" href="/mc/">Unblocked + Minecraft</a>
  </div>
  <button class="back" id="back">Back</button>
</main>
<script>
  var i=document.getElementById('intro'),p=document.getElementById('picker');
  document.getElementById('start').onclick=function(){i.style.display='none';p.style.display='block'};
  document.getElementById('back').onclick=function(){p.style.display='none';i.style.display='block'};
</script>
</body></html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const key = url.pathname.split('/').filter(Boolean)[0];

    if (!key) {
      return new Response(HOME, { headers: { 'content-type': 'text/html;charset=utf-8' } });
    }
    const origin = SITES[key];
    if (!origin) return new Response('Not found', { status: 404 });

    const prefix = '/' + key;
    if (url.pathname === prefix) return Response.redirect(url.origin + prefix + '/', 301);

    const host = new URL(origin).host;
    const rest = url.pathname.slice(prefix.length) || '/';
    const target = origin + rest + url.search;

    // Turn a URL pointing at the real site into one pointing at our proxy path.
    const fix = (v) => {
      if (!v) return v;
      if (v.startsWith(origin)) return prefix + v.slice(origin.length);
      if (v.startsWith('//' + host)) return prefix + v.slice(2 + host.length);
      if (v.startsWith('/') && !v.startsWith('//') && !v.startsWith(prefix + '/')) return prefix + v;
      return v;
    };

    // Send the request on to the real site.
    const headers = new Headers(request.headers);
    headers.set('Referer', origin + '/');
    if (headers.has('Origin')) headers.set('Origin', origin);
    const hasBody = !['GET', 'HEAD'].includes(request.method);
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body: hasBody ? request.body : undefined,
      redirect: 'manual',
    });

    // Clean up the response headers.
    const out = new Headers(upstream.headers);
    [
      'content-security-policy',
      'content-security-policy-report-only',
      'x-frame-options',
      'cross-origin-opener-policy',
      'cross-origin-embedder-policy',
    ].forEach((h) => out.delete(h));

    const loc = out.get('location');
    if (loc) out.set('location', fix(loc));

    const cookies = upstream.headers.getSetCookie ? upstream.headers.getSetCookie() : [];
    if (cookies.length) {
      out.delete('set-cookie');
      cookies.forEach((c) =>
        out.append(
          'set-cookie',
          c.replace(/;\s*domain=[^;]*/i, '').replace(/;\s*path=[^;]*/i, '') + '; Path=' + prefix
        )
      );
    }

    const type = (out.get('content-type') || '').toLowerCase();

    // HTML: rewrite links and add a small script + menu button.
    if (type.includes('text/html')) {
      const shim =
        '(function(){var P=' + JSON.stringify(prefix) + ',O=' + JSON.stringify(origin) + ';' +
        'function f(u){if(typeof u!=="string")return u;' +
        'if(u.indexOf(O)===0)return P+u.slice(O.length);' +
        'if(u[0]==="/"&&u[1]!=="/"&&u.indexOf(P+"/")!==0)return P+u;return u}' +
        'var of=window.fetch;window.fetch=function(i,o){if(typeof i==="string")i=f(i);return of.call(this,i,o)};' +
        'var ox=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){arguments[1]=f(u);return ox.apply(this,arguments)};' +
        'var ow=window.open;window.open=function(u){if(u&&u!=="about:blank"){location.href=f(String(u));return window}return ow.apply(this,arguments)};})();';

      const attrs = ['href', 'src', 'action', 'poster', 'data-src'];
      const rewritten = new HTMLRewriter()
        .on('*', {
          element(el) {
            for (const a of attrs) {
              const v = el.getAttribute(a);
              if (v) {
                const nv = fix(v);
                if (nv !== v) el.setAttribute(a, nv);
              }
            }
            if (el.hasAttribute('integrity')) el.removeAttribute('integrity');
          },
        })
        .on('meta', {
          element(el) {
            const eq = (el.getAttribute('http-equiv') || '').toLowerCase();
            if (eq === 'content-security-policy') el.remove();
          },
        })
        .on('head', {
          element(el) {
            el.prepend('<script>' + shim + '</script>', { html: true });
          },
        })
        .on('body', {
          element(el) {
            el.append(
              '<a href="/" style="position:fixed;left:8px;bottom:8px;z-index:2147483647;background:#2f5bea;color:#fff;font:600 13px system-ui,sans-serif;padding:8px 12px;border-radius:999px;text-decoration:none;opacity:.85">Menu</a>',
              { html: true }
            );
          },
        })
        .transform(new Response(upstream.body, { status: upstream.status, headers: out }));
      return rewritten;
    }

    // CSS: fix root-relative url(...) references.
    if (type.includes('text/css')) {
      const css = await upstream.text();
      const fixed = css
        .replace(/url\((['"]?)\/(?!\/)/g, (m, q) => 'url(' + q + prefix + '/')
        .split(origin).join(prefix);
      out.delete('content-length');
      return new Response(fixed, { status: upstream.status, headers: out });
    }

    // Everything else (images, scripts, data) passes straight through.
    return new Response(upstream.body, { status: upstream.status, headers: out });
  },
};
