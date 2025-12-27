import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/data/products';
import { Gift as GiftIcon, Heart, Sparkles, Package } from 'lucide-react';
import bunnyPink from '@/assets/products/bunny-pink.jpg';
import bearMoonlight from '@/assets/products/bear-moonlight.jpg';

const productsWithImages = products.map((p, i) => ({
  ...p,
  images: [i === 0 ? bunnyPink : i === 1 ? bearMoonlight : p.images[0]],
}));

const giftProducts = productsWithImages.filter(p => 
  p.tags.includes('cadeau') || p.tags.includes('coffret') || p.tags.includes('naissance')
);

const Gifts: React.FC = () => {
  const { t, language } = useLanguage();

  const giftCategories = [
    {
      icon: Heart,
      title: language === 'fr' ? 'Naissance' : language === 'en' ? 'Birth' : language === 'ro' ? 'Naștere' : 'Рождение',
      description: language === 'fr' ? 'Célébrez l\'arrivée de bébé' : 'Celebrate baby\'s arrival',
    },
    {
      icon: Sparkles,
      title: language === 'fr' ? 'Baptême' : language === 'en' ? 'Baptism' : language === 'ro' ? 'Botez' : 'Крещение',
      description: language === 'fr' ? 'Un souvenir inoubliable' : 'An unforgettable memory',
    },
    {
      icon: GiftIcon,
      title: language === 'fr' ? 'Anniversaire' : language === 'en' ? 'Birthday' : language === 'ro' ? 'Zi de naștere' : 'День рождения',
      description: language === 'fr' ? 'Faites plaisir aux petits' : 'Delight the little ones',
    },
    {
      icon: Package,
      title: language === 'fr' ? 'Coffrets' : language === 'en' ? 'Gift Sets' : language === 'ro' ? 'Seturi cadou' : 'Подарочные наборы',
      description: language === 'fr' ? 'Tout en un, prêt à offrir' : 'All-in-one, ready to gift',
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-soft py-12 lg:py-20">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl lg:text-5xl font-semibold mb-4">
              {t.nav.gifts}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.finder.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Gift Categories */}
      <section className="container py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {giftCategories.map((category, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-card shadow-card hover-lift cursor-pointer text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <category.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{category.title}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gift Products */}
      <section className="container pb-16">
        <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-8">
          {language === 'fr' ? 'Nos idées cadeaux' : 'Gift Ideas'}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {(giftProducts.length > 0 ? giftProducts : productsWithImages.slice(0, 8)).map((product, i) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Gifts;
