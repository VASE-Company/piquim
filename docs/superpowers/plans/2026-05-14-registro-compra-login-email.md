# Registro Compra + Login por Email Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar registro comercial obligatorio para compra y login sin contraseña vía código por email, con SMTP Gmail configurable desde admin.

**Architecture:** Se extiende el perfil de usuario con datos comerciales/fiscales, se agregan endpoints de login por código temporal y se resuelve envío SMTP por tenant usando credenciales de Gmail App Password guardadas en settings de comercio. El checkout sigue exigiendo sesión y no se alteran opciones futuras de transferencia en admin.

**Tech Stack:** React/Vite, Node.js/Express, PostgreSQL, Nodemailer.

---

### Task 1: Backend auth + perfil comercial
- [ ] Extender schema de perfil con `business_name`, `business_activity`, `cuil`.
- [ ] Exigir esos campos en signup y persistirlos.
- [ ] Exponerlos en `/auth/me`.

### Task 2: Login por email (OTP)
- [ ] Crear tabla/flujo `email_login_codes`.
- [ ] Endpoint `POST /auth/request-login-code`.
- [ ] Endpoint `POST /auth/login-with-code`.
- [ ] Mantener reglas de tenant/approval/active.

### Task 3: SMTP por tenant desde admin
- [ ] Permitir guardar `gmail_sender_email` y `gmail_app_password` en settings checkout.
- [ ] No exponer secretos en endpoint público de checkout settings.
- [ ] Ajustar mailer para usar credenciales por tenant (fallback env).

### Task 4: Frontend Signup/Login
- [ ] Signup: formulario con campos de compra requeridos.
- [ ] Login: reemplazar password por envío/verificación de código.
- [ ] Ajustar AuthContext con nuevas llamadas.

### Task 5: Admin UI
- [ ] CheckoutEditor: campos para email emisor y app password de Google.

### Task 6: Verificación
- [ ] Build frontend.
- [ ] Sanity check de backend (carga de módulos).
