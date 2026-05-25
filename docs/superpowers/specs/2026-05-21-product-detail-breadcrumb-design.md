# Breadcrumb de detalle de producto Piquim

## Objetivo

Mostrar en todos los detalles de producto la ruta:

`Inicio / Catalogo / Heladeria|Panaderia|Confiteria / filtro si hubo / Producto`

## Diseno

- Al navegar desde los subcatalogos Piquim, la URL del detalle incluira `catalog` y `filter`.
- `ProductDetail.jsx` calculara una lista unica de breadcrumb items para todos los templates.
- Si no hay `catalog` en la URL, se intentara inferir desde `source_category_path`, `source_category`, datos editoriales o textos del producto.
- El filtro solo se mostrara si viene desde la navegacion o si puede inferirse con seguridad.
- No se cambia navbar, rutas backend ni datos de producto.

## Verificacion

- Compilar `web` con `npm run build`.
- Confirmar que `/catalog?category=heladeria` responde.
- Confirmar que una URL `/product/<id>?catalog=heladeria&filter=<valor>` renderiza por el frontend.
