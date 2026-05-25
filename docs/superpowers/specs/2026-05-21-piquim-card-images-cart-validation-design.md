# Imagenes de tarjeta Piquim y validacion de carrito

## Objetivo

- En subcatalogos Piquim, mostrar la imagen real del producto cuando exista.
- Si el producto no tiene imagen real, mantener el icono actual segun la categoria.
- Evitar el error generico "No se pudo validar el carrito" causado por items antiguos o mock con IDs que no son UUID validos.

## Causa

Las tarjetas del subcatalogo siempre renderizaban `ProductDisplayIcon`, aunque el producto tuviera imagen real. Ademas, el carrito podia conservar productos antiguos con IDs tipo `piquim-...`, pero `/checkout/validate` espera UUIDs de `product_cache`.

## Diseno

- Detectar imagen real antes de usar el fallback.
- Renderizar `<img>` solo cuando existe imagen real; si no, usar `ProductDisplayIcon`.
- Sanitizar items del carrito en `StoreContext` y no agregar productos sin UUID.
- Hacer que el backend de checkout devuelva `invalid_product_id:<id>` en vez de romper si recibe IDs invalidos.

## Verificacion

- `npm run build` en `web`.
- Import smoke de `server/src/routes/checkout.js`.
- HTTP local de catalogo y checkout/producto.
