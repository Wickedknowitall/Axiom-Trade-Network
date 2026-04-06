
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Calendar, Users, TrendingUp, Shield, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import EventCard from '@/components/EventCard.jsx';
import ValueCard from '@/components/ValueCard.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import FormModal from '@/components/FormModal.jsx';
import ConsultationForm from '@/components/ConsultationForm.jsx';
import EventInterestForm from '@/components/EventInterestForm.jsx';
import pb from '@/lib/pocketbaseClient';
import { useLanguage } from '@/contexts/LanguageContext';

const HomePage = () => {
  const { t, isRTL } = useLanguage();
  const { 
    consultationModalOpen, 
    closeConsultationModal,
    eventInterestModalOpen,
    openEventInterestModal,
    closeEventInterestModal,
    selectedEvent
  } = useAuth();

  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const records = await pb.collection('events').getFullList({
          sort: 'date',
          $autoCancel: false
        });
        setEvents(records.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const services = [
    {
      icon: Calendar,
      title: t('services.s1Title'),
      description: t('services.s1Desc'),
    },
    {
      icon: Users,
      title: t('services.s2Title'),
      description: t('services.s2Desc'),
    },
    {
      icon: TrendingUp,
      title: t('services.s3Title'),
      description: t('services.s3Desc'),
    },
    {
      icon: Shield,
      title: t('services.s4Title'),
      description: t('services.s4Desc'),
    },
    {
      icon: Briefcase,
      title: t('services.s5Title'),
      description: t('services.s5Desc'),
    },
  ];

  const values = [
    {
      title: t('about.valueTrust'),
      description: t('about.valueTrustDesc'),
    },
    {
      title: t('about.valueInsight'),
      description: t('about.valueInsightDesc'),
    },
    {
      title: t('about.valueConnectivity'),
      description: t('about.valueConnectivityDesc'),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Axiom Trade Network Limited - {t('home.heroTitle')}</title>
        <meta name="description" content={t('home.heroSubtitle')} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1582774867786-8e802e3b33d8" 
                alt="Modern business meeting in Africa"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/75"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6" style={{ letterSpacing: '-0.02em' }}>
                  {t('home.heroTitle')}
                </h1>
                <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                  {t('home.heroSubtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-200 active:scale-[0.98]"
                  >
                    <Link to="/services">
                      {t('home.exploreServices')}
                      {isRTL ? <ArrowLeft className="mr-2 w-5 h-5" /> : <ArrowRight className="ml-2 w-5 h-5" />}
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    size="lg"
                    variant="outline"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-all duration-200 active:scale-[0.98]"
                  >
                    <Link to="/events">{t('home.viewEvents')}</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t('home.coreServices')}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('home.coreServicesDesc')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {services.slice(0, 4).map((service, index) => (
                  <ServiceCard key={index} {...service} index={index} />
                ))}
              </div>
              <div className="max-w-2xl mx-auto">
                <ServiceCard {...services[4]} index={4} />
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t('home.upcomingEvents')}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('home.upcomingEventsDesc')}
                </p>
              </motion.div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-card rounded-2xl p-6 border border-border">
                      <div className="h-6 bg-muted rounded mb-3 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded mb-2 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {events.map((event, index) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      onRegisterInterest={openEventInterestModal}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t('common.noResults')}</p>
                </div>
              )}

              <div className="text-center mt-8">
                <Button asChild variant="outline" className="transition-all duration-200 active:scale-[0.98]">
                  <Link to="/events">{t('common.viewAll')}</Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t('home.whyChooseUs')}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('home.whyChooseUsDesc')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <ValueCard key={index} {...value} index={index} />
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('home.readyToExpand')}</h2>
                <p className="text-xl mb-8 opacity-90 leading-relaxed">
                  {t('home.readyToExpandDesc')}
                </p>
                <Button 
                  asChild
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-200 active:scale-[0.98]"
                >
                  <Link to="/contact">{t('common.getStarted')}</Link>
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />

        <FormModal
          open={consultationModalOpen}
          onOpenChange={closeConsultationModal}
          title={t('home.readyToExpand')}
          fullFormLink="/consultation"
        >
          <ConsultationForm onSuccess={closeConsultationModal} />
        </FormModal>

        <FormModal
          open={eventInterestModalOpen}
          onOpenChange={closeEventInterestModal}
          title={t('events.registerInterest')}
          fullFormLink="/event-interest"
        >
          <EventInterestForm selectedEvent={selectedEvent} onSuccess={closeEventInterestModal} />
        </FormModal>
      </div>
    </>
  );
};

export default HomePage;
