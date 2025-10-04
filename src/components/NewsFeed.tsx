import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Newspaper, 
  TrendingUp, 
  TrendingDown, 
  ExternalLink,
  RefreshCw,
  Filter,
  Search,
  Calendar,
  User,
  Tag
} from 'lucide-react';
import { feedlyService, FeedlyArticle } from '../lib/feedlyIntegration';

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<FeedlyArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [sentiment, setSentiment] = useState<{
    positive: number;
    negative: number;
    neutral: number;
  }>({ positive: 0, negative: 0, neutral: 0 });

  const stocks = ['BALRAMCHIN', 'BATAINDIA', 'BHEL', 'COALINDIA', 'DIVISLAB', 'EICHERMOT', 'GAIL', 'HINDALCO'];

  useEffect(() => {
    loadFinancialNews();
    loadMarketSentiment();
  }, []);

  const loadFinancialNews = async () => {
    setLoading(true);
    try {
      const news = await feedlyService.getFinancialNews(50);
      setArticles(news);
    } catch (error) {
      console.error('Failed to load financial news:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStockNews = async (symbol: string) => {
    setLoading(true);
    try {
      const news = await feedlyService.getStockNews(symbol, 20);
      setArticles(news);
    } catch (error) {
      console.error('Failed to load stock news:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMarketSentiment = async () => {
    try {
      const sentimentData = await feedlyService.getMarketSentiment();
      setSentiment(sentimentData);
    } catch (error) {
      console.error('Failed to load market sentiment:', error);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE': return 'bg-green-100 text-green-800';
      case 'NEGATIVE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Financial News Feed</h2>
          <p className="text-gray-600">Real-time news from Feedly integration</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={loadFinancialNews}
            disabled={loading}
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-yellow-800">Educational Purpose Only</h3>
            <p className="text-sm text-yellow-700 mt-1">
              This news feed is for educational purposes only. Not financial advice. 
              Consult a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Market Sentiment */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Market Sentiment</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{sentiment.positive}</div>
            <div className="text-sm text-gray-600">Positive</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{sentiment.negative}</div>
            <div className="text-sm text-gray-600">Negative</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{sentiment.neutral}</div>
            <div className="text-sm text-gray-600">Neutral</div>
          </div>
        </div>
      </Card>

      {/* Stock Filter */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Filter by Stock</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedStock === '' ? 'default' : 'outline'}
            onClick={() => {
              setSelectedStock('');
              loadFinancialNews();
            }}
          >
            All News
          </Button>
          {stocks.map((stock) => (
            <Button
              key={stock}
              variant={selectedStock === stock ? 'default' : 'outline'}
              onClick={() => {
                setSelectedStock(stock);
                loadStockNews(stock);
              }}
            >
              {stock}
            </Button>
          ))}
        </div>
      </Card>

      {/* News Articles */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All News ({articles.length})</TabsTrigger>
          <TabsTrigger value="positive">Positive ({articles.filter(a => a.entities.some(e => e.type === 'POSITIVE')).length})</TabsTrigger>
          <TabsTrigger value="negative">Negative ({articles.filter(a => a.entities.some(e => e.type === 'NEGATIVE')).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {loading ? (
            <Card className="p-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Loading news...</p>
            </Card>
          ) : articles.length === 0 ? (
            <Card className="p-8 text-center">
              <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600">No news articles found</h3>
              <p className="text-gray-500">Try refreshing or selecting a different stock</p>
            </Card>
          ) : (
            articles.map((article) => (
              <Card key={article.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-lg">{article.title}</h4>
                      <Badge className={getSentimentColor(article.entities[0]?.type || 'NEUTRAL')}>
                        {article.entities[0]?.type || 'NEUTRAL'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{article.summary}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(article.published)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ExternalLink className="h-4 w-4" />
                        <span>{article.origin.title}</span>
                      </div>
                    </div>
                    {article.keywords.length > 0 && (
                      <div className="flex items-center space-x-2 mt-3">
                        <Tag className="h-4 w-4 text-gray-400" />
                        <div className="flex flex-wrap gap-1">
                          {article.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(article.alternate[0]?.href, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Read
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="positive" className="space-y-4">
          {articles.filter(a => a.entities.some(e => e.type === 'POSITIVE')).map((article) => (
            <Card key={article.id} className="p-4 border-green-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-lg text-green-800">{article.title}</h4>
                    <Badge className="bg-green-100 text-green-800">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      POSITIVE
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{article.summary}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(article.published)}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(article.alternate[0]?.href, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Read
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="negative" className="space-y-4">
          {articles.filter(a => a.entities.some(e => e.type === 'NEGATIVE')).map((article) => (
            <Card key={article.id} className="p-4 border-red-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-lg text-red-800">{article.title}</h4>
                    <Badge className="bg-red-100 text-red-800">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      NEGATIVE
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{article.summary}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(article.published)}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(article.alternate[0]?.href, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Read
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsFeed;
