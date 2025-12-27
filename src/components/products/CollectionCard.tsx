import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Collection } from '@/data/products';
import { ArrowRight } from 'lucide-react';

interface CollectionCardProps {
  collection: Collection;
  size?: 'default' | 'large';
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, size = 'default' }) => {
  const { language, t } = useLanguage();

  return (
    <Link
      to={`/collections/${collection.id}`}
      className={`group block relative overflow-hidden rounded-2xl ${
        size === 'large' ? 'aspect-[4/3]' : 'aspect-square'
      }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-muted">
        <img
          src={collection.image}
          alt={collection.name[language]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
          <h3 className="font-display text-xl lg:text-2xl font-semibold text-white mb-1">
            {collection.name[language]}
          </h3>
          <p className="text-white/80 text-sm mb-3 line-clamp-2">
            {collection.description[language]}
          </p>
          <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
            <span>{collection.productCount} {t.categories.results}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
