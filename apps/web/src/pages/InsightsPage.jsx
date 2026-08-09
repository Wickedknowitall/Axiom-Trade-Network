
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowRight, Clock, User } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import pb from '@/lib/pocketbaseClient';

const InsightsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Market Trends', 'Trade Opportunities', 'Business Strategy', 'Regulatory Updates'];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const records = await pb.collection('blog_articles').getList(1, 50, {
          sort: '-date',
          $autoCancel: false
        });
        setArticles(records.items);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = filter === 'All' 
    ? articles 
    : articles.filter(article => article.category === filter);

  return (
    <>
      <Helmet>
        <title>Insights & News - Axiom Trade Network Limited</title>
        <meta name="description" content="Read the latest insights, market trends, and business strategies for African market expansion." />
        <link rel="canonical" href="https://axiomtradenet.com/insights" />
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
                className="text-center mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground" style={{ letterSpacing: '-0.02em' }}>
                  Insights & News
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Expert perspectives on African markets, trade opportunities, and business strategies.
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      filter === cat
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex flex-col space-y-4">
                      <Skeleton className="h-56 w-full rounded-2xl" />
                      <Skeleton className="h-6 w-1/4" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredArticles.map((article) => (
                      <motion.article
                        key={article.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
                      >
                        <Link to={`/insights/${article.slug}`} className="block overflow-hidden aspect-[16/10]">
                          <img
                            src={article.featuredImage}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30">
                              {article.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {article.readTime} min read
                            </span>
                          </div>
                          <Link to={`/insights/${article.slug}`} className="block group-hover:text-primary transition-colors duration-200">
                            <h2 className="text-2xl font-bold mb-3 text-foreground line-clamp-2">
                              {article.title}
                            </h2>
                          </Link>
                          <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <User className="w-4 h-4 mr-2" />
                              {article.author}
                            </div>
                            <Link 
                              to={`/insights/${article.slug}`}
                              className="text-sm font-semibold text-primary flex items-center group-hover:text-accent transition-colors duration-200"
                            >
                              Read more
                              <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {!loading && filteredArticles.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No articles found for this category.</p>
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InsightsPage;
