import React from 'react';
import EMICalculator from '../components/EMICalculator';

const EMICalculatorScreen: React.FC = () => {
    return (
        <section id="emi-calculator-page" className="relative py-24 bg-white">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-secondary">EMI Calculator</h1>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Plan your finances with our easy-to-use tool. Estimate your Equated Monthly Installment (EMI) to make informed decisions about your loan.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <EMICalculator />
                </div>
            </div>
        </section>
    );
};

export default EMICalculatorScreen;