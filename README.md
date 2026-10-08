# SABORA · Menú QR

Menú digital de **SABORA · Brunch & Coffee**, accesible por código QR.

- **Menú:** https://crisio.github.io/menu-qr/
- **Editor (desde el celular):** https://crisio.github.io/menu-qr/admin.html
- **QR para imprimir:** https://crisio.github.io/menu-qr/qr.html

## Rápido por diseño

- Toda la página es un solo archivo (`index.html`, ~13 KB) más `menu.json` (~3 KB). No usa librerías ni fuentes externas.
- Las fotos se comprimen automáticamente al subirlas (WebP/JPEG, máx. 1400 px) y se crea una miniatura de ~300 px para la lista.
- Las imágenes de la lista cargan solo cuando aparecen en pantalla. Los videos solo se descargan al abrir el plato.
- Optimizado para iPhone y Android: respeta el notch, el botón "atrás" de Android cierra la ficha del plato y los campos no hacen zoom.

## Editar el menú desde el celular

1. Abre **`admin.html`** (link arriba).
2. La primera vez te pide un **token de GitHub** (los pasos aparecen en la pantalla):
   - Ve a https://github.com/settings/personal-access-tokens/new
   - *Repository access* → **Only select repositories** → `menu-qr`
   - *Permissions* → **Contents: Read and write**
   - **Generate token**, cópialo y pégalo en el editor. Queda guardado solo en ese teléfono.
3. Toca un plato para editar el nombre, la descripción, el precio, la disponibilidad o el sello "Recomendado".
4. Usa **📷 Agregar foto** / **🎬 Agregar video**. Las flechas ◀ ▶ cambian el orden y la primera foto es la que se ve en la lista.
5. Toca **Guardar cambios**. El menú público se actualiza en 1–2 minutos.

### Instalar el editor como app (Windows, Android, iPhone)

- **Windows (Edge o Chrome):** abre `admin.html` y toca **⬇ Instalar app** en la barra verde (o el ícono de instalar en la barra de direcciones). Queda con su ícono en el escritorio y en el menú Inicio.
- **Android (Chrome):** menú ⋮ → **Instalar app**.
- **iPhone (Safari):** botón Compartir → **Agregar a inicio**.

El menú público (`index.html`) también se puede instalar de la misma forma, con su propio ícono.

### Videos

- Clips cortos (10–20 s), máximo 40 MB.
- En iPhone, para que el video también se vea en Android: *Ajustes → Cámara → Formatos → **Más compatible***.

## Estructura

| Archivo | Para qué |
|---|---|
| `index.html` | Menú público |
| `menu.json` | Contenido del menú (lo escribe el editor) |
| `admin.html` | Editor para el celular |
| `qr.html` | Genera el QR para imprimir o descargar |
| `media/` | Fotos y videos de los platos |

## Probar localmente

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```
