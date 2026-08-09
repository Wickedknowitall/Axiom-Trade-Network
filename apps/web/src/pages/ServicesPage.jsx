
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Calendar, Users, TrendingUp, Shield, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import FormModal from '@/components/FormModal.jsx';
import ConsultationForm from '@/components/ConsultationForm.jsx';

const ServicesPage = () => {
  const { consultationModalOpen, openConsultationModal, closeConsultationModal } = useAuth();

  const services = [
    {
      icon: Calendar,
      title: 'B2B event organization',
      description: 'We design and execute high-impact business events that connect international companies with African markets and partners. Our events are tailored to your industry, target audience, and business objectives.',
      benefits: [
        'Customized event formats (conferences, summits, networking sessions)',
        'Targeted participant recruitment and vetting',
        'Professional venue selection and logistics management',
        'Post-event follow-up and relationship nurturing',
      ],
    },
    {
      icon: Users,
      title: 'Trade fairs & expos',
      description: 'Organize industry-specific exhibitions that showcase products, facilitate deals, and build lasting business relationships. We handle everything from exhibitor recruitment to visitor engagement strategies.',
      benefits: [
        'Industry-focused exhibitor and visitor targeting',
        'Comprehensive marketing and promotion campaigns',
        'On-site business matchmaking services',
        'Exhibition stand design and setup coordination',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Market research & entry consulting',
      description: 'Provide data-driven insights and strategic guidance for successful market entry across African regions. Our research covers market sizing, competitive analysis, regulatory requirements, and partnership opportunities.',
      benefits: [
        'Detailed market opportunity assessments',
        'Competitive landscape analysis',
        'Entry strategy development and roadmapping',
        'Risk assessment and mitigation planning',
      ],
    },
    {
      icon: Shield,
      title: 'Legal & regulatory support',
      description: 'Navigate complex regulatory environments with expert guidance on compliance, licensing, and business registration. We connect you with trusted legal partners and help you understand local requirements.',
      benefits: [
        'Regulatory compliance guidance',
        'Business registration and licensing support',
        'Contract review and negotiation assistance',
        'Intellectual property protection strategies',
      ],
    },
    {
      icon: Briefcase,
      title: 'Business & trade development',
      description: 'Build sustainable partnerships and distribution networks to establish your presence in target markets. We facilitate introductions, negotiate agreements, and support long-term relationship management.',
      benefits: [
        'Strategic partner identification and vetting',
        'Distribution network development',
        'Joint venture and partnership structuring',
        'Ongoing relationship management support',
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our services - Axiom Trade Network Limited</title>
        <meta name="description" content="Comprehensive B2B event organization, trade fairs, market research, legal support, and business development services for African market entry." />
        <link rel="canonical" href="https://axiomtradenet.com/services" />
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
                  Our services
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  End-to-end solutions for entering and growing in African markets
                </p>
              </motion.div>

              <div className="space-y-16">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                        <service.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold mb-4 text-foreground">{service.title}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                      <div className="bg-muted rounded-2xl p-8 h-full flex items-center justify-center">
                        <service.icon className="w-32 h-32 text-primary/20" />
                      </div>
                    </div>
                  </motion.div>
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
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to explore African markets?</h2>
                <p className="text-xl mb-8 opacity-90 leading-relaxed">
                  Schedule a consultation to discuss your specific needs and how we can help you succeed.
                </p>
                <Button 
                  onClick={openConsultationModal}
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-200 active:scale-[0.98]"
                >
                  Get started
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />

        <FormModal
          open={consultationModalOpen}
          onOpenChange={closeConsultationModal}
          title="Request a consultation"
          fullFormLink="/consultation"
        >
          <ConsultationForm onSuccess={closeConsultationModal} />
        </FormModal>
      </div>
    </>
  );
};

export default ServicesPage;
