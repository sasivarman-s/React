import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./main.css";

function Productdetail() {
  const { product_id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [addedToast, setAddedToast] = useState(false);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`https://dummyjson.com/products/${product_id}`);
      if (!res.ok) {
        throw new Error(`Failed to load product (Status: ${res.status})`);
      }
      const data = await res.json();
      setProduct(data);
      setSelectedImage(data.thumbnail || (data.images && data.images[0]) || "");
      setQuantity(data.minimumOrderQuantity || 1);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err.message || "Something went wrong while fetching product details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product_id) {
      fetchProductDetail();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [product_id]);

  const handleQuantityChange = (delta) => {
    if (!product) return;
    const min = product.minimumOrderQuantity || 1;
    const max = product.stock || 99;
    setQuantity((prev) => Math.min(Math.max(prev + delta, min), max));
  };

  const handleAddToCart = () => {
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 3000);
  };

  // Helper to render star rating
  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= Math.round(rating);
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
        </svg>
      );
    }
    return stars;
  };

  // Skeleton Loader State
  if (loading) {
    return (
      <section className="bg-gray-50 py-10 antialiased dark:bg-gray-900 min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-6 h-6 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="h-96 w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700" />
              <div className="flex gap-3">
                <div className="h-20 w-20 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
                <div className="h-20 w-20 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
                <div className="h-20 w-20 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-10 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-24 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-12 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <section className="bg-gray-50 py-16 antialiased dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-gray-800">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Product Not Found</h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">{error || "The product you are looking for does not exist or has been removed."}</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={fetchProductDetail}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Retry
            </button>
            <Link
              to="/home"
              className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Calculate pricing & discounts
  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className="bg-gray-50 antialiased dark:bg-gray-900 min-h-screen py-6 md:py-10">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-emerald-600 px-5 py-3.5 text-white shadow-2xl transition-all duration-300 animate-bounce">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-semibold text-sm">Added to Cart!</p>
            <p className="text-xs text-emerald-100">{quantity}x {product.title}</p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* Navigation / Breadcrumb */}
        <nav className="mb-6 flex items-center justify-between">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li className="inline-flex items-center">
              <Link
                to="/home"
                className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 capitalize text-gray-500 dark:text-gray-400 md:ml-2">
                  {product.category}
                </span>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 font-medium text-gray-800 dark:text-gray-200 md:ml-2 truncate max-w-xs md:max-w-md">
                  {product.title}
                </span>
              </div>
            </li>
          </ol>

          <button
            onClick={() => navigate(-1)}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </nav>

        {/* Main Product Showcase Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:p-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Left Column: Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-700/50 p-6 border border-gray-100 dark:border-gray-700">
                <img
                  src={selectedImage || product.thumbnail}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                />

                {/* Discount Badge */}
                {product.discountPercentage > 0 && (
                  <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                    -{product.discountPercentage}% OFF
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  aria-label="Add to favorites"
                  className="absolute right-4 top-4 rounded-full bg-white/80 p-2.5 text-gray-700 shadow-md backdrop-blur-md transition-all hover:bg-white hover:text-rose-500 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-rose-400"
                >
                  <svg
                    className={`h-5 w-5 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`}
                    fill={isWishlisted ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
                  {product.images.map((imgUrl, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-gray-50 p-1 transition-all dark:bg-gray-700 ${
                        selectedImage === imgUrl
                          ? "border-primary-600 ring-2 ring-primary-500/20"
                          : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Details & Purchase Options */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Brand & Stock Status */}
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-md bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-800 dark:bg-primary-900/50 dark:text-primary-300">
                    {product.brand || product.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                        product.stock > 10
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : product.stock > 0
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          product.stock > 10
                            ? "bg-emerald-500"
                            : product.stock > 0
                            ? "bg-amber-500 animate-pulse"
                            : "bg-red-500"
                        }`}
                      />
                      {product.availabilityStatus ||
                        (product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock")}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                  {product.title}
                </h1>

                {/* Rating & Review Info */}
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center">{renderStars(product.rating)}</div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {product.rating}
                  </p>
                  <span className="text-sm text-gray-400 dark:text-gray-500">•</span>
                  <a
                    href="#reviews"
                    onClick={() => setActiveTab("reviews")}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400"
                  >
                    {product.reviews ? `${product.reviews.length} reviews` : "No reviews yet"}
                  </a>
                  {product.sku && (
                    <>
                      <span className="text-sm text-gray-400 dark:text-gray-500">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        SKU: <span className="font-mono">{product.sku}</span>
                      </span>
                    </>
                  )}
                </div>

                {/* Price Section */}
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-4xl font-black text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  {originalPrice && (
                    <span className="text-lg font-medium text-gray-400 line-through dark:text-gray-500">
                      ${originalPrice}
                    </span>
                  )}
                  {product.discountPercentage > 0 && (
                    <span className="rounded-lg bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                      Save ${(originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Inclusive of all taxes • Free standard delivery available
                </p>

                {/* Description Snippet */}
                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>

                <hr className="my-6 border-gray-200 dark:border-gray-700" />

                {/* Quantity and Action Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Quantity Selector */}
                  <div className="flex items-center">
                    <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Quantity:
                    </span>
                    <div className="flex items-center rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= (product.minimumOrderQuantity || 1)}
                        className="p-2.5 text-gray-600 hover:text-gray-900 disabled:opacity-30 dark:text-gray-300 dark:hover:text-white"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-12 text-center text-sm font-semibold text-gray-900 dark:text-white">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stock}
                        className="p-2.5 text-gray-600 hover:text-gray-900 disabled:opacity-30 dark:text-gray-300 dark:hover:text-white"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {product.minimumOrderQuantity > 1 && (
                    <span className="text-xs text-amber-600 dark:text-amber-400">
                      Min order: {product.minimumOrderQuantity} units
                    </span>
                  )}
                </div>

                {/* Primary CTA Buttons */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-800 hover:shadow-primary-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-600 dark:hover:bg-primary-700"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart();
                    }}
                    disabled={product.stock === 0}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-700 hover:shadow-emerald-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Guarantees / Selling Points */}
              <div className="mt-8 grid grid-cols-2 gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-gray-700 dark:bg-gray-700/30 sm:grid-cols-3">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">Shipping</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{product.shippingInformation || "Fast delivery"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">Warranty</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{product.warrantyInformation || "Standard warranty"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">Return Policy</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{product.returnPolicy || "30 days returns"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Section: Specs, Additional Info & Reviews */}
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:p-8">
          {/* Tab Headers */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="me-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("description")}
                  className={`inline-flex items-center gap-2 p-4 border-b-2 rounded-t-lg transition-colors ${
                    activeTab === "description"
                      ? "text-primary-600 border-primary-600 dark:text-primary-400 dark:border-primary-400 font-semibold"
                      : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Product Details & Specs
                </button>
              </li>
              <li className="me-2" id="reviews">
                <button
                  type="button"
                  onClick={() => setActiveTab("reviews")}
                  className={`inline-flex items-center gap-2 p-4 border-b-2 rounded-t-lg transition-colors ${
                    activeTab === "reviews"
                      ? "text-primary-600 border-primary-600 dark:text-primary-400 dark:border-primary-400 font-semibold"
                      : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Customer Reviews ({product.reviews ? product.reviews.length : 0})
                </button>
              </li>
            </ul>
          </div>

          {/* Tab Content */}
          <div className="pt-6">
            {activeTab === "description" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
                </div>

                {/* Specs Table */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Specifications</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                      <tbody>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <th className="py-2.5 pr-4 font-semibold text-gray-900 dark:text-white w-1/3">Brand</th>
                          <td className="py-2.5">{product.brand || "Generic"}</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <th className="py-2.5 pr-4 font-semibold text-gray-900 dark:text-white">Category</th>
                          <td className="py-2.5 capitalize">{product.category}</td>
                        </tr>
                        {product.weight && (
                          <tr className="border-b border-gray-100 dark:border-gray-700">
                            <th className="py-2.5 pr-4 font-semibold text-gray-900 dark:text-white">Weight</th>
                            <td className="py-2.5">{product.weight} kg</td>
                          </tr>
                        )}
                        {product.dimensions && (
                          <tr className="border-b border-gray-100 dark:border-gray-700">
                            <th className="py-2.5 pr-4 font-semibold text-gray-900 dark:text-white">Dimensions (W × H × D)</th>
                            <td className="py-2.5">
                              {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                            </td>
                          </tr>
                        )}
                        {product.warrantyInformation && (
                          <tr className="border-b border-gray-100 dark:border-gray-700">
                            <th className="py-2.5 pr-4 font-semibold text-gray-900 dark:text-white">Warranty</th>
                            <td className="py-2.5">{product.warrantyInformation}</td>
                          </tr>
                        )}
                        {product.shippingInformation && (
                          <tr className="border-b border-gray-100 dark:border-gray-700">
                            <th className="py-2.5 pr-4 font-semibold text-gray-900 dark:text-white">Shipping</th>
                            <td className="py-2.5">{product.shippingInformation}</td>
                          </tr>
                        )}
                        {product.returnPolicy && (
                          <tr className="border-b border-gray-100 dark:border-gray-700">
                            <th className="py-2.5 pr-4 font-semibold text-gray-900 dark:text-white">Return Policy</th>
                            <td className="py-2.5">{product.returnPolicy}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Product Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Customer Reviews</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{product.rating} out of 5</span>
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.reviews.map((rev, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-gray-100 bg-gray-50/50 p-5 dark:border-gray-700 dark:bg-gray-700/40"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                              {rev.reviewerName ? rev.reviewerName.charAt(0).toUpperCase() : "U"}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {rev.reviewerName || "Anonymous Buyer"}
                              </p>
                              <p className="text-[11px] text-gray-400">
                                {rev.date ? new Date(rev.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}
                              </p>
                            </div>
                          </div>
                          <div className="flex">{renderStars(rev.rating)}</div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No customer reviews yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productdetail;