import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  Info,
  Building,
  PieChart
} from 'lucide-react';
import { tijoriService, TijoriCompany, TijoriFinancials, TijoriPeerComparison, TijoriShareholding, TijoriInsiderTrading } from '../lib/tijoriIntegration';

const TijoriAnalysis: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<string>('BALRAMCHIN');
  const [companyData, setCompanyData] = useState<TijoriCompany | null>(null);
  const [financials, setFinancials] = useState<TijoriFinancials[]>([]);
  const [peerComparison, setPeerComparison] = useState<TijoriPeerComparison | null>(null);
  const [shareholding, setShareholding] = useState<TijoriShareholding | null>(null);
  const [insiderTrading, setInsiderTrading] = useState<TijoriInsiderTrading | null>(null);
  const [loading, setLoading] = useState(false);

  const stocks = ['BALRAMCHIN', 'BATAINDIA', 'BHEL', 'COALINDIA', 'DIVISLAB', 'EICHERMOT', 'GAIL', 'HINDALCO'];

  useEffect(() => {
    loadStockData(selectedStock);
  }, [selectedStock]);

  const loadStockData = async (symbol: string) => {
    setLoading(true);
    try {
      const [company, financialsData, peers, shareholdingData, insiderData] = await Promise.all([
        tijoriService.getCompanyData(symbol),
        tijoriService.getFinancials(symbol),
        tijoriService.getPeerComparison(symbol),
        tijoriService.getShareholding(symbol),
        tijoriService.getInsiderTrading(symbol)
      ]);

      setCompanyData(company);
      setFinancials(financialsData);
      setPeerComparison(peers);
      setShareholding(shareholdingData);
      setInsiderTrading(insiderData);
    } catch (error) {
      console.error('Failed to load stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMetricColor = (value: number, benchmark: number, higherIsBetter: boolean = true) => {
    if (higherIsBetter) {
      return value > benchmark ? 'text-green-600' : value < benchmark ? 'text-red-600' : 'text-gray-600';
    } else {
      return value < benchmark ? 'text-green-600' : value > benchmark ? 'text-red-600' : 'text-gray-600';
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    } else {
      return `₹${value.toLocaleString()}`;
    }
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tijori Fundamental Analysis</h2>
          <p className="text-gray-600">Deep dive into company fundamentals and financials</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {stocks.map((stock) => (
              <option key={stock} value={stock}>{stock}</option>
            ))}
          </select>
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
              This fundamental analysis is for educational purposes only. Not financial advice. 
              Consult a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <Card className="p-8 text-center">
          <BarChart3 className="h-8 w-8 animate-pulse mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Loading fundamental data...</p>
        </Card>
      ) : (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="peers">Peer Comparison</TabsTrigger>
            <TabsTrigger value="shareholding">Shareholding</TabsTrigger>
            <TabsTrigger value="insider">Insider Trading</TabsTrigger>
          </TabsList>

          {/* Company Overview */}
          <TabsContent value="overview" className="space-y-4">
            {companyData && (
              <>
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{companyData.name}</h3>
                    <Badge className="bg-blue-100 text-blue-800">{companyData.sector}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Market Cap</p>
                      <p className="text-xl font-bold">{formatCurrency(companyData.marketCap * 10000000)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">P/E Ratio</p>
                      <p className={`text-xl font-bold ${getMetricColor(companyData.pe, 15)}`}>{companyData.pe}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">P/B Ratio</p>
                      <p className={`text-xl font-bold ${getMetricColor(companyData.pb, 2)}`}>{companyData.pb}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ROE</p>
                      <p className={`text-xl font-bold ${getMetricColor(companyData.roe, 15)}`}>{formatPercentage(companyData.roe)}</p>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">Key Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ROA</span>
                        <span className={getMetricColor(companyData.roa, 10)}>{formatPercentage(companyData.roa)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Debt/Equity</span>
                        <span className={getMetricColor(companyData.debtToEquity, 1, false)}>{companyData.debtToEquity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Ratio</span>
                        <span className={getMetricColor(companyData.currentRatio, 1.5)}>{companyData.currentRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quick Ratio</span>
                        <span className={getMetricColor(companyData.quickRatio, 1)}>{companyData.quickRatio}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">Growth Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue Growth</span>
                        <span className={getMetricColor(companyData.revenueGrowth, 10)}>{formatPercentage(companyData.revenueGrowth)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Profit Growth</span>
                        <span className={getMetricColor(companyData.profitGrowth, 15)}>{formatPercentage(companyData.profitGrowth)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue</span>
                        <span>{formatCurrency(companyData.revenue * 10000000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Profit</span>
                        <span>{formatCurrency(companyData.profit * 10000000)}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          {/* Financial Statements */}
          <TabsContent value="financials" className="space-y-4">
            {financials.length > 0 && (
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Financial Statements</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Metric</th>
                        <th className="text-right py-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Revenue</td>
                        <td className="text-right">{formatCurrency(financials[0].revenue * 10000000)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">EBITDA</td>
                        <td className="text-right">{formatCurrency(financials[0].ebitda * 10000000)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Operating Profit</td>
                        <td className="text-right">{formatCurrency(financials[0].operatingProfit * 10000000)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Net Profit</td>
                        <td className="text-right">{formatCurrency(financials[0].netProfit * 10000000)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Total Assets</td>
                        <td className="text-right">{formatCurrency(financials[0].totalAssets * 10000000)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Total Liabilities</td>
                        <td className="text-right">{formatCurrency(financials[0].totalLiabilities * 10000000)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Shareholders Equity</td>
                        <td className="text-right">{formatCurrency(financials[0].shareholdersEquity * 10000000)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Cash & Equivalents</td>
                        <td className="text-right">{formatCurrency(financials[0].cashAndEquivalents * 10000000)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Total Debt</td>
                        <td className="text-right">{formatCurrency(financials[0].totalDebt * 10000000)}</td>
                      </tr>
                      <tr>
                        <td className="py-2">Book Value</td>
                        <td className="text-right">{formatCurrency(financials[0].bookValue)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Peer Comparison */}
          <TabsContent value="peers" className="space-y-4">
            {peerComparison && (
              <>
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Peer Comparison</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {peerComparison.peers.map((peer, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h4 className="font-semibold">{peer.name}</h4>
                        <div className="space-y-1 mt-2">
                          <div className="flex justify-between text-sm">
                            <span>P/E</span>
                            <span>{peer.pe}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>P/B</span>
                            <span>{peer.pb}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>ROE</span>
                            <span>{formatPercentage(peer.roe)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Revenue Growth</span>
                            <span>{formatPercentage(peer.revenueGrowth)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Industry Average</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">P/E</p>
                      <p className="text-xl font-bold">{peerComparison.industryAverage.pe}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">P/B</p>
                      <p className="text-xl font-bold">{peerComparison.industryAverage.pb}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">ROE</p>
                      <p className="text-xl font-bold">{formatPercentage(peerComparison.industryAverage.roe)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Rev Growth</p>
                      <p className="text-xl font-bold">{formatPercentage(peerComparison.industryAverage.revenueGrowth)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Profit Growth</p>
                      <p className="text-xl font-bold">{formatPercentage(peerComparison.industryAverage.profitGrowth)}</p>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Shareholding Pattern */}
          <TabsContent value="shareholding" className="space-y-4">
            {shareholding && (
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Shareholding Pattern</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Promoters</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${shareholding.promoters}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{shareholding.promoters}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>FII</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${shareholding.fii}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{shareholding.fii}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>DII</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${shareholding.dii}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{shareholding.dii}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Public</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: `${shareholding.public}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{shareholding.public}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Others</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-600 h-2 rounded-full" style={{ width: `${shareholding.others}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{shareholding.others}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Last updated: {new Date(shareholding.lastUpdated).toLocaleDateString()}
                </p>
              </Card>
            )}
          </TabsContent>

          {/* Insider Trading */}
          <TabsContent value="insider" className="space-y-4">
            {insiderTrading && (
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Insider Trading</h3>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Net Buy/Sell</span>
                    <span className={`font-bold ${insiderTrading.netBuySell > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {insiderTrading.netBuySell > 0 ? '+' : ''}{insiderTrading.netBuySell} shares
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Value</span>
                    <span className="font-bold">{formatCurrency(insiderTrading.totalValue)}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {insiderTrading.transactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge className={transaction.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {transaction.type}
                        </Badge>
                        <div>
                          <p className="font-medium">{transaction.person}</p>
                          <p className="text-sm text-gray-600">{transaction.designation}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{transaction.quantity} shares</p>
                        <p className="text-sm text-gray-600">₹{transaction.price} each</p>
                        <p className="text-sm font-medium">{formatCurrency(transaction.value)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Last updated: {new Date(insiderTrading.lastUpdated).toLocaleDateString()}
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default TijoriAnalysis;
