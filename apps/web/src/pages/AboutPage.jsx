
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ValueCard from '@/components/ValueCard.jsx';

const AboutPage = () => {
  const values = [
    {
      title: 'Trust',
      description: 'We build lasting relationships through transparency, reliability, and consistent delivery on our commitments.',
    },
    {
      title: 'Insight',
      description: 'Deep market knowledge and cultural understanding drive our strategic recommendations and event design.',
    },
    {
      title: 'Efficiency',
      description: 'Streamlined processes and proven methodologies ensure timely execution and optimal resource utilization.',
    },
    {
      title: 'Connectivity',
      description: 'Our extensive network of partners, stakeholders, and industry leaders creates opportunities for meaningful collaboration.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About us - Axiom Trade Network Limited</title>
        <meta name="description" content="Learn about Axiom Trade Network Limited's mission to facilitate global business expansion into Africa through strategic events and market entry solutions." />
        <link rel="canonical" href="https://axiomtradenet.com/about" />
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
                  About Axiom Trade Network Limited
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Your strategic partner for business expansion across African markets
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src="https://images.unsplash.com/flagged/photo-1581531147313-09a253572fcb?auto=format&fit=crop&w=1200&q=75"
                    alt="Business professionals collaborating in modern office"
                    className="rounded-2xl shadow-lg w-full h-auto"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-4 text-foreground">Who we are</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Axiom Trade Network Limited specializes in connecting international businesses with opportunities across Africa. We design and execute high-impact B2B events, trade fairs, and provide comprehensive market entry consulting services.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    With deep regional expertise and an extensive network of business leaders, government stakeholders, and industry partners, we help companies navigate the complexities of African markets and build sustainable growth strategies.
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-muted rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Our mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To facilitate global business expansion into Africa by creating meaningful connections, providing strategic insights, and organizing events that drive tangible business outcomes.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-muted rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Our vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the leading gateway for international trade in Africa, recognized for excellence in event organization, market intelligence, and partnership development.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our values</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The principles that guide our work and relationships
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <ValueCard key={index} {...value} index={index} />
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
