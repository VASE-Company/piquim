const makeProducts = (category, name, subtype, prices) =>
    prices.map((price, index) => ({
        id: `${category.toLowerCase().replace(/\s+/g, '-')}-${index}`,
        category,
        name,
        subtype,
        price,
        badge: index === 0 ? 'MAS VENDIDO' : index === 1 ? 'PROMO -15%' : '',
        badgeDark: index === 1,
    }));

export const PIQUIM_SUBCATALOGS = {
    heladeria: {
        slug: 'heladeria',
        headingBase: 'Productos',
        headingAccent: 'de heladería',
        accent: '#6BB8E0',
        mediaGradient: 'linear-gradient(135deg, rgba(107, 184, 224, 0.18) 0%, rgba(107, 184, 224, 0.42) 100%)',
        icon: 'ice',
        filters: {
            title: 'Filtros',
            subtitle: 'Refina tu búsqueda\nprofesional',
            searchPlaceholder: 'Producto...',
            groups: [
                {
                    title: 'Tipo de Producto',
                    items: ['Estabilizantes', 'Neutros artesanales', 'Aditivos', 'Variegattos', 'Sabor & Color en Polvo'],
                },
                {
                    title: 'Presentación',
                    items: ['Balde', 'Bolsa'],
                },
            ],
        },
        sections: [
            {
                title: 'Estabilizantes',
                products: makeProducts('ESTABILIZANTES', 'Neutro Cream (para crema)', 'Neutro artesanal', [
                    '$ 8.450',
                    '$ 6.800',
                    '$ 9.500',
                    '$ 5.300',
                    '$ 7.150',
                    '$ 3.900',
                ]),
            },
            {
                title: 'Aditivos',
                products: makeProducts('ESTABILIZANTES', 'Neutro Cream (para crema)', 'Neutro artesanal', [
                    '$ 8.450',
                    '$ 6.800',
                    '$ 9.500',
                    '$ 5.300',
                    '$ 7.150',
                    '$ 3.900',
                ]),
            },
        ],
    },
    panaderia: {
        slug: 'panaderia',
        headingBase: 'Productos',
        headingAccent: 'de panadería',
        accent: '#D4A24A',
        mediaGradient: 'linear-gradient(135deg, rgba(212, 162, 74, 0.18) 0%, rgba(212, 162, 74, 0.42) 100%)',
        icon: 'bread',
        filters: {
            title: 'Filtros',
            subtitle: 'Refina tu búsqueda\nprofesional',
            searchPlaceholder: 'Producto...',
            groups: [
                {
                    title: 'Tipo de Producto',
                    items: ['Premezclas', 'Mejoradores', 'Aditivos', 'Chipa', 'Bolleria'],
                },
                {
                    title: 'Presentación',
                    items: ['Bolsa', 'Caja'],
                },
            ],
        },
        sections: [
            {
                title: 'Premezclas',
                products: makeProducts('PREMEZCLAS', 'Premezcla Pan Suave', 'Panaderia profesional', [
                    '$ 7.900',
                    '$ 6.450',
                    '$ 8.300',
                    '$ 5.850',
                    '$ 7.250',
                    '$ 4.900',
                ]),
            },
            {
                title: 'Mejoradores',
                products: makeProducts('MEJORADORES', 'Mejorador Integral', 'Volumen y textura', [
                    '$ 9.200',
                    '$ 7.820',
                    '$ 10.100',
                    '$ 6.300',
                    '$ 8.750',
                    '$ 5.450',
                ]),
            },
        ],
    },
    confiteria: {
        slug: 'confiteria',
        headingBase: 'Productos',
        headingAccent: 'de confitería',
        accent: '#E0518A',
        mediaGradient: 'linear-gradient(135deg, rgba(224, 81, 138, 0.18) 0%, rgba(224, 81, 138, 0.42) 100%)',
        icon: 'cake',
        filters: {
            title: 'Filtros',
            subtitle: 'Refina tu búsqueda\nprofesional',
            searchPlaceholder: 'Producto...',
            groups: [
                {
                    title: 'Tipo de Producto',
                    items: ['Cremas', 'Mousses', 'Dulce de leche', 'Brownie', 'Coberturas'],
                },
                {
                    title: 'Presentación',
                    items: ['Balde', 'Bolsa', 'Caja'],
                },
            ],
        },
        sections: [
            {
                title: 'Cremas',
                products: makeProducts('CREMAS', 'Crema Pastelera Premium', 'Base repostera', [
                    '$ 8.250',
                    '$ 6.990',
                    '$ 9.100',
                    '$ 5.750',
                    '$ 7.600',
                    '$ 4.850',
                ]),
            },
            {
                title: 'Mousses',
                products: makeProducts('MOUSSES', 'Mousse Chocolate Intenso', 'Confiteria profesional', [
                    '$ 9.450',
                    '$ 7.980',
                    '$ 10.300',
                    '$ 6.650',
                    '$ 8.900',
                    '$ 5.700',
                ]),
            },
        ],
    },
};
