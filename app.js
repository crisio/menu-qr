const $ = (sel) => document.querySelector(sel);

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-");

async function cargar() {
  try {
    const res = await fetch("menu.json", { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    render(await res.json());
  } catch (e) {
    $("#menu").innerHTML = `<p class="cargando">No se pudo cargar el menú.</p>`;
    console.error(e);
  }
}

function render(data) {
  const precio = (n) => `${data.moneda || ""} ${Number(n).toFixed(2)}`.trim();

  document.title = data.restaurante;
  $("#restaurante").textContent = data.restaurante;
  $("#eslogan").textContent = data.eslogan || "";

  $("#tabs").innerHTML = data.categorias
    .map((c) => `<a href="#${slug(c.nombre)}">${esc(c.nombre)}</a>`)
    .join("");

  $("#menu").innerHTML = data.categorias
    .map(
      (c) => `
      <section id="${slug(c.nombre)}">
        <h2>${esc(c.nombre)}</h2>
        ${c.platos
          .map(
            (p) => `
          <article class="plato${p.disponible === false ? " agotado" : ""}">
            <div>
              <h3>${esc(p.nombre)}${p.destacado ? ' <span class="badge">★ Recomendado</span>' : ""}</h3>
              ${p.descripcion ? `<p>${esc(p.descripcion)}</p>` : ""}
            </div>
            <span class="precio">${p.disponible === false ? "Agotado" : precio(p.precio)}</span>
          </article>`
          )
          .join("")}
      </section>`
    )
    .join("");

  $("#info").innerHTML = [data.direccion, data.horario, data.telefono]
    .filter(Boolean)
    .map((t) => `<p>${esc(t)}</p>`)
    .join("");
}

cargar();
