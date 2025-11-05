
import React, { useState, useEffect } from 'react';
import type { LoanRequest, Offer } from '../types';
import { LoanStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ApplyLoanModal from '../components/ApplyLoanModal';
import ContactUsSection from '../components/ContactUsSection';

const mockOffers: Offer[] = [
    { id: 'offer-1', agentId: 'agent-456', agentName: 'Jane Smith', agentAvatarUrl: 'https://i.pravatar.cc/150?u=jane', loanRequestId: 'loan-1', offeredRate: 5.2, processingFee: 5000, message: "Hi Alex, I can offer a competitive rate for your home improvement project. My processing is fast and transparent.", dateOffered: '2023-10-27' },
    { id: 'offer-2', agentId: 'agent-789', agentName: 'Mike Johnson', agentAvatarUrl: 'https://i.pravatar.cc/150?u=mike', loanRequestId: 'loan-1', offeredRate: 5.4, processingFee: 4500, message: "Approved for the full amount. Let's connect to discuss the next steps.", dateOffered: '2023-10-27' },
];


const mockLoanRequests: LoanRequest[] = [
    { id: 'loan-1', borrowerId: 'user-123', borrowerName: 'Alex Doe', amount: 2500000, purpose: 'Home Improvement', term: 60, interestRate: 5.5, status: LoanStatus.OFFERS_RECEIVED, dateRequested: '2023-10-26', creditScore: 720, offers: mockOffers },
    { id: 'loan-2', borrowerId: 'user-123', borrowerName: 'Alex Doe', amount: 500000, purpose: 'Debt Consolidation', term: 36, interestRate: 8.2, status: LoanStatus.APPROVED, dateRequested: '2023-09-15', creditScore: 720 },
    { id: 'loan-3', borrowerId: 'user-123', borrowerName: 'Alex Doe', amount: 5000000, purpose: 'Business Startup', term: 120, interestRate: 6.1, status: LoanStatus.FUNDED, dateRequested: '2023-05-01', creditScore: 720 },
    { id: 'loan-4', borrowerId: 'user-123', borrowerName: 'Alex Doe', amount: 1000000, purpose: 'Car Purchase', term: 48, interestRate: 4.9, status: LoanStatus.REJECTED, dateRequested: '2023-04-20', creditScore: 720 },
];

const chartData = [
  { name: 'Offers', value: 2500000, fill: '#FFBB28' },
  { name: 'Approved', value: 500000, fill: '#82ca9d' },
  { name: 'Funded', value: 5000000, fill: '#00C49F' },
];

const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-secondary">{value}</p>
        </div>
    </div>
);

const LoanStatusBadge: React.FC<{ status: LoanStatus }> = ({ status }) => {
    const statusStyles: { [key in LoanStatus]: string } = {
        [LoanStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
        [LoanStatus.OFFERS_RECEIVED]: 'bg-blue-100 text-blue-800',
        [LoanStatus.APPROVED]: 'bg-primary-light text-primary-dark',
        [LoanStatus.FUNDED]: 'bg-green-100 text-green-800',
        [LoanStatus.REJECTED]: 'bg-red-100 text-red-800',
    };
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>{status}</span>;
}

const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => (
    <div className="bg-white p-4 rounded-lg border-2 border-primary-light transform transition-transform hover:scale-[1.02] hover:shadow-lg">
        <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
                <img src={offer.agentAvatarUrl} alt={offer.agentName} className="h-12 w-12 rounded-full border-2 border-accent" />
                <div>
                    <p className="font-bold text-secondary">{offer.agentName}</p>
                    <p className="text-xs text-gray-500">Offer Received: {offer.dateOffered}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-lg font-bold text-primary">{offer.offeredRate.toFixed(2)}%</p>
                <p className="text-xs text-gray-500">Interest Rate</p>
            </div>
        </div>
        <p className="text-sm text-gray-700 my-4 p-3 bg-gray-50 rounded-md italic">"{offer.message}"</p>
        <div className="flex justify-between items-center text-sm">
            <p className="text-gray-600">Processing Fee: <span className="font-semibold text-secondary">{formatCurrency(offer.processingFee)}</span></p>
            <div className="flex space-x-2">
                <button className="px-4 py-2 text-xs font-bold text-red-700 bg-red-100 rounded-full hover:bg-red-200 transition">Decline</button>
                <button className="px-4 py-2 text-xs font-bold text-white bg-primary rounded-full hover:bg-primary-dark transition">Accept Offer</button>
            </div>
        </div>
    </div>
);


const LoanRequestCard: React.FC<{ request: LoanRequest; isExpanded: boolean; onToggle: () => void; }> = ({ request, isExpanded, onToggle }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-shadow duration-300 shadow-md">
        <div onClick={onToggle} className="p-5 grid grid-cols-4 gap-4 items-center cursor-pointer hover:bg-gray-50">
            <div className="col-span-4 sm:col-span-1">
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-bold text-lg text-secondary">{formatCurrency(request.amount)}</p>
            </div>
            <div className="col-span-4 sm:col-span-1">
                <p className="text-sm text-gray-500">Purpose</p>
                <p className="font-medium text-gray-800">{request.purpose}</p>
            </div>
            <div className="col-span-2 sm:col-span-1 text-left sm:text-center">
                 <LoanStatusBadge status={request.status} />
            </div>
            <div className="col-span-2 sm:col-span-1 text-left sm:text-right flex items-center justify-end space-x-2">
                {request.offers && request.offers.length > 0 && (
                     <span className="px-3 py-1 text-xs font-bold text-accent-dark bg-accent/20 rounded-full">{request.offers.length} Offer(s)</span>
                )}
                 <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
        </div>
        {isExpanded && (
            <div className="bg-primary-light p-4 border-t-2 border-primary">
                <h3 className="text-sm font-bold text-secondary mb-3">Offers Received</h3>
                <div className="space-y-3">
                    {request.offers && request.offers.length > 0 ? (
                        request.offers.map(offer => <OfferCard key={offer.id} offer={offer} />)
                    ) : (
                        <p className="text-sm text-gray-600 text-center py-4">No offers received yet.</p>
                    )}
                </div>
            </div>
        )}
    </div>
);


// --- SKELETON COMPONENTS ---
const StatCardSkeleton: React.FC = () => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 animate-pulse">
        <div className="h-12 w-12 rounded-full bg-gray-300"></div>
        <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
    </div>
);

const LoanRequestCardSkeleton: React.FC = () => (
    <div className="bg-white p-5 rounded-lg border border-gray-200 grid grid-cols-4 gap-4 items-center animate-pulse">
        <div className="col-span-4 sm:col-span-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="col-span-4 sm:col-span-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-5 bg-gray-300 rounded w-full"></div>
        </div>
        <div className="col-span-2 sm:col-span-1">
             <div className="h-6 bg-gray-300 rounded-full w-20 mx-auto sm:mx-0"></div>
        </div>
        <div className="col-span-2 sm:col-span-1 text-right">
             <div className="h-4 bg-gray-300 rounded w-24 ml-auto"></div>
        </div>
    </div>
);

const BorrowerDashboardSkeleton: React.FC = () => (
    <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
            <div className="h-9 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            <div className="h-12 bg-gray-300 rounded-lg w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md space-y-4">
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>
                <LoanRequestCardSkeleton />
                <LoanRequestCardSkeleton />
                <LoanRequestCardSkeleton />
                <LoanRequestCardSkeleton />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-64 bg-gray-300 rounded"></div>
            </div>
        </div>
    </div>
);

const BorrowerDashboard: React.FC = () => {
    const [loanRequests, setLoanRequests] = useState<LoanRequest[]>(mockLoanRequests);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleToggle = (id: string) => {
        setExpandedRequestId(expandedRequestId === id ? null : id);
    };

    const totalRequested = loanRequests.reduce((sum, req) => sum + req.amount, 0);
    const activeRequests = loanRequests.filter(req => req.status === LoanStatus.PENDING || req.status === LoanStatus.APPROVED || req.status === LoanStatus.OFFERS_RECEIVED).length;
    
    if (isLoading) {
        return <BorrowerDashboardSkeleton />;
    }

    return (
        <>
            <div className="container mx-auto px-6 py-8">
                {isApplyModalOpen && <ApplyLoanModal onClose={() => setIsApplyModalOpen(false)} />}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-secondary">My Dashboard</h1>
                    <button 
                        onClick={() => setIsApplyModalOpen(true)}
                        className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-transform transform hover:scale-105"
                    >
                        New Loan Request
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Requested" value={formatCurrency(totalRequested)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} color="bg-primary" />
                    <StatCard title="Active Requests" value={activeRequests.toString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} color="bg-yellow-500" />
                    <StatCard title="Funded Loans" value={loanRequests.filter(r => r.status === LoanStatus.FUNDED).length.toString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>} color="bg-green-500" />
                    <StatCard title="Avg. Interest Rate" value="6.2%" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} color="bg-purple-500" />
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                         <h2 className="text-xl font-bold text-secondary mb-4">My Loan Requests</h2>
                         <div className="space-y-4">
                            {loanRequests.map(req => (
                                <LoanRequestCard 
                                    key={req.id} 
                                    request={req} 
                                    isExpanded={expandedRequestId === req.id}
                                    onToggle={() => handleToggle(req.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold text-secondary mb-4">Loan Status Breakdown</h2>
                         <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={80} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{fill: 'rgba(230, 240, 255, 0.5)'}} formatter={(value: number) => formatCurrency(value)} />
                                <Bar dataKey="value" barSize={20} radius={[0, 10, 10, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <ContactUsSection />
        </>
    );
};

export default BorrowerDashboard;
