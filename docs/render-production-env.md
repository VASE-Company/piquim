# Variables de produccion para editor.vase.ar / Piquim

Usar estas variables si el servicio unico vive en `editor.vase.ar` y Piquim opera como tenant personalizado.

## Email / verificacion

```env
EMAIL_COMPANY_NAME=Piquim
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=alexisvallejos803@gmail.com
SMTP_FROM=Piquim <alexisvallejos803@gmail.com>
EMAIL_VERIFICATION_TTL_MINUTES=15
EMAIL_VERIFICATION_MAX_ATTEMPTS=5
```

## Editor, API e integraciones

```env
CORS_ORIGIN=https://editor.vase.ar
PUBLIC_ADMIN_URL=https://editor.vase.ar/admin/evolution
PUBLIC_API_URL=https://editor.vase.ar
INTEGRATIONS_PUBLIC_BASE_URL=https://editor.vase.ar
PIQUIM_TENANT_ID=636736e2-e135-44cd-ac5c-5d4ccb839a73
PLATFORM_BASE_DOMAIN=vase.ar
PLATFORM_CNAME_TARGET=editor.vase.ar
DISABLE_AUTH=false
```

## Frontend build args

```env
VITE_API_URL=
VITE_TENANT_ID=636736e2-e135-44cd-ac5c-5d4ccb839a73
VITE_EDITOR_HOST=editor.vase.ar
VITE_EXTERNAL_AUTH=true
VITE_VASE_APP_URL=https://vase.ar
VITE_VASE_APP_LAUNCH_URL=https://vase.ar/app/business/launch
VITE_VASE_APP_LOGIN_URL=https://vase.ar/signin
VITE_VASE_APP_SIGNUP_URL=https://vase.ar/register
```

Notas:

- `VITE_API_URL` puede quedar vacio si frontend y API salen por el mismo `editor.vase.ar`.
- `VITE_TENANT_ID` deja el storefront de Piquim apuntando al tenant correcto.
- `VITE_EDITOR_HOST` hace que `/` en `editor.vase.ar` redirija al admin.

## Secretos

Estos no deben hardcodearse en el repo. Cargarlos manualmente en Render:

```env
SMTP_PASS=usar_el_mismo_valor_actual_que_ya_tenes_en_server_env_local
JWT_SECRET=rotar_y_cargar_un_valor_nuevo
BOOTSTRAP_TOKEN=rotar_y_cargar_un_valor_nuevo
MP_ACCESS_TOKEN=rotar_y_cargar_un_valor_nuevo_si_sigue_vigente
DATABASE_URL=usar_la_url_productiva_actual
```

## Importante

- `SMTP_PASS` no va en Vercel
- `SMTP_PASS` no debe subirse al repo
- el envio de codigo sale desde el backend productivo
- si en Render falta SMTP, el frontend no puede mandar ningun gmail aunque Vercel funcione bien

## Checklist

1. cargar estas variables en Render
2. guardar
3. redeploy del backend
4. crear una cuenta nueva desde Vercel
5. revisar logs de Render si el correo no llega
