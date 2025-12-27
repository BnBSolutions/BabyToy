import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, Truck, RotateCcw, Shield, Star } from 'lucide-react';
import bunnyPink from '@/assets/products/bunny-pink.jpg';
import bearMoonlight from '@/assets/products/bear-moonlight.jpg';

const productsWithImages = products.map((p, i) => ({
  ...p,
  images: [i === 0 ? bunnyPink : i === 1 ? bearMoonlight : p.images[0]],
}));

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = productsWithImages.find(p => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">{t.common.error}</h1>
          <Button asChild>
            <Link to="/shop">{t.common.back}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const stockStatus = {
    in_stock: { label: t.product.inStock, color: 'text-green-600', bg: 'bg-green-100' },
    low_stock: { label: t.product.lowStock, color: 'text-amber-600', bg: 'bg-amber-100' },
    out_of_stock: { label: t.product.outOfStock, color: 'text-destructive', bg: 'bg-destructive/10' },
  };

  const relatedProducts = productsWithImages
    .filter(p => p.id !== product.id && p.collection === product.collection)
    .slice(0, 4);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/shop" className="hover:text-foreground transition-colors">{t.nav.shop}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name[language]}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name[language]}
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <span className="badge-new">{t.common.new}</span>}
                {product.isBestseller && <span className="badge-bestseller">{t.common.bestseller}</span>}
                {product.originalPrice && <span className="badge-sale">{t.common.sale}</span>}
              </div>

              {/* Wishlist */}
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                <Heart className="h-5 w-5" />
              </button>

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(i => i > 0 ? i - 1 : product.images.length - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(i => i < product.images.length - 1 ? i + 1 : 0)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      i === currentImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            <div className="mb-6">
              <h1 className="font-display text-2xl lg:text-3xl font-semibold mb-2">
                {product.name[language]}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(24 {t.product.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-semibold">€{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    €{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${stockStatus[product.stock].bg} ${stockStatus[product.stock].color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${product.stock === 'in_stock' ? 'bg-green-600' : product.stock === 'low_stock' ? 'bg-amber-600' : 'bg-destructive'}`} />
                {stockStatus[product.stock].label}
              </span>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {t.product.color}: {selectedColor || product.colors[0].name}
                </label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        (selectedColor || product.colors![0].name) === color.name
                          ? 'border-primary ring-2 ring-primary/30'
                          : 'border-border hover:border-primary/50'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">{t.product.size}</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">{t.product.quantity}</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button size="lg" className="flex-1" disabled={product.stock === 'out_of_stock'}>
                {t.product.addToCart}
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                {t.product.buyNow}
              </Button>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-xs text-muted-foreground">{t.home.deliveryTitle}</span>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-xs text-muted-foreground">{t.footer.returns}</span>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-xs text-muted-foreground">{t.home.safetyTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="container pb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              {t.product.description}
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              {t.product.details}
            </TabsTrigger>
            <TabsTrigger
              value="care"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              {t.product.care}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <p className="text-muted-foreground max-w-2xl">
              {product.description[language]}
            </p>
          </TabsContent>
          <TabsContent value="details" className="py-6">
            <ul className="space-y-2 text-muted-foreground max-w-2xl">
              <li>• Age: {product.age}</li>
              <li>• Collection: {product.collection}</li>
              <li>• Category: {product.category}</li>
            </ul>
          </TabsContent>
          <TabsContent value="care" className="py-6">
            <p className="text-muted-foreground max-w-2xl">
              Machine washable at 30°C. Do not tumble dry. Air dry flat.
            </p>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container pb-16">
          <h2 className="font-display text-2xl font-semibold mb-8">
            {t.product.relatedProducts}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden sticky-cta pb-safe">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-2xl font-semibold">€{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                €{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button size="lg" className="flex-1" disabled={product.stock === 'out_of_stock'}>
            {t.product.addToCart}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
