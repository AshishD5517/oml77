
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const EMICalculator: React.FC = () => {
    const [amount, setAmount] = useState(500000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(5); // in years

    const { emi, totalPayable, totalInterest } = useMemo(() => {
        const principal = amount;
        const monthlyRate = rate / 12 / 100;
        const months = tenure * 12;

        if (principal <= 0 || monthlyRate <= 0 || months <= 0) {
            return { emi: 0, totalPayable: 0, totalInterest: 0 };
        }

        const emiCalc = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        const totalPayableCalc = emiCalc * months;
        const totalInterestCalc = totalPayableCalc - principal;

        return {
            emi: emiCalc,
            totalPayable: totalPayableCalc,
            totalInterest: totalInterestCalc,
        };
    }, [amount, rate, tenure]);

    const chartData = [
        { name: 'Principal', value: amount },
        { name: 'Interest', value: totalInterest },
    ];
    const COLORS = ['#00C49F', '#FFBB28'];

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

    return (
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200/80 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Calculator Inputs */}
            <div className="lg:col-span-3 space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-semibold text-secondary">Loan Amount</label>
                        <span className="px-3 py-1 text-sm rounded-md bg-primary-light text-primary font-bold">{formatCurrency(amount)}</span>
                    </div>
                    <input type="range" min="50000" max="10000000" step="10000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
                 <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-semibold text-secondary">Interest Rate (% p.a.)</label>
                        <span className="px-3 py-1 text-sm rounded-md bg-primary-light text-primary font-bold">{rate.toFixed(1)}%</span>
                    </div>
                    <input type="range" min="1" max="20" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
                 <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-semibold text-secondary">Loan Tenure (Years)</label>
                        <span className="px-3 py-1 text-sm rounded-md bg-primary-light text-primary font-bold">{tenure} Years</span>
                    </div>
                    <input type="range" min="1" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
            </div>

            {/* Results & Chart */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center text-center lg:border-l lg:border-gray-200/80 lg:pl-8">
                <div className="w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                                {chartData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="w-full mt-4">
                     <p className="text-gray-600">Your Monthly Payment (EMI)</p>
                     <p className="text-4xl font-extrabold text-primary mb-4">{formatCurrency(emi)}</p>
                     <div className="w-full space-y-2 border-t pt-4">
                        <div className="w-full flex justify-between text-sm text-gray-500">
                            <span>Principal Amount</span>
                            <span className="font-semibold text-secondary">{formatCurrency(amount)}</span>
                        </div>
                        <div className="w-full flex justify-between text-sm text-gray-500">
                            <span>Total Interest</span>
                            <span className="font-semibold text-secondary">{formatCurrency(totalInterest)}</span>
                        </div>
                         <div className="w-full flex justify-between text-sm text-gray-500 font-bold mt-2">
                            <span>Total Payable</span>
                            <span className="font-semibold text-secondary">{formatCurrency(totalPayable)}</span>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
}

export default EMICalculator;
