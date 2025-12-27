import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import CollectionCard from '@/components/products/CollectionCard';
import { collections } from '@/data/products';
import bohaimeCollection from '@/assets/collections/bohaime.jpg';
import puppetsCollection from '@/assets/collections/puppets.jpg';

const collectionsWithImages = collections.map((c, i) => ({
  ...c,
  image: i === 0 ? bohaimeCollection : i === 2 ? puppetsCollection : c.image,
}));

const Collections: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-soft py-12 lg:py-16">
        <div className="container">
          <h1 className="font-display text-3xl lg:text-4xl font-semibold mb-2">
            {t.nav.collections}
          </h1>
          <p className="text-muted-foreground max-w-lg">
            {t.home.collectionsSubtitle}
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionsWithImages.map((collection, i) => (
            <div
              key={collection.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CollectionCard collection={collection} size={i === 0 ? 'large' : 'default'} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Collections;
