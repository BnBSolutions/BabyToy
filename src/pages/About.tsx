import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Award, Heart, Shield, Leaf } from 'lucide-react';
import bohaimeCollection from '@/assets/collections/bohaime.jpg';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const values = [
    {
      icon: Award,
      title: t.about.madeInFrance,
      description: t.about.madeInFranceDesc,
    },
    {
      icon: Heart,
      title: t.about.quality,
      description: t.about.qualityDesc,
    },
    {
      icon: Shield,
      title: t.about.safety,
      description: t.about.safetyDesc,
    },
    {
      icon: Leaf,
      title: language === 'fr' ? 'Éco-responsable' : 'Eco-friendly',
      description: language === 'fr' ? 'Engagés pour la planète' : 'Committed to the planet',
    },
  ];

  const milestones = [
    { year: '1999', event: language === 'fr' ? 'Création de Doudou et Compagnie à Paris' : 'Doudou et Compagnie founded in Paris' },
    { year: '2005', event: language === 'fr' ? 'Lancement de la collection Lapin Bonbon' : 'Launch of the Lapin Bonbon collection' },
    { year: '2015', event: language === 'fr' ? 'Expansion internationale' : 'International expansion' },
    { year: '2024', event: language === 'fr' ? '25 ans de tendresse' : '25 years of tenderness' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={bohaimeCollection}
            alt="About us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-xl">
            <h1 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
              {t.about.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-6">
            {language === 'fr' ? 'Notre Histoire' : 'Our Story'}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.about.story}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="gradient-soft py-16 lg:py-24">
        <div className="container">
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-center mb-12">
            {t.about.values}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-background shadow-card"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container py-16 lg:py-24">
        <h2 className="font-display text-2xl lg:text-3xl font-semibold text-center mb-12">
          {language === 'fr' ? 'Notre Parcours' : 'Our Journey'}
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-semibold relative z-10">
                    {milestone.year}
                  </div>
                  <div className="pt-4">
                    <p className="text-lg">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
