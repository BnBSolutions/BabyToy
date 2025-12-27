import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: language === 'fr' ? 'Message envoyé !' : 'Message sent!',
      description: language === 'fr' 
        ? 'Nous vous répondrons dans les plus brefs délais.' 
        : 'We will get back to you as soon as possible.',
    });
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t.contact.address,
      content: '123 Rue de la Douceur, 75001 Paris, France',
    },
    {
      icon: Phone,
      title: t.contact.phone,
      content: '+33 1 23 45 67 89',
    },
    {
      icon: Mail,
      title: t.contact.email,
      content: 'contact@doudouetcompagnie.com',
    },
    {
      icon: Clock,
      title: t.contact.hours,
      content: language === 'fr' ? 'Lun - Ven: 9h - 18h' : 'Mon - Fri: 9am - 6pm',
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-soft py-12 lg:py-16">
        <div className="container">
          <h1 className="font-display text-3xl lg:text-4xl font-semibold mb-2">
            {t.contact.title}
          </h1>
          <p className="text-muted-foreground">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      <section className="container py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="font-display text-2xl font-semibold mb-6">
              {language === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.contact.name}
                  </label>
                  <Input placeholder={t.contact.name} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.contact.email}
                  </label>
                  <Input type="email" placeholder={t.contact.email} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.contact.subject}
                </label>
                <Input placeholder={t.contact.subject} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.contact.message}
                </label>
                <Textarea
                  placeholder={t.contact.message}
                  rows={6}
                  required
                />
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? t.common.loading : t.contact.send}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="font-display text-2xl font-semibold mb-6">
              {language === 'fr' ? 'Informations de contact' : 'Contact Information'}
            </h2>
            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{info.title}</h3>
                    <p className="text-muted-foreground">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 aspect-video rounded-2xl bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">
                {language === 'fr' ? 'Carte interactive' : 'Interactive map'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
