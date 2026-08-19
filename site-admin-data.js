
(function () {
  const KEY = "rcPanzerSiteData";
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    const title = document.getElementById("editable-hero-title");
    if (title && data.heroTitle) title.innerHTML = data.heroTitle;
    const copy = document.getElementById("editable-hero-copy");
    if (copy && data.heroCopy) copy.textContent = data.heroCopy;
    if (Array.isArray(data.cards)) {
      const cards = document.querySelectorAll("#panzer .model-card");
      data.cards.forEach((item, i) => {
        const card = cards[i];
        if (!card) return;
        const h3 = card.querySelector("h3");
        const p = card.querySelector("p");
        const img = card.querySelector("img");
        if (h3 && item.name) h3.textContent = item.name;
        if (p && item.desc) p.textContent = item.desc;
        if (img && item.image) img.src = item.image;
      });
    }
  } catch (e) {}
})();
