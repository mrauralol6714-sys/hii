// Cloudflare Worker: menu at "/" and a proxy that serves the chosen site at the root,
// so every link, script and image path on the site works exactly as it normally would.

const SITES = {
  duckmath: 'https://duckmath.org',
  cloud: 'https://ixlisfun.b-cdn.net',
  mc: 'https://mantle-menu.pages.dev',
};

const HOME = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#efe9ff">
<title>What site do you want?</title>
<style>
  :root{--paper:#efe9ff;--ink:#1d1636;--yellow:#ffd23f;--sky:#7cc8ff;--green:#8fdb6a;--coral:#ff6b81}
  *{box-sizing:border-box}
  html,body{height:100%;margin:0}
  body{background-color:var(--paper);
    background-image:radial-gradient(rgba(29,22,54,.13) 1.5px,transparent 1.5px);background-size:22px 22px;
    color:var(--ink);font-family:"Avenir Next","Nunito","Segoe UI Variable","Trebuchet MS",system-ui,sans-serif;overflow:hidden}
  #bg{position:fixed;inset:0;z-index:0;overflow:hidden}
  .shape{position:absolute;border:3px solid var(--ink);opacity:.85;animation:drift 6s ease-in-out infinite alternate}
  @keyframes drift{from{transform:translateY(0) rotate(0)}to{transform:translateY(-24px) rotate(28deg)}}

  .layer{position:fixed;inset:0;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:calc(24px + env(safe-area-inset-top,0px)) 24px calc(24px + env(safe-area-inset-bottom,0px));text-align:center;
    transition:opacity .55s,transform .55s,visibility 0s;overflow-y:auto}
  .layer.hide{opacity:0;visibility:hidden;pointer-events:none;transform:scale(1.05);transition:opacity .55s,transform .55s,visibility 0s .55s}
  .inner{width:100%;max-width:460px}

  .btn{font:inherit;font-weight:800;font-size:1.15rem;color:var(--ink);background:var(--coral);cursor:pointer;
    border:3px solid var(--ink);border-radius:18px;padding:16px 34px;box-shadow:0 6px 0 var(--ink);transition:transform .1s,box-shadow .1s}
  .btn:hover{transform:translateY(-2px);box-shadow:0 8px 0 var(--ink)}
  .btn:active{transform:translateY(6px);box-shadow:0 0 0 var(--ink)}
  .ghost{font:inherit;font-weight:700;color:var(--ink);background:none;border:0;cursor:pointer;opacity:.7;padding:10px 14px}
  :focus-visible{outline:4px solid var(--ink);outline-offset:4px}

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
  #splash:not(.live) .inner *{opacity:0;animation:none!important}

  /* splash */
  .fan{position:relative;height:130px;margin-bottom:18px}
  .tile{position:absolute;left:50%;top:18px;width:96px;height:96px;margin-left:-48px;border:3px solid var(--ink);border-radius:26px;
    box-shadow:0 6px 0 var(--ink);display:grid;place-items:center;animation:fan 1s cubic-bezier(.2,1.25,.3,1) both}
  .tile svg{width:62px;height:62px}
  .t1{background:var(--yellow);--x:-88px;--r:-12deg;animation-delay:.1s}
  .t2{background:var(--sky);--x:0px;--r:0deg;top:6px;animation-delay:.3s}
  .t3{background:var(--green);--x:88px;--r:12deg;animation-delay:.2s}
  @keyframes fan{from{transform:translateX(0) translateY(-80px) rotate(0) scale(.5);opacity:0}
    to{transform:translateX(var(--x)) rotate(var(--r)) scale(1);opacity:1}}
  .word{font-size:clamp(3.2rem,16vw,5.2rem);font-weight:900;letter-spacing:-.04em;line-height:1;margin:6px 0 10px}
  .word span{display:inline-block;animation:letter .6s cubic-bezier(.2,1.5,.3,1) both}
  @keyframes letter{from{opacity:0;transform:translateY(44px) scale(.5) rotate(-8deg)}to{opacity:1;transform:none}}
  .sub{font-size:1.1rem;opacity:.72;margin:0 0 26px;animation:letter .6s 1.1s both}
  .bar{width:200px;height:16px;margin:0 auto;border:3px solid var(--ink);border-radius:99px;overflow:hidden;background:#fff;animation:letter .5s 1.2s both}
  .bar i{display:block;height:100%;width:0;background:var(--coral);animation:fill 2.2s 1.2s ease-in-out forwards}
  @keyframes fill{to{width:100%}}
  .skip{position:absolute;top:calc(14px + env(safe-area-inset-top,0px));right:14px}

  /* slider */
  .track{display:flex;width:100%;max-width:520px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
  .track::-webkit-scrollbar{display:none}
  .slide{flex:none;width:100%;scroll-snap-align:center;padding:0 10px}
  .art{width:190px;height:190px;margin:0 auto 30px;border:3px solid var(--ink);border-radius:44px;box-shadow:0 8px 0 var(--ink);
    display:grid;place-items:center;animation:bob 3s ease-in-out infinite}
  .art svg{width:120px;height:120px}
  @keyframes bob{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-12px) rotate(3deg)}}
  .slide h2{font-size:clamp(2rem,8vw,2.7rem);margin:0 0 10px;font-weight:900;letter-spacing:-.03em;line-height:1.05}
  .slide p{font-size:1.1rem;opacity:.75;margin:0 auto;max-width:300px}
  .dots{display:flex;gap:8px;justify-content:center;margin:30px 0 24px}
  .dots i{width:12px;height:12px;border-radius:99px;border:3px solid var(--ink);background:#fff;transition:width .3s,background .3s}
  .dots i.on{width:34px;background:var(--coral)}

  /* picker */
  h3{font-size:clamp(2rem,8vw,2.6rem);line-height:1.05;margin:0 0 24px;font-weight:900;letter-spacing:-.02em}
  .options{display:flex;flex-direction:column;gap:18px}
  .card{position:relative;overflow:hidden;display:flex;align-items:center;gap:16px;text-align:left;padding:14px 18px 14px 14px;color:var(--ink);
    text-decoration:none;border:3px solid var(--ink);border-radius:24px;box-shadow:0 6px 0 var(--ink);
    opacity:0;transition:transform .1s,box-shadow .1s}
  .show .card{animation:cardin .55s var(--d) cubic-bezier(.2,1.25,.3,1) both}
  @keyframes cardin{from{opacity:0;transform:translateY(40px) scale(.9) rotate(-2deg)}to{opacity:1;transform:none}}
  .card:hover{transform:translateY(-3px);box-shadow:0 9px 0 var(--ink)}
  .card:active{transform:translateY(6px);box-shadow:0 0 0 var(--ink)}
  .card::after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:rgba(255,255,255,.45);transform:skewX(-20deg);transition:left .6s}
  .card:hover::after{left:130%}
  .ico{flex:none;width:68px;height:68px;border:3px solid var(--ink);border-radius:18px;background:rgba(255,255,255,.55);display:grid;place-items:center}
  .ico svg{width:46px;height:46px}
  .name{font-weight:900;font-size:1.3rem;line-height:1.15}
  .desc{font-size:.95rem;opacity:.75;margin-top:3px}
  .c1{background:var(--yellow)}.c2{background:var(--sky)}.c3{background:var(--green)}
  @media (prefers-reduced-motion:reduce){*{animation:none!important}.tile{transform:translateX(var(--x)) rotate(var(--r))}.bar i{width:100%}.card{opacity:1}}
</style></head><body>

<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <symbol id="duck" viewBox="0 0 48 48" stroke="#1d1636" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
    <ellipse cx="22" cy="31" rx="15" ry="10" fill="#fff"/><circle cx="32" cy="17" r="9" fill="#fff"/>
    <path d="M39 16l8 3-8 4z" fill="#ff8a3d"/><circle cx="34" cy="15" r="1.8" fill="#1d1636" stroke="none"/></symbol>
  <symbol id="cloud" viewBox="0 0 48 48" stroke="#1d1636" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
    <path d="M13 37a8 8 0 0 1-1-15.9A11 11 0 0 1 33 18a9.5 9.5 0 0 1 2 19z" fill="#fff"/></symbol>
  <symbol id="cube" viewBox="0 0 48 48" stroke="#1d1636" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
    <polygon points="24,6 41,15 24,24 7,15" fill="#fff"/><polygon points="7,15 24,24 24,43 7,34" fill="#d3f2bf"/>
    <polygon points="41,15 24,24 24,43 41,34" fill="#a8dd8a"/></symbol>
</defs></svg>

<div id="bg" aria-hidden="true"></div>

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

<section class="layer" id="splash">
  <div class="inner">
    <div class="fan" aria-hidden="true">
      <div class="tile t1"><svg><use href="#duck"/></svg></div>
      <div class="tile t3"><svg><use href="#cube"/></svg></div>
      <div class="tile t2"><svg><use href="#cloud"/></svg></div>
    </div>
    <div class="word" id="word" aria-label="Welcome"></div>
    <p class="sub">Let's find your site.</p>
    <div class="bar"><i></i></div>
  </div>
  <button class="ghost skip" id="skip1">Skip</button>
</section>

<section class="layer hide" id="slides">
  <button class="ghost skip" id="skip2">Skip</button>
  <div class="track" id="track">
    <div class="slide"><div class="art" style="background:var(--yellow)"><svg><use href="#duck"/></svg></div>
      <h2>Math that sticks</h2><p>Practice and study with DuckMath.</p></div>
    <div class="slide"><div class="art" style="background:var(--sky)"><svg><use href="#cloud"/></svg></div>
      <h2>Games on tap</h2><p>Jump into browser games with Cloud Games.</p></div>
    <div class="slide"><div class="art" style="background:var(--green)"><svg><use href="#cube"/></svg></div>
      <h2>Build anything</h2><p>Minecraft and more, one tap away.</p></div>
  </div>
  <div class="dots" id="dots"><i class="on"></i><i></i><i></i></div>
  <button class="btn" id="next">Next</button>
</section>

<section class="layer hide" id="picker">
  <div class="inner">
    <h3>What site do you want?</h3>
    <div class="options">
      <a class="card c1" style="--d:.05s" href="/__go/duckmath"><span class="ico"><svg><use href="#duck"/></svg></span>
        <span><div class="name">DuckMath</div><div class="desc">Math practice and study tools</div></span></a>
      <a class="card c2" style="--d:.17s" href="/__go/cloud"><span class="ico"><svg><use href="#cloud"/></svg></span>
        <span><div class="name">Cloud Games</div><div class="desc">Browser games, ready to play</div></span></a>
      <a class="card c3" style="--d:.29s" href="/__go/mc"><span class="ico"><svg><use href="#cube"/></svg></span>
        <span><div class="name">Unblocked + Minecraft</div><div class="desc">Minecraft and more</div></span></a>
    </div>
    <button class="ghost" id="back" style="margin-top:24px">Replay intro</button>
  </div>
</section>

<script>
  var $=function(id){return document.getElementById(id)};
  // floating background shapes
  [[8,12,46,'#ffd23f','50%',0],[86,8,34,'#7cc8ff','12px',1.2],[12,76,38,'#8fdb6a','12px',.6],[88,72,54,'#ff6b81','50%',1.8],
   [50,93,26,'#ffd23f','50%',.9],[74,38,22,'#8fdb6a','50%',2.2],[26,32,20,'#7cc8ff','6px',1.5],[60,6,18,'#ff6b81','50%',2.6]]
  .forEach(function(s){var e=document.createElement('i');e.className='shape';
    e.style.cssText='left:'+s[0]+'%;top:'+s[1]+'%;width:'+s[2]+'px;height:'+s[2]+'px;background:'+s[3]+';border-radius:'+s[4]+';animation-delay:-'+s[5]+'s';
    $('bg').appendChild(e)});
  // letter-by-letter welcome
  'Welcome'.split('').forEach(function(c,n){var s=document.createElement('span');s.textContent=c;s.style.animationDelay=(.45+n*.07)+'s';$('word').appendChild(s)});

  var layers=['splash','slides','picker'],timer;
  function show(name){
    clearTimeout(timer);
    layers.forEach(function(l){$(l).classList.toggle('hide',l!==name)});
    if(name==='picker'){var p=$('picker');p.classList.remove('show');void p.offsetWidth;p.classList.add('show')}
  }
  var track=$('track'),dots=$('dots').children,idx=0;
  track.addEventListener('scroll',function(){
    idx=Math.round(track.scrollLeft/track.clientWidth);
    for(var i=0;i<dots.length;i++)dots[i].classList.toggle('on',i===idx);
    $('next').textContent=idx===dots.length-1?'Choose a site':'Next';
  });
  $('next').onclick=function(){
    if(idx<dots.length-1)track.scrollBy({left:track.clientWidth,behavior:'smooth'});else show('picker');
  };
  $('skip1').onclick=$('skip2').onclick=function(){show('picker')};
  $('back').onclick=function(){var sp=$('splash');sp.classList.remove('live');void sp.offsetWidth;sp.classList.add('live');track.scrollLeft=0;show('splash');timer=setTimeout(function(){show('slides')},3800)};

  // cinematic opening: black screen, eye opens, we fall into the pupil, then the world appears
  var eye=$('eye'),eyeDone=false,eyeTimer;
  function endEye(){
    if(eyeDone)return;eyeDone=true;clearTimeout(eyeTimer);
    $('splash').classList.add('live');eye.classList.add('gone');
    setTimeout(function(){$('bt').classList.add('out');$('bb').classList.add('out')},350);
    clearTimeout(timer);timer=setTimeout(function(){show('slides')},4200);
  }
  $('skipEye').onclick=eye.onclick=endEye;
  if(location.hash==='#pick'){
    eyeDone=true;eye.classList.add('gone');$('bt').classList.add('out');$('bb').classList.add('out');show('picker');
  }else if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){endEye()}
  else{eyeTimer=setTimeout(endEye,6700)}
</script>
</body></html>`;

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
    const cookie = rawCookie.split(/;\s*/).filter((c) => c && !c.startsWith('site=')).join('; ');
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
      out.delete('content-encoding');
      out.delete('content-length');
      const shim =
        '(function(){var O=' + JSON.stringify(origin) + ';' +
        'function f(u){return typeof u==="string"&&u.indexOf(O)===0?(u.slice(O.length)||"/"):u}' +
        'var of=window.fetch;window.fetch=function(i,o){if(typeof i==="string")i=f(i);return of.call(this,i,o)};' +
        'var ox=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){arguments[1]=f(u);return ox.apply(this,arguments)};' +
        'var ow=window.open;window.open=function(u){if(u&&u!=="about:blank"){location.href=f(String(u));return window}return ow.apply(this,arguments)};' +
        'if(navigator.serviceWorker){navigator.serviceWorker.register=function(){return Promise.resolve({})}}})();';
      const attrs = ['href', 'src', 'action', 'poster', 'data-src'];
      return new HTMLRewriter()
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
            if ((el.getAttribute('http-equiv') || '').toLowerCase() === 'content-security-policy') el.remove();
          },
        })
        .on('head', { element(el) { el.prepend('<script>' + shim + '</script>', { html: true }); } })
        .on('body', {
          element(el) {
            el.append(
              '<a href="/__menu#pick" style="position:fixed;left:10px;bottom:calc(10px + env(safe-area-inset-bottom,0px));z-index:2147483647;background:#ff6b81;color:#1d1636;border:2px solid #1d1636;font:800 13px system-ui,sans-serif;padding:8px 14px;border-radius:999px;text-decoration:none;opacity:.9">Menu</a>',
              { html: true }
            );
          },
        })
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
