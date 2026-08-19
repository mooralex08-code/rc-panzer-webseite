
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

    const tankGrid = document.querySelector("#panzer .tank-grid");
    if (tankGrid && Array.isArray(d.cards)) {
      tankGrid.innerHTML = "";
      d.cards.forEach(item => {
        const article = document.createElement("article");
        article.className = "model-card";
        article.innerHTML = `
          <div class="model-image"><img src="${item.image || ""}" alt="${item.name || "RC Panzer"}"></div>
          <div class="model-content">
            <div class="model-meta"><span>${item.scale || "RC"}</span><span>${item.tag || "Modell"}</span></div>
            <h3>${item.name || "Neues Modell"}</h3>
            <p>${item.desc || ""}</p>
          </div>`;
        tankGrid.appendChild(article);
      });
    }

    setText("partsHeading", d.partsHeading);
    setText("legalNote", d.legalNote);

    const partsGrid = document.querySelector("#teile .parts-grid");
    if (partsGrid && Array.isArray(d.parts)) {
      partsGrid.innerHTML = "";
      d.parts.forEach(item => {
        const article = document.createElement("article");
        article.className = "part-card";
        const statusClass = (item.status || "").toLowerCase().includes("reserv") ? "reserved" : "available";
        article.innerHTML = `
          <div class="part-status ${statusClass}">${item.status || "Verfügbar"}</div>
          <div class="part-icon">⚙</div>
          <h3>${item.name || "Neues Teil"}</h3>
          <p>${item.desc || ""}</p>
          <div class="price-row"><strong>${item.price || ""}</strong><span>${item.actionText || ""}</span></div>`;
        partsGrid.appendChild(article);
      });
    }

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
