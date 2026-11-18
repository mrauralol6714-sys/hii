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
:root{--ac:#8b3fd1;--ac2:color-mix(in srgb,var(--ac) 45%,#fff);--bg:#05040a;--panel:#0d0f22;--line:rgba(255,255,255,.09);--ink:#efe8ff;--mut:rgba(239,232,255,.55);
 --script:"Dancing Script","Brush Script MT","Segoe Script",cursive;--sans:"Quicksand","Segoe UI",system-ui,sans-serif}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{height:100%;margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);overflow:hidden}
button{font:inherit;color:inherit;cursor:pointer;border:0;background:none;padding:0;touch-action:manipulation}
svg{width:1em;height:1em;display:block}
body.calm *:not(#app){animation:none!important}
#app{position:fixed;inset:0;display:flex;flex-direction:column;padding-top:env(safe-area-inset-top);transition:transform 1s,filter .5s}
#app.flip{transform:rotate(180deg)}
#app.zoom{transform:scale(1.45)}
#app.shake{animation:shk .12s infinite}
#app.rainbow{animation:rb 3s linear infinite}
@keyframes shk{0%{transform:translate(-6px,2px)}25%{transform:translate(5px,-3px)}50%{transform:translate(-4px,-2px)}75%{transform:translate(6px,3px)}100%{transform:translate(-6px,2px)}}
@keyframes rb{to{filter:hue-rotate(360deg)}}
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
#bar{display:flex;align-items:center;gap:2px;padding:8px 8px;background:linear-gradient(#12142b,#0d0f22);border-bottom:1px solid var(--line)}
#bar .ib{flex:none;width:38px;height:40px;border-radius:50%;display:grid;place-items:center;font-size:20px;color:#b9a6ff;position:relative;overflow:hidden;transition:transform .15s,background .2s}
#bar .ib:active{transform:scale(.86);background:rgba(255,255,255,.1)}
#bar .ib[disabled]{opacity:.3}
#bar .ib.on{color:#f4c14c}#bar .ib.on svg{fill:currentColor}
#addrForm{flex:1;margin-left:4px;min-width:0}
#addr{width:100%;height:42px;font:600 16px var(--sans);color:var(--ink);background:rgba(255,255,255,.045);border:1px solid var(--line);border-radius:14px;padding:0 14px;outline:0;transition:border-color .25s,box-shadow .25s}
#addr::placeholder{color:rgba(239,232,255,.4)}
#addr:focus{border-color:var(--ac);box-shadow:0 0 0 3px color-mix(in srgb,var(--ac) 30%,transparent)}
#ban{display:none;padding:8px 14px;background:var(--ac);color:#fff;font-weight:700;text-align:center;font-size:14px}
#ban.on{display:block}
/* stage + backgrounds */
#stage{flex:1;position:relative;overflow:hidden;background:linear-gradient(#000 0%,#05040a 45%,color-mix(in srgb,var(--ac) 45%,#05040a) 100%)}
#stage.bg-plain{background:#07060d}
#stage.bg-plain .glow{display:none}
#ld{position:absolute;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,var(--ac),var(--ac2));z-index:5;opacity:0;transition:width .4s,opacity .3s;box-shadow:0 0 10px var(--ac)}
#bgc{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:none}
.aur{position:absolute;inset:0;display:none;overflow:hidden;pointer-events:none}
#stage.bg-aurora .aur{display:block}
.aur i{position:absolute;width:70vmax;height:70vmax;border-radius:50%;filter:blur(70px);opacity:.45;animation:drf 18s ease-in-out infinite alternate}
.aur i:nth-child(1){background:var(--ac);left:-20vmax;top:-20vmax}
.aur i:nth-child(2){background:#1fa9c9;right:-25vmax;top:10vmax;animation-delay:-6s}
.aur i:nth-child(3){background:#d13f7b;left:10vmax;bottom:-35vmax;animation-delay:-11s}
@keyframes drf{to{transform:translate(12vmax,8vmax) scale(1.2)}}
.gb{position:absolute;inset:0;display:none;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(circle at 50% 30%,#000,transparent 75%);mask-image:radial-gradient(circle at 50% 30%,#000,transparent 75%)}
#stage.bg-grid .gb{display:block}
.page{position:absolute;inset:0;overflow-y:auto;opacity:0;visibility:hidden;transform:translateY(18px) scale(.985);transition:opacity .35s,transform .35s,visibility 0s .35s}
.page.on{opacity:1;visibility:visible;transform:none;transition:opacity .35s,transform .35s}
#view{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff;display:none;z-index:2}
#stage.browsing #view{display:block}
#stage.browsing #home{display:none}
.glow{position:absolute;width:80vmax;height:80vmax;border-radius:50%;left:50%;top:-30vmax;transform:translateX(-50%);
 background:radial-gradient(circle,color-mix(in srgb,var(--ac) 28%,transparent),transparent 62%);animation:breathe 9s ease-in-out infinite alternate;pointer-events:none}
@keyframes breathe{to{transform:translateX(-50%) scale(1.18);opacity:.7}}
/* home */
#home{display:flex;flex-direction:column;align-items:center;min-height:100%;padding:44px 22px 24px;position:relative;text-align:center}
.hi{font:italic 500 26px var(--script);color:rgba(255,255,255,.8);margin-top:8px;animation:rise .8s both}
.brand{font:700 clamp(76px,22vw,120px)/1.15 var(--script);margin:14px 0 22px;color:#fff;
 text-shadow:0 0 18px color-mix(in srgb,var(--ac) 90%,transparent),0 0 46px color-mix(in srgb,var(--ac) 70%,transparent),0 0 90px color-mix(in srgb,var(--ac) 40%,transparent);animation:rise .9s .1s both}
@keyframes rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
#sf{width:100%;max-width:560px;position:relative;animation:rise .9s .2s both}
#sq{width:100%;height:64px;font:500 22px var(--sans);color:var(--ink);background:rgba(8,6,20,.75);border:1.5px solid rgba(255,255,255,.18);border-radius:999px;padding:0 84px 0 28px;outline:0;
 box-shadow:0 0 40px -12px var(--ac);transition:border-color .25s,box-shadow .25s}
#sq:focus{border-color:var(--ac2);box-shadow:0 0 50px -6px var(--ac)}
#sq::placeholder{color:rgba(239,232,255,.38)}
#sg{position:absolute;right:8px;top:8px;width:48px;height:48px;border-radius:50%;background:var(--ac);display:grid;place-items:center;font-size:24px;color:#fff;overflow:hidden;transition:transform .15s,filter .2s}
#sg:active{transform:scale(.88);filter:brightness(1.3)}
.pill{margin-top:14px;padding:6px 14px;border-radius:99px;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--mut);font-size:13px;font-weight:600;animation:rise 1s .3s both}
.sc{display:flex;flex-wrap:wrap;justify-content:center;gap:22px 30px;margin:36px 0 20px;max-width:560px}
.s{width:104px;display:flex;flex-direction:column;align-items:center;gap:10px;animation:rise .8s both;transition:transform .2s}
.s:active{transform:scale(.92)}
.s .c{width:104px;height:104px;border-radius:50%;background:#0a0a18;border:1px solid color-mix(in srgb,var(--ac) 35%,transparent);display:grid;place-items:center;overflow:hidden;position:relative;transition:box-shadow .25s,transform .25s}
.s:hover .c{box-shadow:0 0 28px -4px var(--ac);transform:translateY(-3px)}
.s img{width:52px;height:52px;border-radius:12px}
.s b{font:italic 500 25px var(--script);color:#b9b1e8}
.time{margin-top:auto;padding-top:30px;font:700 44px var(--sans);letter-spacing:2px;color:#fff;opacity:.9;animation:rise 1s .5s both}
.date{padding:4px 0 22px;font:italic 700 clamp(26px,7vw,38px) var(--script);color:#fff;text-shadow:0 0 22px var(--ac2),0 0 8px color-mix(in srgb,var(--ac) 70%,transparent);animation:rise 1s .6s both}
/* generic pages */
.pg{padding:30px 20px 30px;max-width:760px;margin:0 auto;position:relative}
.pg h2{font:700 48px/1.2 var(--script);margin:0 0 4px;color:#fff;text-shadow:0 0 22px color-mix(in srgb,var(--ac) 80%,transparent)}
.pg p.sub{margin:0 0 22px;color:var(--mut)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px}
.tile{display:flex;flex-direction:column;gap:10px;align-items:flex-start;text-align:left;padding:16px;border-radius:20px;background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.02));
 border:1px solid var(--line);position:relative;overflow:hidden;animation:rise .6s both;transition:transform .2s,border-color .25s,box-shadow .25s;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.tile:hover{border-color:var(--ac);box-shadow:0 12px 34px -16px var(--ac);transform:translateY(-3px)}
.tile:active{transform:scale(.96)}
.tile .fi{width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.08);display:grid;place-items:center;overflow:hidden;font:700 20px var(--sans)}
.tile .fi img{width:28px;height:28px}
.tile b{font-size:17px}.tile small{color:var(--mut);font-size:13px}
.tile.add{border-style:dashed;align-items:center;justify-content:center;color:var(--mut);min-height:128px;font-size:15px}
.tile.add svg{font-size:28px}
.card{padding:20px;border-radius:22px;background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:1px solid var(--line);margin-bottom:14px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.row{display:flex;align-items:center;justify-content:space-between;gap:14px}
.card h3{margin:0 0 4px;font-size:18px}.card p{margin:0;color:var(--mut);font-size:14px}
.sw{flex:none;width:62px;height:36px;border-radius:99px;background:rgba(255,255,255,.14);position:relative;transition:background .3s}
.sw::after{content:"";position:absolute;top:4px;left:4px;width:28px;height:28px;border-radius:50%;background:#fff;transition:transform .3s cubic-bezier(.3,1.5,.5,1)}
.sw.on{background:var(--ac)}.sw.on::after{transform:translateX(26px)}
.big{display:grid;place-items:center;width:96px;height:96px;margin:6px auto 18px;border-radius:50%;font-size:46px;color:var(--ac2);border:2px solid var(--ac);box-shadow:0 0 40px -6px var(--ac);transition:transform .4s}
.big.off{color:var(--mut);border-color:var(--line);box-shadow:none}
.seg{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;align-items:center}
.seg button{padding:9px 16px;border-radius:99px;border:1px solid var(--line);background:rgba(255,255,255,.04);font-weight:600;font-size:14px;position:relative;overflow:hidden;transition:background .2s,border-color .2s,transform .15s}
.seg button.on{background:var(--ac);border-color:var(--ac);color:#fff}
.seg button:active{transform:scale(.93)}
.dots{display:flex;flex-wrap:wrap;gap:12px;margin-top:12px;align-items:center}
.dots button{width:36px;height:36px;border-radius:50%;border:2px solid transparent;transition:transform .2s,border-color .2s}
.dots button.on{border-color:#fff;transform:scale(1.15)}
.dots input[type=color]{width:40px;height:40px;border:0;background:none;padding:0;border-radius:50%}
.danger{margin-top:12px;padding:11px 18px;border-radius:14px;background:rgba(255,80,100,.12);border:1px solid rgba(255,80,100,.4);color:#ff9aa7;font-weight:600}
.inp,#gf,#pw{width:100%;height:46px;margin:10px 0 0;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid var(--line);color:var(--ink);padding:0 16px;font:600 16px var(--sans);outline:0}
#gf{margin:0 0 14px}
.inp:focus,#gf:focus,#pw:focus{border-color:var(--ac)}
select.inp{width:auto;padding:0 12px;margin:0}
textarea.inp{height:150px;padding:12px 16px;resize:vertical;font-weight:500}
.cr{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-top:1px solid var(--line);font-weight:600;font-size:17px}
.own{padding:4px 12px;border-radius:99px;background:var(--ac);color:#fff;font-size:12px;font-weight:700}
/* lists */
.li{display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid var(--line)}
.li img{width:26px;height:26px;border-radius:7px;flex:none}
.li .t{flex:1;min-width:0;text-align:left}.li .t b{display:block;font-size:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.li .t small{color:var(--mut);font-size:12px}
.li .x{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:var(--mut);flex:none}
.li .x:active{background:rgba(255,255,255,.12)}
.empty{color:var(--mut);font-size:14px;padding:8px 0}
/* chat */
#cbox{height:260px;overflow-y:auto;border-radius:16px;background:rgba(0,0,0,.25);border:1px solid var(--line);padding:10px;display:flex;flex-direction:column;gap:8px;margin-top:10px}
.mb{max-width:85%;padding:8px 12px;border-radius:14px;background:rgba(255,255,255,.07);align-self:flex-start;word-break:break-word;font-size:15px}
.mb.me{align-self:flex-end;background:color-mix(in srgb,var(--ac) 55%,transparent)}
.mb b{display:block;font-size:12px;color:var(--ac2);margin-bottom:2px}
.mb b em{font-style:normal;background:var(--ac);color:#fff;border-radius:99px;padding:1px 7px;font-size:10px;margin-left:6px}
#cf{display:flex;gap:8px;margin-top:10px}
#cf .inp{margin:0;flex:1}
#cf button{padding:0 18px;border-radius:14px;background:var(--ac);font-weight:700;color:#fff}
/* tools */
.cdsp{height:56px;border-radius:14px;background:rgba(0,0,0,.3);display:flex;align-items:center;justify-content:flex-end;padding:0 16px;font:700 28px var(--sans);margin:10px 0;overflow:hidden}
.ckeys{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.ckeys button{height:50px;border-radius:14px;background:rgba(255,255,255,.07);font:700 20px var(--sans);transition:transform .12s,background .2s}
.ckeys button:active{transform:scale(.92);background:rgba(255,255,255,.16)}
.ckeys button.op{background:color-mix(in srgb,var(--ac) 45%,transparent)}
.big2{font:700 42px var(--sans);letter-spacing:1px;margin:8px 0}
/* nav */
#nav{position:relative;display:flex;overflow-x:auto;scrollbar-width:none;padding:10px 6px calc(10px + env(safe-area-inset-bottom));background:linear-gradient(color-mix(in srgb,var(--ac) 22%,#0b0716),color-mix(in srgb,var(--ac) 12%,#080512));border-top:1px solid rgba(255,255,255,.08)}
#nav::-webkit-scrollbar{display:none}
#nav .nb:nth-child(2){margin-left:auto}#nav .nb:last-child{margin-right:auto}
#ind{position:absolute;top:8px;height:calc(100% - 16px - env(safe-area-inset-bottom));border-radius:18px;background:color-mix(in srgb,var(--ac) 30%,transparent);transition:left .4s cubic-bezier(.3,1.3,.5,1),width .3s;pointer-events:none}
.nb{position:relative;z-index:1;flex:0 0 76px;display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 2px;color:color-mix(in srgb,var(--ac) 40%,#fff);overflow:hidden;border-radius:16px;transition:color .25s,transform .15s}
.nb svg{font-size:28px;transition:transform .35s cubic-bezier(.3,1.6,.5,1)}
.nb span{font:italic 500 17px var(--script)}
.nb.on{color:#fff}.nb.on svg{transform:translateY(-2px) scale(1.12)}
.nb:active{transform:scale(.9)}
.nb.gold{color:#f4c14c}
.nb.dot::after{content:attr(data-n);position:absolute;top:2px;right:16%;min-width:18px;height:18px;border-radius:9px;background:#ff4d6d;color:#fff;font:700 11px var(--sans);display:grid;place-items:center;padding:0 4px}
.rp{position:absolute;border-radius:50%;background:rgba(255,255,255,.35);transform:scale(0);animation:rp .6s ease-out forwards;pointer-events:none}
@keyframes rp{to{transform:scale(1);opacity:0}}
#toast{position:fixed;left:50%;bottom:110px;transform:translate(-50%,20px);background:#1b1038;border:1px solid var(--ac);padding:10px 18px;border-radius:99px;opacity:0;transition:.35s;z-index:60;font-weight:600;pointer-events:none}
#toast.on{opacity:1;transform:translate(-50%,0)}
/* overlays */
#frz{position:fixed;inset:0;z-index:40;display:none;flex-direction:column;align-items:center;justify-content:center;gap:18px;background:rgba(0,0,0,.55);cursor:wait;touch-action:none}
#frz.on{display:flex}
#frz .sp{width:54px;height:54px;border-radius:50%;border:5px solid rgba(255,255,255,.2);border-top-color:#fff;animation:spin 1s linear infinite}
#frz p{margin:0;font-weight:700;font-size:18px;text-align:center;padding:0 20px}
@keyframes spin{to{transform:rotate(360deg)}}
#upd{position:fixed;inset:0;z-index:45;display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:#0078d4;color:#fff;font-family:"Segoe UI",system-ui,sans-serif;text-align:center;cursor:none;touch-action:none}
#upd.on{display:flex}
#upd .sp{width:46px;height:46px;border-radius:50%;border:4px solid rgba(255,255,255,.3);border-top-color:#fff;animation:spin 1s linear infinite}
#upd p{margin:0;font-size:22px}#upd small{font-size:15px;opacity:.9}
.em{position:fixed;top:-50px;font-size:32px;z-index:35;pointer-events:none;animation:fall 3.2s linear forwards}
@keyframes fall{to{transform:translateY(115vh) rotate(360deg)}}
/* admin */
.vis{padding:12px 0;border-top:1px solid var(--line)}
.vis .vh{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;gap:8px}
.vis small{color:var(--mut);margin-left:8px}
.vis .vb{display:flex;flex-wrap:wrap;gap:6px}
.vis button{padding:7px 12px;border-radius:99px;background:rgba(255,255,255,.08);border:1px solid var(--line);font-weight:600;font-size:13px}
.vis button:active{background:var(--ac)}
#msg{position:fixed;inset:0;z-index:50;display:none;place-items:center;background:rgba(0,0,0,.7);padding:24px}#msg.on{display:grid}
#msg .bx{max-width:320px;width:100%;padding:24px;border-radius:22px;background:#12102a;border:1px solid var(--ac);text-align:center;animation:rise .4s both}
#msg .bx p{font-size:18px;margin:0 0 16px;word-break:break-word}#msg button{padding:10px 26px;border-radius:99px;background:var(--ac);font-weight:700}
#wel{position:fixed;inset:0;z-index:80;display:none;place-items:center;background:rgba(5,4,10,.94);padding:24px}#wel.on{display:grid}
#wel .bx{max-width:360px;width:100%;padding:28px;border-radius:24px;background:#12102a;border:1px solid var(--ac);text-align:center;box-shadow:0 0 60px -10px var(--ac);animation:rise .5s both}
#wel p{color:var(--mut);margin:6px 0 4px}#wel .go{margin-top:14px;width:100%;height:46px;border-radius:14px;background:var(--ac);font-weight:700;color:#fff}
#cl{position:fixed;inset:0;z-index:75;display:none;place-items:center;background:rgba(0,0,0,.72);padding:20px}#cl.on{display:grid}
#cl .bx{max-width:460px;width:100%;max-height:85vh;display:flex;flex-direction:column;padding:22px;border-radius:24px;background:#12102a;border:1px solid var(--ac);box-shadow:0 0 60px -12px var(--ac);animation:rise .4s both}
#cl h2{font:700 40px/1.1 var(--script);margin:6px 0 10px;color:#fff;text-shadow:0 0 18px color-mix(in srgb,var(--ac) 80%,transparent)}
#clB{overflow-y:auto;flex:1;margin-bottom:14px}
.cle{border-top:1px solid var(--line);padding:10px 0}
.cle>summary{cursor:pointer;font-size:16px;list-style:none}.cle>summary::-webkit-details-marker{display:none}
.cle small{display:block;color:var(--mut);margin-top:2px;font-size:12px}
.cli{display:flex;gap:10px;align-items:flex-start;margin-top:10px;font-size:14px;line-height:1.4}
.ck{flex:none;min-width:62px;text-align:center;padding:2px 8px;border-radius:99px;font-size:11px;font-weight:700;background:var(--ac);color:#fff}
.ck-fixed{background:#1fa97a}.ck-improved{background:#3f7bd1}
#clOk{height:46px;border-radius:14px;background:var(--ac);font-weight:700;color:#fff}
</style></head><body>
<div id="app">
 <div id="tabs"><div id="tabList"></div><button id="newTab" data-r aria-label="New tab"></button></div>
 <div id="bar">
  <button class="ib" id="bk" data-r aria-label="Back"></button><button class="ib" id="fw" data-r aria-label="Forward"></button>
  <button class="ib" id="rl" data-r aria-label="Reload"></button><button class="ib" id="hm" data-r aria-label="Home"></button>
  <form id="addrForm"><input id="addr" placeholder="Search or enter address" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go"></form>
  <button class="ib" id="bm" data-r aria-label="Bookmark"></button>
 </div>
 <div id="ban"></div>
 <main id="stage">
  <div class="glow"></div><div class="aur"><i></i><i></i><i></i></div><div class="gb"></div><canvas id="bgc"></canvas><div id="ld"></div>
  <section class="page on" id="p-browser">
   <div id="home">
    <div class="hi" id="hi"></div><div class="brand">drift</div>
    <form id="sf"><input id="sq" placeholder="search the web or type a url" autocomplete="off" autocapitalize="off" enterkeyhint="go"><button id="sg" type="submit" data-r aria-label="Go"></button></form>
    <button class="pill" id="engBtn" type="button"></button>
    <div class="sc" id="sc"></div><div class="time" id="time"></div><div class="date" id="date"></div>
   </div>
   <iframe id="view" title="Page" allow="fullscreen; autoplay; gamepad; clipboard-write"></iframe>
  </section>
  <section class="page" id="p-games"><div class="pg"><h2>games</h2><p class="sub">Tap a site to open it. Hold one you added to remove it.</p><input id="gf" placeholder="Search games..." autocomplete="off"><div class="grid" id="g-games"></div></div></section>
  <section class="page" id="p-fun"><iframe id="funf" title="Fun games" allow="fullscreen; autoplay; gamepad; clipboard-write" style="position:absolute;inset:0;width:100%;height:100%;border:0;background:#050505"></iframe></section>
  <section class="page" id="p-music"><div class="pg"><h2>music</h2><p class="sub">Heavy apps may not load through the proxy.</p><div class="grid" id="g-music"></div></div></section>
  <section class="page" id="p-chat"><div class="pg"><h2>chat</h2><p class="sub">Live chat with everyone on Drift.</p>
   <div class="card"><div class="row"><h3>Lounge</h3><span class="own" id="cOn">0 online</span></div>
    <div id="cbox"></div>
    <form id="cf"><input class="inp" id="cIn" maxlength="240" placeholder="Say something..." autocomplete="off" enterkeyhint="send"><button type="submit" data-r>Send</button></form></div>
   <h3 style="margin:22px 0 12px">Other chat apps</h3>
   <p class="sub" style="margin-top:-6px">Logins can be hit or miss through a proxy.</p>
   <div class="grid" id="g-chat"></div></div></section>
  <section class="page" id="p-tools"><div class="pg"><h2>tools</h2><p class="sub">Handy stuff that works anywhere.</p>
   <div class="card"><h3>Calculator</h3><div class="cdsp" id="cdsp">0</div><div class="ckeys" id="ckeys"></div></div>
   <div class="card"><h3>Stopwatch</h3><div class="big2" id="swT">00:00.00</div><div class="seg"><button id="swGo">Start</button><button id="swRs">Reset</button></div></div>
   <div class="card"><h3>Timer</h3><div class="big2" id="tmT">00:00</div><div class="seg"><input class="inp" id="tmIn" type="number" min="1" max="999" value="5" style="width:90px;margin:0"><span style="color:var(--mut)">minutes</span><button id="tmGo">Start</button></div></div>
   <div class="card"><h3>Notes</h3><textarea class="inp" id="notes" placeholder="Type anything, it saves automatically"></textarea></div></div></section>
  <section class="page" id="p-saved"><div class="pg"><h2>saved</h2><p class="sub">Your bookmarks and recent history.</p>
   <div class="card"><h3>Bookmarks</h3><div id="bmList"></div></div>
   <div class="card"><div class="row"><h3>History</h3><button class="seg" id="hClr" style="margin:0"><span style="padding:6px 14px;border-radius:99px;border:1px solid var(--line);font-size:13px;font-weight:600">Clear</span></button></div><div id="hList"></div></div></div></section>
  <section class="page" id="p-ideas"><div class="pg"><h2>ideas</h2><p class="sub">Request an update or report a bug. It is sent anonymously.</p>
   <form class="card" id="sgF"><h3>What should we add?</h3><div class="seg" id="sgc"></div>
    <textarea class="inp" id="sgT" maxlength="500" placeholder="Describe your idea..."></textarea>
    <div class="row" style="margin-top:12px"><span id="sgN" style="color:var(--mut);font-size:13px">0/500</span><div class="seg" style="margin:0"><button class="on" id="sgB" type="submit">Send</button></div></div></form></div></section>
  <section class="page" id="p-noads"><div class="pg"><h2>no ads</h2><p class="sub">Strips common ad scripts from pages you open.</p>
   <div class="card" style="text-align:center"><div class="big" id="adIc"></div><div class="row"><div style="text-align:left"><h3 id="adT">Ad blocker</h3><p id="adP"></p></div><button class="sw" id="adSw" aria-label="Toggle"></button></div></div></div></section>
  <section class="page" id="p-settings"><div class="pg"><h2>settings</h2><p class="sub">Saved on this device.</p>
   <div class="card"><h3>Username</h3><p>Shown in chat and to the owner.</p><input class="inp" id="nm" maxlength="20" autocomplete="off"></div>
   <div class="card"><h3>Accent color</h3><div class="dots" id="dots"></div></div>
   <div class="card"><h3>Background</h3><div class="seg" id="bgs"></div><h3 style="margin-top:18px">Animations</h3><div class="seg" id="mot"></div></div>
   <div class="card"><h3>Search engine</h3><div class="seg" id="eng"></div></div>
   <div class="card"><h3>Tab disguise</h3><p>Changes the tab title and icon.</p><div class="seg" id="cloak"></div></div>
   <div class="card"><h3>Panic key</h3><p>Press it anywhere to jump to another site instantly.</p>
    <div class="seg"><span style="color:var(--mut)">Key:</span><b id="pkv"></b><button id="pkSet">Change</button></div>
    <input class="inp" id="pu" placeholder="Where to go (https://...)" autocomplete="off" autocapitalize="off"></div>
   <div class="card" id="adm"></div>
   <div class="card"><h3>Data</h3><p>Move your settings, bookmarks and notes between devices.</p>
    <div class="seg"><button id="wn">What is new</button><button id="exp">Export</button><button id="imp">Import</button></div>
    <p style="margin-top:14px">The owner can see who is online, their username and which site they are on. Chat messages are visible to everyone.</p>
    <button class="danger" id="reset" data-r>Clear everything</button></div>
   <div class="card"><h3>Credits</h3><p>The people behind Drift.</p>
    <div class="cr" style="margin-top:10px"><span>Jaiden</span><span class="own">Owner</span></div>
    <div class="cr"><span>Stanley</span></div>
    <div class="cr"><span>Jake</span></div>
    <div class="cr"><span>Freddie</span></div></div></div></section>
 </main>
 <nav id="nav"><div id="ind"></div></nav>
</div>
<div id="frz"><div class="sp"></div><p id="frzT">Page not responding...</p></div>
<div id="upd"><div class="sp"></div><p>Working on updates</p><p><span id="updN">0</span>% complete</p><small>Don't turn off your device. This will take a while.</small></div>
<div id="msg"><div class="bx"><div style="font:700 30px var(--script);margin-bottom:6px">message</div><p id="msgT"></p><button id="msgOk">OK</button></div></div>
<div id="wel"><form class="bx" id="welF"><div style="font:700 46px var(--script)">welcome</div><p>Pick a username. It shows in chat and the owner can see it.</p><input class="inp" id="welIn" maxlength="20" autocomplete="off" autocapitalize="off" placeholder="Username"><p id="welE" style="color:#ff9aa7;min-height:20px;margin-top:8px"></p><button type="submit" class="go">Continue</button></form></div>
<div id="cl"><div class="bx"><span class="own" id="clV" style="align-self:flex-start"></span><h2>what's new</h2><div id="clB"></div><button id="clOk">Got it</button></div></div>
<div id="toast"></div>
<script>
var $=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}
function later(fn,ms){return setTimeout(fn,ms)}
function p2(n){return n<10?'0'+n:''+n}
var P={globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
game:'<rect x="3" y="7" width="18" height="11" rx="5"/><path d="M8 10v5M5.5 12.5h5M15.5 11.5h.01M18 13.5h.01"/>',
music:'<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
chat:'<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1.1-4.2A8 8 0 1121 12z"/><path d="M8.5 11h7M8.5 14h4"/>',
ban:'<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
gear:'<circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="7.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19"/>',
star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',bk:'<path d="M19 12H5M11 6l-6 6 6 6"/>',fw:'<path d="M5 12h14M13 6l6 6-6 6"/>',rl:'<path d="M20 11a8 8 0 10-2.3 5.7M20 4v7h-7"/>',
hm:'<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/>',pl:'<path d="M12 5v14M5 12h14"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',
go:'<path d="M5 12h14M13 6l6 6-6 6"/>',lock:'<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 018 0v3"/>',shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
tools:'<path d="M14.7 6.3a4 4 0 00-5.4 5.2L3.5 17.3a1.5 1.5 0 002.1 2.1l5.8-5.8a4 4 0 005.2-5.4l-2.4 2.4-2.1-.6-.6-2.1z"/>',
bmk:'<path d="M6 4h12v17l-6-4-6 4z"/>',bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>'};
function ic(n){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+P[n]+'</svg>'}
var S={};try{S=JSON.parse(localStorage.getItem('drift:s')||'{}')}catch(e){}
S.engine=S.engine||'ddg';S.ac=S.ac||'#8b3fd1';S.cloak=S.cloak||'';S.sites=S.sites||[];S.marks=S.marks||[];
S.name=S.name||('guest'+(100+Math.floor(Math.random()*900)));S.bg=S.bg||'stars';if(S.motion===undefined)S.motion=true;
S.pk=S.pk||'\`';S.pu=S.pu||'https://classroom.google.com';S.hist=S.hist||[];S.bm=S.bm||[];S.notes=S.notes||'';
function save(){try{localStorage.setItem('drift:s',JSON.stringify(S))}catch(e){}}
save();
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
/* long-press to remove */
function hold(el,fn){var h=0,fired=false;
 el.addEventListener('pointerdown',function(){fired=false;h=setTimeout(function(){fired=true;fn()},650)});
 ['pointerup','pointerleave','pointercancel'].forEach(function(ev){el.addEventListener(ev,function(){clearTimeout(h)})});
 el.addEventListener('contextmenu',function(e){e.preventDefault()});
 el.addEventListener('click',function(e){if(fired){e.stopImmediatePropagation();e.preventDefault();fired=false}},true)}
/* ripple */
document.addEventListener('pointerdown',function(e){var el=e.target.closest('[data-r],.tile,.nb,.s,.seg button');if(!el)return;
 var r=el.getBoundingClientRect(),d=Math.max(r.width,r.height)*1.6,s=document.createElement('span');s.className='rp';
 s.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';
 if(getComputedStyle(el).position==='static')el.style.position='relative';el.style.overflow='hidden';el.appendChild(s);later(function(){s.remove()},650)});
/* background */
var cv=$('bgc'),cx=cv.getContext('2d'),stars=[],raf=0;
function sizeC(){var r=$('stage').getBoundingClientRect();cv.width=r.width;cv.height=r.height;stars=[];var n=Math.round(r.width*r.height/9000);
 for(var i=0;i<n;i++)stars.push({x:Math.random()*r.width,y:Math.random()*r.height,r:Math.random()*1.5+.3,s:Math.random()*.25+.05,p:Math.random()*6.28})}
function frame(){raf=0;if(S.bg!=='stars')return;cx.clearRect(0,0,cv.width,cv.height);cx.fillStyle='#fff';
 stars.forEach(function(s){if(S.motion){s.y+=s.s;if(s.y>cv.height){s.y=0;s.x=Math.random()*cv.width}s.p+=.03}
  cx.globalAlpha=.35+.5*Math.abs(Math.sin(s.p));cx.beginPath();cx.arc(s.x,s.y,s.r,0,6.283);cx.fill()});
 if(S.motion&&!document.hidden)raf=requestAnimationFrame(frame)}
function bgApply(){var s=$('stage');['stars','aurora','grid','plain'].forEach(function(k){s.classList.toggle('bg-'+k,S.bg===k)});
 cv.style.display=S.bg==='stars'?'block':'none';document.body.classList.toggle('calm',!S.motion);
 if(raf){cancelAnimationFrame(raf);raf=0}if(S.bg==='stars')frame()}
document.addEventListener('visibilitychange',bgApply);
window.addEventListener('resize',function(){sizeC();bgApply();var a=document.querySelector('.nb.on');if(a)nav(a.dataset.p)});
/* tabs + browsing */
var tabs=[],cur=null,uid=0,vt=0;
function nt(){var t={id:++uid,title:'New Tab',url:'',h:[],i:-1};tabs.push(t);cur=t;draw();showHome()}
function isBm(u){return S.bm.some(function(b){return b.u===u})}
function draw(){var l=$('tabList'),sg=tabs.map(function(t){return t.id+t.title+t.url}).join('|')+(cur&&cur.id);if(sg!==draw.s){draw.s=sg;l.innerHTML='';tabs.forEach(function(t){var d=document.createElement('div');d.className='tab'+(t===cur?' on':'');
 d.innerHTML='<span class="ti">'+(t.url?host(t.url).charAt(0).toUpperCase():'+')+'</span><span class="tt"></span><button class="tx" aria-label="Close tab">'+ic('x')+'</button>';
 d.querySelector('.tt').textContent=t.title;
 d.onclick=function(e){if(e.target.closest('.tx')){closeTab(t);return}cur=t;draw();t.url?load(t.url):showHome();nav('browser')};l.appendChild(d)})}
 if(document.activeElement!==$('addr'))$('addr').value=cur&&cur.url?cur.url:'';$('bk').disabled=!cur||cur.i<0;$('fw').disabled=!cur||cur.i>=cur.h.length-1;
 $('bm').classList.toggle('on',!!(cur&&cur.url&&isBm(cur.url)))}
function closeTab(t){var i=tabs.indexOf(t);tabs.splice(i,1);if(!tabs.length)return nt();if(cur===t){cur=tabs[Math.max(0,i-1)];cur.url?load(cur.url):showHome()}draw()}
function ldDone(){$('ld').style.width='100%';later(function(){$('ld').style.opacity='0';later(function(){$('ld').style.width='0'},350)},250)}
function showHome(){vt=0;$('stage').classList.remove('browsing');$('view').src='about:blank';$('ld').style.opacity='0';draw()}
function load(u){vt=cur.id;$('stage').classList.add('browsing');var l=$('ld');l.style.transition='none';l.style.width='0';l.style.opacity='1';
 later(function(){l.style.transition='width .4s,opacity .3s';l.style.width='70%'},30);$('view').src='/__go?u='+encodeURIComponent(u)}
$('view').onload=function(){if($('stage').classList.contains('browsing'))ldDone()};
function rec(u){var h=S.hist;if(h[0]&&h[0].u===u)return;h.unshift({u:u,t:host(u),ts:Date.now()});S.hist=h.slice(0,60);save();drawSaved()}
function go(u,fromHist){if(!u)return;nav('browser');if(!fromHist){cur.h=cur.h.slice(0,cur.i+1);cur.h.push(u);cur.i=cur.h.length-1;rec(u)}
 cur.url=u;cur.title=host(u);draw();load(u)}
window.addEventListener('message',function(e){var d=e.data;if(e.origin!==location.origin||!d||!d.drift||e.source!==$('view').contentWindow||!cur||vt!==cur.id)return;
 if(d.url!==cur.url){cur.url=d.url;if(cur.h[cur.i]!==d.url){cur.h=cur.h.slice(0,cur.i+1);cur.h.push(d.url);cur.i=cur.h.length-1;rec(d.url)}}
 if(d.title)cur.title=d.title;draw()});
$('bk').onclick=function(){if(cur.i>0){cur.i--;go(cur.h[cur.i],1)}else if(cur.i===0){cur.i=-1;cur.url='';cur.title='New Tab';showHome()}};
$('fw').onclick=function(){if(cur.i<cur.h.length-1){cur.i++;go(cur.h[cur.i],1)}};
$('rl').onclick=function(){var b=$('rl').firstChild;b.style.transition='transform .6s';b.style.transform='rotate(360deg)';later(function(){b.style.transition='none';b.style.transform=''},650);if(cur.url)load(cur.url);else{clock();toast('Refreshed')}};
$('hm').onclick=function(){cur.url='';cur.title='New Tab';cur.i=-1;cur.h=[];showHome();nav('browser')};
$('newTab').onclick=function(){nt();nav('browser')};
$('bm').onclick=function(){if(!cur||!cur.url){toast('Open a page first');return}
 if(isBm(cur.url)){S.bm=S.bm.filter(function(b){return b.u!==cur.url});toast('Bookmark removed')}else{S.bm.unshift({u:cur.url,t:cur.title||host(cur.url)});toast('Bookmarked')}
 save();draw();drawSaved()};
$('addrForm').onsubmit=function(e){e.preventDefault();var u=toUrl($('addr').value);$('addr').blur();go(u)};
$('sf').onsubmit=function(e){e.preventDefault();var u=toUrl($('sq').value);$('sq').blur();$('sq').value='';go(u)};
$('engBtn').onclick=function(){var k=Object.keys(ENG);S.engine=k[(k.indexOf(S.engine)+1)%k.length];save();drawEng();drawSettings()};
function drawEng(){$('engBtn').textContent='searching with '+ENG[S.engine][0]+' \\u00b7 tap to change'}
/* pages */
var PAGES=[['browser','globe','browser'],['games','game','games'],['fun','star','fun'],['music','music','music'],['chat','chat','chat'],['tools','tools','tools'],['saved','bmk','saved'],['ideas','bulb','ideas'],['noads','ban','no ads'],['settings','gear','settings']];
PAGES.forEach(function(p){var b=document.createElement('button');b.className='nb'+(p[0]==='noads'?' gold':'');b.dataset.p=p[0];b.innerHTML=ic(p[1])+'<span>'+p[2]+'</span>';
 b.onclick=function(){nav(p[0])};$('nav').appendChild(b)});
function nav(n){if(n==='fun'&&!$('funf').getAttribute('src'))$('funf').src='/cine/';document.querySelectorAll('.page').forEach(function(p){p.classList.toggle('on',p.id==='p-'+n)});
 document.querySelectorAll('.nb').forEach(function(b){var on=b.dataset.p===n;b.classList.toggle('on',on);if(on){var i=$('ind');i.style.left=b.offsetLeft+4+'px';i.style.width=b.offsetWidth-8+'px';
  var nv=$('nav');nv.scrollTo({left:b.offsetLeft-(nv.clientWidth-b.offsetWidth)/2,behavior:'smooth'})}});
 if(n==='chat'){lastCh='';chatPoll()}}
function tiles(id,list,extra){var g=$(id);g.innerHTML='';list.forEach(function(x,k){var t=document.createElement('button');t.className='tile';t.style.animationDelay=k*60+'ms';
 t.innerHTML='<span class="fi"><img alt="" src="'+fav(x[1])+'"></span><b></b><small></small>';t.querySelector('b').textContent=x[0];
 t.querySelector('small').textContent=x[2]||host(x[1]);t.querySelector('img').onerror=function(){this.parentNode.textContent=x[0].charAt(0)};
 t.onclick=function(){go(x[1])};g.appendChild(t)});if(extra)extra(g)}
function drawGames(){tiles('g-games',GAMES.concat(S.sites),function(g){
 S.sites.forEach(function(s,i){var el=g.children[GAMES.length+i];hold(el,function(){if(confirm('Remove '+s[0]+'?')){S.sites.splice(i,1);save();drawGames()}})});
 var a=document.createElement('button');a.className='tile add';a.innerHTML=ic('pl')+'Add a site';
 a.onclick=function(){var n=prompt('Site name');if(!n)return;var u=prompt('Site address (https://...)');if(!u)return;if(!/^https?:/i.test(u))u='https://'+u;S.sites.push([n,u,host(u)]);save();drawGames();toast('Added '+n)};g.appendChild(a)})}
$('gf').oninput=function(){var q=this.value.toLowerCase();document.querySelectorAll('#g-games .tile:not(.add)').forEach(function(t){t.style.display=t.textContent.toLowerCase().indexOf(q)<0?'none':''})};
/* home */
function ord(n){var s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0])}
function clock(){var d=new Date(),h=d.getHours();$('hi').textContent='good '+(h<5?'night':h<12?'morning':h<18?'afternoon':'evening')+', '+S.name;
 $('time').textContent=p2(h)+':'+p2(d.getMinutes());
 $('date').textContent=d.toLocaleDateString('en-US',{weekday:'long'})+', '+d.toLocaleDateString('en-US',{month:'long'})+' '+ord(d.getDate())+', '+d.getFullYear()}
function shortcuts(){var c=$('sc');c.innerHTML='';SC.concat(S.marks).forEach(function(x,k){var s=document.createElement('button');s.className='s';s.style.animationDelay=.3+k*.08+'s';
 s.innerHTML='<span class="c"><img alt="" src="'+fav(x[1])+'"></span><b></b>';s.querySelector('b').textContent=x[0];s.querySelector('img').onerror=function(){this.remove()};
 if(k>=SC.length)hold(s,function(){if(confirm('Remove '+x[0]+'?')){S.marks.splice(k-SC.length,1);save();shortcuts()}});
 s.onclick=function(){go(x[1])};c.appendChild(s)});var a=document.createElement('button');a.className='s';a.innerHTML='<span class="c">'+ic('pl')+'</span><b>add</b>';a.querySelector('.c').style.fontSize='34px';
 a.onclick=function(){var n=prompt('Shortcut name');if(!n)return;var u=prompt('Address (https://...)');if(!u)return;if(!/^https?:/i.test(u))u='https://'+u;S.marks.push([n,u]);save();shortcuts();toast('Added '+n)};c.appendChild(a)}
/* saved */
function listInto(id,arr,del,empty){var c=$(id);c.innerHTML='';if(!arr.length){c.innerHTML='<div class="empty">'+empty+'</div>';return}
 arr.forEach(function(x,i){var r=document.createElement('div');r.className='li';
  r.innerHTML='<img alt="" src="'+fav(x.u)+'"><div class="t"><b></b><small></small></div><button class="x" aria-label="Remove">'+ic('x')+'</button>';
  r.querySelector('b').textContent=x.t||host(x.u);r.querySelector('small').textContent=host(x.u);r.querySelector('img').onerror=function(){this.style.visibility='hidden'};
  r.querySelector('.t').onclick=function(){go(x.u)};r.querySelector('.x').onclick=function(){del(i)};c.appendChild(r)})}
function drawSaved(){listInto('bmList',S.bm,function(i){S.bm.splice(i,1);save();draw();drawSaved()},'No bookmarks yet. Tap the star in the toolbar on any page.');
 listInto('hList',S.hist,function(i){S.hist.splice(i,1);save();drawSaved()},'Nothing here yet.')}
$('hClr').onclick=function(){S.hist=[];save();drawSaved();toast('History cleared')};
/* chat */
var lastCh='';
function chatPoll(){if(!$('p-chat').classList.contains('on'))return;
 fetch('/__p/chatlist').then(function(r){return r.json()}).then(function(d){var l=d.list||[],sg=l.length+':'+(l.length?l[l.length-1].ts:0);$('cOn').textContent=(d.online||0)+' online';
  if(sg===lastCh)return;var first=!lastCh;lastCh=sg;var b=$('cbox'),stick=first||b.scrollTop+b.clientHeight>=b.scrollHeight-40;b.innerHTML='';
  if(!l.length){b.innerHTML='<div class="empty">No messages yet. Say hi!</div>'}
  l.forEach(function(m){var e=document.createElement('div');e.className='mb'+(m.id===vid?' me':'');var w=document.createElement('b');w.textContent=m.n;
   if(m.adm){var o=document.createElement('em');o.textContent='owner';w.appendChild(o)}var t=document.createElement('span');t.textContent=m.t;e.appendChild(w);e.appendChild(t);b.appendChild(e)});
  if(stick)b.scrollTop=b.scrollHeight}).catch(function(){})}
$('cf').onsubmit=function(e){e.preventDefault();var t=$('cIn').value.trim();if(!t)return;$('cIn').value='';
 fetch('/__p/chatpost',{method:'POST',body:JSON.stringify({id:vid,name:S.name,text:t})}).then(function(){lastCh='';chatPoll()})};
/* CHANGELOG: add a new entry at the TOP and bump the version every update. Kinds: New, Fixed, Improved */
var LOG=[
 {v:'1.4',d:'18 Nov 2026',t:'Usernames, ideas and fixes',n:[
  ['New','Usernames: pick one the first time you open Drift. It shows in chat, and you can change it any time in Settings.'],
  ['New','Ideas tab: send an update request or bug report. It is sent anonymously, one every 30 seconds.'],
  ['New','This what is new window. It shows once after every update, and you can reopen it from Settings.'],
  ['Fixed','Opening a new site after DuckMath no longer sends you back to DuckMath. Every site now loads fresh.']]},
 {v:'1.3',d:'10 Nov 2026',t:'Big look and tools update',n:[
  ['New','Tools page with a calculator, stopwatch, timer and notes that save automatically.'],
  ['New','Saved page with bookmarks (tap the star in the toolbar) and your history.'],
  ['New','Live chat lounge where everyone on Drift can talk.'],
  ['New','Panic key: press it to jump to another site instantly. Pick the key and the site in Settings.'],
  ['New','More tab disguises, plus export and import of your settings between devices.'],
  ['Improved','New backgrounds (stars, aurora, grid), a custom accent colour picker, a loading bar, a bigger clock on the home page and a fixed title that no longer shows as a box.'],
  ['Fixed','The games search box now works.']]},
 {v:'1.2',d:'9 Nov 2026',t:'Credits',n:[
  ['New','Credits added to Settings.']]}
];
function drawLog(){var h='';LOG.forEach(function(e,i){h+='<details class="cle"'+(i===0?' open':'')+'><summary><b>v'+esc(e.v)+'</b> '+esc(e.t)+'<small>'+esc(e.d)+'</small></summary>'+
  e.n.map(function(x){return '<div class="cli"><span class="ck ck-'+x[0].toLowerCase()+'">'+x[0]+'</span><span>'+esc(x[1])+'</span></div>'}).join('')+'</details>'});
 $('clB').innerHTML=h;$('clV').textContent='v'+LOG[0].v}
function showLog(){drawLog();$('cl').classList.add('on')}
function maybeLog(){if(S.seen!==LOG[0].v)showLog()}
function closeLog(){$('cl').classList.remove('on');S.seen=LOG[0].v;save()}
$('clOk').onclick=closeLog;$('cl').onclick=function(e){if(e.target===this)closeLog()};$('wn').onclick=showLog;
/* ideas */
var sgCat='Feature';
function drawSg(){seg('sgc',[['Feature','Feature'],['Game','Game'],['Bug','Bug'],['Other','Other']],function(k){return sgCat===k},function(k){sgCat=k;drawSg()})}
$('sgT').oninput=function(){$('sgN').textContent=this.value.length+'/500'};
$('sgF').onsubmit=function(e){e.preventDefault();var t=$('sgT').value.trim();if(t.length<5){toast('Write a bit more');return}
 var last=0;try{last=+localStorage.getItem('drift:sg')||0}catch(x){}
 if(Date.now()-last<30000){toast('Wait a few seconds');return}
 $('sgB').disabled=true;
 fetch('/__suggest',{method:'POST',body:JSON.stringify({text:t,cat:sgCat})}).then(function(r){return r.json()}).then(function(d){$('sgB').disabled=false;
  if(d&&d.ok){try{localStorage.setItem('drift:sg',Date.now())}catch(x){}$('sgT').value='';$('sgN').textContent='0/500';toast('Sent. Thanks!')}else toast((d&&d.err)||'Could not send')}).catch(function(){$('sgB').disabled=false;toast('Could not send')})};
/* no ads */
function ads(){return /(?:^|;\\s*)noads=1/.test(document.cookie)}
function drawAds(){var on=ads();$('adSw').classList.toggle('on',on);$('adIc').innerHTML=ic(on?'shield':'ban');$('adIc').classList.toggle('off',!on);
 $('adT').textContent=on?'Ad blocker is on':'Ad blocker is off';$('adP').textContent=on?'Common ad scripts are removed from pages.':'Turn it on to strip ad scripts.'}
$('adSw').onclick=function(){var on=!ads();fetch('/__noads/'+(on?1:0)).then(function(){drawAds();toast(on?'Ads blocked':'Ad blocker off')})};
/* tools */
var ce='';
function calcDraw(){$('cdsp').textContent=ce||'0'}
['C','(',')','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.','<','='].forEach(function(k){var b=document.createElement('button');b.textContent=k==='<'?'\\u232b':k;
 if('/*-+=C'.indexOf(k)>-1)b.className='op';
 b.onclick=function(){if(ce==='Error')ce='';
  if(k==='C')ce='';else if(k==='<')ce=ce.slice(0,-1);
  else if(k==='='){try{if(/^[0-9+*/().-]+$/.test(ce)){var r=Function('return ('+ce+')')();ce=isFinite(r)?String(parseFloat(r.toPrecision(12))):'Error'}}catch(e){ce='Error'}}
  else ce+=k;calcDraw()};$('ckeys').appendChild(b)});
var sw={t:0,run:false,st:0,h:0};
function swDraw(){var ms=sw.t+(sw.run?Date.now()-sw.st:0);$('swT').textContent=p2(Math.floor(ms/60000))+':'+p2(Math.floor(ms/1000)%60)+'.'+p2(Math.floor(ms/10)%100)}
$('swGo').onclick=function(){if(sw.run){sw.t+=Date.now()-sw.st;sw.run=false;clearInterval(sw.h);$('swGo').textContent='Start'}else{sw.st=Date.now();sw.run=true;sw.h=setInterval(swDraw,40);$('swGo').textContent='Stop'}swDraw()};
$('swRs').onclick=function(){sw.t=0;sw.st=Date.now();swDraw()};
var tm={end:0,h:0};
function tmTick(){var left=Math.max(0,tm.end-Date.now());$('tmT').textContent=p2(Math.floor(left/60000))+':'+p2(Math.floor(left/1000)%60);
 if(left<=0){clearInterval(tm.h);tm.h=0;$('tmGo').textContent='Start';beep();toast('Timer done')}}
$('tmGo').onclick=function(){if(tm.h){clearInterval(tm.h);tm.h=0;$('tmGo').textContent='Start';return}
 var m=Math.max(1,Math.min(999,parseInt($('tmIn').value,10)||5));tm.end=Date.now()+m*60000;tmTick();tm.h=setInterval(tmTick,250);$('tmGo').textContent='Stop'};
$('notes').value=S.notes;var nh=0;$('notes').oninput=function(){clearTimeout(nh);var v=this.value;nh=later(function(){S.notes=v;save()},400)};
function beep(){try{var C=window.AudioContext||window.webkitAudioContext,x=new C(),o=x.createOscillator(),g=x.createGain();o.connect(g);g.connect(x.destination);o.type='square';o.frequency.value=880;g.gain.value=.15;o.start();later(function(){o.stop();x.close()},600)}catch(e){}}
/* settings */
function accent(c){document.documentElement.style.setProperty('--ac',c);S.ac=c;save()}
var CK={'':['Off','Drift',''],docs:['Google Docs','Untitled document - Google Docs','https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico'],
 cls:['Classroom','Classroom','https://ssl.gstatic.com/classroom/favicon.png'],
 drive:['Drive','My Drive - Google Drive','https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png'],
 gmail:['Gmail','Inbox - Gmail','https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico'],
 wiki:['Wikipedia','Wikipedia, the free encyclopedia','https://en.wikipedia.org/static/favicon/wikipedia.ico'],
 blank:['New Tab','New Tab','']};
function cloak(){var c=CK[S.cloak]||CK[''];document.title=c[1];var l=document.querySelector('link[rel=icon]');
 if(!c[2]){if(l)l.remove();return}if(!l){l=document.createElement('link');l.rel='icon';document.head.appendChild(l)}l.href=c[2]}
function seg(id,items,isOn,pick){var e=$(id);e.innerHTML='';items.forEach(function(it){var b=document.createElement('button');b.textContent=it[1];b.className=isOn(it[0])?'on':'';b.onclick=function(){pick(it[0])};e.appendChild(b)})}
function drawSettings(){var d=$('dots');d.innerHTML='';['#8b3fd1','#3f7bd1','#1fa97a','#d13f7b','#d19a3f','#d14b3f','#2fb8c9','#7a8cff'].forEach(function(c){var b=document.createElement('button');
 b.style.background=c;b.className=S.ac===c?'on':'';b.setAttribute('aria-label',c);b.onclick=function(){accent(c);$('cc').value=c;drawSettings()};d.appendChild(b)});
 var ci=document.createElement('input');ci.type='color';ci.id='cc';ci.value=S.ac;ci.setAttribute('aria-label','Custom color');ci.oninput=function(){accent(this.value)};d.appendChild(ci);
 seg('bgs',[['stars','Stars'],['aurora','Aurora'],['grid','Grid'],['plain','Plain']],function(k){return S.bg===k},function(k){S.bg=k;save();bgApply();drawSettings()});
 seg('mot',[['1','On'],['0','Off']],function(k){return (k==='1')===!!S.motion},function(k){S.motion=k==='1';save();bgApply();drawSettings()});
 seg('eng',Object.keys(ENG).map(function(k){return [k,ENG[k][0]]}),function(k){return S.engine===k},function(k){S.engine=k;save();drawSettings();drawEng();toast('Search: '+ENG[k][0])});
 seg('cloak',Object.keys(CK).map(function(k){return [k,CK[k][0]]}),function(k){return S.cloak===k},function(k){S.cloak=k;save();cloak();drawSettings()});
 $('pkv').textContent=S.pk===' '?'Space':S.pk}
function cleanName(n){n=String(n||'').trim().replace(/ +/g,' ');return /^[A-Za-z0-9 _.-]{2,20}$/.test(n)?n:''}
$('nm').value=S.name;$('nm').onchange=function(){var n=cleanName(this.value);if(!n){toast('Use 2-20 letters, numbers, spaces, _ . or -');this.value=S.name;return}S.name=n;save();clock();ping();toast('Username saved')};
function welInit(){if(S.named){maybeLog();return}$('wel').classList.add('on');later(function(){$('welIn').focus()},300)}
$('welF').onsubmit=function(e){e.preventDefault();var n=cleanName($('welIn').value);if(!n){$('welE').textContent='Use 2-20 letters, numbers, spaces, _ . or -';return}
 S.name=n;S.named=true;save();$('wel').classList.remove('on');$('nm').value=n;clock();ping();toast('Welcome, '+n);later(maybeLog,700)};
$('pu').value=S.pu;$('pu').onchange=function(){var u=this.value.trim();if(u&&!/^https?:/i.test(u))u='https://'+u;S.pu=u||S.pu;this.value=S.pu;save();toast('Panic site saved')};
var pkCap=false;$('pkSet').onclick=function(){pkCap=true;toast('Press the key you want')};
document.addEventListener('keydown',function(e){
 if($('frz').classList.contains('on')||$('upd').classList.contains('on')){e.preventDefault();return}
 if(pkCap){e.preventDefault();pkCap=false;if(e.key!=='Escape'){S.pk=e.key;save();drawSettings();toast('Panic key set')}return}
 var tg=e.target.tagName;if(e.key===S.pk&&tg!=='INPUT'&&tg!=='TEXTAREA'){location.replace(S.pu);return}
 if((e.ctrlKey||e.metaKey)&&e.key==='l'){e.preventDefault();nav('browser');$('addr').focus();$('addr').select()}},true);
$('exp').onclick=function(){var j=JSON.stringify(S);if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(j).then(function(){toast('Copied to clipboard')},function(){prompt('Copy this:',j)});else prompt('Copy this:',j)};
$('imp').onclick=function(){var j=prompt('Paste exported data');if(!j)return;try{var o=JSON.parse(j);Object.keys(o).forEach(function(k){S[k]=o[k]});save();location.reload()}catch(e){toast('That did not work')}};
$('reset').onclick=function(){if(!confirm('Clear all saved settings?'))return;try{localStorage.removeItem('drift:s')}catch(e){}document.cookie='t=;Max-Age=0;Path=/';document.cookie='noads=;Max-Age=0;Path=/';location.reload()};
/* presence + admin */
var vid;try{vid=localStorage.getItem('drift:id');if(!vid){vid=Math.random().toString(36).slice(2,10);localStorage.setItem('drift:id',vid)}}catch(e){vid=Math.random().toString(36).slice(2,10)}
function isAdm(){return /(?:^|;\\s*)adm=/.test(document.cookie)}
function emojiRain(set){var E=(set||'\u{1F389}\u{1F355}\u{1F47B}\u{1F525}\u{1F4A9}\u{1F680}').match(/./gu)||['*'];for(var i=0;i<36;i++)(function(i){later(function(){var s=document.createElement('span');s.className='em';s.textContent=E[Math.floor(Math.random()*E.length)];
 s.style.left=Math.random()*96+'vw';s.style.animationDuration=2.2+Math.random()*2+'s';document.body.appendChild(s);later(function(){s.remove()},4500)},i*90)})(i)}
function showFrz(text,ms){if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();$('frzT').textContent=text;$('frz').classList.add('on');later(function(){$('frz').classList.remove('on')},ms)}
var updH=0;
function showUpd(ms){if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();var n=0;$('updN').textContent='0';$('upd').classList.add('on');clearInterval(updH);
 updH=setInterval(function(){n=Math.min(100,n+1);$('updN').textContent=n;if(n>=100){clearInterval(updH);later(function(){$('upd').classList.remove('on')},600)}},Math.max(30,ms/100))}
function runCmd(c){var a=$('app'),t=c.type,ms=Math.min(120,Math.max(1,c.dur||8))*1000;
 if(t==='home')$('hm').onclick();
 else if(t==='msg'){$('msgT').textContent=c.text||'';$('msg').classList.add('on')}
 else if(t==='flip'){a.classList.add('flip');later(function(){a.classList.remove('flip')},ms)}
 else if(t==='shake'){a.classList.add('shake');later(function(){a.classList.remove('shake')},ms)}
 else if(t==='zoom'){a.classList.add('zoom');later(function(){a.classList.remove('zoom')},ms)}
 else if(t==='rainbow'){a.classList.add('rainbow');later(function(){a.classList.remove('rainbow');a.style.filter=''},ms)}
 else if(t==='invert'){a.style.filter='invert(1) hue-rotate(180deg)';later(function(){a.style.filter=''},ms)}
 else if(t==='blur'){a.style.filter='blur(7px)';later(function(){a.style.filter=''},ms)}
 else if(t==='freeze')showFrz('Page not responding...',ms);
 else if(t==='kick'){$('hm').onclick();showFrz('You were disconnected by the owner.',ms)}
 else if(t==='update')showUpd(ms);
 else if(t==='emoji')emojiRain(c.text);
 else if(t==='beep')beep();
 else if(t==='go'&&c.text){var u=c.text;if(!/^https?:/i.test(u))u='https://'+u;go(u)}
 else if(t==='clear'){['flip','shake','zoom','rainbow'].forEach(function(k){a.classList.remove(k)});a.style.filter='';$('frz').classList.remove('on');$('upd').classList.remove('on');clearInterval(updH);$('msg').classList.remove('on')}}
function ping(){if(!S.named)return;fetch('/__p/ping',{method:'POST',body:JSON.stringify({id:vid,name:S.name,status:cur&&cur.url?'browsing':'home',url:cur&&cur.url?host(cur.url):''})}).then(function(r){return r.json()}).then(function(d){
 if(!d)return;if(d.cmds)d.cmds.forEach(runCmd);var b=$('ban');if(d.banner){b.textContent=d.banner;b.classList.add('on')}else b.classList.remove('on')}).catch(function(){})}
$('msgOk').onclick=function(){$('msg').classList.remove('on')};
var known=null,vis=[],admOn=null;
function poll(){if(!isAdm())return;fetch('/__p/list').then(function(r){return r.json()}).then(function(d){vis=d.list||[];
 if(known)vis.forEach(function(v){if(known.indexOf(v.id)<0)toast((v.name||'Someone')+' joined \\u00b7 '+vis.length+' online')});
 known=vis.map(function(v){return v.id});var b=document.querySelector('.nb[data-p=settings]');b.classList.toggle('dot',vis.length>0);b.dataset.n=vis.length;drawAdmin()}).catch(function(){})}
function send(id,type,text){fetch('/__p/cmd',{method:'POST',body:JSON.stringify({id:id,type:type,text:text,dur:parseInt($('dur').value,10)||8})}).then(function(){toast('Sent')})}
var ACTS=[['msg','Message'],['freeze','Freeze'],['update','Fake update'],['flip','Flip'],['shake','Shake'],['invert','Invert'],['blur','Blur'],['rainbow','Rainbow'],['zoom','Zoom'],['emoji','Emoji rain'],['beep','Beep'],['go','Redirect'],['home','Home'],['kick','Kick'],['clear','Clear']];
function btns(id){return ACTS.map(function(a){return '<button data-a="'+a[0]+'" data-i="'+esc(id)+'">'+a[1]+'</button>'}).join('')}
function drawAdmin(){var a=$('adm'),on=isAdm();
 if(on!==admOn){admOn=on;
  if(!on){a.innerHTML='<h3>Admin</h3><p>Enter the password to manage visitors.</p><input class="inp" id="pw" type="password" inputmode="numeric" placeholder="Password"><button class="danger" id="pwGo" style="margin:10px 0 0">Unlock</button><p id="pwE" style="margin-top:8px"></p>';
   $('pwGo').onclick=function(){fetch('/__admin',{method:'POST',body:JSON.stringify({pw:$('pw').value})}).then(function(r){if(r.ok){toast('Admin unlocked');known=null;poll();drawAdmin()}else $('pwE').textContent='Wrong password'})};return}
  a.innerHTML='<h3>Admin panel</h3><p id="vc"></p>'+
   '<div class="seg"><span style="color:var(--mut)">Effect length:</span><select class="inp" id="dur"><option value="3">3s</option><option value="5">5s</option><option value="8" selected>8s</option><option value="15">15s</option><option value="30">30s</option><option value="60">60s</option></select></div>'+
   '<div class="vis"><b>Announcement banner</b><input class="inp" id="bIn" maxlength="200" placeholder="Shown at the top for everyone"><div class="vb" style="margin-top:10px"><button id="bSet">Show</button><button id="bClr">Hide</button><button id="cClr">Clear chat</button></div></div>'+
   '<div id="vl"></div><button class="danger" id="adOff">Log out</button>';
  $('bSet').onclick=function(){fetch('/__p/banner',{method:'POST',body:JSON.stringify({text:$('bIn').value})}).then(function(){toast('Banner set')})};
  $('bClr').onclick=function(){fetch('/__p/banner',{method:'POST',body:JSON.stringify({text:''})}).then(function(){$('bIn').value='';toast('Banner hidden')})};
  $('cClr').onclick=function(){fetch('/__p/chatclear',{method:'POST',body:'{}'}).then(function(){lastCh='';toast('Chat cleared')})};
  $('vl').onclick=function(e){var b=e.target.closest('[data-a]');if(!b)return;var t=b.dataset.a,x='';
   if(t==='msg'){x=prompt('Message to send');if(!x)return}
   else if(t==='go'){x=prompt('Address to send them to');if(!x)return}
   else if(t==='emoji'){x=prompt('Emojis to rain (blank for random)')||''}
   send(b.dataset.i,t,x)};
  $('adOff').onclick=function(){fetch('/__admin/off').then(function(){known=null;vis=[];admOn=null;drawAdmin()})}}
 if(!on)return;
 $('vc').textContent=vis.length+' other '+(vis.length===1?'person':'people')+' online';
 var h='';if(vis.length)h+='<div class="vis"><div class="vh"><b>Everyone</b><small>'+vis.length+' online</small></div><div class="vb">'+btns('all')+'</div></div>';
 vis.forEach(function(v){h+='<div class="vis"><div class="vh"><b>'+esc(v.name||('Visitor '+v.n))+'</b><small>'+esc(v.url||v.status)+'</small></div><div class="vb">'+btns(v.id)+'</div></div>'});
 $('vl').innerHTML=h}
setInterval(ping,2000);setInterval(poll,3000);setInterval(chatPoll,3000);
/* boot */
[['newTab','pl'],['bk','bk'],['fw','fw'],['rl','rl'],['hm','hm'],['bm','star'],['sg','go']].forEach(function(x){$(x[0]).innerHTML=ic(x[1])});
accent(S.ac);cloak();clock();setInterval(clock,10000);shortcuts();drawGames();tiles('g-music',MUSIC);tiles('g-chat',CHAT);drawAds();drawSettings();drawEng();drawSaved();drawAdmin();sizeC();bgApply();ping();poll();nt();
later(function(){nav('browser')},60);welInit();drawSg();
</script></body></html>`;

// Set ADMIN_PW as a Worker secret (npx wrangler secret put ADMIN_PW). Falls back to 141432.
const pwOf = (env) => String((env && env.ADMIN_PW) || '141432');
async function adminToken(pw) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('drift-admin:' + pw));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
const SUG = new Map();
const SUGGEST_HOOK = 'https://discord.com/api/webhooks/1572741961276858428/V74WKnvrA2YKemvXXUfBCpmKp89cIdEwCNa4zHIUUxkNjEsoFzSXiy1_bPs8o4m15q9m'; // better: npx wrangler secret put DISCORD_WEBHOOK
const J = (o, st) => new Response(JSON.stringify(o), { status: st || 200, headers: { 'content-type': 'application/json' } });

export class Room {
  constructor() { this.v = new Map(); this.c = 0; this.chat = []; this.banner = ''; }
  online() { let n = 0; for (const x of this.v.values()) if (!x.admin) n++; return n; }
  async fetch(req) {
    const p = new URL(req.url).pathname, now = Date.now();
    for (const [k, x] of this.v) if (now - x.t > 20000) this.v.delete(k);
    const b = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    if (p === '/ping') {
      if (!b.id) return J({ cmds: [] });
      let x = this.v.get(b.id);
      if (!x) { x = { id: b.id, n: ++this.c, q: [] }; this.v.set(b.id, x); }
      x.t = now; x.status = String(b.status || '').slice(0, 20); x.admin = !!b.admin;
      x.name = String(b.name || '').slice(0, 20); x.url = String(b.url || '').slice(0, 60);
      const cmds = x.q.splice(0);
      return J({ cmds, banner: this.banner, online: this.online() });
    }
    if (p === '/list') return J({ list: [...this.v.values()].filter((x) => !x.admin).map((x) => ({ id: x.id, n: x.n, name: x.name, status: x.status, url: x.url })) });
    if (p === '/cmd') {
      const cmd = { type: String(b.type || '').slice(0, 20), text: String(b.text || '').slice(0, 200), dur: Math.min(120, Math.max(1, Number(b.dur) || 8)) };
      if (b.id === 'all') {
        let n = 0;
        for (const x of this.v.values()) if (!x.admin) { x.q.push(cmd); n++; }
        return J({ ok: true, n });
      }
      const x = this.v.get(b.id);
      if (x) x.q.push(cmd);
      return J({ ok: !!x });
    }
    if (p === '/banner') { this.banner = String(b.text || '').slice(0, 200); return J({ ok: true }); }
    if (p === '/chatlist') return J({ list: this.chat.slice(-40), online: this.online() });
    if (p === '/chatpost') {
      const text = String(b.text || '').trim().slice(0, 240);
      if (!text || !b.id) return J({ ok: false });
      const x = this.v.get(b.id);
      if (x) { if (now - (x.lp || 0) < 800) return J({ ok: false }); x.lp = now; }
      this.chat.push({ id: String(b.id).slice(0, 20), n: String(b.name || 'guest').trim().slice(0, 20) || 'guest', t: text, ts: now, adm: !!b.admin });
      if (this.chat.length > 80) this.chat.splice(0, this.chat.length - 80);
      return J({ ok: true });
    }
    if (p === '/chatclear') { this.chat = []; return J({ ok: true }); }
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

    if (path === '/cine' || path.startsWith('/cine/')) {
      if (env.ASSETS) { const r = await env.ASSETS.fetch(req); if (r.status !== 404) return r; }
      // Fallback: pull the files straight from the public Cine-Cloud repo (your own uploaded files win if present).
      const rel = decodeURIComponent(path.replace(/^\/cine\/?/, '')) || 'index.html';
      if (!rel.includes('..')) {
        const cdn = await fetch('https://cdn.jsdelivr.net/gh/codiesnutkiss-sudo/Cine-Cloud-SRC@main/src/' + rel.split('/').map(encodeURIComponent).join('/'));
        if (cdn.ok) {
          const types = { html: 'text/html;charset=utf-8', js: 'text/javascript;charset=utf-8', css: 'text/css;charset=utf-8', json: 'application/json', mp4: 'video/mp4', mp3: 'audio/mpeg', svg: 'image/svg+xml' };
          const h = new Headers(cdn.headers);
          ['content-security-policy', 'x-frame-options', 'cross-origin-resource-policy'].forEach((k) => h.delete(k));
          const ext = rel.split('.').pop().toLowerCase();
          if (types[ext]) h.set('content-type', types[ext]);
          return new Response(cdn.body, { status: 200, headers: h });
        }
      }
      return new Response('<body style="margin:0;display:grid;place-items:center;min-height:100vh;background:#050505;color:#eee;font:16px system-ui;text-align:center;padding:24px"><div><h2>Fun games files not found</h2><p>Add <b>public/cine/index.html</b> and <b>public/cine/random/gamelayout.js</b> to your GitHub repo, then wait for the redeploy.</p></div></body>', { status: 404, headers: { 'content-type': 'text/html;charset=utf-8' } });
    }
    if (path === '/__go') {
      let u;
      try { u = new URL(url.searchParams.get('u')); } catch (e) { return new Response('Bad address', { status: 400 }); }
      if (!/^https?:$/.test(u.protocol) || BLOCK.test(u.hostname) || u.host === url.host) return new Response('Blocked address', { status: 400 });
      return new Response(null, { status: 302, headers: { location: u.pathname + u.search, 'cache-control': 'no-store', 'set-cookie': cookie('t', encodeURIComponent(u.origin), 86400) } });
    }
    if (path === '/__suggest' && req.method === 'POST') {
      let b = {};
      try { b = await req.json(); } catch (e) {}
      const text = String(b.text || '').trim().slice(0, 500);
      const cat = ['Feature', 'Game', 'Bug', 'Other'].includes(b.cat) ? b.cat : 'Other';
      if (text.length < 5) return J({ ok: false, err: 'Write a bit more' }, 400);
      const ip = req.headers.get('cf-connecting-ip') || 'x', now = Date.now();
      if (now - (SUG.get(ip) || 0) < 30000) return J({ ok: false, err: 'Slow down a little' }, 429);
      SUG.set(ip, now); if (SUG.size > 500) SUG.clear();
      const r = await fetch(env.DISCORD_WEBHOOK || SUGGEST_HOOK, { method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username: 'Drift Ideas', allowed_mentions: { parse: [] }, embeds: [{ title: 'New update request', description: text, color: 0x8b3fd1, fields: [{ name: 'Type', value: cat, inline: true }], timestamp: new Date().toISOString() }] }) }).catch(() => null);
      return r && r.ok ? J({ ok: true }) : J({ ok: false, err: 'Could not send' }, 502);
    }
    const ADMIN_PW = pwOf(env);
    const tok = await adminToken(ADMIN_PW);
    const isAdmin = ck.split(/;\s*/).includes('adm=' + tok);
    if (path === '/__admin' && req.method === 'POST') {
      let pw = '';
      try { pw = (await req.json()).pw; } catch (e) {}
      if (String(pw) !== ADMIN_PW) return J({ ok: false }, 401);
      return new Response('{"ok":true}', { headers: { 'content-type': 'application/json', 'set-cookie': cookie('adm', tok, 31536000) } });
    }
    if (path === '/__admin/off') return new Response(null, { status: 204, headers: { 'set-cookie': cookie('adm', '', 0) } });
    if (path.startsWith('/__p/')) {
      if (!env.ROOM) return J({ cmds: [], list: [] });
      const room = env.ROOM.get(env.ROOM.idFromName('main'));
      const kind = path.slice(5);
      const open = ['ping', 'chatlist', 'chatpost'];
      if (!open.includes(kind) && !isAdmin) return J({ error: 'no' }, 403);
      let body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
      if (kind === 'ping' || kind === 'chatpost') body.admin = isAdmin;
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
    // Every site shares this origin, so the browser cache must be kept per-site (otherwise / or /index.html from the last site is served for the next one).
    out.append('Vary', 'Cookie');
    if ((out.get('content-type') || '').toLowerCase().includes('text/html')) out.set('cache-control', 'no-store');
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
