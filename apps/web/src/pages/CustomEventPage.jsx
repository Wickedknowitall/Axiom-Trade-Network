
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CustomEventForm from '@/components/CustomEventForm.jsx';

const CustomEventPage = () => {
  return (
    <>
      <Helmet>
        <title>Request a custom event - Axiom Trade Network Limited</title>
        <meta name="description" content="Request a custom B2B event, trade mission, or networking session tailored to your business objectives." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="py-20 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/events" className="hover:text-foreground transition-colors duration-200">Events</Link>
                <ChevronRight className="w-4 h-4" />
                <span>Request custom event</span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground" style={{ letterSpacing: '-0.02em' }}>
                  Request a custom event
                </h1>
                <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                  Tell us about your custom event needs and our team will design a tailored solution aligned with your business objectives.
                </p>

                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                  <CustomEventForm />
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CustomEventPage;
