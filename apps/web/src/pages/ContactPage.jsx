
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import pb from '@/lib/pocketbaseClient';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactPage = () => {
  const { t, isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, t('forms.error')),
    company: z.string().optional(),
    email: z.string().email(t('forms.error')),
    phone: z.string().optional(),
    inquiryType: z.string().optional(),
    message: z.string().min(10, t('forms.error')),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      inquiryType: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await pb.collection('contacts').create(data, { $autoCancel: false });
      toast.success(t('forms.success'));
      form.reset();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(t('forms.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('contact.title')} - Axiom Trade Network Limited</title>
        <meta name="description" content={t('contact.subtitle')} />
        <link rel="canonical" href="https://axiomtradenet.com/contact" />
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
                  {t('contact.title')}
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {t('contact.subtitle')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-foreground">{t('contact.sendMessage')}</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('forms.fullName')}</FormLabel>
                              <FormControl>
                                <Input placeholder="Kwame Asante" {...field} className="text-gray-900 placeholder:text-gray-400" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('forms.companyName')}</FormLabel>
                              <FormControl>
                                <Input placeholder="Elm & Oak" {...field} className="text-gray-900 placeholder:text-gray-400" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('forms.email')}</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="kwame@elmoak.com" {...field} className="text-gray-900 placeholder:text-gray-400" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('forms.phone')}</FormLabel>
                              <FormControl>
                                <Input placeholder="+233 24 123 4567" {...field} className="text-gray-900 placeholder:text-gray-400" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="inquiryType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('forms.inquiryType')}</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} dir={isRTL ? 'rtl' : 'ltr'}>
                              <FormControl>
                                <SelectTrigger className="text-gray-900">
                                  <SelectValue placeholder={t('forms.selectInquiryType')} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">{t('forms.generalInquiry')}</SelectItem>
                                <SelectItem value="events">{t('forms.eventInfo')}</SelectItem>
                                <SelectItem value="services">{t('forms.serviceInquiry')}</SelectItem>
                                <SelectItem value="partnership">{t('forms.partnership')}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('forms.message')}</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="..." 
                                className="min-h-[150px] text-gray-900 placeholder:text-gray-400" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
                      >
                        {isSubmitting ? t('forms.sending') : t('forms.sendMessage')}
                      </Button>
                    </form>
                  </Form>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-foreground">{t('contact.contactInfo')}</h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 text-foreground">Email</h3>
                          <p className="text-muted-foreground">info@axiomtrade.com</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 text-foreground">Phone</h3>
                          <p className="text-muted-foreground" dir="ltr">+234 1 234 5678</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 text-foreground">{t('contact.office')}</h3>
                          <p className="text-muted-foreground">Lagos, Nigeria</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-2xl p-8">
                    <h3 className="text-xl font-bold mb-4 text-foreground">{t('contact.businessHours')}</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>{t('contact.hours1')}</p>
                      <p>{t('contact.hours2')}</p>
                      <p>{t('contact.hours3')}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
