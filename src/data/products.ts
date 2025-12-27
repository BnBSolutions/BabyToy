export interface Product {
  id: string;
  name: {
    fr: string;
    en: string;
    ro: string;
    ru: string;
  };
  description: {
    fr: string;
    en: string;
    ro: string;
    ru: string;
  };
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  collection: string;
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  stock: 'in_stock' | 'low_stock' | 'out_of_stock';
  age: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
}

export interface Collection {
  id: string;
  name: {
    fr: string;
    en: string;
    ro: string;
    ru: string;
  };
  description: {
    fr: string;
    en: string;
    ro: string;
    ru: string;
  };
  image: string;
  productCount: number;
}

export const collections: Collection[] = [
  {
    id: 'bohaime',
    name: {
      fr: 'Les Boh\'aime',
      en: 'The Boh\'aime',
      ro: 'Colecția Boh\'aime',
      ru: 'Коллекция Boh\'aime',
    },
    description: {
      fr: 'Une collection bohème et poétique pour les rêveurs',
      en: 'A bohemian and poetic collection for dreamers',
      ro: 'O colecție boho și poetică pentru visători',
      ru: 'Богемная и поэтическая коллекция для мечтателей',
    },
    image: '/placeholder.svg',
    productCount: 24,
  },
  {
    id: 'lapin-fleurette',
    name: {
      fr: 'Lapin Fleurette',
      en: 'Fleurette Bunny',
      ro: 'Iepurașul Fleurette',
      ru: 'Кролик Флоретт',
    },
    description: {
      fr: 'Des lapins doux ornés de fleurs délicates',
      en: 'Soft bunnies adorned with delicate flowers',
      ro: 'Iepurași moi decorați cu flori delicate',
      ru: 'Мягкие кролики, украшенные нежными цветами',
    },
    image: '/placeholder.svg',
    productCount: 18,
  },
  {
    id: 'marionnettes',
    name: {
      fr: 'Les Marionnettes',
      en: 'The Puppets',
      ro: 'Marionetele',
      ru: 'Марионетки',
    },
    description: {
      fr: 'Des marionnettes pour raconter des histoires magiques',
      en: 'Puppets to tell magical stories',
      ro: 'Marionete pentru povești magice',
      ru: 'Марионетки для волшебных историй',
    },
    image: '/placeholder.svg',
    productCount: 32,
  },
  {
    id: 'doudou-25ans',
    name: {
      fr: 'DOUDOU® Anniversaire',
      en: 'DOUDOU® Anniversary',
      ro: 'DOUDOU® Aniversar',
      ru: 'DOUDOU® Юбилей',
    },
    description: {
      fr: 'Collection spéciale pour nos 25 ans',
      en: 'Special collection for our 25th anniversary',
      ro: 'Colecție specială pentru 25 de ani',
      ru: 'Специальная коллекция к 25-летию',
    },
    image: '/placeholder.svg',
    productCount: 12,
  },
  {
    id: 'clair-de-lune',
    name: {
      fr: 'Clair de Lune',
      en: 'Moonlight',
      ro: 'Lumina Lunii',
      ru: 'Лунный свет',
    },
    description: {
      fr: 'Doudous luminescents pour des nuits douces',
      en: 'Luminescent comforters for gentle nights',
      ro: 'Jucării luminiscente pentru nopți liniștite',
      ru: 'Светящиеся игрушки для спокойных ночей',
    },
    image: '/placeholder.svg',
    productCount: 15,
  },
  {
    id: 'bio',
    name: {
      fr: 'Collection Bio',
      en: 'Organic Collection',
      ro: 'Colecția Bio',
      ru: 'Органическая Коллекция',
    },
    description: {
      fr: 'Coton biologique certifié, doux pour bébé et la planète',
      en: 'Certified organic cotton, gentle for baby and planet',
      ro: 'Bumbac organic certificat, blând pentru bebeluși și planetă',
      ru: 'Сертифицированный органический хлопок, бережный для малыша и планеты',
    },
    image: '/placeholder.svg',
    productCount: 20,
  },
];

export const products: Product[] = [
  {
    id: 'lapin-bonbon-rose',
    name: {
      fr: 'Lapin Bonbon Rose',
      en: 'Pink Candy Bunny',
      ro: 'Iepuraș Bomboană Roz',
      ru: 'Розовый Кролик Бонбон',
    },
    description: {
      fr: 'Un doudou lapin tout doux en velours rose poudré, parfait pour accompagner bébé dès la naissance.',
      en: 'A super soft bunny comforter in powder pink velvet, perfect to accompany baby from birth.',
      ro: 'Un iepuraș foarte moale din catifea roz pudrat, perfect pentru bebeluși de la naștere.',
      ru: 'Супер мягкий кролик-комфортер из пудрово-розового бархата, идеален для малышей с рождения.',
    },
    price: 24.90,
    images: ['/placeholder.svg'],
    category: 'comforters',
    collection: 'lapin-bonbon',
    tags: ['naissance', 'doux', 'lapin'],
    isNew: false,
    isBestseller: true,
    stock: 'in_stock',
    age: '0+',
    sizes: ['S - 20cm', 'M - 30cm', 'L - 40cm'],
    colors: [
      { name: 'Rose', hex: '#F5C6CB' },
      { name: 'Bleu', hex: '#B8D4E8' },
      { name: 'Taupe', hex: '#C4B5A6' },
    ],
  },
  {
    id: 'ours-clair-lune',
    name: {
      fr: 'Ours Clair de Lune',
      en: 'Moonlight Bear',
      ro: 'Ursuleț Lumina Lunii',
      ru: 'Мишка Лунный свет',
    },
    description: {
      fr: 'Un ours luminescent qui brille dans le noir, idéal pour rassurer bébé la nuit.',
      en: 'A luminescent bear that glows in the dark, ideal for reassuring baby at night.',
      ro: 'Un ursuleț luminiscent care strălucește în întuneric, ideal pentru noapte.',
      ru: 'Светящийся мишка, идеальный для успокоения малыша ночью.',
    },
    price: 34.90,
    images: ['/placeholder.svg'],
    category: 'plush',
    collection: 'clair-de-lune',
    tags: ['lumineux', 'nuit', 'ours'],
    isNew: true,
    isBestseller: false,
    stock: 'in_stock',
    age: '0+',
  },
  {
    id: 'marionnette-loup',
    name: {
      fr: 'Marionnette Loup',
      en: 'Wolf Puppet',
      ro: 'Marionetă Lup',
      ru: 'Марионетка Волк',
    },
    description: {
      fr: 'Une marionnette loup pour inventer mille histoires et développer l\'imagination.',
      en: 'A wolf puppet to invent a thousand stories and develop imagination.',
      ro: 'O marionetă lup pentru a inventa o mie de povești.',
      ru: 'Марионетка волк для тысячи историй и развития воображения.',
    },
    price: 19.90,
    images: ['/placeholder.svg'],
    category: 'puppets',
    collection: 'marionnettes',
    tags: ['marionnette', 'imagination', 'jeu'],
    isNew: false,
    isBestseller: true,
    stock: 'low_stock',
    age: '12m+',
  },
  {
    id: 'boite-musique-etoile',
    name: {
      fr: 'Boîte à Musique Étoile',
      en: 'Star Music Box',
      ro: 'Cutie Muzicală Stea',
      ru: 'Музыкальная Шкатулка Звезда',
    },
    description: {
      fr: 'Une boîte à musique en forme d\'étoile jouant une douce mélodie pour l\'endormissement.',
      en: 'A star-shaped music box playing a gentle melody for bedtime.',
      ro: 'O cutie muzicală în formă de stea cu o melodie liniștitoare.',
      ru: 'Музыкальная шкатулка в форме звезды с нежной мелодией для сна.',
    },
    price: 29.90,
    images: ['/placeholder.svg'],
    category: 'music-boxes',
    collection: 'bohaime',
    tags: ['musique', 'endormissement', 'decoration'],
    isNew: true,
    isBestseller: false,
    stock: 'in_stock',
    age: '0+',
  },
  {
    id: 'coffret-naissance-lapin',
    name: {
      fr: 'Coffret Naissance Lapin',
      en: 'Bunny Birth Gift Set',
      ro: 'Set Cadou Naștere Iepuraș',
      ru: 'Подарочный Набор Кролик',
    },
    description: {
      fr: 'Le coffret idéal pour célébrer une naissance : doudou, hochet et couverture assortis.',
      en: 'The ideal gift set to celebrate a birth: matching comforter, rattle and blanket.',
      ro: 'Setul ideal pentru a sărbători o naștere: jucărie, zornăitoare și pătură asortate.',
      ru: 'Идеальный подарочный набор: комфортер, погремушка и одеяло в тон.',
    },
    price: 59.90,
    originalPrice: 69.90,
    images: ['/placeholder.svg'],
    category: 'gift-sets',
    collection: 'lapin-bonbon',
    tags: ['coffret', 'naissance', 'cadeau'],
    isNew: false,
    isBestseller: true,
    stock: 'in_stock',
    age: '0+',
  },
  {
    id: 'faon-bohaime',
    name: {
      fr: 'Faon Boh\'aime Rose',
      en: 'Pink Boh\'aime Fawn',
      ro: 'Căprioară Boh\'aime Roz',
      ru: 'Розовый Олененок Boh\'aime',
    },
    description: {
      fr: 'Un faon tout doux dans un style bohème avec des broderies délicates.',
      en: 'A super soft fawn in bohemian style with delicate embroidery.',
      ro: 'O căprioară moale în stil boho cu broderie delicată.',
      ru: 'Нежный олененок в богемном стиле с деликатной вышивкой.',
    },
    price: 27.90,
    images: ['/placeholder.svg'],
    category: 'comforters',
    collection: 'bohaime',
    tags: ['boho', 'faon', 'fille'],
    isNew: true,
    isBestseller: false,
    stock: 'in_stock',
    age: '0+',
    colors: [
      { name: 'Rose', hex: '#E8B4BC' },
      { name: 'Terracotta', hex: '#C4846C' },
    ],
  },
  {
    id: 'doudou-bio-ourson',
    name: {
      fr: 'Doudou Bio Ourson',
      en: 'Organic Cotton Bear',
      ro: 'Ursuleț Bio',
      ru: 'Органический Мишка',
    },
    description: {
      fr: 'Doudou en coton biologique certifié GOTS, doux pour bébé et respectueux de l\'environnement.',
      en: 'GOTS certified organic cotton comforter, gentle for baby and eco-friendly.',
      ro: 'Jucărie din bumbac organic certificat GOTS, blândă pentru bebeluși.',
      ru: 'Комфортер из органического хлопка с сертификатом GOTS.',
    },
    price: 32.90,
    images: ['/placeholder.svg'],
    category: 'comforters',
    collection: 'bio',
    tags: ['bio', 'ecologique', 'ours'],
    isNew: false,
    isBestseller: true,
    stock: 'in_stock',
    age: '0+',
  },
  {
    id: 'veilleuse-nuage',
    name: {
      fr: 'Veilleuse Nuage',
      en: 'Cloud Night Light',
      ro: 'Lampă de Veghe Nor',
      ru: 'Ночник Облако',
    },
    description: {
      fr: 'Veilleuse douce en forme de nuage avec lumière LED apaisante.',
      en: 'Soft cloud-shaped night light with soothing LED light.',
      ro: 'Lampă de veghe în formă de nor cu lumină LED calmantă.',
      ru: 'Мягкий ночник в форме облака с успокаивающей LED-подсветкой.',
    },
    price: 22.90,
    images: ['/placeholder.svg'],
    category: 'night-lights',
    collection: 'clair-de-lune',
    tags: ['veilleuse', 'chambre', 'nuit'],
    isNew: true,
    isBestseller: false,
    stock: 'in_stock',
    age: '0+',
  },
];

export const categories = [
  { id: 'comforters', nameKey: 'comforters' },
  { id: 'plush', nameKey: 'plushToys' },
  { id: 'puppets', nameKey: 'puppets' },
  { id: 'music-boxes', nameKey: 'musicBoxes' },
  { id: 'blankets', nameKey: 'blankets' },
  { id: 'night-lights', nameKey: 'nightLights' },
  { id: 'gift-sets', nameKey: 'gifts' },
];
