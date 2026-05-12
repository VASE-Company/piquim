export const PIQUIM_CATALOG_CARDS = [
    {
        id: 'heladeria',
        title: 'Heladeria',
        prefix: '01 - Frio que enamora',
        description: 'Materia prima para la elaboracion de helados artesanales, bases estables y terminaciones con sabor propio.',
        tags: ['Pulpas', 'Variegattos', 'Bases', 'Neutros'],
        image: '/piquim/catalogo/card-heladeria.png',
        category: 'heladeria',
        categorySlug: 'heladeria',
        overlay: 'linear-gradient(180deg, rgba(15, 92, 151, 0.16) 0%, rgba(12, 26, 42, 0.84) 100%)',
    },
    {
        id: 'panaderia',
        title: 'Panaderia',
        prefix: '02 - Hornear es un arte',
        description: 'Premezclas, mejoradores y soluciones pensadas para produccion diaria con textura, volumen y regularidad.',
        tags: ['Premezclas', 'Mejoradores', 'Aditivos', 'Chipa'],
        image: '/piquim/catalogo/card-panaderia.png',
        category: 'panaderia',
        categorySlug: 'panaderia',
        overlay: 'linear-gradient(180deg, rgba(255, 150, 64, 0.12) 0%, rgba(39, 22, 12, 0.86) 100%)',
    },
    {
        id: 'confiteria',
        title: 'Confiteria',
        prefix: '03 - Dulce inspiracion',
        description: 'Cremas, mousses, dulces y bases para piezas de pasteleria con terminacion profesional.',
        tags: ['Cremas', 'Mousses', 'DDL', 'Brownie'],
        image: '/piquim/catalogo/card-confiteria.png',
        category: 'confiteria',
        categorySlug: 'confiteria',
        overlay: 'linear-gradient(180deg, rgba(222, 97, 132, 0.14) 0%, rgba(38, 17, 26, 0.86) 100%)',
    },
];

export const PIQUIM_FOOTER_DEFAULTS = {
    description: 'Materia prima premium para heladerias, panaderias y confiterias. Mar del Plata, desde 1992.',
    legalText: '© 2026 Piquim Profesional S.A.  ·  Mar del Plata, Argentina  ·  CUIT 30-XXXXXXXX-X',
    newsletter: {
        enabled: true,
        title: 'Novedades para profesionales',
        description: 'Recibi lanzamientos, promociones y catalogos tecnicos en tu correo.',
        placeholder: 'tu@email.com',
        buttonLabel: 'Suscribirme',
    },
    shopLinks: [
        { label: 'Heladeria', href: '/catalog?category=heladeria' },
        { label: 'Panaderia', href: '/catalog?category=panaderia' },
        { label: 'Confiteria', href: '/catalog?category=confiteria' },
        { label: 'Promociones', href: '/catalog' },
    ],
    helpLinks: [
        { label: 'Envios y entregas', href: '/about' },
        { label: 'Pagos y facturacion', href: '/checkout' },
        { label: 'Cambios y devoluciones', href: '/about' },
        { label: 'Preguntas frecuentes', href: '/about' },
    ],
    legalLinks: [
        { label: 'Terminos', href: '/terms' },
        { label: 'Privacidad', href: '/privacy' },
        { label: 'Cookies', href: '/privacy' },
        { label: 'Defensa al consumidor', href: '/about' },
    ],
    socials: [
        { label: 'Instagram', short: 'IG', href: '' },
        { label: 'Facebook', short: 'FB', href: '' },
        { label: 'YouTube', short: 'YT', href: '' },
        { label: 'TikTok', short: 'TK', href: '' },
    ],
};

export const PIQUIM_STOREFRONT_THEME = {
    mode: 'light',
    primary: '#ff4d00',
    accent: '#ff7a2f',
    background: '#fffaf6',
    text: '#1a1614',
    secondary: '#6f625d',
    font_family: 'Gilroy, Manrope, sans-serif',
    catalog: {
        panel_bg: '#fff3eb',
        surface_bg: '#fffaf6',
        card_bg: '#ffffff',
        border: '#dab6a6',
        muted_text: '#7b665d',
    },
};
