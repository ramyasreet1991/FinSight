import React, { useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { AlertTriangle, X, Info } from 'lucide-react';

interface DisclaimerBannerProps {
  onDismiss?: () => void;
  persistent?: boolean;
}

const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ 
  onDismiss, 
  persistent = false 
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  if (isDismissed && !persistent) {
    return null;
  }

  return (
    <Alert className="border-red-200 bg-red-50 mb-4">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800 flex items-center justify-between">
        <div className="flex-1">
          <strong>EDUCATIONAL PURPOSE ONLY:</strong> This application is for learning about financial markets. 
          Not financial advice. Consult a qualified financial advisor before making investment decisions.
        </div>
        {!persistent && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDismiss}
            className="text-red-600 hover:text-red-800 hover:bg-red-100"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default DisclaimerBanner;
