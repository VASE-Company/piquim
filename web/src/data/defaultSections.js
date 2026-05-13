import { getDefaultBrandMarqueeProps } from './brandMarqueeDefaults';

const cloneValue = (value) => {
    try {
        return JSON.parse(JSON.stringify(value));
    } catch {
        return value;
    }
};

const isPlainObject = (value) =>
    Boolean(value) &&
    typeof value === 'object' &&
    !Array.isArray(value);

const deepMerge = (baseValue, overrideValue) => {
    if (overrideValue === undefined) return cloneValue(baseValue);

    if (Array.isArray(baseValue)) {
        return Array.isArray(overrideValue) ? cloneValue(overrideValue) : cloneValue(baseValue);
    }

    if (isPlainObject(baseValue)) {
        const next = { ...cloneValue(baseValue) };
        if (!isPlainObject(overrideValue)) return next;

        Object.entries(overrideValue).forEach(([key, value]) => {
            next[key] = key in next ? deepMerge(next[key], value) : cloneValue(value);
        });
        return next;
    }

    return cloneValue(overrideValue);
};

export const DEFAULT_HOME_SECTIONS = [
    {
        id: 'home-hero',
        type: 'HeroSlider',
        enabled: true,
        props: {
            variant: 'modernist_centered',
            slides: [
                {
                    label: 'Materia prima profesional',
                    title: 'SABOR\nQUE RINDE',
                    description:
                        'PIQUIM abastece heladerias, panaderias y confiterias con materia prima premium, catalogos claros y respuesta comercial agil.',
                    image: '/piquim/catalog-heladeria.jpg',
                    primaryButtonLabel: 'Ver catalogo',
                    primaryButtonLink: '/catalog',
                    secondaryButtonLabel: 'Conocer PIQUIM',
                    secondaryButtonLink: '/about',
                },
                {
                    label: 'Heladeria, panaderia y confiteria',
                    title: 'PRODUCCION\nCONSTANTE',
                    description:
                        'Insumos para obradores que necesitan calidad estable, reposicion ordenada y productos listos para trabajar.',
                    image: '/piquim/catalog-panaderia.jpg',
                    primaryButtonLabel: 'Explorar lineas',
                    primaryButtonLink: '/catalog',
                    secondaryButtonLabel: 'Hablar con ventas',
                    secondaryButtonLink: '/about',
                },
            ],
            styles: {
                titleColor: '#f8fafc',
                textColor: '#d7f7f5',
                labelColor: '#ffbe8b',
                primaryButtonBgColor: '#ff4d00',
                primaryButtonTextColor: '#fffaf6',
                secondaryButtonBgColor: 'rgba(255,255,255,0.04)',
                secondaryButtonTextColor: '#f8fafc',
                secondaryButtonBorderColor: 'rgba(255,255,255,0.32)',
                overlayColor: '#071317',
            },
        },
    },
    {
        id: 'home-brands',
        type: 'BrandMarquee',
        enabled: true,
        props: {
            ...getDefaultBrandMarqueeProps(),
            variant: 'grid_static',
            eyebrow: 'Familias Piquim',
            title: 'Materia prima para cada mostrador',
            subtitle: 'Productos y soporte para heladerias, panaderias y confiterias que necesitan regularidad y compra simple.',
            items: [
                { id: 'brand-piquim-heladeria', name: 'Heladeria' },
                { id: 'brand-piquim-panaderia', name: 'Panaderia' },
                { id: 'brand-piquim-confiteria', name: 'Confiteria' },
                { id: 'brand-piquim-pulpas', name: 'Pulpas' },
                { id: 'brand-piquim-bases', name: 'Bases' },
                { id: 'brand-piquim-cremas', name: 'Cremas' },
                { id: 'brand-piquim-mejoradores', name: 'Mejoradores' },
                { id: 'brand-piquim-promos', name: 'Promociones' },
            ],
            styles: {
                backgroundColor: '#fff3eb',
                panelBackgroundColor: '#fffaf6',
                titleColor: '#1a1614',
                subtitleColor: '#6f625d',
                badgeBackgroundColor: '#ff4d00',
                badgeTextColor: '#fffaf6',
                cardBackgroundColor: '#ffffff',
                cardBorderColor: '#dab6a6',
            },
        },
    },
    {
        id: 'home-featured',
        type: 'FeaturedProducts',
        enabled: true,
        props: {
            variant: 'modern',
            title: 'Productos destacados',
            subtitle: 'Una seleccion pensada para obradores profesionales, reposicion agil y resultados consistentes.',
            ctaLabel: 'Ver catalogo completo',
            ctaLink: '/catalog',
            styles: {
                backgroundColor: '#fffaf6',
                cardBackgroundColor: '#ffffff',
                titleColor: '#1a1614',
                subtitleColor: '#6f625d',
                accentColor: '#ff4d00',
                priceColor: '#ff4d00',
                buttonBackgroundColor: '#1a1614',
                buttonTextColor: '#fffaf6',
            },
        },
    },
    {
        id: 'home-services',
        type: 'Services',
        enabled: true,
        props: {
            title: 'Respuesta comercial para produccion diaria',
            subtitle: 'PIQUIM combina materia prima, catalogos claros y acompanamiento para cada rubro.',
            items: [
                {
                    icon: 'support_agent',
                    title: 'Asesoria de producto',
                    text: 'Te ayudamos a elegir bases, pulpas, cremas y mejoradores segun receta, volumen y proceso.',
                },
                {
                    icon: 'local_shipping',
                    title: 'Abastecimiento ordenado',
                    text: 'Coordinamos reposicion y entrega para que el insumo correcto llegue cuando la produccion lo necesita.',
                },
                {
                    icon: 'shield',
                    title: 'Calidad consistente',
                    text: 'Materias primas pensadas para sostener sabor, textura y rendimiento en uso continuo.',
                },
            ],
            styles: {
                backgroundColor: '#1a1614',
                titleColor: '#fffaf6',
                subtitleColor: '#d7c8bf',
                cardBackgroundColor: '#241d1a',
                cardTitleColor: '#fffaf6',
                cardTextColor: '#d7c8bf',
                iconColor: '#ff4d00',
                iconBackgroundColor: 'rgba(255, 77, 0, 0.14)',
            },
        },
    },
];

export const DEFAULT_ABOUT_SECTIONS = [
    {
        id: 'about-hero',
        type: 'AboutHero',
        enabled: true,
        props: {
            tagline: 'PIQUIM',
            title: 'Materia prima para profesionales del sabor',
            description:
                'Trabajamos para que heladerias, panaderias y confiterias compren insumos confiables con catalogos claros, reposicion agil y acompanamiento comercial.',
            primaryButton: { label: 'Ver catalogo', link: '/catalog' },
            secondaryButton: { label: 'Contactar ventas', link: '/catalog' },
            backgroundImage: '/piquim/catalog-confiteria.jpg',
            styles: {
                accentColor: '#ffbe8b',
                overlayColor: '#1a1614',
                overlayOpacity: 0.8,
                textColor: '#f8fafc',
                mutedColor: 'rgba(236,254,255,0.8)',
            },
        },
    },
    {
        id: 'about-mission',
        type: 'AboutMission',
        enabled: true,
        props: {
            eyebrow: 'Como trabajamos',
            title: 'Desde Mar del Plata para obradores profesionales.',
            paragraphs: [
                'PIQUIM nace para abastecer a profesionales que necesitan materia prima estable, buenos tiempos de respuesta y una experiencia de compra sin friccion.',
                'Ordenamos la oferta para que cada cliente pueda identificar rubros, usos, formatos y alternativas con una lectura simple del catalogo.',
            ],
            highlights: [
                { icon: 'verified', title: 'Seleccion clara', text: 'Catalogos orientados a compra real para produccion diaria.' },
                { icon: 'eco', title: 'Rendimiento util', text: 'Productos pensados para recetas, volumen y reposicion eficiente.' },
            ],
            image: '/piquim/catalog-panaderia.jpg',
            imageAlt: 'Materia prima Piquim para produccion profesional',
            styles: {
                accentColor: '#ff4d00',
                backgroundColor: '#fffaf6',
                textColor: '#1a1614',
                mutedColor: '#6f625d',
            },
        },
    },
    {
        id: 'about-stats',
        type: 'AboutStats',
        enabled: true,
        props: {
            items: [
                { value: '1992', label: 'Origen Mar del Plata', accent: true },
                { value: '3', label: 'Rubros principales' },
                { value: 'B2B', label: 'Venta profesional' },
                { value: 'Soporte', label: 'Comercial y producto' },
            ],
            styles: {
                backgroundColor: '#1a1614',
                accentColor: '#ff4d00',
                textColor: '#fffaf6',
                mutedColor: '#d7c8bf',
            },
        },
    },
    {
        id: 'about-values',
        type: 'AboutValues',
        enabled: true,
        props: {
            title: 'Principios de trabajo',
            items: [
                {
                    icon: 'quality',
                    title: 'Consistencia',
                    description: 'Cada insumo debe responder igual en receta, proceso y reposicion.',
                },
                {
                    icon: 'commitment',
                    title: 'Continuidad',
                    description: 'El objetivo no es una venta aislada sino un obrador bien abastecido y ordenado.',
                },
                {
                    icon: 'innovation',
                    title: 'Criterio de producto',
                    description: 'Traducimos variedad de insumos en decisiones simples, concretas y aplicables.',
                },
            ],
            styles: {
                backgroundColor: '#fff3eb',
                cardBackground: '#ffffff',
                accentColor: '#ff4d00',
                textColor: '#1a1614',
                mutedColor: '#6f625d',
            },
        },
    },
    {
        id: 'about-team',
        type: 'AboutTeam',
        enabled: true,
        props: {
            anchor: 'equipo',
            title: 'Acompanamos obradores, no solo pedidos.',
            quote:
                'Cuando el catalogo, el stock y la comunicacion comercial se alinean, comprar materia prima deja de ser un problema y pasa a ser parte estable de la produccion.',
            author: 'Equipo PIQUIM',
            role: 'Operacion comercial y soporte de producto',
            avatarImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format&fit=crop',
            backgroundImage: '/piquim/catalog-heladeria.jpg',
            styles: {
                backgroundColor: '#fffaf6',
                overlayColor: '#1a1614',
                overlayOpacity: 0.34,
                textColor: '#1a1614',
            },
        },
    },
    {
        id: 'about-cta',
        type: 'AboutCTA',
        enabled: true,
        props: {
            title: 'Necesitas materia prima para tu produccion?',
            primaryLink: { label: 'Ver productos', link: '/catalog' },
            secondaryLink: { label: 'Hablar con ventas', link: '/about' },
            styles: {
                backgroundColor: '#fffaf6',
                accentColor: '#ff4d00',
                textColor: '#1a1614',
                mutedColor: '#6f625d',
            },
        },
    },
];

export const PIQUIM_HOME_SECTIONS = [
    {
        id: 'piquim-hero',
        type: 'PiquimHero',
        enabled: true,
        props: {},
    },
    {
        id: 'piquim-announce',
        type: 'PiquimAnnounceBar',
        enabled: true,
        props: {},
    },
    {
        id: 'piquim-tres-mundos',
        type: 'PiquimTresMundos',
        enabled: true,
        props: {},
    },
    {
        id: 'piquim-catalog',
        type: 'PiquimCatalog3Panel',
        enabled: true,
        props: {},
    },
    {
        id: 'piquim-featured',
        type: 'PiquimFeaturedProducts',
        enabled: true,
        props: { products: [] },
    },
    {
        id: 'piquim-cta',
        type: 'PiquimCTABanner',
        enabled: true,
        props: {},
    },
];

const DEFAULT_SECTIONS_BY_PAGE = {
    home: DEFAULT_HOME_SECTIONS,
    about: DEFAULT_ABOUT_SECTIONS,
    'piquim-home': PIQUIM_HOME_SECTIONS,
};

export const getDefaultSectionsForPage = (pageKey = 'home') =>
    cloneValue(DEFAULT_SECTIONS_BY_PAGE[pageKey] || DEFAULT_HOME_SECTIONS);

export const mergeSectionsWithDefaults = (pageKey = 'home', sections = []) => {
    const templates = DEFAULT_SECTIONS_BY_PAGE[pageKey] || [];
    const source = Array.isArray(sections) ? sections : [];

    return source.map((section) => {
        const template = templates.find((item) => item.type === section?.type);
        if (!template) return cloneValue(section);
        return deepMerge(template, section);
    });
};
