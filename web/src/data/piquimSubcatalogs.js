const CARD_VARIANTS = [
    {
        badge: 'MAS VENDIDO',
        category: 'ESTABILIZANTES',
        name: 'Neutro Cream (para crema)',
        subtype: 'Neutro artesanal',
        price: '$ 8.450',
        mediaKind: 'icon',
        icon: 'ice',
        mediaGradient: 'linear-gradient(135deg, rgba(107, 184, 224, 0.18) 0%, rgba(107, 184, 224, 0.42) 100%)',
        coldAccent: '#1A1614',
        favoriteOffset: 222,
    },
    {
        category: 'PULPAS FRUTALES',
        name: 'Frutilla',
        subtype: 'Para decoracion o rellenos',
        price: '$ 12.900',
        mediaKind: 'image',
        imageSrc: '/piquim/carta/image-2.png',
        mediaGradient: 'linear-gradient(135deg, rgba(224, 81, 138, 0.18) 0%, rgba(224, 81, 138, 0.42) 100%)',
        coldAccent: '#4BEAFF',
        favoriteOffset: 227,
    },
    {
        badge: 'PROMO -15%',
        badgeDark: true,
        category: 'VARIEGATTOS',
        name: 'Nutticrock',
        subtype: 'Avellana, cacao y grana crocante de avellana',
        price: '$ 6.800',
        mediaKind: 'icon',
        icon: 'ice',
        mediaGradient: 'linear-gradient(135deg, rgba(107, 184, 224, 0.18) 0%, rgba(107, 184, 224, 0.42) 100%)',
        coldAccent: '#61EDFF',
        favoriteOffset: 227,
    },
    {
        category: 'PASTAS OLEOSAS Y FRUTALES',
        name: 'Vainilla',
        subtype: 'Pasta de Vainilla',
        price: '$ 5.300',
        mediaKind: 'image',
        imageSrc: '/piquim/carta/image-3.png',
        mediaGradient: 'linear-gradient(135deg, rgba(224, 81, 138, 0.18) 0%, rgba(224, 81, 138, 0.42) 100%)',
        coldAccent: '#4BEAFF',
        favoriteOffset: 227,
    },
];

const PANADERIA_VARIANTS = [
    {
        category: 'PREMEZCLAS',
        name: 'Premezcla Pan Suave',
        subtype: 'Panaderia profesional',
        price: '$ 7.900',
        mediaKind: 'icon',
        icon: 'bread',
        mediaGradient: 'linear-gradient(135deg, rgba(212, 162, 74, 0.18) 0%, rgba(212, 162, 74, 0.42) 100%)',
        coldAccent: '#D4A24A',
        badge: 'MAS VENDIDO',
        favoriteOffset: 222,
    },
    {
        category: 'RELLENOS',
        name: 'Membrillo',
        subtype: 'Para facturas y medialunas',
        price: '$ 12.900',
        mediaKind: 'image',
        imageSrc: '/piquim/carta/image-2.png',
        mediaGradient: 'linear-gradient(135deg, rgba(212, 162, 74, 0.14) 0%, rgba(212, 162, 74, 0.34) 100%)',
        coldAccent: '#4BEAFF',
        favoriteOffset: 227,
    },
    {
        category: 'MEJORADORES',
        name: 'Mejorador Integral',
        subtype: 'Volumen y textura',
        price: '$ 7.820',
        mediaKind: 'icon',
        icon: 'bread',
        mediaGradient: 'linear-gradient(135deg, rgba(212, 162, 74, 0.18) 0%, rgba(212, 162, 74, 0.42) 100%)',
        coldAccent: '#D4A24A',
        badge: 'PROMO -15%',
        badgeDark: true,
        favoriteOffset: 227,
    },
    {
        category: 'SABORES',
        name: 'Vainilla',
        subtype: 'Pasta de Vainilla',
        price: '$ 5.300',
        mediaKind: 'image',
        imageSrc: '/piquim/carta/image-3.png',
        mediaGradient: 'linear-gradient(135deg, rgba(212, 162, 74, 0.14) 0%, rgba(212, 162, 74, 0.34) 100%)',
        coldAccent: '#4BEAFF',
        favoriteOffset: 227,
    },
];

const CONFITERIA_VARIANTS = [
    {
        category: 'CREMAS',
        name: 'Crema Pastelera Premium',
        subtype: 'Base repostera',
        price: '$ 8.250',
        mediaKind: 'icon',
        icon: 'cake',
        mediaGradient: 'linear-gradient(135deg, rgba(224, 81, 138, 0.18) 0%, rgba(224, 81, 138, 0.42) 100%)',
        coldAccent: '#E0518A',
        badge: 'MAS VENDIDO',
        favoriteOffset: 222,
    },
    {
        category: 'RELLENOS',
        name: 'Frutilla',
        subtype: 'Para decoracion o rellenos',
        price: '$ 12.900',
        mediaKind: 'image',
        imageSrc: '/piquim/carta/image-2.png',
        mediaGradient: 'linear-gradient(135deg, rgba(224, 81, 138, 0.18) 0%, rgba(224, 81, 138, 0.42) 100%)',
        coldAccent: '#4BEAFF',
        favoriteOffset: 227,
    },
    {
        category: 'MOUSSES',
        name: 'Mousse Chocolate Intenso',
        subtype: 'Confiteria profesional',
        price: '$ 7.980',
        mediaKind: 'icon',
        icon: 'cake',
        mediaGradient: 'linear-gradient(135deg, rgba(224, 81, 138, 0.18) 0%, rgba(224, 81, 138, 0.42) 100%)',
        coldAccent: '#E0518A',
        badge: 'PROMO -15%',
        badgeDark: true,
        favoriteOffset: 227,
    },
    {
        category: 'COBERTURAS',
        name: 'Vainilla',
        subtype: 'Pasta de Vainilla',
        price: '$ 5.300',
        mediaKind: 'image',
        imageSrc: '/piquim/carta/image-3.png',
        mediaGradient: 'linear-gradient(135deg, rgba(224, 81, 138, 0.18) 0%, rgba(224, 81, 138, 0.42) 100%)',
        coldAccent: '#4BEAFF',
        favoriteOffset: 227,
    },
];

function makeProducts(prefix, variants, count = 6) {
    return Array.from({ length: count }, (_, index) => {
        const variant = variants[index % variants.length];
        return {
            id: `piquim-${prefix}-${variant.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`,
            ...variant,
        };
    });
}

export function getAllPiquimSubcatalogProducts() {
    const products = [];
    Object.values(PIQUIM_SUBCATALOGS).forEach((catalog) => {
        catalog.sections.forEach((section) => {
            section.products.forEach((product) => {
                if (!products.some((item) => item.id === product.id)) {
                    products.push({
                        ...product,
                        section: section.title,
                        catalogSlug: catalog.slug,
                        catalogTitle: catalog.headingAccent,
                    });
                }
            });
        });
    });
    return products;
}

export function findPiquimProductById(id) {
    return getAllPiquimSubcatalogProducts().find((product) => product.id === id) || null;
}

export function getRelatedPiquimProducts(id, limit = 4) {
    return getAllPiquimSubcatalogProducts()
        .filter((product) => product.id !== id)
        .slice(0, limit);
}

export const PIQUIM_SUBCATALOGS = {
    heladeria: {
        slug: 'heladeria',
        headingBase: 'Productos',
        headingAccent: 'de heladeria',
        accent: '#6BB8E0',
        mediaGradient: 'linear-gradient(135deg, rgba(107, 184, 224, 0.18) 0%, rgba(107, 184, 224, 0.42) 100%)',
        icon: 'ice',
        filters: {
            title: 'Filtros',
            subtitle: 'Refina tu busqueda\nprofesional',
            searchPlaceholder: 'Producto...',
            groups: [
                {
                    title: 'Tipo de Producto',
                    items: ['Estabilizantes', 'Neutros artesanales', 'Aditivos', 'Variegattos', 'Sabor & Color en Polvo'],
                },
                {
                    title: 'Presentacion',
                    items: ['Balde', 'Bolsa'],
                },
            ],
        },
        sections: [
            {
                title: 'Estabilizantes',
                products: makeProducts('heladeria-estabilizantes', CARD_VARIANTS),
            },
            {
                title: 'Aditivos',
                products: makeProducts('heladeria-aditivos', CARD_VARIANTS),
            },
        ],
    },
    panaderia: {
        slug: 'panaderia',
        headingBase: 'Productos',
        headingAccent: 'de panaderia',
        accent: '#D4A24A',
        mediaGradient: 'linear-gradient(135deg, rgba(212, 162, 74, 0.18) 0%, rgba(212, 162, 74, 0.42) 100%)',
        icon: 'bread',
        filters: {
            title: 'Filtros',
            subtitle: 'Refina tu busqueda\nprofesional',
            searchPlaceholder: 'Producto...',
            groups: [
                {
                    title: 'Tipo de Producto',
                    items: ['Premezclas', 'Mejoradores', 'Aditivos', 'Chipa', 'Bolleria'],
                },
                {
                    title: 'Presentacion',
                    items: ['Bolsa', 'Caja'],
                },
            ],
        },
        sections: [
            {
                title: 'Premezclas',
                products: makeProducts('panaderia-premezclas', PANADERIA_VARIANTS),
            },
            {
                title: 'Mejoradores',
                products: makeProducts('panaderia-mejoradores', PANADERIA_VARIANTS),
            },
        ],
    },
    confiteria: {
        slug: 'confiteria',
        headingBase: 'Productos',
        headingAccent: 'de confiteria',
        accent: '#E0518A',
        mediaGradient: 'linear-gradient(135deg, rgba(224, 81, 138, 0.18) 0%, rgba(224, 81, 138, 0.42) 100%)',
        icon: 'cake',
        filters: {
            title: 'Filtros',
            subtitle: 'Refina tu busqueda\nprofesional',
            searchPlaceholder: 'Producto...',
            groups: [
                {
                    title: 'Tipo de Producto',
                    items: ['Cremas', 'Mousses', 'Dulce de leche', 'Brownie', 'Coberturas'],
                },
                {
                    title: 'Presentacion',
                    items: ['Balde', 'Bolsa', 'Caja'],
                },
            ],
        },
        sections: [
            {
                title: 'Cremas',
                products: makeProducts('confiteria-cremas', CONFITERIA_VARIANTS),
            },
            {
                title: 'Mousses',
                products: makeProducts('confiteria-mousses', CONFITERIA_VARIANTS),
            },
        ],
    },
};
