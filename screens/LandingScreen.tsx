
import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';
import EMICalculator from '../components/EMICalculator';
import ContactUsSection from '../components/ContactUsSection';
import { useUI } from '../App';
import { UserRole } from '../types';

// Fix: Replaced JSX.Element with React.ReactNode to resolve namespace issue.
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 border border-gray-100 h-full">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-light text-primary mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-secondary mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);

const StepCard: React.FC<{ number: string; title: string; description: string; icon: React.ReactNode }> = ({ number, title, description, icon }) => (
    <div className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center group hover:-translate-y-2 transition-transform duration-300 z-10">
        <div className="w-16 h-16 mx-auto bg-white border-2 border-primary/20 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-md group-hover:scale-110 transition-transform relative text-primary">
            {icon}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-secondary font-bold text-sm border-2 border-white shadow-sm">
                {number}
            </div>
        </div>
        <h3 className="text-xl font-bold text-secondary mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
            {description}
        </p>
    </div>
);

interface LoanCategoryData {
    title: string;
    imageUrl: string;
    description: string;
    features: string[];
    eligibility: string;
    rates: string;
}

const loanCategories: LoanCategoryData[] = [
    { 
        title: "Personal Loans", 
        imageUrl: "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop",
        description: "A flexible, unsecured loan that you can use for almost any purpose, from consolidating debt to funding a vacation or covering unexpected expenses.",
        features: ["No collateral required", "Quick disbursal within 24 hours", "Flexible tenure up to 5 years", "Minimal documentation"],
        eligibility: "Salaried employees with monthly income > ₹25,000 or Self-employed professionals.",
        rates: "Starting from 10.50% p.a."
    },
    { 
        title: "Home Loans", 
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
        description: "Financing specifically designed to help you purchase, construct, or renovate your dream home with long-term repayment options.",
        features: ["Higher loan amounts", "Long tenure up to 30 years", "Tax benefits under Sec 80C & 24(b)", "Balance transfer facility available"],
        eligibility: "Indian residents aged 21-65 years with a stable income source.",
        rates: "Starting from 8.35% p.a."
    },
    { 
        title: "Auto Loans", 
        imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
        description: "Get behind the wheel of your dream car with our customized auto loans for new and used vehicles.",
        features: ["Up to 100% on-road funding", "Pocket-friendly EMI options", "Instant approval for pre-approved customers", "Special rates for EVs"],
        eligibility: "Salaried or Self-employed individuals aged 21+ with min. 1 year work experience.",
        rates: "Starting from 8.75% p.a."
    },
    { 
        title: "Business Loans", 
        imageUrl: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop",
        description: "Capital tailored to help your business grow, whether you need working capital, machinery, or funds for expansion.",
        features: ["Collateral-free options available", "Overdraft facility", "Flexible repayment schedules", "High loan amounts up to ₹50 Lakhs"],
        eligibility: "Business vintage of at least 3 years with profitable turnover.",
        rates: "Starting from 12.00% p.a."
    },
    { 
        title: "Student Loans", 
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
        description: "Invest in your future with education loans that cover tuition fees, accommodation, and travel for studies in India or abroad.",
        features: ["Covers 100% of educational expenses", "Moratorium period (course duration + 1 year)", "Tax deduction on interest", "Preferential rates for premier institutes"],
        eligibility: "Indian students with secured admission in recognized institutions.",
        rates: "Starting from 9.00% p.a."
    },
    { 
        title: "Debt Consolidation", 
        imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=2070&auto=format&fit=crop",
        description: "Combine multiple high-interest debts into a single loan with a lower interest rate and one easy monthly payment.",
        features: ["Single monthly EMI", "Reduced overall interest burden", "Improve credit score", "Fixed repayment timeline"],
        eligibility: "Individuals with existing multiple debts and stable income to support consolidated EMI.",
        rates: "Starting from 11.00% p.a."
    },
    { 
        title: "Medical Loans", 
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
        description: "Emergency funds to cover medical treatments, surgeries, or hospitalization costs without depleting your savings.",
        features: ["Instant approval & disbursal", "No restriction on hospital choice", "Covers pre/post hospitalization", "Minimal documentation"],
        eligibility: "Individuals aged 21-60 years facing medical requirements.",
        rates: "Starting from 10.99% p.a."
    },
    { 
        title: "Wedding Loans", 
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
        description: "Make your special day perfect with a loan to cover venue, catering, attire, and other wedding-related expenses.",
        features: ["Usage flexibility", "High loan value", "Quick processing", "Short to medium term tenure"],
        eligibility: "Salaried individuals with monthly income > ₹20,000.",
        rates: "Starting from 11.25% p.a."
    }
];

const LoanCategoryCard: React.FC<{ category: LoanCategoryData; onClick: () => void }> = ({ category, onClick }) => (
    <div 
        onClick={onClick}
        className="relative rounded-xl overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300 h-48 cursor-pointer"
    >
        <img src={category.imageUrl} alt={category.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
            <h3 className="text-xl font-bold text-white flex justify-between items-center">
                {category.title}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </h3>
            <p className="text-gray-300 text-xs mt-1 line-clamp-1 opacity-80 group-hover:opacity-100 transition-opacity">{category.description}</p>
        </div>
    </div>
);

const LoanCategoryModal: React.FC<{ category: LoanCategoryData; onClose: () => void; onApply: () => void }> = ({ category, onClose, onApply }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up" 
            onClick={(e) => e.stopPropagation()}
        >
            <div className="relative h-48 sm:h-64">
                <img src={category.imageUrl} alt={category.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-3xl font-bold text-white mb-1">{category.title}</h2>
                    <span className="inline-block px-3 py-1 bg-accent text-secondary text-xs font-bold rounded-full">
                        {category.rates}
                    </span>
                </div>
            </div>
            
            <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {category.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h4 className="font-bold text-secondary mb-3 flex items-center">
                            <span className="w-1 h-6 bg-primary mr-2 rounded-full"></span>
                            Key Features
                        </h4>
                        <ul className="space-y-2">
                            {category.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start text-sm text-gray-600">
                                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                         <h4 className="font-bold text-secondary mb-3 flex items-center">
                            <span className="w-1 h-6 bg-accent mr-2 rounded-full"></span>
                            Eligibility Criteria
                        </h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                            {category.eligibility}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100 mt-4">
                    <button 
                        onClick={() => { onClose(); onApply(); }}
                        className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-lg"
                    >
                        Apply for {category.title}
                    </button>
                    <button 
                        onClick={onClose}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const TestimonialCard: React.FC<{ name: string; role: string; quote: string; avatarUrl: string; }> = ({ name, role, quote, avatarUrl }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
        <span className="absolute top-0 left-0 text-9xl text-primary-light font-bold -translate-x-4 -translate-y-6 select-none opacity-20">"</span>
        <div className="relative z-10 flex-grow">
            <p className="text-gray-600 italic mb-6">"{quote}"</p>
        </div>
        <div className="flex items-center mt-auto relative z-10">
            <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-full mr-4 border-2 border-primary-light" />
            <div>
                <h4 className="font-bold text-secondary">{name}</h4>
                <p className="text-xs text-primary font-medium">{role}</p>
            </div>
        </div>
    </div>
);

const LandingScreen: React.FC = () => {
    const { openApplyModal } = useUI();
    const [selectedCategory, setSelectedCategory] = useState<LoanCategoryData | null>(null);
    const [authModalConfig, setAuthModalConfig] = useState<{isOpen: boolean, role: UserRole}>({
        isOpen: false,
        role: UserRole.BORROWER
    });

    const openAuthModal = (role: UserRole) => {
        setAuthModalConfig({ isOpen: true, role });
    };

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                   <img 
                       src="https://images.unsplash.com/photo-1565514020176-db7102e34560?q=80&w=2070&auto=format&fit=crop" 
                       alt="Hero Background" 
                       className="absolute inset-0 w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-white/90"></div>
                   <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50"></div>
                   <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2 text-center lg:text-left animate-fade-in-up">
                            <div className="inline-block px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
                                <span className="text-primary font-bold text-sm uppercase tracking-wider">Fast • Secure • Easy</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-secondary leading-tight mb-6">
                                The Smartest Way to <span className="text-primary">Borrow & Lend</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Connect directly with verified loan agents. Get the best interest rates with our transparent marketplace platform.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button 
                                    onClick={() => openAuthModal(UserRole.BORROWER)}
                                    className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary-dark hover:shadow-xl transition-all transform hover:-translate-y-1"
                                >
                                    I'm a Borrower
                                </button>
                                <button 
                                    onClick={() => openAuthModal(UserRole.AGENT)}
                                    className="px-8 py-4 bg-white text-secondary font-bold rounded-full shadow-md border border-gray-100 hover:bg-gray-50 hover:shadow-lg transition-all transform hover:-translate-y-1"
                                >
                                    I'm a Loan Agent
                                </button>
                            </div>
                            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500 font-medium">
                                <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Instant Approval</div>
                                <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Minimal Paperwork</div>
                                <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Secure Process</div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="relative z-10 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 h-[600px] lg:h-[700px] overflow-hidden">
                                <img 
                                    src="https://images.unsplash.com/photo-1574607383476-f517f260d30b?q=80&w=2069&auto=format&fit=crop" 
                                    alt="Colleagues celebrating success" 
                                    className="rounded-xl w-full h-full object-cover"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-50 flex items-center gap-3">
                                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold uppercase">Loan Status</p>
                                        <p className="text-lg font-bold text-secondary">Approved</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-light/30 to-accent/20 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

             {/* EMI Calculator Section */}
            <section id="emi-calculator" className="relative py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">Calculate Your EMI</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Plan your repayment with our easy-to-use EMI calculator. Adjust the amount, tenure, and interest rate to see your monthly outflow.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <EMICalculator />
                    </div>
                </div>
            </section>

             {/* Loan Categories */}
             <section id="loan-categories" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                         <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-2">Loan Categories</h2>
                            <p className="text-gray-600">Explore financing options tailored for your needs</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {loanCategories.map((category, idx) => (
                            <LoanCategoryCard 
                                key={idx} 
                                category={category} 
                                onClick={() => setSelectedCategory(category)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">Why Choose Offer Me Loan?</h2>
                        <p className="text-gray-600 text-lg">We simplify the lending process with cutting-edge technology and a user-centric approach.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-10">
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                            title="Fast Processing"
                            description="Get your loan request reviewed and approved in record time with our automated systems."
                        />
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                            title="Secure & Private"
                            description="Your data is protected with bank-grade encryption. We never share your details without consent."
                        />
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                            title="Best Rates"
                            description="Access a wide network of lenders competing to offer you the most competitive interest rates."
                        />
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            title="Transparent Process"
                            description="No hidden charges. Complete clarity on terms and conditions before you sign."
                        />
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" /></svg>}
                            title="Verified Agents"
                            description="Every agent on our platform undergoes a strict verification process for your safety."
                        />
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                            title="Dedicated Support"
                            description="Our customer support team is available around the clock to assist with your queries."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                     <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00C49F" strokeWidth="1"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">How It Works</h2>
                        <p className="text-gray-600 text-lg">Get your loan in 3 simple steps</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <StepCard 
                            number="1"
                            title="Submit Request"
                            description="Fill out a simple form with your loan requirements and basic details."
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        />
                        <StepCard 
                            number="2"
                            title="Receive Offers"
                            description="Verified agents review your request and send competitive loan offers."
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>}
                        />
                        <StepCard 
                            number="3"
                            title="Get Funded"
                            description="Choose the best offer and get funds transferred to your account."
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
                        />
                    </div>
                </div>
            </section>

             {/* Mobile App Section */}
            <section className="py-24 bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-gray-900 z-0"></div>
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 z-0"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 z-0"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 text-white">
                            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-primary font-semibold text-sm mb-6 border border-white/10 backdrop-blur-sm">Mobile Exclusive</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Manage Your Loans <br/><span className="text-primary">On The Go</span></h2>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Download the Offer Me Loan mobile app to track applications, receive real-time offer notifications, and chat with agents anytime, anywhere. Experience seamless financial management at your fingertips.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="flex items-start">
                                    <div className="mr-3 p-2 bg-white/10 rounded-lg text-primary">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Instant Alerts</h4>
                                        <p className="text-xs text-gray-400">Never miss an offer</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mr-3 p-2 bg-white/10 rounded-lg text-primary">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Biometric Login</h4>
                                        <p className="text-xs text-gray-400">Secure & fast access</p>
                                    </div>
                                </div>
                                 <div className="flex items-start">
                                    <div className="mr-3 p-2 bg-white/10 rounded-lg text-primary">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Paperless Upload</h4>
                                        <p className="text-xs text-gray-400">Easy document scan</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mr-3 p-2 bg-white/10 rounded-lg text-primary">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">24/7 Support</h4>
                                        <p className="text-xs text-gray-400">Chat with us anytime</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex items-center justify-center bg-white text-secondary px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.1 0 183.1 0 241.2c0 61.6 43.1 113.7 103.1 113.7 20.2 0 45.4-14.5 73.1-14.5 27.6 0 52.2 14.5 73.8 14.5 58.1 0 104.4-50.5 104.4-113.7 0-27.9-10.6-54.4-29.7-74.2zm-155.6-141.3c3-11.2 10.3-21.6 20.2-27.7 10.1-6.1 21.6-8.1 31.9-5.1 1.9 11.2-4.5 24.3-14.5 30.5-10.1 6-22.1 7.9-32.1 5.1-1.3-2.1-2.4-4.2-2.9-7.3z"/></svg>
                                    App Store
                                </button>
                                <button className="flex items-center justify-center bg-transparent border border-gray-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition shadow-lg transform hover:-translate-y-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 32 32"><path fill="currentColor" d="M29.5,13.2L4.6,0.3c-1.1-0.6-2.5,0.4-2.5,1.6v27.9c0,1.2,1.4,2.2,2.5,1.6l24.9-12.8C30.6,17.9,30.6,14.1,29.5,13.2z M22,20.9l-10.2-3l-0.1,6.1L22,20.9z M11.7,14.1l10.2-3L11.8,8L11.7,14.1z M4,4.2l6.8,3.5l0.1,16.5L4,27.7V4.2z M23.9,15.9 L23.9,15.9l-11,3.2L24,12.7L23.9,15.9z"></path></svg>
                                    Google Play
                                </button>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative flex justify-center">
                            <div className="relative z-10 w-64 md:w-80">
                                <img 
                                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop" 
                                    alt="Offer Me Loan Mobile App Interface" 
                                    className="rounded-[2.5rem] shadow-2xl border-8 border-gray-800 transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                                />
                                {/* Floating elements */}
                                <div className="absolute -top-6 -right-6 bg-white p-3 rounded-xl shadow-xl animate-bounce">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">%</div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase">Interest Rate</p>
                                            <p className="text-sm font-bold text-secondary">Starting @ 8.5%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 -left-10 bg-white p-3 rounded-xl shadow-xl animate-pulse delay-700">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">Status</p>
                                            <p className="text-sm font-bold text-secondary">Loan Approved</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-6 right-0 bg-white p-3 rounded-xl shadow-xl animate-bounce delay-1000">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-accent/20 text-accent-dark flex items-center justify-center font-bold">₹</div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">Disbursed</p>
                                            <p className="text-sm font-bold text-secondary">₹ 5,00,000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-primary rounded-full blur-[100px] opacity-20 transform scale-150 -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Testimonials */}
             <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">What Our Users Say</h2>
                        <p className="text-gray-600 text-lg">Trusted by thousands of borrowers and lenders across India.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <TestimonialCard 
                            name="Rahul Sharma"
                            role="Small Business Owner"
                            quote="Offer Me Loan helped me secure a business loan within 3 days. The platform is incredibly intuitive and the agents are very professional."
                            avatarUrl="https://randomuser.me/api/portraits/men/32.jpg"
                        />
                        <TestimonialCard 
                            name="Priya Patel"
                            role="Software Engineer"
                            quote="I was looking for a home loan and got overwhelmed by bank visits. This site gave me 5 competitive offers in 24 hours. Highly recommended!"
                            avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
                        />
                        <TestimonialCard 
                            name="Amit Verma"
                            role="Freelancer"
                            quote="Getting a personal loan as a freelancer is tough. Offer Me Loan connected me with lenders who understand the gig economy."
                            avatarUrl="https://randomuser.me/api/portraits/men/67.jpg"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary-light relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                   <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-60"></div>
                   <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-60"></div>
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Join our growing community today. Whether you need funds or want to lend, we have the right solution for you.
                    </p>
                    <button 
                        onClick={openApplyModal}
                        className="px-10 py-5 bg-gradient-to-r from-yellow-400 to-green-500 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-lg hover:from-yellow-500 hover:to-green-600 transform hover:-translate-y-1 transition-all"
                    >
                        Apply for Loan
                    </button>
                    <p className="mt-6 text-sm text-gray-500">No credit card required for sign up • Secure & Encrypted</p>
                </div>
            </section>

            <ContactUsSection />
            
            {authModalConfig.isOpen && (
                <AuthModal 
                    onClose={() => setAuthModalConfig(prev => ({ ...prev, isOpen: false }))}
                    initialRole={authModalConfig.role}
                    initialView="register"
                />
            )}

            {selectedCategory && (
                <LoanCategoryModal 
                    category={selectedCategory} 
                    onClose={() => setSelectedCategory(null)}
                    onApply={openApplyModal}
                />
            )}
        </div>
    );
};

export default LandingScreen;
