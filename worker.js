const BLOCK = /^(localhost|.*\.local|.*\.internal)$|^(10\.|127\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|0\.)/;
const ADS = ['doubleclick', 'googlesyndication', 'googleadservices', 'adservice', 'amazon-adsystem', 'taboola', 'outbrain', 'adnxs', 'pubmatic', 'criteo', 'rubiconproject', 'scorecardresearch'];
const STRIP = ['content-security-policy', 'content-security-policy-report-only', 'x-frame-options', 'cross-origin-opener-policy', 'cross-origin-embedder-policy', 'cross-origin-resource-policy'];

const SHELL = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0a0a14">
<title>Drift</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Quicksand:wght@500;600;700&display=swap" rel="stylesheet">
<style>
:root{--ac:#8b3fd1;--ac2:#d9b8ff;--bg:#05040a;--panel:#0d0f22;--line:rgba(255,255,255,.09);--ink:#efe8ff;--mut:rgba(239,232,255,.55);
 --script:"Dancing Script","Brush Script MT","Segoe Script",cursive;--sans:"Quicksand","Segoe UI",system-ui,sans-serif}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{height:100%;margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);overflow:hidden}
button{font:inherit;color:inherit;cursor:pointer;border:0;background:none;padding:0}
svg{width:1em;height:1em;display:block}
#app{position:fixed;inset:0;display:flex;flex-direction:column;padding-top:env(safe-area-inset-top)}
/* tabs */
#tabs{display:flex;align-items:flex-end;gap:6px;padding:10px 10px 0;background:#090912;overflow-x:auto;scrollbar-width:none;min-height:50px}
#tabs::-webkit-scrollbar{display:none}
#tabList{display:flex;gap:6px}
.tab{display:flex;align-items:center;gap:8px;min-width:128px;max-width:190px;height:40px;padding:0 10px;border-radius:12px 12px 0 0;background:rgba(255,255,255,.04);
 color:var(--mut);font-weight:600;font-size:15px;animation:tabin .35s cubic-bezier(.2,1.2,.3,1) both;position:relative;transition:background .2s,color .2s}
.tab.on{background:#12142b;color:var(--ink);box-shadow:inset 0 2px 0 var(--ac)}
.tab .ti{flex:none;width:22px;height:22px;border-radius:50%;background:var(--ac);display:grid;place-items:center;font-size:13px;color:#fff}
.tab .tt{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:left}
.tab .tx{width:18px;height:18px;border-radius:50%;display:grid;place-items:center;font-size:12px;opacity:.6}
.tab .tx:active{background:rgba(255,255,255,.15)}
@keyframes tabin{from{opacity:0;transform:translateY(12px) scale(.9)}to{opacity:1;transform:none}}
#newTab{flex:none;width:36px;height:36px;margin-bottom:2px;border-radius:50%;display:grid;place-items:center;font-size:18px;color:var(--mut);transition:transform .25s,background .2s}
#newTab:active{transform:rotate(90deg) scale(.9);background:rgba(255,255,255,.1)}
/* toolbar */
#bar{display:flex;align-items:center;gap:4px;padding:8px 10px;background:linear-gradient(#12142b,#0d0f22);border-bottom:1px solid var(--line)}
#bar .ib{flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-size:21px;color:#b9a6ff;position:relative;overflow:hidden;transition:transform .15s,background .2s}
#bar .ib:active{transform:scale(.86);background:rgba(255,255,255,.1)}
#bar .ib[disabled]{opacity:.3}
#addrForm{flex:1;margin-left:6px}
#addr{width:100%;height:42px;font:600 17px var(--sans);color:var(--ink);background:rgba(255,255,255,.045);border:1px solid var(--line);border-radius:14px;padding:0 16px;outline:0;transition:border-color .25s,box-shadow .25s}
#addr::placeholder{color:rgba(239,232,255,.4)}
#addr:focus{border-color:var(--ac);box-shadow:0 0 0 3px color-mix(in srgb,var(--ac) 30%,transparent)}
/* pages */
#stage{flex:1;position:relative;overflow:hidden;background:linear-gradient(#000 0%,#05040a 45%,color-mix(in srgb,var(--ac) 45%,#05040a) 100%)}
.page{position:absolute;inset:0;overflow-y:auto;opacity:0;visibility:hidden;transform:translateY(18px) scale(.985);transition:opacity .35s,transform .35s,visibility 0s .35s}
.page.on{opacity:1;visibility:visible;transform:none;transition:opacity .35s,transform .35s}
#view{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff;display:none;z-index:2}
#stage.browsing #view{display:block}
#stage.browsing #home{display:none}
.glow{position:absolute;width:80vmax;height:80vmax;border-radius:50%;left:50%;top:-30vmax;transform:translateX(-50%);
 background:radial-gradient(circle,color-mix(in srgb,var(--ac) 28%,transparent),transparent 62%);animation:breathe 9s ease-in-out infinite alternate;pointer-events:none}
@keyframes breathe{to{transform:translateX(-50%) scale(1.18);opacity:.7}}
$('gf').oninput=function(){var q=this.value.toLowerCase();document.querySelectorAll('#g-games .tile:not(.add)').forEach(function(t){t.style.display=t.textContent.toLowerCase().indexOf(q)<0?'none':''})};
/* home */
#home{display:flex;flex-direction:column;align-items:center;min-height:100%;padding:44px 22px 24px;position:relative;text-align:center}
.hi{font:italic 500 26px var(--script);color:rgba(255,255,255,.8);margin-top:8px;animation:rise .8s both}
.brand{font:700 clamp(76px,22vw,120px)/1.05 var(--script);margin:18px 0 26px;background:linear-gradient(180deg,#fff 25%,var(--ac2));-webkit-background-clip:text;background-clip:text;color:transparent;
 filter:drop-shadow(0 0 22px color-mix(in srgb,var(--ac) 70%,transparent));animation:rise .9s .1s both}
@keyframes rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
#sf{width:100%;max-width:560px;position:relative;animation:rise .9s .2s both}
#sq{width:100%;height:64px;font:500 22px var(--sans);color:var(--ink);background:rgba(8,6,20,.75);border:1.5px solid rgba(255,255,255,.18);border-radius:999px;padding:0 84px 0 28px;outline:0;
 box-shadow:0 0 40px -12px var(--ac);transition:border-color .25s,box-shadow .25s}
#sq:focus{border-color:var(--ac2);box-shadow:0 0 50px -6px var(--ac)}
#sq::placeholder{color:rgba(239,232,255,.38)}
#sg{position:absolute;right:8px;top:8px;width:48px;height:48px;border-radius:50%;background:var(--ac);display:grid;place-items:center;font-size:24px;color:#fff;overflow:hidden;transition:transform .15s,filter .2s}
#sg:active{transform:scale(.88);filter:brightness(1.3)}
.sc{display:flex;flex-wrap:wrap;justify-content:center;gap:22px 30px;margin:44px 0 20px;max-width:560px}
.s{width:104px;display:flex;flex-direction:column;align-items:center;gap:10px;animation:rise .8s both;transition:transform .2s}
.s:active{transform:scale(.92)}
.s .c{width:104px;height:104px;border-radius:50%;background:#0a0a18;border:1px solid rgba(139,63,209,.25);display:grid;place-items:center;overflow:hidden;position:relative;transition:box-shadow .25s,transform .25s}
.s:hover .c{box-shadow:0 0 28px -4px var(--ac);transform:translateY(-3px)}
.s img{width:52px;height:52px;border-radius:12px}
.s b{font:italic 500 25px var(--script);color:#b9b1e8}
.date{margin-top:auto;padding:40px 0 22px;font:italic 700 clamp(30px,8vw,44px) var(--script);color:#fff;text-shadow:0 0 22px var(--ac2),0 0 8px color-mix(in srgb,var(--ac) 70%,transparent);animation:rise 1s .5s both}
/* generic pages */
.pg{padding:30px 20px 30px;max-width:760px;margin:0 auto;position:relative}
.pg h2{font:700 46px var(--script);margin:0 0 4px;background:linear-gradient(#fff,var(--ac2));-webkit-background-clip:text;background-clip:text;color:transparent}
.pg p.sub{margin:0 0 22px;color:var(--mut)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px}
.tile{display:flex;flex-direction:column;gap:10px;align-items:flex-start;text-align:left;padding:16px;border-radius:20px;background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.02));
 border:1px solid var(--line);position:relative;overflow:hidden;animation:rise .6s both;transition:transform .2s,border-color .25s,box-shadow .25s}
.tile:hover{border-color:var(--ac);box-shadow:0 12px 34px -16px var(--ac);transform:translateY(-3px)}
.tile:active{transform:scale(.96)}
.tile .fi{width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.08);display:grid;place-items:center;overflow:hidden;font:700 20px var(--sans)}
.tile .fi img{width:28px;height:28px}
.tile b{font-size:17px}.tile small{color:var(--mut);font-size:13px}
.tile.add{border-style:dashed;align-items:center;justify-content:center;color:var(--mut);min-height:128px;font-size:15px}
.tile.add svg{font-size:28px}
/* no ads + settings */
.card{padding:20px;border-radius:22px;background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:1px solid var(--line);margin-bottom:14px}
.row{display:flex;align-items:center;justify-content:space-between;gap:14px}
.card h3{margin:0 0 4px;font-size:18px}.card p{margin:0;color:var(--mut);font-size:14px}
.sw{flex:none;width:62px;height:36px;border-radius:99px;background:rgba(255,255,255,.14);position:relative;transition:background .3s}
.sw::after{content:"";position:absolute;top:4px;left:4px;width:28px;height:28px;border-radius:50%;background:#fff;transition:transform .3s cubic-bezier(.3,1.5,.5,1)}
.sw.on{background:var(--ac)}.sw.on::after{transform:translateX(26px)}
.big{display:grid;place-items:center;width:96px;height:96px;margin:6px auto 18px;border-radius:50%;font-size:46px;color:var(--ac2);border:2px solid var(--ac);box-shadow:0 0 40px -6px var(--ac);transition:transform .4s}
.big.off{color:var(--mut);border-color:var(--line);box-shadow:none}
.seg{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.seg button{padding:9px 16px;border-radius:99px;border:1px solid var(--line);background:rgba(255,255,255,.04);font-weight:600;font-size:14px;position:relative;overflow:hidden;transition:background .2s,border-color .2s,transform .15s}
.seg button.on{background:var(--ac);border-color:var(--ac);color:#fff}
.seg button:active{transform:scale(.93)}
.dots{display:flex;gap:14px;margin-top:12px}
.dots button{width:38px;height:38px;border-radius:50%;border:2px solid transparent;transition:transform .2s,border-color .2s}
.dots button.on{border-color:#fff;transform:scale(1.15)}
.danger{margin-top:12px;padding:11px 18px;border-radius:14px;background:rgba(255,80,100,.12);border:1px solid rgba(255,80,100,.4);color:#ff9aa7;font-weight:600}
/* nav */
#nav{position:relative;display:flex;justify-content:space-around;padding:10px 6px calc(10px + env(safe-area-inset-bottom));background:linear-gradient(#2a0f48,#1f0b38);border-top:1px solid rgba(255,255,255,.08)}
#ind{position:absolute;top:8px;height:calc(100% - 16px - env(safe-area-inset-bottom));border-radius:18px;background:rgba(139,63,209,.28);transition:left .4s cubic-bezier(.3,1.3,.5,1),width .3s;pointer-events:none}
.nb{position:relative;z-index:1;flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 2px;color:#b7a5ee;overflow:hidden;border-radius:16px;transition:color .25s,transform .15s}
.nb svg{font-size:30px;transition:transform .35s cubic-bezier(.3,1.6,.5,1)}
.nb span{font:italic 500 19px var(--script)}
.nb.on{color:#d7bfff}.nb.on svg{transform:translateY(-2px) scale(1.12)}
.nb:active{transform:scale(.9)}
.nb.gold{color:#f4c14c}
.rp{position:absolute;border-radius:50%;background:rgba(255,255,255,.35);transform:scale(0);animation:rp .6s ease-out forwards;pointer-events:none}
@keyframes rp{to{transform:scale(1);opacity:0}}
#toast{position:fixed;left:50%;bottom:110px;transform:translate(-50%,20px);background:#1b1038;border:1px solid var(--ac);padding:10px 18px;border-radius:99px;opacity:0;transition:.35s;z-index:9;font-weight:600}
#toast.on{opacity:1;transform:translate(-50%,0)}
button{touch-action:manipulation}
#app{transition:transform 1s}#app.flip{transform:rotate(180deg)}
#gf,#pw{width:100%;height:46px;margin:0 0 14px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid var(--line);color:var(--ink);padding:0 16px;font:600 16px var(--sans);outline:0}
#pw{margin:10px 0}#gf:focus,#pw:focus{border-color:var(--ac)}
.nb.dot::after{content:attr(data-n);position:absolute;top:2px;right:16%;min-width:18px;height:18px;border-radius:9px;background:#ff4d6d;color:#fff;font:700 11px var(--sans);display:grid;place-items:center;padding:0 4px}
.vis{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 0;border-top:1px solid var(--line)}
.vis small{color:var(--mut);margin-left:8px}.vis span{display:flex;gap:6px}
.vis button{padding:7px 12px;border-radius:99px;background:rgba(255,255,255,.08);border:1px solid var(--line);font-weight:600;font-size:13px}
#msg{position:fixed;inset:0;z-index:20;display:none;place-items:center;background:rgba(0,0,0,.7);padding:24px}#msg.on{display:grid}
#msg .bx{max-width:320px;width:100%;padding:24px;border-radius:22px;background:#12102a;border:1px solid var(--ac);text-align:center;animation:rise .4s both}
#msg .bx p{font-size:18px;margin:0 0 16px}#msg button{padding:10px 26px;border-radius:99px;background:var(--ac);font-weight:700}
</style></head><body>
<div id="app">
 <div id="tabs"><div id="tabList"></div><button id="newTab" data-r aria-label="New tab"></button></div>
 <div id="bar">
  <button class="ib" id="bk" data-r aria-label="Back"></button><button class="ib" id="fw" data-r aria-label="Forward"></button>
  <button class="ib" id="rl" data-r aria-label="Reload"></button><button class="ib" id="hm" data-r aria-label="Home"></button>
  <form id="addrForm"><input id="addr" placeholder="Search or enter address" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go"></form>
 </div>
 <main id="stage">
  <div class="glow"></div>
  <section class="page on" id="p-browser">
   <div id="home">
    <div class="hi" id="hi"></div><div class="brand">drift</div>
    <form id="sf"><input id="sq" placeholder="search the web or type a url" autocomplete="off" autocapitalize="off" enterkeyhint="go"><button id="sg" type="submit" data-r aria-label="Go"></button></form>
    <div class="sc" id="sc"></div><div class="date" id="date"></div>
   </div>
   <iframe id="view" title="Page" allow="fullscreen; autoplay; gamepad; clipboard-write"></iframe>
  </section>
  <section class="page" id="p-games"><div class="pg"><h2>games</h2><p class="sub">Tap a site to open it in the browser.</p><input id="gf" placeholder="Search games..." autocomplete="off"><div class="grid" id="g-games"></div></div></section>
  <section class="page" id="p-music"><div class="pg"><h2>music</h2><p class="sub">Heavy apps may not load through the proxy.</p><div class="grid" id="g-music"></div></div></section>
  <section class="page" id="p-chat"><div class="pg"><h2>chat</h2><p class="sub">Logins can be hit or miss through a proxy.</p><div class="grid" id="g-chat"></div></div></section>
  <section class="page" id="p-noads"><div class="pg"><h2>no ads</h2><p class="sub">Strips common ad scripts from pages you open.</p>
   <div class="card" style="text-align:center"><div class="big" id="adIc"></div><div class="row"><div style="text-align:left"><h3 id="adT">Ad blocker</h3><p id="adP"></p></div><button class="sw" id="adSw" aria-label="Toggle"></button></div></div></div></section>
  <section class="page" id="p-settings"><div class="pg"><h2>settings</h2><p class="sub">Saved on this device.</p>
   <div class="card"><h3>Accent color</h3><div class="dots" id="dots"></div></div>
   <div class="card"><h3>Search engine</h3><div class="seg" id="eng"></div></div>
   <div class="card"><h3>Tab disguise</h3><p>Changes the tab title and icon.</p><div class="seg" id="cloak"></div></div>
   <div class="card" id="adm"></div>
   <div class="card"><h3>Reset</h3><p>Clears saved settings and the current proxy session.</p><p style="margin-top:10px">The owner can see how many people are online. No personal info is collected.</p><button class="danger" id="reset" data-r>Clear everything</button></div></div></section>
 </main>
 <nav id="nav"><div id="ind"></div></nav>
</div>
<div id="msg"><div class="bx"><div style="font:700 30px var(--script);margin-bottom:6px">message</div><p id="msgT"></p><button id="msgOk">OK</button></div></div>
<div id="toast"></div>
<script>
var $=function(i){return document.getElementById(i)};
var P={globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
game:'<rect x="3" y="7" width="18" height="11" rx="5"/><path d="M8 10v5M5.5 12.5h5M15.5 11.5h.01M18 13.5h.01"/>',
music:'<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
chat:'<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1.1-4.2A8 8 0 1121 12z"/><path d="M8.5 11h7M8.5 14h4"/>',
ban:'<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
gear:'<circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="7.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19"/>',
bk:'<path d="M19 12H5M11 6l-6 6 6 6"/>',fw:'<path d="M5 12h14M13 6l6 6-6 6"/>',rl:'<path d="M20 11a8 8 0 10-2.3 5.7M20 4v7h-7"/>',
hm:'<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/>',pl:'<path d="M12 5v14M5 12h14"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',
go:'<path d="M5 12h14M13 6l6 6-6 6"/>',lock:'<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 018 0v3"/>',shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'};
function ic(n){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+P[n]+'</svg>'}
var S={};try{S=JSON.parse(localStorage.getItem('drift:s')||'{}')}catch(e){}
S.engine=S.engine||'ddg';S.ac=S.ac||'#8b3fd1';S.cloak=S.cloak||'';S.sites=S.sites||[];S.marks=S.marks||[];
function save(){try{localStorage.setItem('drift:s',JSON.stringify(S))}catch(e){}}
function toast(m){var t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(function(){t.classList.remove('on')},1800)}
var ENG={ddg:['DuckDuckGo','https://html.duckduckgo.com/html/?q='],bing:['Bing','https://www.bing.com/search?q='],brave:['Brave','https://search.brave.com/search?q='],google:['Google','https://www.google.com/search?q=']};
var GAMES=[['DuckMath','https://d2gve52fz9syn8.cloudfront.net','Fun games'],['Smart Learning','https://smartlearningmath.b-cdn.net','Math and learning tools'],['Secret','https://dulo.mov','Shh. Tap to find out.']];
var MUSIC=[['Spotify','https://open.spotify.com'],['SoundCloud','https://soundcloud.com'],['YouTube Music','https://music.youtube.com'],['Apple Music','https://music.apple.com'],['Pandora','https://www.pandora.com'],['Audiomack','https://audiomack.com']];
var CHAT=[['Discord','https://discord.com/app'],['Reddit','https://www.reddit.com'],['Messenger','https://www.messenger.com'],['WhatsApp','https://web.whatsapp.com'],['Telegram','https://web.telegram.org'],['Snapchat','https://www.snapchat.com']];
var SC=[['DuckDuckGo','https://duckduckgo.com'],['YouTube','https://www.youtube.com'],['Google','https://www.google.com'],['Discord','https://discord.com/app'],['TikTok','https://www.tiktok.com']];
function host(u){try{return new URL(u).hostname.replace(/^www\\./,'')}catch(e){return u}}
function fav(u){return 'https://www.google.com/s2/favicons?domain='+host(u)+'&sz=64'}
function toUrl(q){q=q.trim();if(!q)return'';if(/^https?:\\/\\//i.test(q))return q;
 if(/^[\\w-]+(\\.[\\w-]+)+(:\\d+)?(\\/\\S*)?$/.test(q))return'https://'+q;return ENG[S.engine][1]+encodeURIComponent(q)}
/* ripple */
document.addEventListener('pointerdown',function(e){var el=e.target.closest('[data-r],.tile,.nb,.s,.seg button');if(!el)return;
 var r=el.getBoundingClientRect(),d=Math.max(r.width,r.height)*1.6,s=document.createElement('span');s.className='rp';
 s.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';
 if(getComputedStyle(el).position==='static')el.style.position='relative';el.style.overflow='hidden';el.appendChild(s);setTimeout(function(){s.remove()},650)});
/* tabs + browsing */
var tabs=[],cur=null,uid=0,vt=0;
function nt(){var t={id:++uid,title:'New Tab',url:'',h:[],i:-1};tabs.push(t);cur=t;draw();showHome()}
function draw(){var l=$('tabList'),sg=tabs.map(function(t){return t.id+t.title+t.url}).join('|')+(cur&&cur.id);if(sg!==draw.s){draw.s=sg;l.innerHTML='';tabs.forEach(function(t){var d=document.createElement('div');d.className='tab'+(t===cur?' on':'');
 d.innerHTML='<span class="ti">'+(t.url?host(t.url).charAt(0).toUpperCase():'+')+'</span><span class="tt"></span><button class="tx" aria-label="Close tab">'+ic('x')+'</button>';
 d.querySelector('.tt').textContent=t.title;
 d.onclick=function(e){if(e.target.closest('.tx')){closeTab(t);return}cur=t;draw();t.url?load(t.url):showHome();nav('browser')};l.appendChild(d)})}
 if(document.activeElement!==$('addr'))$('addr').value=cur&&cur.url?cur.url:'';$('bk').disabled=!cur||cur.i<0;$('fw').disabled=!cur||cur.i>=cur.h.length-1}
function closeTab(t){var i=tabs.indexOf(t);tabs.splice(i,1);if(!tabs.length)return nt();if(cur===t){cur=tabs[Math.max(0,i-1)];cur.url?load(cur.url):showHome()}draw()}
function showHome(){vt=0;$('stage').classList.remove('browsing');$('view').src='about:blank';draw()}
function load(u){vt=cur.id;$('stage').classList.add('browsing');$('view').src='/__go?u='+encodeURIComponent(u)}
function go(u,fromHist){if(!u)return;nav('browser');if(!fromHist){cur.h=cur.h.slice(0,cur.i+1);cur.h.push(u);cur.i=cur.h.length-1}
 cur.url=u;cur.title=host(u);draw();load(u)}
window.addEventListener('message',function(e){var d=e.data;if(e.origin!==location.origin||!d||!d.drift||e.source!==$('view').contentWindow||!cur||vt!==cur.id)return;
 if(d.url!==cur.url){cur.url=d.url;if(cur.h[cur.i]!==d.url){cur.h=cur.h.slice(0,cur.i+1);cur.h.push(d.url);cur.i=cur.h.length-1}}
 if(d.title)cur.title=d.title;draw()});
$('bk').onclick=function(){if(cur.i>0){cur.i--;go(cur.h[cur.i],1)}else if(cur.i===0){cur.i=-1;cur.url='';cur.title='New Tab';showHome()}};
$('fw').onclick=function(){if(cur.i<cur.h.length-1){cur.i++;go(cur.h[cur.i],1)}};
$('rl').onclick=function(){var b=$('rl').firstChild;b.style.transition='transform .6s';b.style.transform='rotate(360deg)';setTimeout(function(){b.style.transition='none';b.style.transform=''},650);if(cur.url)load(cur.url);else{clock();toast('Refreshed')}};
$('hm').onclick=function(){cur.url='';cur.title='New Tab';cur.i=-1;cur.h=[];showHome();nav('browser')};
$('newTab').onclick=function(){nt();nav('browser')};
$('addrForm').onsubmit=function(e){e.preventDefault();var u=toUrl($('addr').value);$('addr').blur();go(u)};
$('sf').onsubmit=function(e){e.preventDefault();var u=toUrl($('sq').value);$('sq').blur();$('sq').value='';go(u)};
/* pages */
var PAGES=[['browser','globe','browser'],['games','game','games'],['music','music','music'],['chat','chat','chat'],['noads','ban','no ads'],['settings','gear','settings']];
PAGES.forEach(function(p){var b=document.createElement('button');b.className='nb'+(p[0]==='noads'?' gold':'');b.dataset.p=p[0];b.innerHTML=ic(p[1])+'<span>'+p[2]+'</span>';
 b.onclick=function(){nav(p[0])};$('nav').appendChild(b)});
function nav(n){document.querySelectorAll('.page').forEach(function(p){p.classList.toggle('on',p.id==='p-'+n)});
 document.querySelectorAll('.nb').forEach(function(b){var on=b.dataset.p===n;b.classList.toggle('on',on);if(on){var i=$('ind');i.style.left=b.offsetLeft+4+'px';i.style.width=b.offsetWidth-8+'px'}})}
function tiles(id,list,extra){var g=$(id);g.innerHTML='';list.forEach(function(x,k){var t=document.createElement('button');t.className='tile';t.style.animationDelay=k*60+'ms';
 t.innerHTML='<span class="fi"><img alt="" src="'+fav(x[1])+'"></span><b></b><small></small>';t.querySelector('b').textContent=x[0];
 t.querySelector('small').textContent=x[2]||host(x[1]);t.querySelector('img').onerror=function(){this.parentNode.textContent=x[0].charAt(0)};
 t.onclick=function(){go(x[1])};g.appendChild(t)});if(extra)extra(g)}
function drawGames(){tiles('g-games',GAMES.concat(S.sites),function(g){var a=document.createElement('button');a.className='tile add';a.innerHTML=ic('pl')+'Add a site';
 a.onclick=function(){var n=prompt('Site name');if(!n)return;var u=prompt('Site address (https://...)');if(!u)return;if(!/^https?:/i.test(u))u='https://'+u;S.sites.push([n,u,host(u)]);save();drawGames();toast('Added '+n)};g.appendChild(a)})}
/* home */
function ord(n){var s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0])}
function clock(){var d=new Date(),h=d.getHours();$('hi').textContent='good '+(h<5?'night':h<12?'morning':h<18?'afternoon':'evening');
 $('date').textContent=d.toLocaleDateString('en-US',{weekday:'long'})+', '+d.toLocaleDateString('en-US',{month:'long'})+' '+ord(d.getDate())+', '+d.getFullYear()}
function shortcuts(){var c=$('sc');c.innerHTML='';SC.concat(S.marks).forEach(function(x,k){var s=document.createElement('button');s.className='s';s.style.animationDelay=.3+k*.08+'s';
 s.innerHTML='<span class="c"><img alt="" src="'+fav(x[1])+'"></span><b>'+x[0]+'</b>';s.querySelector('img').onerror=function(){this.remove()};s.onclick=function(){go(x[1])};c.appendChild(s)});var a=document.createElement('button');a.className='s';a.innerHTML='<span class="c">'+ic('pl')+'</span><b>add</b>';a.querySelector('.c').style.fontSize='34px';
 a.onclick=function(){var n=prompt('Shortcut name');if(!n)return;var u=prompt('Address (https://...)');if(!u)return;if(!/^https?:/i.test(u))u='https://'+u;S.marks.push([n,u]);save();shortcuts();toast('Added '+n)};c.appendChild(a)}
/* no ads */
function ads(){return /(?:^|;\\s*)noads=1/.test(document.cookie)}
function drawAds(){var on=ads();$('adSw').classList.toggle('on',on);$('adIc').innerHTML=ic(on?'shield':'ban');$('adIc').classList.toggle('off',!on);
 $('adT').textContent=on?'Ad blocker is on':'Ad blocker is off';$('adP').textContent=on?'Common ad scripts are removed from pages.':'Turn it on to strip ad scripts.'}
$('adSw').onclick=function(){var on=!ads();fetch('/__noads/'+(on?1:0)).then(function(){drawAds();toast(on?'Ads blocked':'Ad blocker off')})};
/* settings */
function accent(c){document.documentElement.style.setProperty('--ac',c);S.ac=c;save()}
var CK={'':['Off','Drift',''],docs:['Google Docs','Untitled document - Google Docs','https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico'],
 cls:['Classroom','Classroom','https://ssl.gstatic.com/classroom/favicon.png']};
function cloak(){var c=CK[S.cloak]||CK[''];document.title=c[1];var l=document.querySelector('link[rel=icon]');
 if(!c[2]){if(l)l.remove();return}if(!l){l=document.createElement('link');l.rel='icon';document.head.appendChild(l)}l.href=c[2]}
function drawSettings(){var d=$('dots');d.innerHTML='';['#8b3fd1','#3f7bd1','#1fa97a','#d13f7b','#d19a3f'].forEach(function(c){var b=document.createElement('button');
 b.style.background=c;b.className=S.ac===c?'on':'';b.setAttribute('aria-label',c);b.onclick=function(){accent(c);drawSettings()};d.appendChild(b)});
 var e=$('eng');e.innerHTML='';Object.keys(ENG).forEach(function(k){var b=document.createElement('button');b.textContent=ENG[k][0];b.className=S.engine===k?'on':'';
  b.onclick=function(){S.engine=k;save();drawSettings();toast('Search: '+ENG[k][0])};e.appendChild(b)});
 var k2=$('cloak');k2.innerHTML='';Object.keys(CK).forEach(function(k){var b=document.createElement('button');b.textContent=CK[k][0];b.className=S.cloak===k?'on':'';
  b.onclick=function(){S.cloak=k;save();cloak();drawSettings()};k2.appendChild(b)})}
$('reset').onclick=function(){if(!confirm('Clear all saved settings?'))return;try{localStorage.removeItem('drift:s')}catch(e){}document.cookie='t=;Max-Age=0;Path=/';document.cookie='noads=;Max-Age=0;Path=/';location.reload()};
/* presence + admin */
var vid;try{vid=localStorage.getItem('drift:id');if(!vid){vid=Math.random().toString(36).slice(2,10);localStorage.setItem('drift:id',vid)}}catch(e){vid=Math.random().toString(36).slice(2,10)}
function isAdm(){return /(?:^|;\s*)adm=/.test(document.cookie)}
function runCmd(c){if(c.type==='home')$('hm').onclick();else if(c.type==='msg'){$('msgT').textContent=c.text||'';$('msg').classList.add('on')}
 else if(c.type==='flip'){$('app').classList.add('flip');setTimeout(function(){$('app').classList.remove('flip')},8000)}}
function ping(){fetch('/__p/ping',{method:'POST',body:JSON.stringify({id:vid,status:cur&&cur.url?'browsing':'home'})}).then(function(r){return r.json()}).then(function(d){if(d&&d.cmd)runCmd(d.cmd)}).catch(function(){})}
$('msgOk').onclick=function(){$('msg').classList.remove('on')};
var known=null,vis=[];
function poll(){if(!isAdm())return;fetch('/__p/list').then(function(r){return r.json()}).then(function(d){vis=d.list||[];
 if(known)vis.forEach(function(v){if(known.indexOf(v.id)<0)toast('Someone joined \u00b7 '+vis.length+' online')});
 known=vis.map(function(v){return v.id});var b=document.querySelector('.nb[data-p=settings]');b.classList.toggle('dot',vis.length>0);b.dataset.n=vis.length;drawAdmin()}).catch(function(){})}
function send(id,type,text){fetch('/__p/cmd',{method:'POST',body:JSON.stringify({id:id,type:type,text:text})}).then(function(){toast('Sent')})}
function drawAdmin(){var a=$('adm');
 if(!isAdm()){a.innerHTML='<h3>Admin</h3><p>Enter the password to manage visitors.</p><input id="pw" type="password" inputmode="numeric" placeholder="Password"><button class="danger" id="pwGo" style="margin:0">Unlock</button><p id="pwE" style="margin-top:8px"></p>';
  $('pwGo').onclick=function(){fetch('/__admin',{method:'POST',body:JSON.stringify({pw:$('pw').value})}).then(function(r){if(r.ok){toast('Admin unlocked');known=null;poll();drawAdmin()}else $('pwE').textContent='Wrong password'})};return}
 var h='<h3>Admin panel</h3><p>'+vis.length+' other '+(vis.length===1?'person':'people')+' online</p>';
 vis.forEach(function(v){h+='<div class="vis"><div><b>Visitor '+v.n+'</b><small>'+v.status+'</small></div><span><button data-a="home" data-i="'+v.id+'">Home</button><button data-a="msg" data-i="'+v.id+'">Message</button><button data-a="flip" data-i="'+v.id+'">Flip</button></span></div>'});
 a.innerHTML=h+'<button class="danger" id="adOff">Log out</button>';
 a.querySelectorAll('[data-a]').forEach(function(b){b.onclick=function(){var t=b.dataset.a,x='';if(t==='msg'){x=prompt('Message to send');if(!x)return}send(b.dataset.i,t,x)}});
 $('adOff').onclick=function(){fetch('/__admin/off').then(function(){known=null;vis=[];drawAdmin()})}}
setInterval(ping,3000);setInterval(poll,3000);
/* boot */
[['newTab','pl'],['bk','bk'],['fw','fw'],['rl','rl'],['hm','hm'],['sg','go']].forEach(function(x){$(x[0]).innerHTML=ic(x[1])});
accent(S.ac);cloak();clock();setInterval(clock,60000);shortcuts();drawGames();tiles('g-music',MUSIC);tiles('g-chat',CHAT);drawAds();drawSettings();drawAdmin();ping();poll();nt();
window.addEventListener('resize',function(){var a=document.querySelector('.nb.on');if(a)nav(a.dataset.p)});
setTimeout(function(){nav('browser')},60);
</script></body></html>`;

const ADMIN_PW = '1414';
async function adminToken() {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('drift-admin:' + ADMIN_PW));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
const J = (o, st) => new Response(JSON.stringify(o), { status: st || 200, headers: { 'content-type': 'application/json' } });

export class Room {
  constructor() { this.v = new Map(); this.c = 0; }
  async fetch(req) {
    const p = new URL(req.url).pathname, now = Date.now();
    for (const [k, x] of this.v) if (now - x.t > 20000) this.v.delete(k);
    const b = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    if (p === '/ping') {
      let x = this.v.get(b.id);
      if (!x) { x = { id: b.id, n: ++this.c, cmd: null }; this.v.set(b.id, x); }
      x.t = now; x.status = b.status; x.admin = !!b.admin;
      const cmd = x.cmd; x.cmd = null;
      return J({ cmd });
    }
    if (p === '/list') return J({ list: [...this.v.values()].filter((x) => !x.admin).map((x) => ({ id: x.id, n: x.n, status: x.status })) });
    if (p === '/cmd') { const x = this.v.get(b.id); if (x) x.cmd = { type: b.type, text: String(b.text || '').slice(0, 200) }; return J({ ok: !!x }); }
    return J({}, 404);
  }
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const path = url.pathname;
    const ck = req.headers.get('cookie') || '';
    const get = (n) => (ck.match(new RegExp('(?:^|;\\s*)' + n + '=([^;]*)')) || [])[1];
    const dest = req.headers.get('sec-fetch-dest');
    const cookie = (n, v, age) => n + '=' + v + '; Path=/; Max-Age=' + age + '; Secure; SameSite=Lax';

    if (path === '/__go') {
      let u;
      try { u = new URL(url.searchParams.get('u')); } catch (e) { return new Response('Bad address', { status: 400 }); }
      if (!/^https?:$/.test(u.protocol) || BLOCK.test(u.hostname) || u.host === url.host) return new Response('Blocked address', { status: 400 });
      return new Response(null, { status: 302, headers: { location: u.pathname + u.search, 'set-cookie': cookie('t', encodeURIComponent(u.origin), 86400) } });
    }
    const tok = await adminToken();
    const isAdmin = ck.split(/;\s*/).includes('adm=' + tok);
    if (path === '/__admin' && req.method === 'POST') {
      let pw = '';
      try { pw = (await req.json()).pw; } catch (e) {}
      if (String(pw) !== ADMIN_PW) return J({ ok: false }, 401);
      return new Response('{"ok":true}', { headers: { 'content-type': 'application/json', 'set-cookie': cookie('adm', tok, 31536000) } });
    }
    if (path === '/__admin/off') return new Response(null, { status: 204, headers: { 'set-cookie': cookie('adm', '', 0) } });
    if (path.startsWith('/__p/')) {
      if (!env.ROOM) return J({ cmd: null, list: [] });
      const room = env.ROOM.get(env.ROOM.idFromName('main'));
      const kind = path.slice(5);
      if (kind !== 'ping' && !isAdmin) return J({ error: 'no' }, 403);
      let body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
      if (kind === 'ping') body.admin = isAdmin;
      return room.fetch('https://room/' + kind, { method: 'POST', body: JSON.stringify(body) });
    }
    if (path.startsWith('/__noads/')) {
      return new Response(null, { status: 204, headers: { 'set-cookie': cookie('noads', path.endsWith('1') ? '1' : '0', 31536000) } });
    }
    if (path === '/__shell' || (path === '/' && (dest === 'document' || (!dest && !get('t'))))) {
      return new Response(SHELL, { headers: { 'content-type': 'text/html;charset=utf-8', 'cache-control': 'no-store' } });
    }

    const t = decodeURIComponent(get('t') || '');
    if (!t) return Response.redirect(url.origin + '/', 302);
    const noads = get('noads') === '1';
    const tHost = new URL(t).host;

    const fix = (v, isNav) => {
      if (!/^(https?:)?\/\//i.test(v)) return v;
      let u;
      try { u = new URL(v.startsWith('//') ? 'https:' + v : v); } catch (e) { return v; }
      if (u.origin === t) return u.pathname + u.search + u.hash;
      return isNav ? '/__go?u=' + encodeURIComponent(u.href) : v;
    };

    const headers = new Headers(req.headers);
    headers.set('Referer', t + '/');
    if (headers.has('Origin')) headers.set('Origin', t);
    const rest = ck.split(/;\s*/).filter((c) => c && !/^(t|noads|adm)=/.test(c)).join('; ');
    if (rest) headers.set('cookie', rest); else headers.delete('cookie');
    const body = ['GET', 'HEAD'].includes(req.method) ? undefined : req.body;
    if (req.headers.get('upgrade') === 'websocket') return fetch(t + path + url.search, req);
    const up = await fetch(t + path + url.search, { method: req.method, headers, body, redirect: 'manual' });

    const out = new Headers(up.headers);
    STRIP.forEach((h) => out.delete(h));
    const loc = out.get('location');
    if (loc) out.set('location', fix(loc, true));
    const sc = up.headers.getSetCookie ? up.headers.getSetCookie() : [];
    if (sc.length) { out.delete('set-cookie'); sc.forEach((c) => out.append('set-cookie', c.replace(/;\s*domain=[^;]*/i, ''))); }
    const type = (out.get('content-type') || '').toLowerCase();

    if (type.includes('text/html') && !(Number(out.get('content-length')) > 2000000)) {
      out.delete('content-encoding'); out.delete('content-length');
      const shim = '(function(){if(window.__d)return;window.__d=1;var O=' + JSON.stringify(t) + ';' +
        'function f(u){return typeof u==="string"&&u.indexOf(O)===0?(u.slice(O.length)||"/"):u}' +
        'var of=window.fetch;window.fetch=function(i,o){if(typeof i==="string")i=f(i);return of.call(this,i,o)};' +
        'var ox=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){arguments[1]=f(u);return ox.apply(this,arguments)};' +
        'var ow=window.open;window.open=function(u){if(u&&u!=="about:blank"){u=String(u);location.href=/^https?:/.test(u)&&u.indexOf(O)!==0?"/__go?u="+encodeURIComponent(u):f(u);return window}return ow.apply(this,arguments)};' +
        'if(navigator.serviceWorker)navigator.serviceWorker.register=function(){return Promise.resolve({})};' +
        'function rep(){if(parent!==window)try{parent.postMessage({drift:1,url:O+location.pathname+location.search+location.hash,title:document.title},location.origin)}catch(e){}}' +
        'rep();setInterval(rep,700)})();';
      const tag = '<script>' + shim + '</script>';
      const rw = new HTMLRewriter();
      if (noads) {
        for (const d of ADS) rw.on('script[src*="' + d + '"],iframe[src*="' + d + '"]', { element(el) { el.remove(); } });
        rw.on('ins.adsbygoogle', { element(el) { el.remove(); } });
      }
      rw.on('a[href]', { element(el) { const v = el.getAttribute('href'); const n = fix(v, true); if (n !== v) el.setAttribute('href', n); } });
      for (const [sel, a] of [['link[href]', 'href'], ['[src]', 'src'], ['form[action]', 'action'], ['[poster]', 'poster'], ['[data-src]', 'data-src']]) {
        rw.on(sel, { element(el) { const v = el.getAttribute(a); const n = fix(v, false); if (n !== v) el.setAttribute(a, n); } });
      }
      rw.on('[integrity]', { element(el) { el.removeAttribute('integrity'); } });
      rw.on('meta', { element(el) { if ((el.getAttribute('http-equiv') || '').toLowerCase() === 'content-security-policy') el.remove(); } });
      rw.on('html', { element(el) { el.prepend(tag, { html: true }); } });
      rw.on('head', { element(el) { el.prepend(tag, { html: true }); } });
      return rw.transform(new Response(up.body, { status: up.status, headers: out }));
    }
    if (type.includes('text/css')) {
      const css = (await up.text()).split(t).join('');
      out.delete('content-encoding'); out.delete('content-length');
      return new Response(css, { status: up.status, headers: out });
    }
    return new Response(up.body, { status: up.status, headers: out });
  },
};
