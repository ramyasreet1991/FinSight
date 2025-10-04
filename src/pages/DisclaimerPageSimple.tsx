import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { AlertTriangle, Shield, Info, CheckCircle } from 'lucide-react';

const DisclaimerPageSimple: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Important Disclaimer</h1>
          <p className="text-lg text-gray-600">
            Please read and understand the following information before using this application
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Main Disclaimer Alert */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">IMPORTANT DISCLAIMER</h3>
                <p className="text-red-700">
                  This application is for educational and informational purposes only. 
                  It is not intended as financial advice, investment advice, or trading advice. 
                  Please consult with a qualified financial advisor before making any investment decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Educational Purpose Notice */}
          <Card className="p-6 border-yellow-200 bg-yellow-50">
            <div className="flex items-start space-x-3">
              <Info className="h-6 w-6 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Educational Purpose Only</h3>
                <p className="text-yellow-700 mb-4">
                  This application is designed for learning about financial markets, trading strategies, 
                  and portfolio management. All data, recommendations, and features are for educational 
                  purposes only and should not be considered as professional financial advice.
                </p>
                <ul className="text-yellow-700 space-y-2">
                  <li>• Learn about market dynamics and trading concepts</li>
                  <li>• Understand portfolio management principles</li>
                  <li>• Practice with simulated trading scenarios</li>
                  <li>• Explore different investment strategies</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Risk Warning */}
          <Card className="p-6 border-orange-200 bg-orange-50">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-orange-600 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-orange-800 mb-3">Investment Risks</h3>
                <ul className="text-orange-700 space-y-2">
                  <li>• All investments carry risk of loss</li>
                  <li>• Past performance does not guarantee future results</li>
                  <li>• Market conditions can change rapidly</li>
                  <li>• You may lose some or all of your invested capital</li>
                  <li>• Only invest money you can afford to lose</li>
                  <li>• Market volatility can be unpredictable</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Professional Advice Notice */}
          <Card className="p-6 border-blue-200 bg-blue-50">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Seek Professional Advice</h3>
                <p className="text-blue-700 mb-3">
                  Before making any investment decisions, please:
                </p>
                <ul className="text-blue-700 space-y-2">
                  <li>• Consult with a qualified financial advisor</li>
                  <li>• Consider your financial situation and risk tolerance</li>
                  <li>• Understand the risks involved</li>
                  <li>• Read all relevant documentation</li>
                  <li>• Never invest based solely on this application</li>
                  <li>• Verify all information independently</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Data Accuracy Notice */}
          <Card className="p-6 border-gray-200 bg-gray-50">
            <div className="flex items-start space-x-3">
              <Info className="h-6 w-6 text-gray-600 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Data Accuracy</h3>
                <p className="text-gray-700 mb-3">
                  While we strive to provide accurate and up-to-date information, we cannot 
                  guarantee the accuracy, completeness, or timeliness of any data or information 
                  provided through this application.
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• Market data may be delayed or inaccurate</li>
                  <li>• Information should be verified from official sources</li>
                  <li>• Past performance does not guarantee future results</li>
                  <li>• Market conditions can change rapidly</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Compliance Notice */}
          <Card className="p-6 border-purple-200 bg-purple-50">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-purple-600 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Regulatory Compliance</h3>
                <p className="text-purple-700 mb-3">
                  This application is not registered with any financial regulatory authority. 
                  We are not licensed to provide financial advice or investment services.
                </p>
                <ul className="text-purple-700 space-y-2">
                  <li>• Not a registered investment advisor</li>
                  <li>• Not licensed to provide financial advice</li>
                  <li>• Users responsible for compliance with applicable laws</li>
                  <li>• Educational tool only, not professional service</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Acceptance Notice */}
          <Card className="p-6 border-green-200 bg-green-50">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Acceptance of Terms</h3>
              <p className="text-green-700 mb-4">
                By using this application, you acknowledge that you have read, understood, 
                and agree to this disclaimer. If you do not agree with any part of this disclaimer, 
                please do not use this application.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="h-4 w-4 mr-2" />
                I Understand and Accept
              </Button>
            </div>
          </Card>

          {/* Footer Notice */}
          <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
            <p>
              <strong>Remember:</strong> This application is for educational purposes only. 
              Always consult with a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPageSimple;
