
import React, { useState, useContext, createContext, useCallback, useRef, useEffect } from 'react';
import type { User } from './types';
import { UserRole } from './types';
import AuthScreen from './screens/AuthScreen';
import LandingScreen from './screens/LandingScreen';
import BorrowerDashboard from './screens/BorrowerDashboard';
import AgentDashboard from './screens/AgentDashboard';
import ComingSoonScreen from './screens/ComingSoonScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import EMICalculatorScreen from './screens/EMICalculatorScreen';
import PersonalLoanScreen from './screens/PersonalLoanScreen';
import Chatbot from './components/Chatbot';
import ApplyLoanModal from './components/ApplyLoanModal';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// --- NEW UI CONTEXT ---
interface UIContextType {
  openApplyModal: () => void;
  openAuthModal: (role?: UserRole, view?: 'login' | 'register') => void;
}

const UIContext = createContext<UIContextType | null>(null);

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
// --- END NEW UI CONTEXT ---


const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <img 
        src="https://i.postimg.cc/d0nzmvyc/Gemini-Generated-Image-xd7ycnxd7ycnxd7y-removebg-preview.png" 
        alt="Offer Me Loan Logo" 
        className={`object-contain ${className}`}
        referrerPolicy="no-referrer" 
    />
);


const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { openAuthModal } = useUI();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const headerDropdownRef = useRef<HTMLDivElement>(null);
    
    const loanCategories = [
        { title: "Personal Loans", href: "/personal-loan" },
        { title: "Home Loans", href: "/coming-soon" },
        { title: "Vehicle Loan", href: "/coming-soon" },
        { title: "Business Loans", href: "/coming-soon" },
        { title: "Student Loans", href: "/coming-soon" },
        { title: "Mortgage Loan", href: "/coming-soon" },
        { title: "Gold Loan", href: "/coming-soon" },
        { title: "Loan Transfer", href: "/coming-soon" }
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
            if (headerDropdownRef.current && !headerDropdownRef.current.contains(event.target as Node)) {
                setIsHeaderDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isLandingPage = !user && window.location.pathname === '/';
    const linkPrefix = (user || window.location.pathname !== '/') ? '/' : '';
    const navLinkClasses = "text-gray-700 hover:text-primary transition-all duration-300 font-medium text-base px-4 py-3 flex items-center";
    const isComingSoonPage = window.location.pathname === '/coming-soon';
    const isAuthPage = window.location.pathname === '/auth';

    if (isComingSoonPage || isAuthPage) return null;

    return (
        <>
            <header className="relative z-50 bg-white shadow-sm">
                {/* Top Bar */}
                <div className="border-b border-gray-100">
                    <div className="container mx-auto px-4 md:px-6 py-2 flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-6">
                            <a href={`${linkPrefix}#home`} className="flex items-center">
                                <LogoIcon className="h-16 md:h-20" />
                            </a>
                            <div className="hidden md:flex items-center space-x-4 text-gray-600">
                                <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg> +91 98765 43210</span>
                                <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> contact@offermeloan.com</span>
                                <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg> Customer Support</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex space-x-2">
                                <a href="#" className="text-secondary hover:text-primary"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                                <a href="#" className="text-secondary hover:text-primary"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => openAuthModal(UserRole.BORROWER, 'login')} className="px-4 py-1 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">Login</button>
                                <button onClick={() => openAuthModal(UserRole.BORROWER, 'register')} className="px-4 py-1 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark flex items-center">Sign Up <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg></button>
                            </div>
                            <div className="flex space-x-2">
                                <a href="#" className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-primary"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                                <a href="#" className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-primary"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
                                <a href="#" className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-primary"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Nav */}
                 <div className="container mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-center py-2">
                        <nav className="hidden lg:flex items-center space-x-4">
                            <a href={`${linkPrefix}#home`} className="bg-primary text-white px-4 py-2 rounded-full font-medium text-sm flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                                Home
                            </a>
                            
                            <div className="relative group">
                                <a href={`${linkPrefix}#loan-categories`} className={navLinkClasses}>
                                    <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                                    Loan Categories
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </a>
                                <div className="absolute left-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 w-56">
                                    <div className="bg-white shadow-xl rounded-xl py-2 border border-gray-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        {loanCategories.map(category => (
                                            <a 
                                                key={category.title}
                                                href={category.href || `${linkPrefix}#loan-categories`} 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:text-primary transition-colors"
                                            >
                                                {category.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative group">
                                <a href={`${linkPrefix}#emi-calculator`} className={navLinkClasses}>
                                    <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                                    EMI Calculator
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </a>
                            </div>
                            
                            <div className="relative group">
                                <a href={`${linkPrefix}#credit-score`} className={navLinkClasses}>
                                    <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                                    Credit Score
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </a>
                                <div className="absolute left-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 w-64">
                                    <div className="bg-white shadow-xl rounded-xl py-2 border border-gray-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <a href={`${linkPrefix}#credit-score-free`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:text-primary transition-colors">
                                            Credit Score FREE
                                        </a>
                                        <a href={`${linkPrefix}#increase-cibil`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:text-primary transition-colors">
                                            How to Increase Cibil score
                                        </a>
                                        <a href={`${linkPrefix}#cibil-personal-loan`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:text-primary transition-colors">
                                            CIBIL Score for Personal Loan
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <a href={`${linkPrefix}#business-loans`} className={navLinkClasses}>
                                    <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                    Business Loans
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </a>
                            </div>

                            <div className="relative group">
                                <a href={`${linkPrefix}#personal-loans`} className={navLinkClasses}>
                                    <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                    Personal Loans
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </a>
                            </div>
                            
                            <div className="relative group">
                                <a href="/about-us" className={navLinkClasses}>
                                    About Us
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </a>
                            </div>
                        </nav>

                        <div className="flex items-center">
                            <button className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-primary-dark transition-colors flex items-center shadow-md">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                Get a Loan
                            </button>
                        </div>
                    </div>
                 </div>
            </header>

            {/* Live Rates Ticker */}
            <div className="bg-secondary text-white py-2 overflow-hidden flex items-center text-sm relative z-40">
                <div className="container mx-auto px-4 flex items-center">
                    <div className="flex items-center font-bold text-accent mr-4 whitespace-nowrap z-10 bg-secondary pr-4">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                        Live Rates:
                    </div>
                    <div className="flex-1 overflow-hidden relative">
                        <div className="animate-marquee whitespace-nowrap flex items-center space-x-8">
                            <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg> Home Loans @ 8.35% p.a.</span>
                            <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg> Vehicle Loans @ 8.75% p.a.</span>
                            <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> Business Loans @ 12.00% p.a.</span>
                            <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> Personal Loans @ 10.50% p.a.</span>
                            <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg> Education Loans @ 9.00% p.a.</span>
                            {/* Duplicate for seamless loop */}
                            <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg> Home Loans @ 8.35% p.a.</span>
                            <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg> Vehicle Loans @ 8.75% p.a.</span>
                            <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> Business Loans @ 12.00% p.a.</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Footer: React.FC = () => {
    const socialLinks = [
        { name: 'Facebook', href: '#', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg> },
        { name: 'Twitter', href: '#', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg> },
        { name: 'LinkedIn', href: '#', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg> },
        { name: 'Instagram', href: '#', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" clipRule="evenodd" /></svg> },
    ];

    const isComingSoonPage = window.location.pathname === '/coming-soon';
    const isAuthPage = window.location.pathname === '/auth';

    if (isComingSoonPage || isAuthPage) return null;

    return (
        <footer className="relative bg-secondary text-white pt-16">
             <div
                className="absolute top-0 left-0 w-full overflow-hidden leading-none"
                style={{ transform: 'translateY(calc(-100% + 1px))', height: '60px' }}
            >
                <svg
                    className="relative block w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28"
                    preserveAspectRatio="none"
                    shapeRendering="auto"
                >
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g>
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#1D2B4F">
                             <animateTransform attributeName="transform" attributeType="XML" type="translate" dur="15s" from="0 0" to="176 0" repeatCount="indefinite" />
                        </use>
                    </g>
                </svg>
            </div>
            
            <div className="container mx-auto px-6 relative z-10 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Logo and Description */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center mb-6">
                            <LogoIcon className="h-24 md:h-32 bg-white p-1 rounded-xl" />
                        </div>
                        <p className="text-gray-400 text-base leading-relaxed mb-6">
                            The smartest way to borrow and lend. We connect borrowers with the right lenders, making the loan process seamless, transparent, and fast.
                        </p>
                        <div className="flex items-center space-x-4">
                            {socialLinks.map(link => (
                                <a key={link.name} href={link.href} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300" aria-label={link.name}>
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><a href="/about-us" className="text-gray-400 hover:text-primary transition-colors text-base">About Us</a></li>
                            <li><a href="/#emi-calculator" className="text-gray-400 hover:text-primary transition-colors text-base">EMI Calculator</a></li>
                            <li><a href="/#how-it-works" className="text-gray-400 hover:text-primary transition-colors text-base">How It Works</a></li>
                            <li><a href="/blog" className="text-gray-400 hover:text-primary transition-colors text-base">Blog & Insights</a></li>
                            <li><a href="/logo-designs" className="text-gray-400 hover:text-primary transition-colors text-base">Logo Designs</a></li>
                            <li><a href="/faqs" className="text-gray-400 hover:text-primary transition-colors text-base">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold text-white mb-6">Legal</h3>
                        <ul className="space-y-4">
                            <li><a href="/terms-and-conditions" className="text-gray-400 hover:text-primary transition-colors text-base">Terms and Conditions</a></li>
                            <li><a href="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors text-base">Privacy Policy</a></li>
                            <li><a href="/cookie-policy" className="text-gray-400 hover:text-primary transition-colors text-base">Cookie Policy</a></li>
                            <li><a href="/disclaimer" className="text-gray-400 hover:text-primary transition-colors text-base">Disclaimer</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-gray-400 text-base">
                                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                <span>Unit No. 226, 2nd Floor, D Mall, Netaji Subhash Place, Pitampura, New Delhi - 110034</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400 text-base">
                                <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                <a href="mailto:info@offermeloan.com" className="hover:text-primary transition-colors">info@offermeloan.com</a>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400 text-base">
                                <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                <span className="hover:text-primary transition-colors cursor-default">Coming Soon</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <div className="text-center sm:text-left mb-4 sm:mb-0 text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Offer Me Loan. All rights reserved.</p>
                    </div>
                </div>
            </div>

        </footer>
    );
};


const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((role: UserRole) => {
    // Intentionally not setting the user to prevent opening the dashboard
    // and to keep the "Login / Sign Up" button displayed.
    // setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- NEW UI CONTEXT ---
const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  
  const openApplyModal = useCallback(() => {
    setIsApplyModalOpen(true);
  }, []);

  const closeApplyModal = useCallback(() => {
    setIsApplyModalOpen(false);
  }, []);

  const openAuthModal = useCallback((role?: UserRole, view?: 'login' | 'register') => {
    let url = '/auth';
    const params = new URLSearchParams();
    if (role) params.append('role', role);
    if (view) params.append('view', view);
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    window.location.href = url;
  }, []);

  return (
    <UIContext.Provider value={{ openApplyModal, openAuthModal }}>
      {children}
      {isApplyModalOpen && <ApplyLoanModal onClose={closeApplyModal} />}
    </UIContext.Provider>
  );
};
// --- END NEW UI CONTEXT ---


export default function App() {
    const isAuthPage = window.location.pathname === '/auth';
    return (
        <AuthProvider>
            <UIProvider>
                <div className="min-h-screen flex flex-col font-sans">
                    <Header />
                    <main className="flex-grow">
                        <AppContent />
                    </main>
                    <Footer />
                    {!isAuthPage && <Chatbot />}
                </div>
            </UIProvider>
        </AuthProvider>
    );
}

function AppContent() {
    const { user } = useAuth();
    
    if (window.location.pathname === '/auth') {
        return <AuthScreen />;
    }

    if (window.location.pathname === '/coming-soon') {
        return <ComingSoonScreen />;
    }

    if (window.location.pathname === '/about-us') {
        return <AboutUsScreen />;
    }

    if (window.location.pathname === '/personal-loan') {
        return <PersonalLoanScreen />;
    }

    if (window.location.pathname === '/contact-us') {
        return <ContactUsScreen />;
    }

    if (window.location.pathname === '/emi-calculator') {
        return <EMICalculatorScreen />;
    }

    if (!user) {
        return <LandingScreen />;
    }

    switch (user.role) {
        case UserRole.BORROWER:
            return <BorrowerDashboard />;
        case UserRole.AGENT:
            return <AgentDashboard />;
        default:
            return <LandingScreen />;
    }
}
