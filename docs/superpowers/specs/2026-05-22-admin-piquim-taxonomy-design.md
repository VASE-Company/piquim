# Admin Piquim Taxonomy Design

## Goal

Permitir que al crear o editar productos desde el admin se carguen los datos Piquim ya predefinidos: categoria principal, subcategoria y sabor/color.

## Design

Se agrega un bloque `Taxonomia Piquim` dentro del inspector de producto, en la pestaña Categorias. El bloque usa la misma taxonomia del catalogo publico (`PIQUIM_SUBCATALOGS.heladeria.productGroups`) para evitar duplicar listas.

Al seleccionar una categoria:
- Se guarda `source_category_path` como `Heladeria > Grupo > Subcategoria`.
- Se guarda `source_category` como la subcategoria seleccionada.
- Se agregan/actualizan especificaciones: `tipo`, `subtipo`, `sabor`, `color`.
- Si el grupo tiene sabores, se muestra un selector con swatches de color ya cargados.

## Scope

- Aplica al admin panel nuevo de Evolution.
- No cambia endpoints backend.
- No cambia el formulario legacy en `EditorPage.jsx`.

