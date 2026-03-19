import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CheckCircle2, Lock, ChevronRight, ShieldCheck, TrendingDown, Coins, FileText, Star } from 'lucide-react';

const PlanAndApplySection: React.FC = () => {
    const [amount, setAmount] = useState(500000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(5);
    const [eligibilityAmount, setEligibilityAmount] = useState("5,00,000");

    // EMI Calculation
    const principal = amount;
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayable = emi * months;
    const totalInterest = totalPayable - principal;

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
    const formatCurrencyWithDecimals = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

    const chartData = [
        { name: 'Principal', value: principal },
        { name: 'Interest', value: totalInterest },
    ];
    const COLORS = ['#74B559', '#FFBB28'];

    return (
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#f4f7f4] to-[#e6eee6]">
            {/* Background Texture/Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-200/40 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/40 rounded-full blur-[100px]"></div>
                <div className="absolute top-[40%] left-[50%] w-[50%] h-[50%] bg-yellow-100/30 rounded-full blur-[120px] -translate-x-1/2"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#3a4750] mb-4">Plan & Apply</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Calculate your EMI and find the perfect loan tailored to your needs in minutes.</p>
                </div>

                {/* Progress Bar */}
                <div className="max-w-4xl mx-auto mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-[#c5d8c5] -translate-y-1/2 z-0"></div>
                    <div className="flex justify-between relative z-10 px-8 md:px-24">
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold border-4 border-[#e6eee6] shadow-md">1</div>
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold border-4 border-[#e6eee6] shadow-md">2</div>
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold border-4 border-[#e6eee6] shadow-md relative">
                            3
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3 Steps Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
                    
                    {/* Card 1: Calculate Your EMI */}
                    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</div>
                            <h3 className="text-lg font-bold text-[#3a4750]">Calculate Your EMI</h3>
                        </div>

                        <div className="flex-grow">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-1/2 space-y-6">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-2">Loan Amount</label>
                                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary-dark rounded-md text-sm font-semibold mb-2 border border-primary/20">
                                            {formatCurrency(amount)}
                                        </div>
                                        <input type="range" min="50000" max="100000000" step="100000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                                    </div>
                                </div>
                                <div className="w-1/2 h-24 flex justify-end items-center">
                                    <div className="w-24 h-24">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={chartData} cx="50%" cy="50%" innerRadius={25} outerRadius={40} fill="#8884d8" paddingAngle={2} dataKey="value" stroke="none">
                                                    {chartData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm text-gray-600">Interest Rate (% p.a.)</label>
                                        <div className="px-3 py-1 bg-primary/10 text-primary-dark rounded-md text-sm font-semibold border border-primary/20">
                                            {rate.toFixed(1)}%
                                        </div>
                                    </div>
                                    <input type="range" min="1" max="20" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm text-gray-600">Loan Tenure (Years)</label>
                                        <div className="px-3 py-1 bg-primary/10 text-primary-dark rounded-md text-sm font-semibold border border-primary/20">
                                            {tenure} Years
                                        </div>
                                    </div>
                                    <input type="range" min="1" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                                </div>
                            </div>

                            <div className="bg-white/50 rounded-2xl p-4 mb-4 border border-white/60">
                                <div className="text-right mb-4">
                                    <p className="text-3xl font-bold text-primary">{formatCurrency(emi)}</p>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Principal</span>
                                        <span className="font-semibold text-gray-700">{formatCurrencyWithDecimals(principal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Total Interest</span>
                                        <span className="font-semibold text-gray-700">{formatCurrencyWithDecimals(totalInterest)}</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-gray-200/50">
                                        <span className="text-gray-500">Total Payable</span>
                                        <span className="font-semibold text-gray-700">{formatCurrencyWithDecimals(totalPayable)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-primary font-medium pt-4 border-t border-gray-200/50 mt-auto">
                            <span>Step 1: Calculate Your EMI</span>
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Card 2: Check Eligibility */}
                    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</div>
                            <h3 className="text-lg font-bold text-[#3a4750]">Check Eligibility</h3>
                        </div>

                        <div className="flex-grow space-y-4">
                            <h4 className="font-semibold text-[#3a4750] text-lg">Check Eligibility</h4>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 text-primary" /> Select Location
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 text-primary" /> Select Loan Type
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="relative">
                                    <select className="w-full bg-white/80 border border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 appearance-none">
                                        <option value="">Select Location</option>
                                        <option value="mumbai">Mumbai</option>
                                        <option value="delhi">Delhi</option>
                                        <option value="bangalore">Bangalore</option>
                                        <option value="hyderabad">Hyderabad</option>
                                        <option value="chennai">Chennai</option>
                                        <option value="kolkata">Kolkata</option>
                                        <option value="pune">Pune</option>
                                        <option value="ahmedabad">Ahmedabad</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                                <div className="relative">
                                    <select className="w-full bg-white/80 border border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 appearance-none">
                                        <option value="">Select Loan Type</option>
                                        <option value="personal">Personal Loan</option>
                                        <option value="home">Home Loan</option>
                                        <option value="car">Car Loan</option>
                                        <option value="education">Education Loan</option>
                                        <option value="business">Business Loan</option>
                                        <option value="gold">Gold Loan</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                        ₹
                                    </div>
                                    <input 
                                        type="text" 
                                        className="bg-white/80 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-8 p-2.5" 
                                        value={eligibilityAmount} 
                                        onChange={(e) => setEligibilityAmount(e.target.value)} 
                                        placeholder="Enter amount"
                                    />
                                </div>
                            </div>

                            <button className="w-full text-white bg-primary hover:bg-primary-dark font-medium rounded-lg text-sm px-5 py-3 text-center shadow-md transition-all">
                                Check Eligibility
                            </button>
                            
                            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                                <Lock className="w-3 h-3" /> Secure & hassle-free
                            </div>

                            <div className="flex justify-center items-center gap-4 pt-2 opacity-70">
                                <span className="font-bold text-blue-800 text-sm">HDFC BANK</span>
                                <span className="font-bold text-orange-600 text-sm italic">ICICI Bank</span>
                                <span className="font-bold text-red-700 text-sm">AXIS BANK</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-gray-500 font-medium pt-4 border-t border-gray-200/50 mt-auto">
                            <span>Step 2: Check Eligibility</span>
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Card 3: Get Loan Instantly */}
                    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</div>
                            <h3 className="text-lg font-bold text-[#3a4750]">Get Loan Instantly</h3>
                        </div>

                        <div className="flex-grow space-y-6">
                            <p className="text-[#3a4750] font-medium">Get the best loan offers personalized just for you.</p>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                    <div className="bg-primary rounded-full p-0.5"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                                    Instant Offer
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                    <div className="bg-primary rounded-full p-0.5"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                                    Competitive Interest Rates
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                    <div className="bg-primary rounded-full p-0.5"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                                    ~24 Hours Quick Disbursal
                                </div>
                            </div>

                            <div className="bg-white/50 rounded-2xl p-4 border border-white/60">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex -space-x-2">
                                        <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="User" />
                                        <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="User" />
                                        <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="User" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-blue-600">SBI</span>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-800">4.8/5</div>
                                            <div className="flex text-yellow-400 text-xs">
                                                <Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 text-center">Trusted by <span className="font-bold text-gray-700">10,000+</span> happy customers</p>
                            </div>

                            <button className="w-full text-white bg-primary hover:bg-primary-dark font-medium rounded-lg text-sm px-5 py-3 text-center shadow-md transition-all">
                                Get Loan Now
                            </button>
                            
                            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                                <Lock className="w-3 h-3" /> Secure & hassle-free
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-primary font-medium pt-4 border-t border-gray-200/50 mt-auto">
                            <span>Step 3: Get Loan Instantly</span>
                        </div>
                    </div>

                </div>

                {/* Why Choose Us */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-[#3a4750] mb-8">Why Choose Us?</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50 flex flex-col items-center justify-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold text-gray-800 text-sm mb-2">Fast Approval</h4>
                            <div className="flex text-yellow-400">
                                <Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" />
                            </div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50 flex flex-col items-center justify-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                                <TrendingDown className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold text-gray-800 text-sm text-center">Lowest Interest<br/>Rates</h4>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50 flex flex-col items-center justify-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                                <Coins className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold text-gray-800 text-sm text-center">Flexible Repayment</h4>
                            <div className="mt-1 text-primary"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path></svg></div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50 flex flex-col items-center justify-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold text-gray-800 text-sm text-center mb-2">Minimal Documentation</h4>
                            <div className="flex text-yellow-400">
                                <Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center items-center gap-6 mt-8 opacity-70">
                        <span className="font-bold text-blue-800 text-lg">HDFC BANK</span>
                        <span className="font-bold text-orange-600 text-lg italic">ICICI Bank</span>
                        <span className="font-bold text-blue-600 text-lg">SBI</span>
                    </div>
                </div>

                {/* Bottom Banner */}
                <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-sm text-center mt-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-md">Apply for a Loan in 2 Minutes, Hassle-Free!</h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="text-white bg-primary hover:bg-primary-dark font-bold rounded-xl text-lg px-8 py-3 shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2">
                            Get Started <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-1 text-sm text-gray-600 bg-white/50 px-4 py-2 rounded-full">
                            <Lock className="w-4 h-4" /> Secure & hassle-free
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PlanAndApplySection;
