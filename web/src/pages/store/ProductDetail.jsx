import React, { useEffect, useMemo, useState } from "react";
import StoreLayout from "../../components/layout/StoreLayout";
import { useStore } from "../../context/StoreContext";
import { useTenant } from "../../context/TenantContext";
import { useAuth } from "../../context/AuthContext";
import { formatCurrency } from "../../utils/format";
import { getApiBase, getAuthHeaders, getTenantHeaders } from "../../utils/api";
import { navigate } from "../../utils/navigation";
import { getPriceAccessState } from "../../utils/priceVisibility";
import { getLowStockThreshold, getStockStatus, isInStock } from "../../utils/stock";
import { createPlaceholderImage } from "../../utils/productImage";
import PriceAccessPrompt from "../../components/PriceAccessPrompt";
import StoreSkeleton from "../../components/StoreSkeleton";
import ProductDetailMinimal from "./ProductDetailMinimal";
import ProductDetailImmersive from "./ProductDetailImmersive";
import { findPiquimProductById, getRelatedPiquimProducts } from "../../data/piquimSubcatalogs";

const FALLBACK_IMAGE = createPlaceholderImage({ label: "Producto", width: 900, height: 900 });

const getProductId = () => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts[0] !== "product") return null;
    return parts[1] || null;
};

export default function ProductDetail() {
    const { addToCart, toggleFavorite, isFavorite, showToast } = useStore();
    const { settings } = useTenant();
    const { isWholesale, user, loading: authLoading } = useAuth();

    const currency = settings?.commerce?.currency || "ARS";
    const locale = settings?.commerce?.locale || "es-AR";
    const { showPricesEnabled, canViewPrices } = getPriceAccessState(settings, user);
    const showStock = settings?.commerce?.show_stock !== false;
    const reviewsEnabledFromSettings = settings?.commerce?.reviews_enabled !== false;
    const lowStockThreshold = getLowStockThreshold(settings);

    const [productId, setProductId] = useState(getProductId);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeImage, setActiveImage] = useState(0);
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [relatedLoading, setRelatedLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [reviewsError, setReviewsError] = useState("");
    const [reviewsEnabled, setReviewsEnabled] = useState(reviewsEnabledFromSettings);
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        rating: 5,
        comment: "",
    });
    const piquimProduct = useMemo(() => findPiquimProductById(productId), [productId]);
    const piquimRelatedProducts = useMemo(() => getRelatedPiquimProducts(productId, 4), [productId]);

    useEffect(() => {
        const update = () => setProductId(getProductId());
        window.addEventListener("popstate", update);
        window.addEventListener("navigate", update);
        return () => {
            window.removeEventListener("popstate", update);
            window.removeEventListener("navigate", update);
        };
    }, []);

    useEffect(() => {
        setReviewsEnabled(reviewsEnabledFromSettings);
    }, [reviewsEnabledFromSettings]);

    useEffect(() => {
        let active = true;
        setActiveImage(0);
        setQty(1);
        setActiveTab("description");
        setReviews([]);
        setReviewsError("");
        setReviewForm({ rating: 5, comment: "" });

        const loadProduct = async () => {
            if (!productId) {
                setError("Falta el id del producto.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError("");

            if (piquimProduct) {
                setProduct(null);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${getApiBase()}/public/products/${productId}`, {
                    headers: { ...getTenantHeaders(), ...getAuthHeaders() },
                });

                if (!response.ok) {
                    throw new Error(`Error al cargar el producto: ${response.status}`);
                }

                const data = await response.json();
                if (!active) return;

                setProduct(data);
            } catch (err) {
                if (!active) return;
                console.error("No se pudo cargar el producto", err);
                setProduct(null);
                setError("No pudimos cargar este producto.");
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadProduct();

        return () => {
            active = false;
        };
    }, [productId, piquimProduct]);

    useEffect(() => {
        let active = true;
        if (!productId) return () => { };
        if (piquimProduct) {
            setReviews([]);
            setReviewsError("");
            setReviewsLoading(false);
            return () => { };
        }

        const loadReviews = async () => {
            setReviewsLoading(true);
            setReviewsError("");
            try {
                const res = await fetch(`${getApiBase()}/public/products/${productId}/reviews?limit=50`, {
                    headers: { ...getTenantHeaders(), ...getAuthHeaders() },
                });
                if (!res.ok) {
                    throw new Error(`Error al cargar reseñas: ${res.status}`);
                }
                const data = await res.json();
                if (!active) return;
                setReviewsEnabled(data?.enabled !== false);
                setReviews(Array.isArray(data?.items) ? data.items : []);
            } catch (err) {
                if (!active) return;
                console.error("No se pudieron cargar las reseñas", err);
                setReviews([]);
                setReviewsError("No pudimos cargar las reseñas.");
            } finally {
                if (active) {
                    setReviewsLoading(false);
                }
            }
        };

        loadReviews();

        return () => {
            active = false;
        };
    }, [productId, piquimProduct]);

    useEffect(() => {
        let active = true;
        if (!productId) return () => { };
        if (piquimProduct) {
            setRelatedProducts([]);
            setRelatedLoading(false);
            return () => { };
        }

        const loadRelated = async () => {
            setRelatedLoading(true);
            try {
                const res = await fetch(`${getApiBase()}/public/products/${productId}/related?limit=4`, {
                    headers: { ...getTenantHeaders(), ...getAuthHeaders() },
                });
                if (!res.ok) {
                    throw new Error(`Error al cargar relacionados: ${res.status}`);
                }
                const data = await res.json();
                if (!active) return;
                setRelatedProducts(Array.isArray(data.items) ? data.items : []);
            } catch (err) {
                if (!active) return;
                console.error("No se pudieron cargar los productos relacionados", err);
                setRelatedProducts([]);
            } finally {
                if (active) {
                    setRelatedLoading(false);
                }
            }
        };

        loadRelated();

        return () => {
            active = false;
        };
    }, [productId, piquimProduct]);

    const view = useMemo(() => {
        if (!product) return null;
        const data = product.data || {};
        const rawImages = Array.isArray(data.images) ? data.images : [];
        const rawFirst = rawImages[0];
        const image =
            data.image ||
            data.image_url ||
            (rawFirst && (rawFirst.url || rawFirst.src || rawFirst)) ||
            FALLBACK_IMAGE;

        const price = isWholesale && product.price_wholesale != null
            ? Number(product.price_wholesale)
            : Number(product.price || 0);

        return {
            id: product.id,
            sku: product.sku || product.erp_id,
            name: product.name || "Producto",
            shortDescription:
                product.short_description ||
                data.short_description ||
                data.shortDescription ||
                "",
            longDescription:
                product.long_description ||
                data.long_description ||
                data.longDescription ||
                product.description ||
                data.description ||
                "",
            brand: product.brand || data.brand,
            stock: product.stock,
            image,
            images: [],
            alt: data.image_alt || product.name || "Producto",
            price,
            oldPrice: !isWholesale && data.old_price ? Number(data.old_price) : null,
            isWholesaleItem: isWholesale && product.price_wholesale != null,
            showSpecifications: product.show_specifications !== false && data.show_specifications !== false,
            extra: data,
        };
    }, [product, isWholesale]);

    const images = useMemo(() => {
        if (!view) return [];
        const data = view.extra || {};
        const rawImages = Array.isArray(data.images) ? data.images : [];
        const normalized = [];
        const pushUrl = (url) => {
            if (!url) return;
            if (!normalized.some((item) => item.url === url)) {
                normalized.push({ url });
            }
        };

        if (data.image || data.image_url) {
            pushUrl(data.image || data.image_url);
        }

        rawImages.forEach((img) => {
            if (typeof img === "string") {
                pushUrl(img);
                return;
            }
            if (img && typeof img === "object") {
                pushUrl(img.url || img.src || img.image);
            }
        });

        if (!normalized.length) {
            pushUrl(view.image || FALLBACK_IMAGE);
        }

        return normalized;
    }, [view]);

    const relatedCards = useMemo(() => {
        return relatedProducts.map((item, index) => {
            const data = item.data || {};
            const rawImages = Array.isArray(data.images) ? data.images : [];
            const rawFirst = rawImages[0];
            const image =
                data.image ||
                data.image_url ||
                (rawFirst && (rawFirst.url || rawFirst.src || rawFirst)) ||
                FALLBACK_IMAGE;

            const price = isWholesale && item.price_wholesale != null
                ? Number(item.price_wholesale)
                : Number(item.price || 0);

            return {
                id: item.id,
                name: item.name,
                price,
                image,
                alt: data.image_alt || item.name || "Producto",
                stock: item.stock,
                isWholesaleItem: isWholesale && item.price_wholesale != null,
                index,
            };
        });
    }, [relatedProducts, isWholesale]);

    const canBuy = view ? isInStock(view.stock) : false;
    const stockStatus = view && showStock ? getStockStatus(view.stock, lowStockThreshold) : null;
    const favoriteActive = view ? isFavorite(view.id) : false;
    const specificationEntries = useMemo(() => {
        const specs = view?.extra?.specifications;
        if (!specs || typeof specs !== "object" || Array.isArray(specs)) return [];
        return Object.entries(specs)
            .map(([label, value]) => ({
                label: String(label || "").trim(),
                value: String(value ?? "").trim(),
            }))
            .filter((item) => item.label && item.value);
    }, [view]);
    const canShowSpecifications = Boolean(view?.showSpecifications && specificationEntries.length);

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        if (!productId || reviewSubmitting) return;

        const comment = String(reviewForm.comment || "").trim();
        if (!comment) {
            setReviewsError("Escribí un comentario antes de enviar.");
            return;
        }

        setReviewSubmitting(true);
        setReviewsError("");
        try {
            const response = await fetch(`${getApiBase()}/public/products/${productId}/reviews`, {
                method: "POST",
                headers: {
                    ...getTenantHeaders(),
                    ...getAuthHeaders(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comment,
                    rating: Number(reviewForm.rating || 5),
                }),
            });

            const contentType = response.headers.get("content-type") || "";
            const payload = contentType.includes("application/json")
                ? await response.json()
                : { error: await response.text() };

            if (!response.ok) {
                if (response.status === 401 || payload?.error === "unauthorized") {
                    setReviewsError("Iniciá sesión para comentar.");
                } else if (payload?.error === "reviews_disabled") {
                    setReviewsEnabled(false);
                    setReviewsError("Las reseñas están deshabilitadas para esta tienda.");
                } else {
                    setReviewsError("No se pudo enviar la reseña.");
                }
                return;
            }

            if (payload?.review) {
                setReviews((prev) => [payload.review, ...prev]);
            }
            setReviewForm({ rating: 5, comment: "" });
            showToast("Reseña enviada");
        } catch (err) {
            console.error("No se pudo enviar la reseña", err);
            setReviewsError("No se pudo enviar la reseña.");
        } finally {
            setReviewSubmitting(false);
        }
    };

    const formatReviewDate = (value) => {
        if (!value) return "";
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return "";
        return parsed.toLocaleDateString("es-AR");
    };

    const renderRatingStars = (value) => {
        const safeRating = Math.max(1, Math.min(5, Number(value || 0)));
        return "★".repeat(safeRating) + "☆".repeat(5 - safeRating);
    };

    const handleAdd = () => {
        if (!view || !canBuy) return;
        const safeQty = Math.max(1, Number(qty) || 1);
        addToCart({
            id: view.id,
            sku: view.sku,
            name: view.name,
            price: view.price,
            image: view.image,
            alt: view.alt,
            stock: view.stock,
            variant: view.extra?.variant || "",
        }, safeQty);
    };

    if (piquimProduct) {
        return (
            <PiquimProductCarta
                product={piquimProduct}
                relatedProducts={piquimRelatedProducts}
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
                showToast={showToast}
            />
        );
    }

    const layoutProps = {
        view, loading, error, images, activeImage, setActiveImage, qty, setQty, addToCart,
        handleAdd, relatedCards, relatedLoading, reviews, reviewsLoading, reviewsError,
        reviewsEnabled, reviewSubmitting, reviewForm, setReviewForm, handleReviewSubmit,
        formatReviewDate, renderRatingStars, favoriteActive, toggleFavorite,
        canBuy, stockStatus, showPricesEnabled, canViewPrices, authLoading, currency, locale,
        activeTab, setActiveTab, canShowSpecifications, specificationEntries, isInStock, user
    };

    const template = settings?.commerce?.product_detail_template || "classic";
    if (template === "minimal") return <ProductDetailMinimal {...layoutProps} />;
    if (template === "immersive") return <ProductDetailImmersive {...layoutProps} />;

    return (
        <StoreLayout>
            <main className="max-w-[1400px] mx-auto w-full px-4 md:px-10 py-10">
                <div className="flex items-center gap-2 text-sm text-[#8a7560] mb-6">
                    <button type="button" onClick={() => navigate("/")} className="hover:text-primary">
                        Inicio
                    </button>
                    <span>/</span>
                    <button type="button" onClick={() => navigate("/catalog")} className="hover:text-primary">
                        Catálogo
                    </button>
                    <span>/</span>
                    <span className="text-[#181411] dark:text-white">
                        {view?.name || "Producto"}
                    </span>
                </div>

                {loading ? (
                    <StoreSkeleton variant="product" />
                ) : error ? (
                    <div className="rounded-xl border border-dashed border-red-200 bg-red-50 p-10 text-center text-red-600">
                        {error}
                    </div>
                ) : !view ? (
                    <div className="rounded-xl border border-dashed border-[#e5e1de] dark:border-[#3d2f21] p-10 text-center text-[#8a7560]">
                        Producto no encontrado.
                    </div>
                ) : (
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
                            <div className="flex flex-col gap-4 md:sticky md:top-24">
                                <div className="rounded-3xl border border-[#e5e1de] dark:border-[#3d2f21] bg-white dark:bg-[#1a130c] p-4">
                                    <div className="aspect-[4/3] w-full rounded-2xl bg-[#f5f2f0] dark:bg-[#2c2116] overflow-hidden">
                                        <img
                                            src={images[activeImage]?.url || view.image}
                                            alt={view.alt}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                                {images.length > 1 ? (
                                    <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-4 gap-3 pb-2 sm:pb-0 hide-scrollbar">
                                        {images.slice(0, 4).map((img, index) => (
                                            <button
                                                key={img.url}
                                                type="button"
                                                onClick={() => setActiveImage(index)}
                                                className={`snap-start shrink-0 w-[22%] sm:w-auto rounded-xl border p-1 bg-white dark:bg-[#1a130c] transition-colors ${index === activeImage ? 'border-primary' : 'border-[#e5e1de] dark:border-[#3d2f21] hover:border-primary/60'}`}
                                            >
                                                <div className="aspect-square rounded-lg overflow-hidden bg-[#f5f2f0] dark:bg-[#2c2116]">
                                                    <img src={img.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex flex-col gap-6">
                                <div>
                                    {view.extra?.collection ? (
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                            {view.extra.collection}
                                        </p>
                                    ) : null}
                                    <h1 className="text-3xl md:text-4xl font-black text-[#181411] dark:text-white mt-2">
                                        {view.name}
                                    </h1>
                                    {view.sku ? (
                                        <p className="text-[#8a7560] mt-2 text-xs font-bold uppercase tracking-wider">
                                            SKU: {view.sku}
                                        </p>
                                    ) : null}
                                </div>

                                <div className="flex items-center gap-3">
                                    {stockStatus ? (
                                        <span
                                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${stockStatus.bg} ${stockStatus.tone}`}
                                        >
                                            {stockStatus.label}
                                        </span>
                                    ) : null}
                                </div>

                                <div className="border-y border-[#e5e1de] dark:border-[#3d2f21] py-4 space-y-2">
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#8a7560]">Precio</p>
                                    {showPricesEnabled ? (
                                        canViewPrices ? (
                                            <div className="flex flex-col gap-1">
                                                {view.oldPrice ? (
                                                    <p className="text-sm font-semibold text-slate-400 line-through">
                                                        Precio Lista: {formatCurrency(view.oldPrice, currency, locale)}
                                                    </p>
                                                ) : null}
                                                <div className="flex items-end gap-3 mt-1">
                                                    {view.isWholesaleItem ? (
                                                        <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-sm font-bold uppercase tracking-wide">
                                                            Tu Precio (B2B)
                                                        </span>
                                                    ) : null}
                                                    <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                                                        {formatCurrency(view.price, currency, locale)}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col gap-1 mt-2">
                                                    <span className="text-xs font-bold text-amber-600">⚠️ IVA No Incluido</span>
                                                    <span className="text-xs italic text-[#8a7560]">⚠️ El precio puede variar según tu ubicación / región</span>
                                                </div>
                                            </div>
                                        ) : authLoading ? (
                                            <p className="text-[#8a7560]">Cargando precio...</p>
                                        ) : (
                                            <PriceAccessPrompt />
                                        )
                                    ) : (
                                        <p className="text-[#8a7560]">Contactar para precio</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center rounded-xl border border-[#e5e1de] dark:border-[#3d2f21] overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                                            className="h-11 w-11 flex items-center justify-center text-[#8a7560] hover:bg-[#f5f2f0] dark:hover:bg-[#2c2116]"
                                        >
                                            -
                                        </button>
                                        <span className="h-11 w-12 flex items-center justify-center font-bold text-[#181411] dark:text-white">
                                            {qty}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setQty((prev) => prev + 1)}
                                            className="h-11 w-11 flex items-center justify-center text-[#8a7560] hover:bg-[#f5f2f0] dark:hover:bg-[#2c2116]"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAdd}
                                        className="h-11 flex-1 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-60"
                                        disabled={!canBuy}
                                    >
                                        {canBuy ? "Agregar al carrito" : "Sin stock"}
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (view) {
                                            const added = toggleFavorite(view);
                                            if (added) {
                                                showToast("Producto añadido a favoritos");
                                            }
                                        }
                                    }}
                                    className="h-11 rounded-xl border border-[#e5e1de] dark:border-[#3d2f21] font-bold text-[#181411] dark:text-white hover:border-primary/50"
                                >
                                    {favoriteActive ? "Quitar de favoritos" : "Agregar a favoritos"}
                                </button>

                            </div>
                        </div>

                        <div className="rounded-2xl border border-[#e5e1de] dark:border-[#3d2f21] bg-white dark:bg-[#1a130c]">
                            <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-[#e5e1de] dark:border-[#3d2f21] px-6 pt-5">
                                {[
                                    { id: "description", label: "Descripción" },
                                    ...(canShowSpecifications ? [{ id: "specifications", label: "Especificaciones" }] : []),
                                    { id: "reviews", label: "Reseñas" },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`pb-3 px-0.5 text-sm font-bold uppercase tracking-widest ${activeTab === tab.id ? "text-primary border-b-2 border-primary" : "text-[#8a7560] hover:text-primary"}`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                {activeTab === "description" ? (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-black text-[#181411] dark:text-white mb-2">
                                                {view.name}
                                            </h3>
                                            <p className="text-sm text-[#8a7560] leading-relaxed whitespace-pre-line">
                                                {view.longDescription || view.shortDescription || "Sin descripción disponible."}
                                            </p>
                                        </div>
                                    </div>
                                ) : null}

                                {activeTab === "specifications" && canShowSpecifications ? (
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xl font-black text-[#181411] dark:text-white mb-2">
                                                Especificaciones técnicas
                                            </h3>
                                            <p className="text-sm text-[#8a7560]">
                                                Detalle rápido del producto en formato de celdas.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {specificationEntries.map((item) => (
                                                <div
                                                    key={`spec-${item.label}`}
                                                    className="rounded-2xl border border-[#e5e1de] bg-[#faf8f6] px-4 py-3 dark:border-[#3d2f21] dark:bg-[#120d08]"
                                                >
                                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8a7560]">
                                                        {item.label}
                                                    </p>
                                                    <p className="mt-2 text-sm font-semibold text-[#181411] dark:text-white">
                                                        {item.value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}

                                {activeTab === "reviews" ? (
                                    <div className="space-y-5">
                                        {!reviewsEnabled ? (
                                            <div className="text-sm text-[#8a7560]">
                                                Las reseñas están deshabilitadas para esta tienda.
                                            </div>
                                        ) : null}

                                        {reviewsEnabled ? (
                                            <div className="rounded-xl border border-[#e5e1de] dark:border-[#3d2f21] p-4 bg-[#faf8f6] dark:bg-[#120d08]">
                                                {!user ? (
                                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                                        <p className="text-sm text-[#8a7560]">
                                                            Iniciá sesión para dejar tu comentario.
                                                        </p>
                                                        <button
                                                            type="button"
                                                            onClick={() => navigate("/login")}
                                                            className="h-9 px-4 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90"
                                                        >
                                                            Iniciar sesión
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <form className="space-y-3" onSubmit={handleReviewSubmit}>
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#8a7560]">
                                                                Puntuación
                                                            </label>
                                                            <select
                                                                value={reviewForm.rating}
                                                                onChange={(event) =>
                                                                    setReviewForm((prev) => ({
                                                                        ...prev,
                                                                        rating: Number(event.target.value || 5),
                                                                    }))
                                                                }
                                                                className="px-2 py-1 rounded-lg border border-[#e5e1de] dark:border-[#3d2f21] bg-white dark:bg-[#1a130c] text-xs"
                                                            >
                                                                <option value={5}>5</option>
                                                                <option value={4}>4</option>
                                                                <option value={3}>3</option>
                                                                <option value={2}>2</option>
                                                                <option value={1}>1</option>
                                                            </select>
                                                        </div>
                                                        <textarea
                                                            value={reviewForm.comment}
                                                            onChange={(event) =>
                                                                setReviewForm((prev) => ({
                                                                    ...prev,
                                                                    comment: event.target.value,
                                                                }))
                                                            }
                                                            rows={3}
                                                            maxLength={1000}
                                                            placeholder="Escribí tu experiencia con este producto..."
                                                            className="w-full rounded-xl border border-[#e5e1de] dark:border-[#3d2f21] bg-white dark:bg-[#1a130c] px-3 py-2 text-sm text-[#181411] dark:text-white placeholder:text-[#8a7560] focus:outline-none focus:border-primary"
                                                        />
                                                        <div className="flex justify-end">
                                                            <button
                                                                type="submit"
                                                                disabled={reviewSubmitting}
                                                                className="h-9 px-4 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 disabled:opacity-60"
                                                            >
                                                                {reviewSubmitting ? "Enviando..." : "Publicar reseña"}
                                                            </button>
                                                        </div>
                                                    </form>
                                                )}
                                            </div>
                                        ) : null}

                                        {reviewsError ? (
                                            <p className="text-sm text-red-600">{reviewsError}</p>
                                        ) : null}

                                        {reviewsLoading ? (
                                            <div className="text-sm text-[#8a7560]">Cargando reseñas...</div>
                                        ) : !reviewsEnabled ? null : reviews.length === 0 ? (
                                            <div className="text-sm text-[#8a7560]">
                                                Todavía no hay reseñas para este producto.
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {reviews.map((review) => (
                                                    <article
                                                        key={review.id}
                                                        className="rounded-xl border border-[#e5e1de] dark:border-[#3d2f21] p-4 bg-white dark:bg-[#1a130c]"
                                                    >
                                                        <div className="flex items-center justify-between gap-2">
                                                            <p className="text-sm font-bold text-[#181411] dark:text-white">
                                                                {review.author_name || "Cliente"}
                                                            </p>
                                                            <p className="text-[10px] uppercase tracking-widest text-[#8a7560]">
                                                                {formatReviewDate(review.created_at)}
                                                            </p>
                                                        </div>
                                                        <p className="text-xs font-bold text-primary mt-1">
                                                            {renderRatingStars(review.rating)}
                                                        </p>
                                                        <p className="text-sm text-[#8a7560] leading-relaxed mt-2">
                                                            {review.comment}
                                                        </p>
                                                    </article>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-black text-[#181411] dark:text-white">
                                    Productos relacionados
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => navigate("/catalog")}
                                    className="text-[11px] font-bold uppercase tracking-widest text-[#8a7560] hover:text-primary"
                                >
                                    Ver catálogo
                                </button>
                            </div>

                            {relatedLoading ? (
                                <div className="rounded-xl border border-dashed border-[#e5e1de] dark:border-[#3d2f21] p-6 text-center text-[#8a7560]">
                                    Cargando relacionados...
                                </div>
                            ) : relatedCards.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-[#e5e1de] dark:border-[#3d2f21] p-6 text-center text-[#8a7560]">
                                    No hay productos relacionados.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {relatedCards.map((item) => (
                                        <div key={item.id} className="bg-white dark:bg-[#1a130c] rounded-xl border border-[#e5e1de] dark:border-[#3d2f21] overflow-hidden group hover:shadow-xl transition-all duration-300">
                                            <div
                                                className="relative aspect-square overflow-hidden bg-[#f5f2f0] dark:bg-[#2c2116] cursor-pointer"
                                                onClick={() => navigate(`/product/${item.id}`)}
                                            >
                                                <img
                                                    alt={item.name}
                                                    title={item.alt}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    src={item.image}
                                                    loading="lazy"
                                                />
                                            </div>

                                            <div className="p-4 flex flex-col gap-2">
                                                <div>
                                                    <h3 className="text-[#181411] dark:text-white font-bold text-sm leading-tight mb-1 line-clamp-2">
                                                        {item.name}
                                                    </h3>
                                                </div>
                                                {showPricesEnabled ? (
                                                    canViewPrices ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-primary font-black text-base">
                                                                {formatCurrency(item.price, currency, locale)}
                                                            </span>
                                                            {item.isWholesaleItem ? (
                                                                <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase">
                                                                    Mayorista
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    ) : authLoading ? (
                                                        <span className="text-[#8a7560] text-xs">Cargando precio...</span>
                                                    ) : (
                                                        <PriceAccessPrompt compact />
                                                    )
                                                ) : (
                                                    <span className="text-[#8a7560] text-xs">Consultar precio</span>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => addToCart(item, 1)}
                                                    className="mt-2 w-full h-9 rounded-lg bg-primary/10 text-primary font-bold text-xs hover:bg-primary hover:text-white transition-colors"
                                                    disabled={!isInStock(item.stock)}
                                                >
                                                    {isInStock(item.stock) ? "Agregar" : "Sin stock"}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </StoreLayout>
    );
}

function PiquimProductCarta({ product, relatedProducts, addToCart, toggleFavorite, isFavorite, showToast }) {
    const [qty, setQty] = useState(1);
    const productImage = product.mediaKind === "image" ? product.imageSrc : "/piquim/carta/image-1.png";
    const cartPrice = Number(String(product.price || "").replace(/[^\d]/g, "")) || 0;
    const favoriteActive = isFavorite(product.id);

    const cartProduct = {
        id: product.id,
        sku: product.id.toUpperCase(),
        name: product.name,
        price: cartPrice,
        image: productImage,
        alt: product.name,
        stock: 999,
        variant: product.subtype,
    };

    const handleAdd = () => {
        addToCart(cartProduct, qty);
    };

    return (
        <div className="min-h-screen bg-[#FFFAF6] text-[#1A1614]">
            <PiquimCartaHeader />
            <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 pb-16 pt-[142px] md:px-[84px]">
                <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold leading-[16.8px] text-[#5A4136]" style={{ fontFamily: "Work Sans, Inter, sans-serif" }}>
                    <button type="button" onClick={() => navigate("/catalog")} className="hover:text-[#FF4D00]">Productos</button>
                    <CartaChevron />
                    <button type="button" onClick={() => navigate(`/catalog?category=${product.catalogSlug}`)} className="hover:text-[#FF4D00]">{product.catalogTitle}</button>
                    <CartaChevron />
                    <span>{product.section}</span>
                    <CartaChevron />
                    <span className="text-[#A04100]">{product.name}</span>
                </nav>

                <section className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
                    <div className="relative min-h-[520px] overflow-hidden rounded-3xl bg-[#FFD7B6] outline outline-1 -outline-offset-1 outline-[rgba(226,191,176,0.30)]">
                        <img
                            src={productImage}
                            alt={product.name}
                            className={`h-full min-h-[520px] w-full ${product.mediaKind === "image" ? "object-cover" : "object-contain p-10"}`}
                        />
                        {product.badge ? (
                            <span
                                className="absolute left-6 top-6 rounded-full px-4 py-2 text-xs font-normal uppercase leading-[18px] text-white"
                                style={{ background: product.badgeDark ? "#1A1614" : "#FF4D00", fontFamily: "Work Sans, Inter, sans-serif", letterSpacing: 0.6 }}
                            >
                                {product.badge}
                            </span>
                        ) : null}
                    </div>

                    <aside className="flex flex-col gap-7 rounded-3xl border border-[#E8DFD8] bg-white p-8 shadow-[0_18px_45px_rgba(26,22,20,0.08)]">
                        <div className="flex flex-col gap-3">
                            <p className="text-base font-normal uppercase leading-6 text-[#FF4D00]" style={{ fontFamily: "Gilroy, sans-serif", letterSpacing: 1.6 }}>
                                {product.category}
                            </p>
                            <h1 className="text-[52px] font-bold leading-[58px] text-[#261812] max-md:text-4xl max-md:leading-10" style={{ fontFamily: "Gilroy, sans-serif" }}>
                                {product.name}
                            </h1>
                            <p className="text-base leading-7 text-[#5A4136]">
                                {product.subtype}. Producto profesional Piquim para mantener rendimiento, textura y terminacion estable en produccion.
                            </p>
                        </div>

                        <div className="h-px w-full bg-[#E8DFD8]" />

                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#B5ADA8]">Precio</p>
                                <p className="text-[42px] font-black leading-none text-[#1A1614]" style={{ fontFamily: "Inter, sans-serif" }}>{product.price}</p>
                            </div>
                            <div className="inline-flex items-center overflow-hidden rounded-full border border-[#E8DFD8] bg-[#FFFAF6]">
                                <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} className="flex size-11 items-center justify-center text-xl font-bold">-</button>
                                <span className="flex w-10 items-center justify-center text-sm font-black">{qty}</span>
                                <button type="button" onClick={() => setQty((value) => value + 1)} className="flex size-11 items-center justify-center text-xl font-bold">+</button>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                            <button
                                type="button"
                                onClick={handleAdd}
                                className="flex h-12 items-center justify-center rounded-full bg-[#FF4D00] px-8 text-sm font-bold uppercase tracking-[0.08em] text-white"
                            >
                                Agregar al carrito
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    const added = toggleFavorite(cartProduct);
                                    showToast(added ? "Producto anadido a favoritos" : "Producto quitado de favoritos");
                                }}
                                className="flex h-12 items-center justify-center rounded-full border border-[#E8DFD8] px-6 text-sm font-bold uppercase tracking-[0.08em] text-[#1A1614]"
                            >
                                {favoriteActive ? "Guardado" : "Guardar"}
                            </button>
                        </div>

                        <div className="grid gap-3 text-sm leading-6 text-[#5A4136]">
                            <CartaSpec label="Linea" value={product.catalogTitle} />
                            <CartaSpec label="Formato" value="Bolsa / balde segun producto" />
                            <CartaSpec label="Uso" value="Produccion profesional" />
                        </div>
                    </aside>
                </section>

                <section className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-base font-normal uppercase leading-6 text-[#FF4D00]" style={{ fontFamily: "Gilroy, sans-serif", letterSpacing: 1.6 }}>
                                Completa tu linea
                            </p>
                            <h2 className="text-[32px] font-bold leading-[41.6px] text-[#261812]" style={{ fontFamily: "Gilroy, sans-serif" }}>
                                Productos Relacionados
                            </h2>
                        </div>
                        <button type="button" onClick={() => navigate(`/catalog?category=${product.catalogSlug}`)} className="border-b-2 border-[#FF4D00] pb-1 text-base leading-6 text-[#FF4D00]">
                            Ver todos
                        </button>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(282px,1fr))] gap-6">
                        {relatedProducts.map((item) => (
                            <PiquimCartaRelatedCard key={item.id} product={item} />
                        ))}
                    </div>
                </section>
            </main>
            <PiquimCartaFooter />
        </div>
    );
}

function PiquimCartaHeader() {
    return (
        <header className="fixed left-0 right-0 top-0 z-50 flex w-full flex-col items-center justify-center overflow-hidden border-b border-[#E8DFD8]/80 bg-[#FFFAF6]/35 px-[60px] py-[18px] backdrop-blur-2xl max-md:px-4">
            <div className="inline-flex w-full items-center justify-center overflow-hidden rounded-[30px] bg-[linear-gradient(90deg,rgba(255,191,140,0.74)_0%,rgba(255,239,232,0.62)_48%,rgba(255,191,140,0.74)_100%)] px-[60px] py-[18px] shadow-[0_18px_60px_rgba(255,77,0,0.12)] outline outline-1 -outline-offset-1 outline-[#E8DFD8]/90 backdrop-blur-2xl max-md:px-5">
                <button type="button" onClick={() => navigate("/")} className="shrink-0" aria-label="Ir a inicio">
                    <img src="/piquim/catalogo/logo-navbar.png" alt="Piquim" style={{ width: 108, height: 31 }} />
                </button>

                <nav className="flex flex-1 items-center justify-center gap-8 overflow-hidden max-md:hidden">
                    <button type="button" onClick={() => navigate("/")} className="text-sm font-medium text-[#1A1614]" style={{ fontFamily: "Helvetica Neue Medium Extended, Gilroy, sans-serif" }}>
                        Inicio
                    </button>
                    <button type="button" onClick={() => navigate("/catalog")} className="text-sm font-medium text-[#1A1614]" style={{ fontFamily: "Helvetica Neue Medium Extended, Gilroy, sans-serif" }}>
                        Catalogos
                    </button>
                    <button type="button" onClick={() => navigate("/about")} className="text-sm font-medium text-[#1A1614]" style={{ fontFamily: "Helvetica Neue Medium Extended, Gilroy, sans-serif" }}>
                        Nosotros
                    </button>
                </nav>

                <div className="flex items-center justify-center gap-3.5 overflow-hidden">
                    <button type="button" onClick={() => navigate("/catalog")} aria-label="Buscar"><SearchMiniIcon /></button>
                    <button type="button" onClick={() => navigate("/profile")} className="max-sm:hidden" aria-label="Guardados"><BookmarkMiniIcon /></button>
                    <button type="button" onClick={() => navigate("/cart")} aria-label="Carrito"><CartMiniIcon /></button>
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="hidden h-6 w-[100px] items-center justify-center gap-5 overflow-hidden rounded-full bg-[#FF4D00] text-sm font-bold text-[#FFFAF6] sm:flex"
                        style={{ fontFamily: "Gilroy, sans-serif" }}
                    >
                        Registrarse
                    </button>
                </div>
            </div>
        </header>
    );
}

function PiquimCartaFooter() {
    return (
        <footer className="bg-[#1A1614] px-8 py-12 text-[#FFFAF6]">
            <div className="mx-auto flex max-w-[1200px] flex-wrap items-start justify-between gap-10">
                <div className="max-w-[280px]">
                    <img src="/piquim/catalogo/logo-footer.png" alt="Piquim" className="mb-5 h-[41px] w-[142px] object-contain" />
                    <p className="text-[13px] leading-[22px] text-[#B5ADA8]">Materia prima premium para heladerias, panaderias y confiterias.</p>
                </div>
                <button type="button" onClick={() => navigate("/catalog")} className="border-b border-[#FF4D00] pb-1 text-sm font-bold text-[#FF4D00]">
                    Volver al catalogo
                </button>
            </div>
        </footer>
    );
}

function PiquimCartaRelatedCard({ product }) {
    return (
        <article
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/product/${product.id}`)}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/product/${product.id}`);
                }
            }}
            className="flex h-[380px] min-w-[282px] cursor-pointer flex-col overflow-hidden rounded-[18px] bg-white outline outline-1 -outline-offset-1 outline-[#E8DFD8] transition-transform duration-200 hover:-translate-y-1"
        >
            <div className="relative h-[220px] overflow-hidden" style={{ background: product.mediaGradient }}>
                {product.badge ? (
                    <span className="absolute left-4 top-4 rounded-full px-2.5 py-1.5 text-[9px] font-bold text-white" style={{ background: product.badgeDark ? "#1A1614" : "#FF4D00", letterSpacing: 0.72 }}>
                        {product.badge}
                    </span>
                ) : null}
                <span className="absolute left-[227px] top-4 flex h-[23px] w-[35px] items-center justify-center rounded-[10px] bg-white"><BookmarkMiniIcon small /></span>
                {product.mediaKind === "image" ? (
                    <img src={product.imageSrc} alt={product.name} className="h-full w-full object-cover" />
                ) : (
                    <img src="/piquim/carta/image-1.png" alt={product.name} className="h-full w-full object-contain p-6" />
                )}
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-[18px]">
                <p className="text-[10px] font-bold uppercase text-[#FF4D00]" style={{ fontFamily: "Gilroy, sans-serif", letterSpacing: 1.8 }}>{product.category}</p>
                <h3 className="text-base font-bold leading-[20.8px] text-[#1A1614]" style={{ fontFamily: "Gilroy, sans-serif" }}>{product.name}</h3>
                <p className="text-xs text-[#B5ADA8]" style={{ fontFamily: "Gilroy, sans-serif" }}>{product.subtype}</p>
                <div className="mt-auto flex items-center justify-between">
                    <p className="text-xl font-black text-[#1A1614]">{product.price}</p>
                    <span className="flex size-10 items-center justify-center rounded-full bg-[#FF4D00] text-white"><CartMiniIcon white /></span>
                </div>
            </div>
        </article>
    );
}

function CartaSpec({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-[#E8DFD8] pb-2">
            <span className="font-bold text-[#1A1614]">{label}</span>
            <span className="text-right">{value}</span>
        </div>
    );
}

function CartaChevron() {
    return (
        <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3.06667 4L0 0.933333L0.933333 0L4.93333 4L0.933333 8L0 7.06667L3.06667 4Z" fill="#5A4136" />
        </svg>
    );
}

function SearchMiniIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M21 21L16.66 16.66M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function BookmarkMiniIcon({ small = false }) {
    const size = small ? 18 : 24;
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M17 3C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V20C18.9999 20.1751 18.9539 20.3472 18.8665 20.4989C18.7791 20.6506 18.6533 20.7767 18.5019 20.8646C18.3504 20.9525 18.1785 20.9991 18.0034 20.9997C17.8283 21.0003 17.6561 20.9549 17.504 20.868L12.992 18.29C12.6899 18.1174 12.3479 18.0266 12 18.0266C11.6521 18.0266 11.3101 18.1174 11.008 18.29L6.496 20.868C6.34394 20.9549 6.17174 21.0003 5.99662 20.9997C5.8215 20.9991 5.64961 20.9525 5.49814 20.8646C5.34667 20.7767 5.22094 20.6506 5.13352 20.4989C5.0461 20.3472 5.00006 20.1751 5 20V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function CartMiniIcon({ white = false }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M2.0498 2.05005H4.0498L6.7098 14.47C6.80738 14.9249 7.06048 15.3315 7.42552 15.6199C7.79056 15.9083 8.24471 16.0604 8.7098 16.05H18.4898C18.945 16.0493 19.3863 15.8933 19.7408 15.6079C20.0954 15.3224 20.3419 14.9246 20.4398 14.48L22.0898 7.05005H5.1198M8.9998 21C8.9998 21.5523 8.55209 22 7.9998 22C7.44752 22 6.9998 21.5523 6.9998 21C6.9998 20.4478 7.44752 20 7.9998 20C8.55209 20 8.9998 20.4478 8.9998 21ZM19.9998 21C19.9998 21.5523 19.5521 22 18.9998 22C18.4475 22 17.9998 21.5523 17.9998 21C17.9998 20.4478 18.4475 20 18.9998 20C19.5521 20 19.9998 20.4478 19.9998 21Z" stroke={white ? "white" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
