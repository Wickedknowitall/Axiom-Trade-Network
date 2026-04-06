
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ConsultationForm from '@/components/ConsultationForm.jsx';

const ConsultationPage = () => {
  return (
    <>
      <Helmet>
        <title>Request a consultation - Axiom Trade Network Limited</title>
        <meta name="description" content="Schedule a consultation to discuss your African market entry strategy and business expansion needs." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="py-20 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/services" className="hover:text-foreground transition-colors duration-200">Services</Link>
                <ChevronRight className="w-4 h-4" />
                <span>Request a consultation</span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground" style={{ letterSpacing: '-0.02em' }}>
                  Request a consultation
                </h1>
                <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                  Fill out the form below and our team will contact you to discuss your African market expansion strategy.
                </p>

                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                  <ConsultationForm />
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

export default ConsultationPage;
