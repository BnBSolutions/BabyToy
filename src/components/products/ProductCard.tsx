import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Product } from '@/data/products';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t } = useLanguage();

  const stockStatus = {
    in_stock: { label: t.product.inStock, color: 'text-green-600' },
    low_stock: { label: t.product.lowStock, color: 'text-amber-600' },
    out_of_stock: { label: t.product.outOfStock, color: 'text-destructive' },
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="product-card">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-muted">
          <img
            src={product.images[0]}
            alt={product.name[language]}
            className="product-image w-full h-full object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="badge-new">{t.common.new}</span>
            )}
            {product.isBestseller && (
              <span className="badge-bestseller">{t.common.bestseller}</span>
            )}
            {product.originalPrice && (
              <span className="badge-sale">{t.common.sale}</span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist
            }}
          >
            <Heart className="h-4 w-4" />
          </button>

          {/* Quick Add - Mobile */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              className="w-full bg-background/95 backdrop-blur-sm hover:bg-background"
              onClick={(e) => {
                e.preventDefault();
                // Quick add
              }}
            >
              {t.product.addToCart}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name[language]}
          </h3>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-lg">
              €{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                €{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Colors Preview */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2">
              {product.colors.slice(0, 4).map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}

          <p className={`text-xs ${stockStatus[product.stock].color}`}>
            {stockStatus[product.stock].label}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
