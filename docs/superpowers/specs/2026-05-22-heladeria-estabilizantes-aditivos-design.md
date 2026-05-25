# Heladeria Estabilizantes Aditivos Design

## Goal

En el catalogo de Heladeria, mostrar solo los grupos principales Estabilizantes y Aditivos, y desplegar debajo sus categorias internas como familias visuales.

## Scope

- Aplica solo a `/catalog?category=heladeria`.
- Panaderia y Confiteria mantienen el comportamiento actual.
- Estabilizantes se divide en Neutros artesanales, Bases en polvo y Est. Especificos.
- Aditivos se divide en Agente batido y Pronto Mix.
- Los filtros laterales usan los grupos principales y las categorias internas, no las subcategorias crudas del producto.

## Approach

Agregar una configuracion de grupos al subcatalogo Heladeria y hacer que el render de `PiquimSubcatalogPage` use esa configuracion cuando existe. Cada producto se clasifica por nombre, categoria, tipo, `source_category` y `source_category_path`; si no coincide con Estabilizantes o Aditivos, no aparece en Heladeria.

## Verification

- Build del frontend.
- Revision de referencias para confirmar que solo Heladeria usa la configuracion nueva.
