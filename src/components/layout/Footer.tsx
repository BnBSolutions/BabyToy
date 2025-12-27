import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const footerLinks = {
    about: [
      { label: t.nav.brand, href: '/about' },
      { label: t.footer.storeLocator, href: '/stores' },
      { label: 'Blog', href: '/blog' },
    ],
    customerService: [
      { label: t.nav.contact, href: '/contact' },
      { label: t.nav.faq, href: '/help' },
      { label: t.footer.shipping, href: '/shipping' },
      { label: t.footer.returns, href: '/returns' },
      { label: t.footer.giftCards, href: '/gift-cards' },
    ],
    legal: [
      { label: t.footer.terms, href: '/terms' },
      { label: t.footer.privacyPolicy, href: '/privacy' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className="bg-card border-t">
      {/* Newsletter Section */}
      <div className="gradient-soft py-12 lg:py-16">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-2xl lg:text-3xl font-semibold mb-2">
              {t.home.newsletterTitle}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t.home.newsletterSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={t.home.emailPlaceholder}
                className="flex-1 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button size="lg" className="px-8">
                {t.home.subscribe}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-semibold">Doudou</span>
              <span className="font-display text-lg text-primary ml-1">&</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              {t.about.story.slice(0, 100)}...
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.about}</h4>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.customerService}</h4>
            <ul className="space-y-2.5">
              {footerLinks.customerService.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>{t.footer.copyright}</p>
            <div className="flex items-center gap-4">
              <span>{t.footer.paymentMethods}:</span>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-xs font-medium">
                  Visa
                </div>
                <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-xs font-medium">
                  MC
                </div>
                <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-xs font-medium">
                  PayPal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
