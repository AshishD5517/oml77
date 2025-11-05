import React, { useState } from 'react';
import type { LoanRequest } from '../types';
import { LoanStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ApplyLoanModal from '../components/ApplyLoanModal';
import ContactUsSection from '../components/ContactUsSection';

const mockLoanRequests: LoanRequest[] = [
    { id: 'loan-1', borrowerId: 'user-123', borrowerName: 'Alex Doe', amount: 2500000, purpose: 'Home Improvement', term: 60, interestRate: 5.5, status: LoanStatus.PENDING, dateRequested: '2023-10-26', creditScore: 720 },
    { id: 'loan-2', borrowerId: 'user-123', borrowerName: 'Alex Doe', amount: 500000, purpose: 'Debt Consolidation', term: 36, interestRate: 8.2, status: LoanStatus.APPROVED, dateRequested: '2023-09-15', creditScore: 720 },
    { id: 'loan-3', borrowerId: 'user-123', borrowerName: 'Alex Doe', amount: 5000000, purpose: 'Business Startup', term: 120, interestRate: 6.1, status: LoanStatus.FUNDED, dateRequested: '2023-05-01', creditScore: 720 },
    { id: 'loan-4', borrowerId: 'user-123', borrowerName: 'Alex Doe', amount: 1000000, purpose: 'Car Purchase', term: 48, interestRate: 4.9, status: LoanStatus.REJECTED, dateRequested: '2023-04-20', creditScore: 720 },
];

const chartData = [
  { name: 'Pending', value: 2500000, fill: '#FFBB28' },
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
        [LoanStatus.APPROVED]: 'bg-primary-light text-primary-dark',
        [LoanStatus.FUNDED]: 'bg-green-100 text-green-800',
        [LoanStatus.REJECTED]: 'bg-red-100 text-red-800',
    };
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>{status}</span>;
}

const LoanRequestCard: React.FC<{ request: LoanRequest }> = ({ request }) => (
    <div className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300 grid grid-cols-4 gap-4 items-center">
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
        <div className="col-span-2 sm:col-span-1 text-left sm:text-right">
             <p className="text-sm text-gray-500">{request.dateRequested}</p>
        </div>
    </div>
);


const BorrowerDashboard: React.FC = () => {
    const [loanRequests, setLoanRequests] = useState<LoanRequest[]>(mockLoanRequests);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    const totalRequested = loanRequests.reduce((sum, req) => sum + req.amount, 0);
    const activeRequests = loanRequests.filter(req => req.status === LoanStatus.PENDING || req.status === LoanStatus.APPROVED).length;

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
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold text-secondary mb-4">My Loan Requests</h2>
                        <div className="space-y-4">
                            {loanRequests.map(req => (
                                <LoanRequestCard key={req.id} request={req} />
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
