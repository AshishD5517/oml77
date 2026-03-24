
import React, { useState, useEffect } from 'react';
import type { LoanRequest } from '../types';
import { LoanStatus } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import MakeOfferModal from '../components/MakeOfferModal';
import { useAuth } from '../App';
import { 
    LayoutDashboard, 
    UserCircle, 
    FileText, 
    List, 
    Users, 
    Activity, 
    MessageSquare, 
    Bell, 
    Star, 
    Phone, 
    LogOut,
    Menu,
    X,
    Briefcase,
    Settings,
    DollarSign
} from 'lucide-react';


const mockLoanRequests: LoanRequest[] = [
    { id: 'loan-101', borrowerId: 'user-001', borrowerName: 'Michael Brown', amount: 1500000, purpose: 'Home Loan', term: 48, interestRate: 6.8, status: LoanStatus.PENDING, dateRequested: '2023-10-25', creditScore: 750 },
    { id: 'loan-102', borrowerId: 'user-002', borrowerName: 'Sarah Johnson', amount: 2000000, purpose: 'Mortgage Loan', term: 60, interestRate: 7.5, status: LoanStatus.PENDING, dateRequested: '2023-10-24', creditScore: 680 },
    { id: 'loan-103', borrowerId: 'user-003', borrowerName: 'Kevin Lee', amount: 7500000, purpose: 'Business Loan', term: 120, interestRate: 8.1, status: LoanStatus.PENDING, dateRequested: '2023-10-22', creditScore: 780 },
    { id: 'loan-104', borrowerId: 'user-004', borrowerName: 'Jessica Williams', amount: 800000, purpose: 'Gold Loan', term: 24, interestRate: 9.0, status: LoanStatus.PENDING, dateRequested: '2023-10-21', creditScore: 640 },
    { id: 'loan-105', borrowerId: 'user-005', borrowerName: 'David Chen', amount: 3000000, purpose: 'Vehicle Loan', term: 72, interestRate: 5.2, status: LoanStatus.PENDING, dateRequested: '2023-10-20', creditScore: 810 },
];

const chartData = [
  { name: 'Home', value: 1 },
  { name: 'Debt', value: 1 },
  { name: 'Business', value: 1 },
  { name: 'Medical', value: 1 },
  { name: 'Auto', value: 1 },
];
{/* Updated COLORS array to use new primary green #16a34a */}
const COLORS = ['#16a34a', '#facc15', '#0088FE', '#FF8042', '#82ca9d'];

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
    const { user, logout } = useAuth();
    const [loanRequests, setLoanRequests] = useState<LoanRequest[]>(mockLoanRequests);
    // Removed artificial loading state to make the dashboard instant
    const [isLoading, setIsLoading] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<LoanRequest | null>(null);
    const [offeredRequestIds, setOfferedRequestIds] = useState<string[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');

    const applicationsReceived = loanRequests.length;
    const applicationsInProcess = loanRequests.filter(req => req.status === LoanStatus.PENDING || req.status === LoanStatus.OFFERS_RECEIVED || req.status === LoanStatus.APPROVED).length;
    const applicationsDisbursed = loanRequests.filter(req => req.status === LoanStatus.FUNDED).length;
    const applicationsRejected = loanRequests.filter(req => req.status === LoanStatus.REJECTED).length;

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'all-loan-leads', label: 'All Loan leads', icon: <List size={20} /> },
        { id: 'all-unmasked-leads', label: 'All Unmasked Leads', icon: <Users size={20} /> },
        { id: 'messaging', label: 'Messaging', icon: <MessageSquare size={20} /> },
        { id: 'profile', label: 'Update Profile', icon: <UserCircle size={20} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
        { id: 'commission', label: 'Commission', icon: <DollarSign size={20} /> },
        { id: 'user-enquiry', label: 'User Enquiry', icon: <FileText size={20} /> },
        { id: 'sub-user', label: 'Sub User', icon: <Users size={20} /> },
        { id: 'reviews', label: 'Reviews', icon: <Star size={20} /> },
        { id: 'help', label: 'Help Centre', icon: <Phone size={20} /> },
        { id: 'website-setting', label: 'Website Setting', icon: <Settings size={20} /> },
        { id: 'logout', label: 'Logout', icon: <LogOut size={20} />, action: logout },
    ];

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
        <div className="min-h-screen bg-gray-50 flex flex-col font-poppins">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={`
                    fixed lg:static inset-y-0 left-0 z-50
                    w-64 bg-white border-r border-gray-200 shadow-sm
                    transform transition-transform duration-300 ease-in-out
                    flex flex-col
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <div className="p-6 flex justify-between items-center lg:hidden">
                        <span className="font-bold text-xl text-secondary">Menu</span>
                        <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-primary">
                            <X size={24} />
                        </button>
                    </div>
                    
                    <nav className="flex-1 overflow-y-auto py-4">
                        <ul className="space-y-1 px-3">
                            {sidebarItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => {
                                            if (item.action) {
                                                item.action();
                                            } else {
                                                setActiveTab(item.id);
                                            }
                                            setIsSidebarOpen(false);
                                        }}
                                        className={`
                                            w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                                            ${activeTab === item.id && !item.action
                                                ? 'bg-primary text-white shadow-md' 
                                                : 'text-gray-600 hover:bg-primary-light hover:text-primary'
                                            }
                                        `}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
                        {isOfferModalOpen && selectedLoan && (
                            <MakeOfferModal 
                                loanRequest={selectedLoan}
                                onClose={handleCloseOfferModal}
                                onSubmit={() => handleOfferSubmit(selectedLoan.id)}
                            />
                        )}

                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center space-x-4">
                                <button 
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="lg:hidden p-2 text-gray-600 hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
                                >
                                    <Menu size={24} />
                                </button>
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-secondary">
                                        {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {activeTab === 'dashboard' ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
                                    <StatCard 
                                        title="Application Received" 
                                        value={applicationsReceived.toString()} 
                                        icon={<Briefcase className="h-6 w-6 text-white" />} 
                                        color="bg-primary" 
                                    />
                                    <StatCard 
                                        title="Application In Process" 
                                        value={applicationsInProcess.toString()} 
                                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} 
                                        color="bg-yellow-500" 
                                    />
                                    <StatCard 
                                        title="Application Disbursed" 
                                        value={applicationsDisbursed.toString()} 
                                        icon={<DollarSign className="h-6 w-6 text-white" />} 
                                        color="bg-green-500" 
                                    />
                                    <StatCard 
                                        title="Application Rejected" 
                                        value={applicationsRejected.toString()} 
                                        icon={<X className="h-6 w-6 text-white" />} 
                                        color="bg-red-500" 
                                    />
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100">
                                        <h2 className="text-xl font-bold text-secondary">Lead Activity</h2>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                                                    <th className="p-4 font-medium">Borrower Name</th>
                                                    <th className="p-4 font-medium">Amount</th>
                                                    <th className="p-4 font-medium">Purpose</th>
                                                    <th className="p-4 font-medium">Status</th>
                                                    <th className="p-4 font-medium">Date</th>
                                                    <th className="p-4 font-medium text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {loanRequests.slice(0, 1).map((req) => (
                                                    <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="p-4 text-sm font-medium text-secondary">{req.borrowerName}</td>
                                                        <td className="p-4 text-sm text-gray-600">{formatCurrency(req.amount)}</td>
                                                        <td className="p-4 text-sm text-gray-600">{req.purpose}</td>
                                                        <td className="p-4 text-sm">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                req.status === LoanStatus.APPROVED ? 'bg-green-100 text-green-700' :
                                                                req.status === LoanStatus.REJECTED ? 'bg-red-100 text-red-700' :
                                                                req.status === LoanStatus.FUNDED ? 'bg-blue-100 text-blue-700' :
                                                                'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                                {req.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-600">{new Date(req.dateRequested).toLocaleDateString()}</td>
                                                        <td className="p-4 text-sm text-right">
                                                            <button 
                                                                onClick={() => handleOpenOfferModal(req)}
                                                                className="text-primary hover:text-primary-dark font-medium transition-colors"
                                                            >
                                                                View Details
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {loanRequests.length === 0 && (
                                                    <tr>
                                                        <td colSpan={6} className="p-8 text-center text-gray-500">
                                                            No recent lead activity found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100">
                                        <h2 className="text-xl font-bold text-secondary">Loan Applications Tracker Status</h2>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            {[
                                                { label: 'Loan Submitted', accent: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
                                                { label: 'Call Verification Done', accent: 'bg-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100' },
                                                { label: 'Aadhar/PAN Verified', accent: 'bg-purple-500', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' },
                                                { label: 'CIBIL Score Verified', accent: 'bg-pink-500', bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-100' },
                                                { label: 'Documents Collection', accent: 'bg-orange-500', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100' },
                                                { label: 'Filed to Bank/NBFC', accent: 'bg-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-100' },
                                                { label: 'Loan Sanctioned', accent: 'bg-lime-500', bg: 'bg-lime-50', text: 'text-lime-700', border: 'border-lime-100' },
                                                { label: 'Disburse In Process', accent: 'bg-teal-500', bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-100' },
                                                { label: 'Disburse Successful', accent: 'bg-green-500', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100' },
                                            ].map((status, index) => (
                                                <div key={index} className={`relative p-5 rounded-xl border ${status.bg} ${status.border} shadow-sm flex flex-col overflow-hidden transition-all hover:shadow-md hover:-translate-y-1`}>
                                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${status.accent}`}></div>
                                                    <div className={`text-3xl font-bold mb-1 ${status.text}`}>0</div>
                                                    <div className={`font-medium text-sm leading-snug ${status.text} opacity-80`}>{status.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
                                <div className="w-16 h-16 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    {sidebarItems.find(item => item.id === activeTab)?.icon}
                                </div>
                                <h2 className="text-xl font-bold text-secondary mb-2">
                                    {sidebarItems.find(item => item.id === activeTab)?.label}
                                </h2>
                                <p className="text-gray-500">This section is currently under development.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AgentDashboard;
