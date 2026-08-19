(function () {
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined && value !== null && value !== "") el.textContent = value;
  }
  function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}
  async function loadSharedData(){
    try {
      const res = await fetch("site-data.json?v=" + Date.now(), {cache:"no-store"});
      if(!res.ok) throw new Error("HTTP " + res.status);
      return await res.json();
    } catch (e) {
      console.warn("Gemeinsame Seitendaten konnten nicht geladen werden.", e);
      return null;
    }
  }
  function apply(d){
    if(!d) return;
    setText("siteBrand", d.brand); setText("siteTagline", d.tagline);
    const heroTitle=document.getElementById("editable-hero-title"); if(heroTitle && d.heroTitle) heroTitle.innerHTML=d.heroTitle;
    setText("editable-hero-copy", d.heroCopy);
    const heroImage=document.getElementById("editableHeroImage");
    if(heroImage && d.heroImage){heroImage.src=d.heroImage;heroImage.hidden=false;document.querySelector(".tank-silhouette")?.classList.add("hidden-by-admin");}

    const tankGrid=document.querySelector("#panzer .tank-grid");
    if(tankGrid && Array.isArray(d.cards)){
      tankGrid.innerHTML="";
      d.cards.forEach(item=>{const article=document.createElement("article");article.className="model-card";article.innerHTML=`<div class="model-image"><img src="${esc(item.image||"")}" alt="${esc(item.name||"RC Panzer")}"></div><div class="model-content"><div class="model-meta"><span>${esc(item.scale||"RC")}</span><span>${esc(item.tag||"Modell")}</span></div><h3>${esc(item.name||"Neues Modell")}</h3><p>${esc(item.desc||"")}</p></div>`;tankGrid.appendChild(article);});
    }
    setText("partsHeading",d.partsHeading); setText("legalNote",d.legalNote);
    const partsGrid=document.querySelector("#teile .parts-grid");
    if(partsGrid && Array.isArray(d.parts)){
      partsGrid.innerHTML="";
      d.parts.forEach(item=>{const article=document.createElement("article");article.className="part-card";const reserved=(item.status||"").toLowerCase().includes("reserv");const contact=!reserved&&d.email?`<a href="mailto:${encodeURIComponent(d.email)}?subject=${encodeURIComponent("Interesse an "+(item.name||"Teil"))}">${esc(item.actionText||"Anfragen →")}</a>`:`<span>${esc(item.actionText||"")}</span>`;article.innerHTML=`${item.image?`<img class="part-image" src="${esc(item.image)}" alt="${esc(item.name||"Teil")}">`:"<div class=\"part-icon\">⚙</div>"}<div class="part-status ${reserved?"reserved":"available"}">${esc(item.status||"Verfügbar")}</div><h3>${esc(item.name||"Neues Teil")}</h3><p>${esc(item.desc||"")}</p><div class="price-row"><strong>${esc(item.price||"")}</strong>${contact}</div>`;partsGrid.appendChild(article);});
    }
    const postsSection=document.getElementById("beitraege"); const postsGrid=document.getElementById("postsGrid");
    if(postsSection && postsGrid && Array.isArray(d.posts) && d.posts.length){postsSection.hidden=false;postsGrid.innerHTML="";d.posts.forEach(p=>{const a=document.createElement("article");a.className="post-card";a.innerHTML=`${p.image?`<img src="${esc(p.image)}" alt="${esc(p.title||"Beitrag")}">`:""}<div class="post-content"><p class="eyebrow">${esc(p.date||"BEITRAG")}</p><h3>${esc(p.title||"Neuer Beitrag")}</h3><p>${esc(p.text||"")}</p></div>`;postsGrid.appendChild(a);});} else if(postsSection){postsSection.hidden=true;}
    setText("aboutSince",d.aboutSince);setText("aboutHeading",d.aboutHeading);setText("aboutText1",d.aboutText1);setText("aboutText2",d.aboutText2);setText("aboutText3",d.aboutText3);
    setText("contactHeading",d.contactHeading);setText("contactIntro",d.contactIntro);setText("contactNote",d.contactNote);
    if(d.email){const email=document.getElementById("contactEmail");if(email){email.textContent=d.email;email.href="mailto:"+d.email;}document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{const old=a.getAttribute("href")||"";const q=old.includes("?")?old.substring(old.indexOf("?")):"";a.href="mailto:"+d.email+q;});}
    const phone=document.getElementById("contactPhone");if(phone){if(d.phone){phone.textContent=d.phone;phone.href="tel:"+d.phone.replace(/\s+/g,"");phone.parentElement.hidden=false;}else phone.parentElement.hidden=true;}
    setText("footerNote",d.footerNote);
  }
  loadSharedData().then(apply);
})();
