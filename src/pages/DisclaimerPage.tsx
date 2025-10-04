import React from 'react';
import Disclaimer from '../components/Disclaimer';

const DisclaimerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Important Disclaimer</h1>
          <p className="text-lg text-gray-600">
            Please read and understand the following information before using this application
          </p>
        </div>
        
        <Disclaimer showFullDisclaimer={true} />
      </div>
    </div>
  );
};

export default DisclaimerPage;
