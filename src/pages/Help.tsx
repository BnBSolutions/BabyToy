import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const Help: React.FC = () => {
  const { t, language } = useLanguage();

  const faqCategories = [
    {
      title: language === 'fr' ? 'Commandes & Livraison' : 'Orders & Shipping',
      faqs: [
        {
          question: language === 'fr' 
            ? 'Quels sont les délais de livraison ?' 
            : 'What are the delivery times?',
          answer: language === 'fr'
            ? 'Les délais de livraison sont de 2-3 jours ouvrés pour la France métropolitaine et 5-7 jours pour l\'international.'
            : 'Delivery times are 2-3 business days for mainland France and 5-7 days for international.',
        },
        {
          question: language === 'fr'
            ? 'La livraison est-elle gratuite ?'
            : 'Is shipping free?',
          answer: language === 'fr'
            ? 'La livraison est offerte dès 45€ d\'achat en France métropolitaine.'
            : 'Shipping is free for orders over €45 in mainland France.',
        },
        {
          question: language === 'fr'
            ? 'Puis-je suivre ma commande ?'
            : 'Can I track my order?',
          answer: language === 'fr'
            ? 'Oui, vous recevrez un email avec un numéro de suivi dès l\'expédition de votre commande.'
            : 'Yes, you will receive an email with a tracking number as soon as your order is shipped.',
        },
      ],
    },
    {
      title: language === 'fr' ? 'Retours & Échanges' : 'Returns & Exchanges',
      faqs: [
        {
          question: language === 'fr'
            ? 'Quelle est la politique de retour ?'
            : 'What is the return policy?',
          answer: language === 'fr'
            ? 'Vous disposez de 30 jours pour retourner un article non utilisé dans son emballage d\'origine.'
            : 'You have 30 days to return an unused item in its original packaging.',
        },
        {
          question: language === 'fr'
            ? 'Comment effectuer un retour ?'
            : 'How do I make a return?',
          answer: language === 'fr'
            ? 'Contactez notre service client pour obtenir une étiquette de retour prépayée.'
            : 'Contact our customer service to get a prepaid return label.',
        },
      ],
    },
    {
      title: language === 'fr' ? 'Produits' : 'Products',
      faqs: [
        {
          question: language === 'fr'
            ? 'Les doudous sont-ils lavables ?'
            : 'Are the comforters washable?',
          answer: language === 'fr'
            ? 'Oui, tous nos doudous sont lavables en machine à 30°C. Nous recommandons de les placer dans un filet de lavage.'
            : 'Yes, all our comforters are machine washable at 30°C. We recommend using a laundry bag.',
        },
        {
          question: language === 'fr'
            ? 'Les produits sont-ils certifiés ?'
            : 'Are the products certified?',
          answer: language === 'fr'
            ? 'Tous nos produits sont conformes aux normes CE et sont testés par des laboratoires indépendants.'
            : 'All our products comply with CE standards and are tested by independent laboratories.',
        },
        {
          question: language === 'fr'
            ? 'À partir de quel âge ?'
            : 'From what age?',
          answer: language === 'fr'
            ? 'La plupart de nos doudous sont adaptés dès la naissance (0+). Vérifiez l\'indication sur chaque fiche produit.'
            : 'Most of our comforters are suitable from birth (0+). Check the indication on each product page.',
        },
      ],
    },
    {
      title: language === 'fr' ? 'Paiement' : 'Payment',
      faqs: [
        {
          question: language === 'fr'
            ? 'Quels moyens de paiement acceptez-vous ?'
            : 'What payment methods do you accept?',
          answer: language === 'fr'
            ? 'Nous acceptons Visa, Mastercard, American Express, PayPal et Apple Pay.'
            : 'We accept Visa, Mastercard, American Express, PayPal, and Apple Pay.',
        },
        {
          question: language === 'fr'
            ? 'Le paiement est-il sécurisé ?'
            : 'Is the payment secure?',
          answer: language === 'fr'
            ? 'Oui, toutes les transactions sont sécurisées par cryptage SSL 256 bits.'
            : 'Yes, all transactions are secured with 256-bit SSL encryption.',
        },
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-soft py-12 lg:py-16">
        <div className="container">
          <h1 className="font-display text-3xl lg:text-4xl font-semibold mb-2">
            {t.faq.title}
          </h1>
          <p className="text-muted-foreground">
            {t.faq.subtitle}
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="container py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          {faqCategories.map((category, i) => (
            <div key={i} className="mb-10">
              <h2 className="font-display text-xl font-semibold mb-4">
                {category.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {category.faqs.map((faq, j) => (
                  <AccordionItem
                    key={j}
                    value={`${i}-${j}`}
                    className="border rounded-xl px-4 bg-card"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {/* Contact CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-card shadow-card text-center">
            <MessageCircle className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">
              {language === 'fr' ? 'Besoin d\'aide supplémentaire ?' : 'Need more help?'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {language === 'fr'
                ? 'Notre équipe est disponible pour répondre à toutes vos questions.'
                : 'Our team is available to answer all your questions.'}
            </p>
            <Button asChild>
              <Link to="/contact">{t.nav.contact}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Help;
