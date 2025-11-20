
import React, { useState, useEffect } from 'react';
import type { LoanRequest } from '../types';
import { LoanStatus } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import MakeOfferModal from '../components/MakeOfferModal';


const mockLoanRequests: LoanRequest[] = [
    { id: 'loan-101', borrowerId: 'user-001', borrowerName: 'Michael Brown', amount: 1500000, purpose: 'Home Improvement', term: 48, interestRate: 6.8, status: LoanStatus.PENDING, dateRequested: '2023-10-25', creditScore: 750 },
    { id: 'loan-102', borrowerId: 'user-002', borrowerName: 'Sarah Johnson', amount: 2000000, purpose: 'Debt Consolidation', term: 60, interestRate: 7.5, status: LoanStatus.PENDING, dateRequested: '2023-10-24', creditScore: 680 },
    { id: 'loan-103', borrowerId: 'user-003', borrowerName: 'Kevin Lee', amount: 7500000, purpose: 'Business Startup', term: 120, interestRate: 8.1, status: LoanStatus.PENDING, dateRequested: '2023-10-22', creditScore: 780 },
    { id: 'loan-104', borrowerId: 'user-004', borrowerName: 'Jessica Williams', amount: 800000, purpose: 'Medical Expenses', term: 24, interestRate: 9.0, status: LoanStatus.PENDING, dateRequested: '2023-10-21', creditScore: 640 },
    { id: 'loan-105', borrowerId: 'user-005', borrowerName: 'David Chen', amount: 3000000, purpose: 'Car Purchase', term: 72, interestRate: 5.2, status: LoanStatus.PENDING, dateRequested: '2023-10-20', creditScore: 810 },
];

const chartData = [
  { name: 'Home', value: 1 },
  { name: 'Debt', value: 1 },
  { name: 'Business', value: 1 },
  { name: 'Medical', value: 1 },
  { name: 'Auto', value: 1 },
];
const COLORS = ['#00C49F', '#FFBB28', '#0088FE', '#FF8042', '#82ca9d'];

const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
        <div className="bg-primary-light h-12 w-12 rounded-full flex items-center justify-center text-primary">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-bold text-secondary">{value}</p>
        </div>
    </div>
);


const LoanRequestCard: React.FC<{ request: LoanRequest; onMakeOffer: () => void; hasOffered: boolean; }> = ({ request, onMakeOffer, hasOffered }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col">
        <div className="flex justify-between items-start flex-grow">
            <div>
                <p className="text-lg font-bold text-primary">{formatCurrency(request.amount)}</p>
                <p className="text-sm text-gray-600 font-medium">{request.purpose}</p>
            </div>
             <div className="text-right flex items-center space-x-2 px-3 py-1 rounded-full bg-secondary text-white h-fit">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className="text-sm font-semibold">{request.creditScore}</span>
            </div>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100">
            <button 
                onClick={onMakeOffer}
                disabled={hasOffered}
                className={`w-full py-3 font-bold rounded-lg transition-all transform hover:scale-105 ${
                    hasOffered 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-accent text-secondary hover:opacity-90'
                }`}
            >
                {hasOffered ? 'Offer Sent' : 'Make an Offer'}
            </button>
        </div>
    </div>
);

// --- SKELETON COMPONENTS ---
const StatCardSkeleton: React.FC = () => (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4 animate-pulse">
        <div className="h-12 w-12 rounded-full bg-gray-300"></div>
        <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
        </div>
    </div>
);

const LoanRequestCardSkeleton: React.FC = () => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col animate-pulse">
        <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
                <div className="h-6 bg-gray-300 rounded w-32"></div>
                <div className="h-4 bg-gray-300 rounded w-48"></div>
            </div>
             <div className="h-8 w-20 bg-gray-300 rounded-full"></div>
        </div>
        <div className="border-t border-gray-100 my-4"></div>
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="h-5 bg-gray-300 rounded w-full"></div>
            <div className="h-5 bg-gray-300 rounded w-full"></div>
        </div>
        <div className="mt-auto">
            <div className="w-full h-12 bg-gray-300 rounded-lg"></div>
        </div>
    </div>
);

const AgentDashboardSkeleton: React.FC = () => (
    <div className="container mx-auto px-6 py-8">
        <div className="h-9 bg-gray-300 rounded w-1/3 mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                    <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                    <div className="h-10 bg-gray-300 rounded-lg w-40 animate-pulse"></div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <LoanRequestCardSkeleton />
                    <LoanRequestCardSkeleton />
                    <LoanRequestCardSkeleton />
                    <LoanRequestCardSkeleton />
                </div>
            </div>
            <div className="space-y-8">
                <div className="space-y-4">
                    <div className="h-5 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
                    <div className="h-5 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="h-64 w-64 bg-gray-300 rounded-full mx-auto"></div>
                </div>
            </div>
        </div>
    </div>
);


const AgentDashboard: React.FC = () => {
    const [loanRequests, setLoanRequests] = useState<LoanRequest[]>(mockLoanRequests);
    // Removed artificial loading state to make the dashboard instant
    const [isLoading, setIsLoading] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<LoanRequest | null>(null);
    const [offeredRequestIds, setOfferedRequestIds] = useState<string[]>([]);

    const handleOpenOfferModal = (request: LoanRequest) => {
        setSelectedLoan(request);
        setIsOfferModalOpen(true);
    };

    const handleCloseOfferModal = () => {
        setIsOfferModalOpen(false);
        setSelectedLoan(null);
    };

    const handleOfferSubmit = (loanId: string) => {
        setOfferedRequestIds(prev => [...prev, loanId]);
        handleCloseOfferModal();
    };

    if (isLoading) {
        return <AgentDashboardSkeleton />;
    }
    
    return (
        <>
            {isOfferModalOpen && selectedLoan && (
                <MakeOfferModal 
                    loanRequest={selectedLoan}
                    onClose={handleCloseOfferModal}
                    onSubmit={() => handleOfferSubmit(selectedLoan.id)}
                />
            )}
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-secondary mb-8">Loan Marketplace</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Loan Requests List */}
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-secondary">Available Requests ({loanRequests.length})</h2>
                            <select className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition">
                                <option>Sort by: Newest</option>
                                <option>Sort by: Amount (High-Low)</option>
                                <option>Sort by: Amount (Low-High)</option>
                                <option>Sort by: Credit Score</option>
                            </select>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {loanRequests.map(req => (
                                <LoanRequestCard 
                                    key={req.id} 
                                    request={req} 
                                    onMakeOffer={() => handleOpenOfferModal(req)}
                                    hasOffered={offeredRequestIds.includes(req.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Sidebar with Stats */}
                    <div className="space-y-8">
                         <div className="space-y-4">
                            <h3 className="text-lg font-bold text-secondary">Market Overview</h3>
                            <StatCard title="Total Requests" value={loanRequests.length.toString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>} />
                            <StatCard title="Total Volume" value={formatCurrency(loanRequests.reduce((sum, r) => sum + r.amount, 0))} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
                            <StatCard title="Avg. Credit Score" value={Math.round(loanRequests.reduce((sum, r) => sum + r.creditScore, 0) / loanRequests.length).toString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>} />
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-bold text-secondary mb-4">Requests by Purpose</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AgentDashboard;
