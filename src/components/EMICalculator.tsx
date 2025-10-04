import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Calculator, 
  Home, 
  Car, 
  GraduationCap, 
  CreditCard,
  TrendingUp,
  TrendingDown,
  Info,
  AlertTriangle,
  DollarSign,
  Percent,
  Calendar,
  PieChart,
  BarChart3,
  Target,
  CheckCircle
} from 'lucide-react';

interface LoanDetails {
  principal: number;
  interestRate: number;
  tenure: number;
  emi: number;
  totalAmount: number;
  totalInterest: number;
}

interface LoanType {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  minAmount: number;
  maxAmount: number;
  minRate: number;
  maxRate: number;
  minTenure: number;
  maxTenure: number;
  description: string;
  features: string[];
}

const EMICalculator: React.FC = () => {
  const [selectedLoanType, setSelectedLoanType] = useState<string>('home');
  const [principal, setPrincipal] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);

  const loanTypes: LoanType[] = [
    {
      id: 'home',
      name: 'Home Loan',
      icon: Home,
      minAmount: 100000,
      maxAmount: 10000000,
      minRate: 6.5,
      maxRate: 12.0,
      minTenure: 5,
      maxTenure: 30,
      description: 'Long-term loan for purchasing or constructing a house',
      features: ['Tax benefits under Section 24', 'Low interest rates', 'Long repayment period', 'Prepayment options']
    },
    {
      id: 'car',
      name: 'Car Loan',
      icon: Car,
      minAmount: 50000,
      maxAmount: 2000000,
      minRate: 7.0,
      maxRate: 15.0,
      minTenure: 1,
      maxTenure: 7,
      description: 'Loan for purchasing new or used vehicles',
      features: ['Quick approval', 'Flexible tenure', 'No prepayment charges', 'Insurance options']
    },
    {
      id: 'personal',
      name: 'Personal Loan',
      icon: CreditCard,
      minAmount: 10000,
      maxAmount: 5000000,
      minRate: 10.0,
      maxRate: 24.0,
      minTenure: 1,
      maxTenure: 5,
      description: 'Unsecured loan for personal expenses',
      features: ['No collateral required', 'Quick disbursal', 'Flexible usage', 'Higher interest rates']
    },
    {
      id: 'education',
      name: 'Education Loan',
      icon: GraduationCap,
      minAmount: 50000,
      maxAmount: 10000000,
      minRate: 6.0,
      maxRate: 14.0,
      minTenure: 1,
      maxTenure: 15,
      description: 'Loan for higher education expenses',
      features: ['Low interest rates', 'Moratorium period', 'Tax benefits', 'No collateral for small amounts']
    }
  ];

  const calculateEMI = (principal: number, rate: number, tenure: number): LoanDetails => {
    const monthlyRate = rate / (12 * 100);
    const tenureMonths = tenure * 12;
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    
    const totalAmount = emi * tenureMonths;
    const totalInterest = totalAmount - principal;
    
    return {
      principal,
      interestRate: rate,
      tenure,
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    };
  };

  useEffect(() => {
    const currentLoanType = loanTypes.find(loan => loan.id === selectedLoanType);
    if (currentLoanType) {
      setInterestRate(currentLoanType.minRate);
      setPrincipal(currentLoanType.minAmount);
      setTenure(currentLoanType.minTenure);
    }
  }, [selectedLoanType]);

  useEffect(() => {
    const details = calculateEMI(principal, interestRate, tenure);
    setLoanDetails(details);
  }, [principal, interestRate, tenure]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${rate}%`;
  };

  const getLoanTypeIcon = (loanType: string) => {
    const type = loanTypes.find(loan => loan.id === loanType);
    return type ? type.icon : Home;
  };

  const getLoanTypeDetails = (loanType: string) => {
    return loanTypes.find(loan => loan.id === loanType);
  };

  const generateAmortizationSchedule = () => {
    if (!loanDetails) return [];
    
    const schedule = [];
    let remainingPrincipal = loanDetails.principal;
    const monthlyRate = loanDetails.interestRate / (12 * 100);
    
    for (let month = 1; month <= loanDetails.tenure * 12; month++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = loanDetails.emi - interestPayment;
      remainingPrincipal -= principalPayment;
      
      schedule.push({
        month,
        emi: loanDetails.emi,
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(Math.max(0, remainingPrincipal))
      });
    }
    
    return schedule.slice(0, 12); // Show first 12 months
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">EMI Calculator</h2>
          <p className="text-gray-600">Calculate EMI for different types of loans</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calculator className="h-8 w-8 text-blue-600" />
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
              This EMI calculator is for educational purposes only. Not financial advice. 
              Consult a qualified financial advisor before making loan decisions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loan Type Selection */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Select Loan Type</h3>
          <div className="grid grid-cols-2 gap-3">
            {loanTypes.map((loanType) => {
              const IconComponent = loanType.icon;
              return (
                <button
                  key={loanType.id}
                  onClick={() => setSelectedLoanType(loanType.id)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedLoanType === loanType.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-semibold">{loanType.name}</h4>
                      <p className="text-sm text-gray-600">{loanType.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Loan Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Loan Details</h3>
          {getLoanTypeDetails(selectedLoanType) && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  min={getLoanTypeDetails(selectedLoanType)?.minAmount}
                  max={getLoanTypeDetails(selectedLoanType)?.maxAmount}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Range: {formatCurrency(getLoanTypeDetails(selectedLoanType)?.minAmount || 0)} - {formatCurrency(getLoanTypeDetails(selectedLoanType)?.maxAmount || 0)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  min={getLoanTypeDetails(selectedLoanType)?.minRate}
                  max={getLoanTypeDetails(selectedLoanType)?.maxRate}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Range: {getLoanTypeDetails(selectedLoanType)?.minRate}% - {getLoanTypeDetails(selectedLoanType)?.maxRate}%
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenure (Years)
                </label>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  min={getLoanTypeDetails(selectedLoanType)?.minTenure}
                  max={getLoanTypeDetails(selectedLoanType)?.maxTenure}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Range: {getLoanTypeDetails(selectedLoanType)?.minTenure} - {getLoanTypeDetails(selectedLoanType)?.maxTenure} years
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* EMI Results */}
      {loanDetails && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly EMI</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(loanDetails.emi)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(loanDetails.totalAmount)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Interest</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(loanDetails.totalInterest)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Interest Rate</p>
                <p className="text-2xl font-bold text-purple-600">{formatPercentage(loanDetails.interestRate)}</p>
              </div>
              <Percent className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
        </div>
      )}

      {/* Loan Features */}
      {getLoanTypeDetails(selectedLoanType) && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Loan Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getLoanTypeDetails(selectedLoanType)?.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Amortization Schedule */}
      {loanDetails && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Amortization Schedule (First 12 Months)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Month</th>
                  <th className="text-right py-2">EMI</th>
                  <th className="text-right py-2">Principal</th>
                  <th className="text-right py-2">Interest</th>
                  <th className="text-right py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {generateAmortizationSchedule().map((payment) => (
                  <tr key={payment.month} className="border-b">
                    <td className="py-2">{payment.month}</td>
                    <td className="text-right py-2">{formatCurrency(payment.emi)}</td>
                    <td className="text-right py-2">{formatCurrency(payment.principal)}</td>
                    <td className="text-right py-2">{formatCurrency(payment.interest)}</td>
                    <td className="text-right py-2">{formatCurrency(payment.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default EMICalculator;
