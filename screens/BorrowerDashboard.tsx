
import React, { useState, useEffect } from 'react';
import type { LoanRequest, Offer } from '../types';
import { LoanStatus } from '../types';
import { useUI, useAuth } from '../App';
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
    Briefcase
} from 'lucide-react';

const mockOffers: Offer[] = [
    { id: 'offer-1', agentId: 'agent-456', agentName: 'Jane Smith', agentAvatarUrl: 'https://i.pravatar.cc/150?u=jane', loanRequestId: 'loan-1', offeredRate: 5.2, processingFee: 5000, message: "Hi Alex, I can offer a competitive rate for your home improvement project. My processing is fast and transparent.", dateOffered: '2023-10-27' },
    { id: 'offer-2', agentId: 'agent-789', agentName: 'Mike Johnson', agentAvatarUrl: 'https://i.pravatar.cc/150?u=mike', loanRequestId: 'loan-1', offeredRate: 5.4, processingFee: 4500, message: "Approved for the full amount. Let's connect to discuss the next steps.", dateOffered: '2023-10-27' },
];


const mockLoanRequests: LoanRequest[] = [
    { id: 'loan-1', borrowerId: 'user-123', borrowerName: 'Alex Doe', amount: 1000000, purpose: 'Home Loan', term: 60, interestRate: 5.5, status: LoanStatus.REJECTED, dateRequested: '2023-10-26', creditScore: 720, offers: mockOffers },
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

const LoanRequestCard: React.FC<{ request: LoanRequest }> = ({ request }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-shadow duration-300 shadow-md">
        <div className="p-5 flex justify-between items-center">
            <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-bold text-lg text-secondary">{formatCurrency(request.amount)}</p>
            </div>
            <div>
                 <LoanStatusBadge status={request.status} />
            </div>
        </div>
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
    const { user } = useAuth();
    const [loanRequests, setLoanRequests] = useState<LoanRequest[]>(mockLoanRequests);
    const { openApplyModal } = useUI();
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');

    const totalLoans = loanRequests.length;
    const activeLoans = loanRequests.filter(req => req.status === LoanStatus.APPROVED || req.status === LoanStatus.OFFERS_RECEIVED).length;
    const pendingLoans = loanRequests.filter(req => req.status === LoanStatus.PENDING).length;
    const disbursedLoans = loanRequests.filter(req => req.status === LoanStatus.FUNDED).length;
    
    if (isLoading) {
        return <BorrowerDashboardSkeleton />;
    }

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'profile', label: 'Update Your Profile', icon: <UserCircle size={20} /> },
        { id: 'apply', label: 'Apply for Loan', icon: <FileText size={20} />, action: openApplyModal },
        { id: 'unmasked', label: 'Unmasked List', icon: <List size={20} /> },
        { id: 'agents', label: 'Agent Listings', icon: <Users size={20} /> },
        { id: 'active', label: 'Active Loans', icon: <Activity size={20} /> },
        { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
        { id: 'reviews', label: 'Reviews', icon: <Star size={20} /> },
        { id: 'contact', label: 'Get in Touch', icon: <Phone size={20} /> },
    ];

    return (
        <div className="flex min-h-[calc(100vh-80px)] bg-gray-50">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 lg:top-0 left-0 h-full lg:h-[calc(100vh-80px)]
                w-64 bg-white shadow-xl lg:shadow-md z-50 lg:z-0
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                flex flex-col font-poppins
            `}>
                <div className="p-4 flex justify-between items-center lg:hidden border-b border-gray-100">
                    <span className="font-bold text-secondary text-lg tracking-wide">Menu</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-500 hover:text-primary hover:bg-primary-light rounded-lg">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1 px-3">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    if (item.action) {
                                        item.action();
                                    } else {
                                        setActiveTab(item.id);
                                    }
                                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                                }}
                                className={`
                                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm tracking-wide
                                    ${activeTab === item.id && !item.action
                                        ? 'bg-primary text-white shadow-md font-semibold' 
                                        : 'text-gray-600 hover:bg-primary-light hover:text-primary font-medium'
                                    }
                                `}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-100">
                    <button 
                        onClick={() => {
                            // Assuming logout is available via useAuth, let's import it or just redirect and clear storage
                            localStorage.removeItem('mockUser');
                            window.location.href = '/';
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm tracking-wide"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full lg:w-[calc(100%-16rem)] min-w-0">
                <div className="p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-8">
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
                        <button 
                            onClick={openApplyModal}
                            className="hidden sm:flex px-6 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition-all transform hover:-translate-y-0.5"
                        >
                            New Loan Request
                        </button>
                    </div>

                    {activeTab === 'dashboard' ? (
                        <>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
                                <StatCard title="Total Loans" value={totalLoans.toString()} icon={<Briefcase className="h-6 w-6 text-white" />} color="bg-primary" />
                                <StatCard title="Active Loans" value={activeLoans.toString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} color="bg-yellow-500" />
                                <StatCard title="Pending Loans" value={pendingLoans.toString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="bg-purple-500" />
                                <StatCard title="Disbursed Loans" value={disbursedLoans.toString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>} color="bg-green-500" />
                            </div>

                            {/* Main Content Area */}
                            <div className="w-full">
                                <div>
                                     <h2 className="text-xl font-bold text-secondary mb-4">My Loan Requests</h2>
                                     <div className="space-y-4">
                                        {loanRequests.map(req => (
                                            <LoanRequestCard 
                                                key={req.id} 
                                                request={req}
                                            />
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
    );
};

export default BorrowerDashboard;
