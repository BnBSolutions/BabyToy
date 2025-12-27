import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import CollectionCard from '@/components/products/CollectionCard';
import ProductFinder from '@/components/products/ProductFinder';
import { Button } from '@/components/ui/button';
import { products, collections } from '@/data/products';
import { ArrowRight, Shield, Gift, Truck, Award } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import bunnyPink from '@/assets/products/bunny-pink.jpg';
import bearMoonlight from '@/assets/products/bear-moonlight.jpg';
import bohaimeCollection from '@/assets/collections/bohaime.jpg';
import puppetsCollection from '@/assets/collections/puppets.jpg';

// Update product images with real ones
const productsWithImages = products.map((p, i) => ({
  ...p,
  images: [i === 0 ? bunnyPink : i === 1 ? bearMoonlight : p.images[0]],
}));

// Update collection images
const collectionsWithImages = collections.map((c, i) => ({
  ...c,
  image: i === 0 ? bohaimeCollection : i === 2 ? puppetsCollection : c.image,
}));

const Index: React.FC = () => {
  const { t } = useLanguage();

  const trustFeatures = [
    {
      icon: Award,
      title: t.home.qualityTitle,
      description: t.home.qualityDesc,
    },
    {
      icon: Shield,
      title: t.home.safetyTitle,
      description: t.home.safetyDesc,
    },
    {
      icon: Gift,
      title: t.home.giftTitle,
      description: t.home.giftDesc,
    },
    {
      icon: Truck,
      title: t.home.deliveryTitle,
      description: t.home.deliveryDesc,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium baby products collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="container relative z-10 py-20">
          <div className="max-w-xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 animate-fade-in-up">
              {t.home.heroTitle}
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 animate-fade-in-up animation-delay-100">
              {t.home.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-200">
              <Button size="lg" asChild className="px-8">
                <Link to="/shop">
                  {t.home.heroButton}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8">
                <Link to="/collections">
                  {t.nav.collections}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-b bg-card/50">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Finder */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <ProductFinder />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-2">
                {t.home.featuredTitle}
              </h2>
              <p className="text-muted-foreground max-w-lg">
                {t.home.featuredSubtitle}
              </p>
            </div>
            <Button variant="outline" asChild className="mt-4 md:mt-0">
              <Link to="/shop" className="gap-2">
                {t.common.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {productsWithImages.slice(0, 8).map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-2">
              {t.home.collectionsTitle}
            </h2>
            <p className="text-muted-foreground">
              {t.home.collectionsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {collectionsWithImages.slice(0, 6).map((collection, i) => (
              <div
                key={collection.id}
                className={`animate-fade-in-up ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CollectionCard
                  collection={collection}
                  size={i === 0 ? 'large' : 'default'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 gradient-soft">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-4">
              {t.home.trustTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-background shadow-card hover-lift"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
