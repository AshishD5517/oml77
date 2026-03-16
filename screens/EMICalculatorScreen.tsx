import React, { useState } from 'react';

const EMICalculatorScreen: React.FC = () => {
    const [principal, setPrincipal] = useState<number>(100000);
    const [rate, setRate] = useState<number>(10);
    const [tenure, setTenure] = useState<number>(12);

    const calculateEMI = () => {
        const p = principal;
        const r = rate / (12 * 100);
        const n = tenure;
        if (p === 0 || r === 0 || n === 0) return 0;
        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return Math.round(emi);
    };

    const emi = calculateEMI();
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    return (
        <div className="bg-white font-sans text-gray-700 min-h-screen py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-extrabold text-secondary mb-8 text-center">EMI Calculator</h1>
                
                <div className="bg-gray-50 p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Loan Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    value={principal}
                                    onChange={(e) => setPrincipal(Number(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                                <input
                                    type="range"
                                    min="10000"
                                    max="10000000"
                                    step="10000"
                                    value={principal}
                                    onChange={(e) => setPrincipal(Number(e.target.value))}
                                    className="w-full mt-4 accent-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Interest Rate (%)
                                </label>
                                <input
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    step="0.1"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    className="w-full mt-4 accent-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Loan Tenure (Months)
                                </label>
                                <input
                                    type="number"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                                <input
                                    type="range"
                                    min="1"
                                    max="360"
                                    step="1"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                    className="w-full mt-4 accent-primary"
                                />
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-secondary mb-6 text-center">Your EMI Details</h3>
                            
                            <div className="space-y-6">
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-1">Monthly EMI</p>
                                    <p className="text-4xl font-extrabold text-primary">₹{emi.toLocaleString('en-IN')}</p>
                                </div>
                                
                                <div className="border-t border-gray-100 pt-6">
                                    <div className="flex justify-between mb-4">
                                        <span className="text-gray-600">Principal Amount</span>
                                        <span className="font-bold text-secondary">₹{principal.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-gray-600">Total Interest</span>
                                        <span className="font-bold text-secondary">₹{totalInterest.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between pt-4 border-t border-gray-100">
                                        <span className="text-gray-800 font-bold">Total Amount</span>
                                        <span className="font-bold text-primary">₹{totalAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EMICalculatorScreen;
