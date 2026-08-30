var SHOP_PRODUCTS = [{"id": 1, "cat": "Modellbau", "name": "Diorama Detail Set", "price": 14.9, "icon": "🧱", "desc": "Kleine Details und Zubehörteile für Modellbau-Projekte."}, {"id": 2, "cat": "Modellbau", "name": "Fahrzeug Detailteil", "price": 17.9, "icon": "🛞", "desc": "Beispiel für ein Fahrzeug- oder Panzerdetail im Modellbau."}, {"id": 3, "cat": "Figuren", "name": "Fantasy Büste", "price": 28.9, "icon": "🧙", "desc": "3D-gedruckte Büste zum Sammeln, Bemalen oder Verschenken."}, {"id": 4, "cat": "Figuren", "name": "Miniaturen Set", "price": 19.9, "icon": "♟️", "desc": "Mehrere kleine Figuren als Demo-Produkt."}, {"id": 5, "cat": "Ersatzteile", "name": "Ersatzclip Set", "price": 6.9, "icon": "🔩", "desc": "Praktische Ersatzclips als Beispiel für funktionalen 3D-Druck."}, {"id": 6, "cat": "Technik", "name": "Universal Adapter", "price": 12.9, "icon": "🔧", "desc": "Beispiel für Adapter, Halterungen und technische Bauteile."}, {"id": 7, "cat": "Technik", "name": "Controller Dock", "price": 18.9, "icon": "🎮", "desc": "Schlichter Halter für Controller und Gaming-Zubehör."}, {"id": 8, "cat": "Deko", "name": "Design Vase", "price": 22.9, "icon": "🏺", "desc": "Geometrische Vase mit moderner Oberflächenstruktur."}, {"id": 9, "cat": "Haushalt", "name": "Kabel Organizer", "price": 8.9, "icon": "🔌", "desc": "Kleine Ordnungshilfe für Arbeitsplatz und Zuhause."}, {"id": 10, "cat": "Haushalt", "name": "Werkzeughalter", "price": 16.9, "icon": "🧰", "desc": "3D-gedruckter Halter für Werkstatt oder Hobbyraum."}, {"id": 11, "cat": "Personalisiert", "name": "Namensschild Custom", "price": 13.9, "icon": "🏷️", "desc": "Personalisiertes Schild mit Wunschname oder kurzem Text."}, {"id": 12, "cat": "Personalisiert", "name": "Logo Schlüsselanhänger", "price": 9.9, "icon": "🔑", "desc": "Schlüsselanhänger mit individuellem Namen oder Logo."}];
var cart = [];

function euro(v){
  return Number(v || 0).toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR"
  });
}

function filterProducts(category){
  var cards = document.querySelectorAll(".fixed-product");
  for(var i=0;i<cards.length;i++){
    var show = category === "Alle" || cards[i].getAttribute("data-category") === category;
    cards[i].classList.toggle("is-hidden", !show);
  }
  var buttons = document.querySelectorAll(".fixed-filters .filter");
  for(var j=0;j<buttons.length;j++){
    buttons[j].classList.toggle("active", buttons[j].getAttribute("data-filter") === category);
  }
}

function addToCart(id){
  var product = null;
  for(var i=0;i<SHOP_PRODUCTS.length;i++){
    if(SHOP_PRODUCTS[i].id === id){ product = SHOP_PRODUCTS[i]; break; }
  }
  if(!product) return;

  var existing = null;
  for(var j=0;j<cart.length;j++){
    if(cart[j].id === id){ existing = cart[j]; break; }
  }

  if(existing){
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  renderCart();
  openCart();

  var toast = document.getElementById("toast");
  if(toast){
    toast.textContent = product.name + " wurde in den Warenkorb gelegt";
    toast.classList.add("show");
    setTimeout(function(){ toast.classList.remove("show"); }, 1200);
  }
}

function removeFromCart(id){
  for(var i=0;i<cart.length;i++){
    if(cart[i].id === id){
      cart[i].qty -= 1;
      if(cart[i].qty <= 0) cart.splice(i,1);
      break;
    }
  }
  renderCart();
}

function renderCart(){
  var count = document.getElementById("count");
  var items = document.getElementById("items");
  var sum = document.getElementById("sum");
  if(!count || !items || !sum) return;

  var totalQty = 0;
  var total = 0;
  for(var i=0;i<cart.length;i++){
    totalQty += cart[i].qty;
    total += cart[i].price * cart[i].qty;
  }

  count.textContent = totalQty;

  if(cart.length === 0){
    items.innerHTML = "<p style='color:#8f99aa'>Dein Warenkorb ist noch leer.</p>";
    sum.textContent = euro(0);
    return;
  }

  var out = "";
  for(var j=0;j<cart.length;j++){
    var x = cart[j];
    out += '<div class="cartrow">' +
      '<div><b>' + x.name + '</b><br><small style="color:#8f99aa">' + x.qty + ' × ' + euro(x.price) + '</small></div>' +
      '<div style="text-align:right"><div>' + euro(x.price*x.qty) + '</div>' +
      '<button type="button" onclick="removeFromCart(' + x.id + ')" style="margin-top:6px;background:none;border:0;color:#ff9aaa;font-size:12px;cursor:pointer">1 entfernen</button></div>' +
      '</div>';
  }
  items.innerHTML = out;
  sum.textContent = euro(total);
}

function openCart(){
  var drawer = document.getElementById("drawer");
  var overlay = document.getElementById("overlay");
  if(drawer) drawer.classList.add("open");
  if(overlay) overlay.classList.add("show");
}

function closeCart(){
  var drawer = document.getElementById("drawer");
  var overlay = document.getElementById("overlay");
  if(drawer) drawer.classList.remove("open");
  if(overlay) overlay.classList.remove("show");
}


document.addEventListener("click", function(e){
  var btn = e.target.closest(".cart-add-btn");
  if(btn){
    e.preventDefault();
    e.stopPropagation();
    var id = Number(btn.getAttribute("data-product-id"));
    if(id) addToCart(id);
  }
});


document.addEventListener("DOMContentLoaded", function(){
  var cartBtn = document.getElementById("cartBtn");
  var closeBtn = document.getElementById("closeCart");
  var overlay = document.getElementById("overlay");
  var order = document.getElementById("order");

  if(cartBtn) cartBtn.onclick = openCart;
  if(closeBtn) closeBtn.onclick = closeCart;
  if(overlay) overlay.onclick = closeCart;

  if(order){
    order.onclick = function(){
      if(cart.length === 0){
        alert("Der Warenkorb ist leer.");
        return;
      }
      var lines = [];
      var total = 0;
      for(var i=0;i<cart.length;i++){
        lines.push(cart[i].qty + "x " + cart[i].name + " – " + euro(cart[i].price*cart[i].qty));
        total += cart[i].price*cart[i].qty;
      }
      var bodyText = lines.join("\\n") + "\\n\\nGesamt: " + euro(total);
      var body = encodeURIComponent(bodyText);
      window.location.href = "mailto:deine-email@beispiel.de?subject=" +
        encodeURIComponent("FORMORA Bestellanfrage") + "&body=" + body;
    };
  }

  renderCart();
});
