
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowLeft, ArrowRight, Clock, User, Calendar } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import pb from '@/lib/pocketbaseClient';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticleAndRelated = async () => {
      setLoading(true);
      try {
        const record = await pb.collection('blog_articles').getFirstListItem(`slug="${slug}"`, {
          $autoCancel: false
        });
        setArticle(record);

        if (record) {
          const related = await pb.collection('blog_articles').getList(1, 3, {
            filter: `category="${record.category}" && id!="${record.id}"`,
            sort: '-date',
            $autoCancel: false
          });
          setRelatedArticles(related.items);
        }
      } catch (error) {
        console.error('Failed to fetch article:', error);
        navigate('/insights'); // Redirect if not found
      } finally {
        setLoading(false);
      }
    };

    fetchArticleAndRelated();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-6" />
            <Skeleton className="h-6 w-1/2 mb-12" />
            <Skeleton className="h-[400px] w-full rounded-2xl mb-12" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) return null;

  return (
    <>
      <Helmet>
        <title>{`${article.title} - Axiom Trade Network Limited`}</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://axiomtradenet.com/insights/${slug}`} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <article className="py-20 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link 
                  to="/insights" 
                  className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 mb-8"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Insights
                </Link>

                <div className="mb-8">
                  <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/90 mb-6">
                    {article.category}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                    {article.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(article.date), 'MMMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {article.readTime} min read
                    </div>
                  </div>
                </div>

                <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-12 shadow-lg">
                  <img 
                    src={article.featuredImage} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-accent prose-img:rounded-xl">
                  {/* In a real app, this might be markdown or rich text. For now, we render the text content. */}
                  {article.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-6 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            </div>
          </article>

          {relatedArticles.length > 0 && (
            <section className="py-20 bg-muted">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-10 text-foreground">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedArticles.map((related) => (
                    <Link 
                      key={related.id} 
                      to={`/insights/${related.slug}`}
                      className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={related.featuredImage}
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {related.excerpt}
                        </p>
                        <div className="mt-auto text-sm font-semibold text-primary flex items-center group-hover:text-accent transition-colors duration-200">
                          Read more
                          <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ArticleDetailPage;
