
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import EventCard from '@/components/EventCard.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import FormModal from '@/components/FormModal.jsx';
import EventInterestForm from '@/components/EventInterestForm.jsx';
import CustomEventForm from '@/components/CustomEventForm.jsx';
import pb from '@/lib/pocketbaseClient';
import { Skeleton } from '@/components/ui/skeleton';

const EventsPage = () => {
  const { 
    eventInterestModalOpen,
    openEventInterestModal,
    closeEventInterestModal,
    customEventModalOpen,
    openCustomEventModal,
    closeCustomEventModal,
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
        setEvents(records);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Helmet>
        <title>Events - Axiom Trade Network Limited</title>
        <meta name="description" content="Join our upcoming B2B events, trade fairs, and networking sessions across Africa. Register your interest or request a custom event." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground" style={{ letterSpacing: '-0.02em' }}>
                  Upcoming events
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Join industry leaders at our carefully curated business events across Africa
                </p>
              </motion.div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="border border-border rounded-2xl p-6">
                      <Skeleton className="h-6 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6 mb-4" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-6" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              ) : events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="text-center py-12 bg-muted rounded-2xl">
                  <p className="text-muted-foreground text-lg">No upcoming events at the moment. Check back soon.</p>
                </div>
              )}
            </div>
          </section>

          <section className="py-20 bg-muted">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Custom events</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                  Need a tailored event for your industry or target market? We design and execute custom B2B events, trade missions, and networking sessions aligned with your business objectives.
                </p>
                <Button 
                  onClick={openCustomEventModal}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
                >
                  Discuss your event needs
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />

        <FormModal
          open={eventInterestModalOpen}
          onOpenChange={closeEventInterestModal}
          title="Register your interest"
          fullFormLink="/event-interest"
        >
          <EventInterestForm selectedEvent={selectedEvent} onSuccess={closeEventInterestModal} />
        </FormModal>

        <FormModal
          open={customEventModalOpen}
          onOpenChange={closeCustomEventModal}
          title="Request a custom event"
          fullFormLink="/custom-event"
        >
          <CustomEventForm onSuccess={closeCustomEventModal} />
        </FormModal>
      </div>
    </>
  );
};

export default EventsPage;
