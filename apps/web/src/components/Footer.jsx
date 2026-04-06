
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, Twitter, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <span className="text-xl font-bold text-accent">Axiom Trade Network</span>
            <p className="mt-4 text-sm text-primary-foreground/80 leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-6 text-lg">{t('footer.company')}</h3>
            <nav className="space-y-3">
              <Link to="/about" className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                {t('nav.about')}
              </Link>
              <Link to="/services" className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                {t('nav.services')}
              </Link>
              <Link to="/contact" className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-6 text-lg">{t('footer.resources')}</h3>
            <nav className="space-y-3">
              <Link to="/events" className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                {t('nav.events')}
              </Link>
              <Link to="/gallery" className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                {t('nav.gallery')}
              </Link>
              <Link to="/insights" className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                {t('nav.insights')}
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-6 text-lg">{t('footer.contact')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>info@axiomtrade.com</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+234 1 234 5678</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p>&copy; {new Date().getFullYear()} Axiom Trade Network Limited. {t('footer.rights')}</p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-accent transition-colors duration-200">
                {t('footer.privacy')}
              </Link>
              <Link to="#" className="hover:text-accent transition-colors duration-200">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
