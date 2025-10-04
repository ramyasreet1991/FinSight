import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  AlertTriangle, 
  Shield, 
  Info, 
  CheckCircle, 
  X,
  ExternalLink
} from 'lucide-react';

interface DisclaimerProps {
  onAccept?: () => void;
  onDecline?: () => void;
  showFullDisclaimer?: boolean;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ 
  onAccept, 
  onDecline, 
  showFullDisclaimer = false 
}) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [showFull, setShowFull] = useState(showFullDisclaimer);

  const handleAccept = () => {
    setIsAccepted(true);
    onAccept?.();
  };

  const handleDecline = () => {
    onDecline?.();
  };

  if (isAccepted && !showFullDisclaimer) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Main Disclaimer Alert */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>IMPORTANT DISCLAIMER:</strong> This application is for educational and informational purposes only. 
          It is not intended as financial advice, investment advice, or trading advice. 
          Please consult with a qualified financial advisor before making any investment decisions.
        </AlertDescription>
      </Alert>

      {/* Educational Purpose Notice */}
      <Card className="p-4 border-yellow-200 bg-yellow-50">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-yellow-800 mb-2">Educational Purpose Only</h3>
            <p className="text-yellow-700 text-sm">
              This application is designed for learning about financial markets, trading strategies, 
              and portfolio management. All data, recommendations, and features are for educational 
              purposes only and should not be considered as professional financial advice.
            </p>
          </div>
        </div>
      </Card>

      {/* Risk Warning */}
      <Card className="p-4 border-orange-200 bg-orange-50">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-orange-800 mb-2">Investment Risks</h3>
            <ul className="text-orange-700 text-sm space-y-1">
              <li>• All investments carry risk of loss</li>
              <li>• Past performance does not guarantee future results</li>
              <li>• Market conditions can change rapidly</li>
              <li>• You may lose some or all of your invested capital</li>
              <li>• Only invest money you can afford to lose</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Professional Advice Notice */}
      <Card className="p-4 border-blue-200 bg-blue-50">
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-800 mb-2">Seek Professional Advice</h3>
            <p className="text-blue-700 text-sm mb-2">
              Before making any investment decisions, please:
            </p>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Consult with a qualified financial advisor</li>
              <li>• Consider your financial situation and risk tolerance</li>
              <li>• Understand the risks involved</li>
              <li>• Read all relevant documentation</li>
              <li>• Never invest based solely on this application</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Full Disclaimer Toggle */}
      {!showFull && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowFull(true)}
            className="text-sm"
          >
            <Info className="h-4 w-4 mr-2" />
            View Full Disclaimer
          </Button>
        </div>
      )}

      {/* Full Disclaimer Content */}
      {showFull && (
        <Card className="p-6 border-gray-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Complete Disclaimer</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowFull(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">1. Educational Purpose</h4>
                <p>
                  This application is designed exclusively for educational and informational purposes. 
                  It provides tools, data, and features to help users learn about financial markets, 
                  trading strategies, and portfolio management concepts. The application is not intended 
                  to provide personalized financial advice or recommendations.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">2. Not Financial Advice</h4>
                <p>
                  Nothing in this application constitutes financial advice, investment advice, 
                  trading advice, or any other form of advice. All information, data, recommendations, 
                  and features are provided for educational purposes only and should not be construed 
                  as professional financial advice.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">3. Investment Risks</h4>
                <p>
                  Investing in financial markets involves substantial risk of loss. Past performance 
                  does not guarantee future results. Market conditions can change rapidly and 
                  unpredictably. You may lose some or all of your invested capital. Only invest 
                  money you can afford to lose.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">4. Professional Consultation Required</h4>
                <p>
                  Before making any investment decisions, you should consult with a qualified 
                  financial advisor who can assess your individual financial situation, risk 
                  tolerance, and investment objectives. This application cannot and does not 
                  provide personalized financial advice.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">5. Data Accuracy</h4>
                <p>
                  While we strive to provide accurate and up-to-date information, we cannot 
                  guarantee the accuracy, completeness, or timeliness of any data or information 
                  provided through this application. Market data may be delayed or inaccurate.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">6. No Warranty</h4>
                <p>
                  This application is provided "as is" without any warranties, express or implied. 
                  We disclaim all warranties, including but not limited to warranties of merchantability, 
                  fitness for a particular purpose, and non-infringement.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">7. Limitation of Liability</h4>
                <p>
                  In no event shall we be liable for any direct, indirect, incidental, special, 
                  consequential, or punitive damages arising out of or relating to your use of 
                  this application, including but not limited to investment losses.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">8. Regulatory Compliance</h4>
                <p>
                  This application is not registered with any financial regulatory authority. 
                  We are not licensed to provide financial advice or investment services. 
                  Users are responsible for ensuring compliance with applicable laws and regulations.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                By using this application, you acknowledge that you have read, understood, 
                and agree to this disclaimer. If you do not agree with any part of this disclaimer, 
                please do not use this application.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Acceptance Buttons */}
      {onAccept && onDecline && (
        <div className="flex items-center justify-center space-x-4 pt-4">
          <Button 
            variant="outline" 
            onClick={handleDecline}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Decline
          </Button>
          <Button 
            onClick={handleAccept}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            I Understand & Accept
          </Button>
        </div>
      )}

      {/* Footer Notice */}
      <div className="text-center text-xs text-gray-500 pt-2">
        <p>
          This application is for educational purposes only. 
          <span className="font-semibold"> Always consult with a qualified financial advisor before making investment decisions.</span>
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
