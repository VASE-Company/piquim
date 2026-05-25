# Migracion de commits admin de Proyecto-Teflon a Piquim

## Objetivo

Portar a Piquim los cambios tecnicos visibles en los commits recientes de `Proyecto-Teflon` sin copiar documentos, archivos `dist` ni textos comerciales del proyecto origen.

## Alcance

- `IntegrationsEditor`: retirar el bloque de pruebas rapidas y snippets demo del admin, manteniendo credenciales, endpoints, diagnostico, HTTP upload y FTP sync.
- `CatalogEditor`: incorporar el menu de acciones por producto y el modal mejorado de eliminacion con portal, overlay, cierre con `Esc` y confirmacion visual.
- `CatalogInspectorPanel`: reorganizar el bloque de acciones del producto para que stock, destacado y eliminacion sean mas claros.
- `CommandPalette`: portar el redisenio de `Ctrl+K`, usar busqueda dinamica por `searchItems` y navegar a modulos del admin.
- `useCatalogManager`: aceptar `skipConfirm` para evitar doble confirmacion cuando el modal visual ya confirmo la accion.

## Restricciones

- No portar `web/dist` desde `Proyecto-Teflon`.
- No portar `docs/integracion-cristian-vase.*`.
- No reemplazar contenido editorial, textos de marca ni datos por textos de Teflon.
- Mantener las rutas, stores y contratos existentes de Piquim.

## Verificacion

- Compilar el frontend con `npm run build`.
- Revisar que `Ctrl+K` reciba `searchItems` desde `EvolutionLayout`.
- Revisar que el delete modal llame a `handleDeleteProduct(id, name, { skipConfirm: true })`.
