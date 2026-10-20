const SITES = {
  duckmath: 'https://d2gve52fz9syn8.cloudfront.net',
  smart: 'https://smartlearningmath.b-cdn.net',
  secret: 'https://dulo.mov',
};

const HOME = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#07090d">
<title>Where to?</title>
<style>
  :root{--bg:#07090d;--ink:#eceae4;--mut:rgba(236,234,228,.6);--amber:#e6b567;
    --serif:"Iowan Old Style","Palatino Linotype","Book Antiqua",Georgia,serif;
    --sans:"Inter","Segoe UI Variable","Helvetica Neue",system-ui,sans-serif}
  *{box-sizing:border-box}
  html,body{height:100%;margin:0}
  body{background:var(--bg);color:var(--ink);font-family:var(--sans);overflow:hidden}
  #bg{position:fixed;inset:0;z-index:0;overflow:hidden}
  .fog{position:absolute;width:70vmax;height:70vmax;border-radius:50%;filter:blur(70px);animation:fog 18s ease-in-out infinite alternate}
  .f1{background:rgba(52,130,150,.32);top:-38vmax;left:-24vmax}
  .f2{background:rgba(230,181,103,.13);bottom:-42vmax;right:-28vmax;animation-delay:-9s}
  @keyframes fog{to{transform:translate(9vmax,6vmax) scale(1.15)}}
  .grain{position:fixed;inset:0;z-index:3;pointer-events:none;opacity:.09;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.55'/></svg>")}

  .layer{position:fixed;inset:0;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:calc(24px + env(safe-area-inset-top,0px)) 24px calc(24px + env(safe-area-inset-bottom,0px));text-align:center;
    transition:opacity .8s,transform .8s,visibility 0s;overflow-y:auto;overflow-x:hidden}
  .layer.hide{opacity:0;visibility:hidden;pointer-events:none;transform:scale(1.03);transition:opacity .8s,transform .8s,visibility 0s .8s}
  .inner{width:100%;max-width:460px}
  .ghost{font:inherit;font-size:.85rem;letter-spacing:.12em;color:var(--ink);background:none;border:0;cursor:pointer;opacity:.55;padding:10px 14px}
  .ghost:hover{opacity:.9}
  :focus-visible{outline:2px solid var(--amber);outline-offset:4px}

  /* cinematic eye opening */
  #eye{position:fixed;inset:0;z-index:5;background:#000;display:grid;place-items:center;overflow:hidden;transition:opacity .9s,visibility 0s}
  #eye.gone{opacity:0;visibility:hidden;pointer-events:none;transition:opacity .9s,visibility 0s .9s}
  .eyewrap{width:min(78vw,380px);animation:dive 1.2s 5.5s cubic-bezier(.75,0,1,.55) both}
  @keyframes dive{from{transform:scale(1)}to{transform:scale(55)}}
  .eyesvg{width:100%;display:block;filter:drop-shadow(0 0 16px rgba(124,200,255,.5))}
  .lash{stroke-dasharray:720;stroke-dashoffset:720;animation:draw 1s .3s ease-out forwards}
  @keyframes draw{to{stroke-dashoffset:0}}
  .lidT{animation:lidT 4.2s .6s both}.lidB{animation:lidB 4.2s .6s both}
  @keyframes lidT{0%,18%{transform:translateY(0);animation-timing-function:cubic-bezier(.6,0,.2,1)}48%,74%{transform:translateY(-100px)}80%{transform:translateY(0)}88%,100%{transform:translateY(-100px)}}
  @keyframes lidB{0%,18%{transform:translateY(0);animation-timing-function:cubic-bezier(.6,0,.2,1)}48%,74%{transform:translateY(100px)}80%{transform:translateY(0)}88%,100%{transform:translateY(100px)}}
  .iris{animation:look 3.2s 2.3s ease-in-out both}
  @keyframes look{0%{transform:translateX(0)}30%{transform:translateX(-24px)}65%{transform:translateX(24px)}100%{transform:translateX(0)}}
  .vig{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,.85) 100%)}
  #skipEye{position:absolute;bottom:calc(22px + env(safe-area-inset-bottom,0px));color:#fff;opacity:.5}
  .cbar{position:fixed;left:0;right:0;height:11vh;background:#000;z-index:4;transition:transform 1.5s cubic-bezier(.7,0,.2,1)}
  .cbar.t{top:0}.cbar.b{bottom:0}.cbar.t.out{transform:translateY(-100%)}.cbar.b.out{transform:translateY(100%)}
  #intro:not(.live) .inner *{opacity:0;animation:none!important}


  /* intro */
  .rule{width:0;height:1px;background:var(--amber);margin:0 auto 30px;animation:rule 1.6s .2s ease-out forwards}
  @keyframes rule{to{width:120px}}
  .title{font-family:var(--serif);font-weight:400;text-transform:uppercase;font-size:clamp(1.8rem,8.5vw,3.6rem);
    letter-spacing:.42em;margin:0 -.42em 0 0;animation:reveal 2.4s .5s cubic-bezier(.2,.7,.2,1) both}
  @keyframes reveal{from{opacity:0;letter-spacing:.8em;filter:blur(14px)}to{opacity:1;letter-spacing:.42em;filter:blur(0)}}
  .tag{margin-top:26px;font-size:.75rem;letter-spacing:.32em;text-transform:uppercase;color:var(--mut);animation:fade 1.6s 2.1s both}
  @keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .skip{position:absolute;bottom:calc(22px + env(safe-area-inset-bottom,0px))}

  /* picker */
  h3{font-family:var(--serif);font-weight:400;font-size:clamp(2.1rem,9vw,3rem);margin:0 0 8px;letter-spacing:-.01em}
  .lead{color:var(--mut);margin:0 0 30px}
  .options{display:flex;flex-direction:column;gap:14px}
  .card{display:flex;align-items:center;gap:16px;text-align:left;padding:18px;text-decoration:none;color:var(--ink);
    background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.12);
    border-radius:16px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);opacity:0;
    transition:transform .25s,border-color .25s,box-shadow .25s,background .25s}
  .show .card{animation:cardin .9s var(--d) cubic-bezier(.2,.7,.2,1) both}
  @keyframes cardin{from{opacity:0;transform:translateY(24px);filter:blur(6px)}to{opacity:1;transform:none;filter:blur(0)}}
  .card:hover{border-color:var(--amber);transform:translateY(-2px);box-shadow:0 14px 40px -18px rgba(230,181,103,.5);
    background:linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.03))}
  .card:active{transform:scale(.985)}
  .ico{flex:none;width:48px;height:48px;border-radius:12px;border:1px solid rgba(255,255,255,.14);display:grid;place-items:center;color:var(--amber)}
  .ico svg{width:24px;height:24px}
  .name{font-family:var(--serif);font-size:1.3rem}
  .desc{font-size:.9rem;color:var(--mut);margin-top:3px}
  .secret{border-style:dashed;border-color:rgba(230,181,103,.35)}
  .again{margin-top:26px}
  @media (prefers-reduced-motion:reduce){*{animation:none!important}.card{opacity:1}.rule{width:120px}}
</style></head><body>

<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <symbol id="i-math" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/></symbol>
  <symbol id="i-game" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 8h10a4 4 0 0 1 4 4.2l-.6 4a2.2 2.2 0 0 1-3.8 1.2L15 15.5H9L7.4 17.4a2.2 2.2 0 0 1-3.8-1.2l-.6-4A4 4 0 0 1 7 8z"/><path d="M8.5 10.8v2.4M7.3 12h2.4M15.5 11.4h.01M17.2 12.6h.01"/></symbol>
  <symbol id="i-learn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 9l9-4.5L21 9l-9 4.5L3 9z"/><path d="M7 11.5V16c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-4.5M21 9v5"/></symbol>
  <symbol id="i-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3M12 15v2"/></symbol>
</defs></svg>

<div id="bg" aria-hidden="true"><div class="fog f1"></div><div class="fog f2"></div></div>
<div class="grain" aria-hidden="true"></div>

<div class="cbar t" id="bt"></div><div class="cbar b" id="bb"></div>
<section id="eye" aria-hidden="true">
  <div class="eyewrap">
    <svg class="eyesvg" viewBox="0 0 300 160">
      <defs><clipPath id="ec"><path d="M10 80Q150 -12 290 80Q150 172 10 80Z"/></clipPath>
        <radialGradient id="ig"><stop offset="55%" stop-color="#4fa9e8"/><stop offset="100%" stop-color="#7cc8ff"/></radialGradient></defs>
      <g clip-path="url(#ec)">
        <rect width="300" height="160" fill="#fff"/>
        <g class="iris"><circle cx="150" cy="80" r="46" fill="url(#ig)"/><circle cx="150" cy="80" r="46" fill="none" stroke="#1d1636" stroke-width="4"/>
          <circle cx="150" cy="80" r="18" fill="#000"/><circle cx="138" cy="67" r="6" fill="#fff" opacity=".9"/></g>
        <rect class="lidT" x="0" y="-8" width="300" height="88" fill="#000"/>
        <rect class="lidB" x="0" y="80" width="300" height="88" fill="#000"/>
      </g>
      <path class="lash" d="M10 80Q150 -12 290 80Q150 172 10 80Z" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="vig"></div>
  <button class="ghost" id="skipEye">Skip</button>
</section>

<section class="layer" id="intro">
  <div class="inner">
    <div class="rule"></div>
    <h1 class="title">Welcome</h1>
    <div class="tag">Choose your destination</div>
  </div>
  <button class="ghost skip" id="skip">Skip</button>
</section>

<section class="layer hide" id="picker">
  <div class="inner">
    <h3>Where to?</h3>
    <p class="lead">Pick a site to get started.</p>
    <div class="options">
      <a class="card" style="--d:.05s" href="/__go/duckmath"><span class="ico"><svg><use href="#i-game"/></svg></span>
        <span><div class="name">DuckMath</div><div class="desc">Fun games</div></span></a>
      <a class="card" style="--d:.17s" href="/__go/smart"><span class="ico"><svg><use href="#i-learn"/></svg></span>
        <span><div class="name">Smart Learning</div><div class="desc">Math and learning tools</div></span></a>
      <a class="card secret" style="--d:.29s" href="/__go/secret"><span class="ico"><svg><use href="#i-lock"/></svg></span>
        <span><div class="name">Secret</div><div class="desc">Shh. Tap to find out.</div></span></a>
    </div>
    <button class="ghost again" id="again">Replay intro</button>
  </div>
</section>

<script>
  var $=function(id){return document.getElementById(id)};
  var layers=['intro','picker'],timer;
  function show(name){
    clearTimeout(timer);
    layers.forEach(function(l){$(l).classList.toggle('hide',l!==name)});
    if(name==='picker'){var p=$('picker');p.classList.remove('show');void p.offsetWidth;p.classList.add('show')}
  }
  $('skip').onclick=function(){show('picker')};
  $('again').onclick=function(){var n=$('intro');n.classList.remove('live');void n.offsetWidth;n.classList.add('live');show('intro');timer=setTimeout(function(){show('picker')},5200)};

  // cinematic opening: black screen, eye opens, we fall into the pupil, then the title appears
  var eye=$('eye'),eyeDone=false,eyeTimer;
  function bars(){setTimeout(function(){$('bt').classList.add('out');$('bb').classList.add('out')},350)}
  function endEye(){
    if(eyeDone)return;eyeDone=true;clearTimeout(eyeTimer);
    $('intro').classList.add('live');eye.classList.add('gone');bars();
    clearTimeout(timer);timer=setTimeout(function(){show('picker')},5200);
  }
  $('skipEye').onclick=eye.onclick=endEye;
  if(location.hash==='#pick'){eyeDone=true;eye.classList.add('gone');$('bt').classList.add('out');$('bb').classList.add('out');show('picker')}
  else if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){endEye()}
  else{eyeTimer=setTimeout(endEye,6700)}
</script>
</body></html>`;

const DEBUG_JS = String.raw`(function(){
if(window.__dbg)return;window.__dbg=1;
var errs=[],box;
function render(){var r=document.documentElement;if(!r)return;
 if(!box||!box.isConnected){box=document.createElement("div");
  box.style.cssText="position:fixed;top:0;left:0;right:0;max-height:45%;overflow:auto;z-index:2147483646;background:#300;color:#fff;font:11px monospace;padding:4px;white-space:pre-wrap;opacity:.92";
  r.appendChild(box)}
 box.textContent=(window.top===window?"TOP ":"FRAME ")+location.pathname+" | errors: "+errs.length+"\n"+errs.slice(-8).join("\n")}
function add(m){errs.push(String(m).slice(0,220));render()}
window.addEventListener("error",function(e){var t=e.target;
 if(t&&t!==window&&(t.src||t.href))add("LOAD FAIL "+(t.src||t.href));else add("ERR "+e.message+" @"+(e.filename||"")+":"+e.lineno)},true);
window.addEventListener("unhandledrejection",function(e){add("REJECT "+((e.reason&&e.reason.message)||e.reason))});
var f0=window.fetch;
window.fetch=function(i,o){var u=typeof i==="string"?i:(i&&i.url);
 return f0.call(this,i,o).then(function(r){if(!r.ok)add("HTTP "+r.status+" "+u);return r},function(e){add("FETCH FAIL "+u+" "+e.message);throw e})};
render();setInterval(render,1000);
})();`;

const STRIP = [
  'content-security-policy',
  'content-security-policy-report-only',
  'x-frame-options',
  'cross-origin-opener-policy',
  'cross-origin-embedder-policy',
  'cross-origin-resource-policy',
];

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Menu page (also forgets the chosen site).
    if (path === '/__menu') {
      return new Response(HOME, {
        headers: {
          'content-type': 'text/html;charset=utf-8',
          'set-cookie': 'site=; Path=/; Max-Age=0; Secure; SameSite=Lax',
          'clear-site-data': '"cache"',
        },
      });
    }
    if (path === '/__debug' || path === '/__debug/off') {
      const on = path === '/__debug';
      return new Response(null, {
        status: 302,
        headers: {
          location: '/',
          'set-cookie': 'dbg=' + (on ? '1; Max-Age=86400' : '; Max-Age=0') + '; Path=/; Secure; SameSite=Lax',
        },
      });
    }
    // Choose a site, remember it, and go to it.
    if (path.startsWith('/__go/')) {
      const key = path.slice(6);
      if (!SITES[key]) return new Response('Not found', { status: 404 });
      return new Response(null, {
        status: 302,
        headers: {
          location: '/',
          'set-cookie': 'site=' + key + '; Path=/; Max-Age=31536000; Secure; SameSite=Lax',
          'clear-site-data': '"cache"',
        },
      });
    }

    const rawCookie = request.headers.get('cookie') || '';
    const key = (rawCookie.match(/(?:^|;\s*)site=([a-z]+)/) || [])[1];
    const origin = SITES[key];
    if (!origin) {
      return new Response(HOME, { headers: { 'content-type': 'text/html;charset=utf-8' } });
    }

    const dbg = /(?:^|;\s*)dbg=1/.test(rawCookie);
    const host = new URL(origin).host;
    const target = origin + path + url.search;
    if (request.headers.get('upgrade') === 'websocket') return fetch(target, request);

    // Point absolute links to the real site back at this proxy.
    const fix = (v) => {
      if (!v) return v;
      if (v.startsWith(origin)) return v.slice(origin.length) || '/';
      if (v.startsWith('//' + host)) return v.slice(2 + host.length) || '/';
      return v;
    };

    // Forward the request (without our own "site" cookie).
    const headers = new Headers(request.headers);
    headers.set('Referer', origin + '/');
    if (headers.has('Origin')) headers.set('Origin', origin);
    const cookie = rawCookie.split(/;\s*/).filter((c) => c && !c.startsWith('site=') && !c.startsWith('dbg=')).join('; ');
    if (cookie) headers.set('cookie', cookie); else headers.delete('cookie');
    const hasBody = !['GET', 'HEAD'].includes(request.method);
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body: hasBody ? request.body : undefined,
      redirect: 'manual',
    });

    // Clean up the response headers.
    const out = new Headers(upstream.headers);
    STRIP.forEach((h) => out.delete(h));
    out.set('vary', 'Cookie');
    const loc = out.get('location');
    if (loc) out.set('location', fix(loc));
    const cookies = upstream.headers.getSetCookie ? upstream.headers.getSetCookie() : [];
    if (cookies.length) {
      out.delete('set-cookie');
      cookies.forEach((c) => out.append('set-cookie', c.replace(/;\s*domain=[^;]*/i, '')));
    }
    const type = (out.get('content-type') || '').toLowerCase();

    // HTML: fix absolute links, drop blockers, add helper script and Menu button.
    if (type.includes('text/html')) {
      if (Number(out.get('content-length')) > 2000000) {
        return new Response(upstream.body, { status: upstream.status, headers: out });
      }
      out.delete('content-encoding');
      out.delete('content-length');
      const shim =
        '(function(){var O=' + JSON.stringify(origin) + ';' +
        'function f(u){return typeof u==="string"&&u.indexOf(O)===0?(u.slice(O.length)||"/"):u}' +
        'var of=window.fetch;window.fetch=function(i,o){if(typeof i==="string")i=f(i);return of.call(this,i,o)};' +
        'var ox=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){arguments[1]=f(u);return ox.apply(this,arguments)};' +
        'var ow=window.open;window.open=function(u){if(u&&u!=="about:blank"){location.href=f(String(u));return window}return ow.apply(this,arguments)};' +
        'if(window.__shim)return;window.__shim=1;' +
        'function pp(C,p){try{var d=Object.getOwnPropertyDescriptor(C.prototype,p);if(!d||!d.set)return;Object.defineProperty(C.prototype,p,{get:d.get,set:function(v){d.set.call(this,f(v))},configurable:true,enumerable:d.enumerable})}catch(e){}}' +
        '[[HTMLIFrameElement,"src"],[HTMLScriptElement,"src"],[HTMLImageElement,"src"],[HTMLLinkElement,"href"],[HTMLAnchorElement,"href"],[HTMLSourceElement,"src"],[HTMLMediaElement,"src"],[HTMLEmbedElement,"src"]].forEach(function(x){pp(x[0],x[1])});' +
        'var sa=Element.prototype.setAttribute;Element.prototype.setAttribute=function(n,v){if(typeof v==="string"&&/^(src|href|action|data-src|poster)$/i.test(n))v=f(v);return sa.call(this,n,v)};' +
        'if(navigator.serviceWorker){navigator.serviceWorker.register=function(){return Promise.resolve({})}}' +
        'function mk(){if(document.getElementById("__menu")||!document.documentElement)return;var a=document.createElement("a");a.id="__menu";a.href="/__menu#pick";a.textContent="Menu";' +
        'a.style.cssText="position:fixed!important;left:10px!important;bottom:calc(10px + env(safe-area-inset-bottom,0px))!important;z-index:2147483647!important;display:block!important;visibility:visible!important;opacity:.9!important;pointer-events:auto!important;background:#ff6b81;color:#1d1636;border:2px solid #1d1636;font:800 13px system-ui,sans-serif;padding:8px 14px;border-radius:999px;text-decoration:none;margin:0;width:auto;height:auto";' +
        'document.documentElement.appendChild(a)}' +
        'if(window.top===window){mk();new MutationObserver(mk).observe(document.documentElement,{childList:true});setInterval(mk,800);document.addEventListener("DOMContentLoaded",mk)}})();';
      const tag = '<script>' + shim + (dbg ? DEBUG_JS : '') + '</script>';
      const rw = new HTMLRewriter();
      for (const a of ['href', 'src', 'action', 'poster', 'data-src']) {
        rw.on('[' + a + ']', {
          element(el) {
            const v = el.getAttribute(a);
            const nv = fix(v);
            if (nv !== v) el.setAttribute(a, nv);
          },
        });
      }
      rw.on('[integrity]', { element(el) { el.removeAttribute('integrity'); } });
      return rw
        .on('meta', {
          element(el) {
            if ((el.getAttribute('http-equiv') || '').toLowerCase() === 'content-security-policy') el.remove();
          },
        })
        .on('html', { element(el) { el.prepend(tag, { html: true }); } })
        .on('head', { element(el) { el.prepend(tag, { html: true }); } })
        .transform(new Response(upstream.body, { status: upstream.status, headers: out }));
    }

    // CSS: point absolute URLs back at this proxy.
    if (type.includes('text/css')) {
      const css = (await upstream.text()).split(origin).join('');
      out.delete('content-encoding');
      out.delete('content-length');
      return new Response(css, { status: upstream.status, headers: out });
    }

    // Everything else (images, scripts, data) passes straight through.
    return new Response(upstream.body, { status: upstream.status, headers: out });
  },
};
