/* =====================================================================
   💌  LOVE NOTES  — EDIT THE LIST BELOW to make these your own messages.
   They unlock one at a time as she plays the games and hits milestones.
   (Heads up: this repo is PUBLIC, so anything you write here is publicly
   viewable. Keep it sweet but not too private, or use a private host.)
   ===================================================================== */
(function(){
  const NOTES = [
    "Merhaba aşkım 💛  Bu küçük oyun köşesini senin için yaptım. Umarım uzun dersleri biraz olsun kısaltır.",
    "Her seviyeyi geçtiğinde sırıttığımı hayal et — çünkü aklımda hep sen varsın.",
    "Derste sıkıldın mı? Ben de. Keşke şu an tam yanında otursaydım.",
    "Sen, tartışmasız, günümün en güzel parçasısın. Hem de her günün.",
    "Küçük bir hatırlatma: dikleş, bir nefes al ve gülümse. Bunu başaracaksın. ☀️",
    "Seni bir daha gördüğümde kocaman bir sarılma biriktiriyorum.",
    "Bugün geldiğin için seninle gurur duyuyorum — özellikle gün ağır geçtiyse.",
    "En sıradan günleri bile hatırlanmaya değer kılıyorsun.",
    "Zekisin, naziksin ve (ne şanslıyım ki) benimsin. 🌺",
    "Aklında ne varsa, birlikte çözeriz.",
    "Günün nasıl geçti diye şimdiden duymak için sabırsızlanıyorum.",
    "Tam da sen olduğun için teşekkürler. Çok şanslıyım.",
    "Az kaldı — birazcık daha, sonra bizim vaktimiz. 🍹",
    "Bu oyunlarda ne kadar ilerlersen ilerle, hep senin için tezahürat yapıyorum.",
    "Şimdilik son: Seni seviyorum. Git ve harikalar yarat. ❤️"
  ];
  /* ===================== (no need to edit below) ===================== */
  const KEY='tikiArcadeNotes_v1';
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)) || {n:0,done:[]}; }catch(e){ return {n:0,done:[]}; } }
  function persist(s){ try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){} }
  function unlockedCount(){ return load().n; }
  function total(){ return NOTES.length; }
  function all(){ return NOTES.slice(); }

  let styled=false;
  function injectStyle(){ if(styled) return; styled=true;
    const st=document.createElement('style');
    st.textContent = `
      .ln-ov{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:26px;
        background:rgba(15,9,4,.72);backdrop-filter:blur(3px);animation:lnFade .25s ease;}
      .ln-card{max-width:340px;width:100%;background:linear-gradient(180deg,#fff7e9,#ffe8c9);border-radius:20px;padding:26px 24px;
        text-align:center;box-shadow:0 18px 44px rgba(0,0,0,.55);border:2px solid #ffd23f;animation:lnPop .35s cubic-bezier(.2,1.3,.5,1);}
      .ln-h{font-weight:800;color:#d23b2a;font-size:20px;margin-bottom:12px;font-family:"Trebuchet MS",system-ui,sans-serif;}
      .ln-t{color:#5a3a1c;font-size:17px;line-height:1.55;font-family:"Trebuchet MS",system-ui,sans-serif;}
      .ln-b{margin-top:18px;border:none;cursor:pointer;border-radius:14px;padding:11px 26px;font-size:20px;font-weight:800;
        color:#fff;background:linear-gradient(180deg,#ff7da6,#e23e8c);box-shadow:0 4px 0 #9c2360;}
      @keyframes lnFade{from{opacity:0}to{opacity:1}}
      @keyframes lnPop{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}`;
    document.head.appendChild(st);
  }
  function popup(text){
    if(typeof document==='undefined'||!document.body) return;
    injectStyle();
    const ov=document.createElement('div'); ov.className='ln-ov';
    ov.innerHTML='<div class="ln-card"><div class="ln-h">💌 Sana bir not</div><div class="ln-t"></div><button class="ln-b">♥</button></div>';
    ov.querySelector('.ln-t').textContent=text;
    const close=()=>{ try{ov.remove();}catch(e){} };
    ov.addEventListener('click',e=>{ if(e.target===ov) close(); });
    ov.querySelector('.ln-b').addEventListener('click',close);
    document.body.appendChild(ov);
  }
  function reach(id){
    const s=load(); if(s.done.indexOf(id)>=0) return;
    s.done.push(id);
    if(s.n < NOTES.length){ s.n++; persist(s); popup(NOTES[s.n-1]); }
    else persist(s);
  }

  // ---- milestone polling (only acts when a game's API is present) ----
  function poll(){
    try{
      reach('welcome');                                  // first time the arcade is opened
      const g=window.__game, ty=window.__tycoon, bl=window.__blast, cr=window.__crush;
      if(cr){ if(cr.best>=500)reach('c1'); if(cr.best>=2500)reach('c2'); if(cr.best>=7000)reach('c3'); }
      if(bl){ if(bl.best>=500)reach('b1'); if(bl.best>=2500)reach('b2'); if(bl.best>=8000)reach('b3'); }
      if(ty&&ty.state){ const s=ty.state; if(s.totalEarned>=1000)reach('ty1'); if(s.totalEarned>=100000)reach('ty2'); if(s.tokens>=1)reach('ty3'); if(s.totalEarned>=1e7)reach('ty4'); }
      if(g){ if(g.bestTier>=4)reach('m1'); if(g.bestTier>=6)reach('m2'); if(g.bestTier>=8)reach('m3'); if(g.score>=2000)reach('m4'); }
    }catch(e){}
  }
  function start(){ setTimeout(poll,600); setInterval(poll,1200); }

  window.LoveNotes = { reach, unlockedCount, total, all, _key:KEY };
  if(typeof window!=='undefined' && typeof document!=='undefined'){
    if(document.readyState!=='loading') start(); else window.addEventListener('load', start);
  }
})();
