# Click y hover de tarjetas del subcatalogo Piquim

## Objetivo

Separar las acciones de las tarjetas del subcatalogo: la tarjeta completa abre el detalle del producto y el boton con carrito agrega al carrito.

## Causa encontrada

`PiquimSubcatalogProductCard` recibia `onOpen`, pero lo usaba solo en el boton con icono de carrito. El `article` de la tarjeta no tenia `onClick`, `role`, `tabIndex` ni manejo de teclado, por eso el usuario solo podia entrar al detalle tocando el icono incorrecto.

## Diseno

- La tarjeta completa sera clickeable y accesible como link.
- `Enter` y `Espacio` abriran el detalle cuando el foco este en la tarjeta.
- El boton de carrito usara `event.stopPropagation()` y llamara a `addToCart`.
- El boton de favorito tambien usara `event.stopPropagation()` y llamara a `toggleFavorite`.
- El hover de la tarjeta agregara elevacion, borde/acento y movimiento leve sin cambiar el layout.

## Verificacion

- Compilar con `npm run build`.
- Confirmar que `/catalog?category=heladeria` responde localmente.
