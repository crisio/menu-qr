# menu-qr

Menú digital sencillo para restaurantes, accesible con un código QR. Sin build, sin dependencias: HTML + CSS + JS y un archivo `menu.json`.

## Editar el menú

Todo el contenido está en **`menu.json`**:

- `restaurante`, `eslogan`, `moneda`, `telefono`, `direccion`, `horario`
- `categorias[]` → cada una con `nombre` y `platos[]`
- Cada plato: `nombre`, `precio`, y opcionales `descripcion`, `destacado: true` (★ Recomendado), `disponible: false` (Agotado)

## Publicar gratis con GitHub Pages

1. En el repo: **Settings → Pages**
2. Source: **Deploy from a branch** → rama `main`, carpeta `/ (root)` → Save
3. En ~1 minuto el menú queda en `https://<tu-usuario>.github.io/menu-qr/`

## Generar el QR

Abre `https://<tu-usuario>.github.io/menu-qr/qr.html`. Ya trae la URL del menú; puedes **imprimirlo** o **descargarlo como PNG**.

> El QR apunta a la URL, no al contenido: si cambias precios en `menu.json`, el QR impreso sigue funcionando.

## Probar localmente

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

(Hace falta un servidor local porque el navegador no deja leer `menu.json` abriendo el archivo directamente.)
