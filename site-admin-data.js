
(function () {
  const KEY = "rcPanzerSiteData";
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined && value !== null && value !== "") el.textContent = value;
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const d = JSON.parse(raw);

    if (d.brand) setText("siteBrand", d.brand);
    if (d.tagline) setText("siteTagline", d.tagline);

    const heroTitle = document.getElementById("editable-hero-title");
    if (heroTitle && d.heroTitle) heroTitle.innerHTML = d.heroTitle;
    setText("editable-hero-copy", d.heroCopy);

    const cards = document.querySelectorAll("#panzer .model-card");
    if (Array.isArray(d.cards)) d.cards.forEach((item, i) => {
      const c = cards[i]; if (!c) return;
      const h3 = c.querySelector("h3"), p = c.querySelector("p"), img = c.querySelector("img");
      const metas = c.querySelectorAll(".model-meta span");
      if (h3 && item.name) h3.textContent = item.name;
      if (p && item.desc) p.textContent = item.desc;
      if (img && item.image) img.src = item.image;
      if (metas[0] && item.scale) metas[0].textContent = item.scale;
      if (metas[1] && item.tag) metas[1].textContent = item.tag;
    });

    setText("partsHeading", d.partsHeading);
    setText("legalNote", d.legalNote);
    const partCards = document.querySelectorAll("#teile .part-card");
    if (Array.isArray(d.parts)) d.parts.forEach((item, i) => {
      const c = partCards[i]; if (!c) return;
      const status = c.querySelector(".part-status"), h3 = c.querySelector("h3"),
            p = c.querySelector("p"), price = c.querySelector(".price-row strong"),
            action = c.querySelector(".price-row a, .price-row span");
      if (status && item.status) status.textContent = item.status;
      if (h3 && item.name) h3.textContent = item.name;
      if (p && item.desc) p.textContent = item.desc;
      if (price && item.price) price.textContent = item.price;
      if (action && item.actionText) action.textContent = item.actionText;
    });

    setText("aboutSince", d.aboutSince);
    setText("aboutHeading", d.aboutHeading);
    setText("aboutText1", d.aboutText1);
    setText("aboutText2", d.aboutText2);
    setText("aboutText3", d.aboutText3);

    setText("contactHeading", d.contactHeading);
    setText("contactIntro", d.contactIntro);
    setText("contactNote", d.contactNote);
    if (d.email) {
      const email = document.getElementById("contactEmail");
      if (email) { email.textContent = d.email; email.href = "mailto:" + d.email; }
      document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
        const old = a.getAttribute("href");
        const q = old && old.includes("?") ? old.substring(old.indexOf("?")) : "";
        a.setAttribute("href", "mailto:" + d.email + q);
      });
    }

    setText("footerNote", d.footerNote);
  } catch(e) {
    console.warn("Admin-Daten konnten nicht geladen werden.", e);
  }
})();
