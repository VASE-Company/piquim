# Heladeria Sabores Colores Design

## Goal

Agregar a Heladeria los grupos `Sabor & Color en Polvo` y `Pastas Oleosas y Frutales`, con seleccion de sabores mediante pantalla emergente con colores.

## Design

Los nuevos grupos forman parte de la misma taxonomia especial de Heladeria. En el sidebar se muestran como grupos desplegables y, cuando tienen muchos sabores, ofrecen un boton `Ver sabores` que abre un modal con swatches de color, nombre y seleccion multiple.

La seleccion de sabores filtra los productos por nombre/categoria/path. Si no hay seleccion, el grupo muestra todos los productos que coincidan con su familia.

## Scope

- Aplica solo a `/catalog?category=heladeria`.
- No cambia Panaderia ni Confiteria.
- No cambia el checkout ni detalle de producto.

