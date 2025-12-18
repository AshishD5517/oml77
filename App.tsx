import React, { useState, useContext, createContext, useCallback, useRef, useEffect } from 'react';
import type { User } from './types';
import { UserRole } from './types';
import AuthModal from './components/AuthModal';
import LandingScreen from './screens/LandingScreen';
import BorrowerDashboard from './screens/BorrowerDashboard';
import AgentDashboard from './screens/AgentDashboard';
import ComingSoonScreen from './screens/ComingSoonScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import EMICalculatorScreen from './screens/EMICalculatorScreen';
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
    <svg className={className} viewBox="0 0 280 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(5, 5)">
            {/* Dollar Coin */}
            <circle cx="30" cy="30" r="30" fill="#27AE60" />
            <text x="30" y="42" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold" fontFamily="Inter, sans-serif">$</text>
            
            {/* Rupee Symbol overlapping to show togetherness */}
            <circle cx="62" cy="52" r="24" fill="#1D2B4F" stroke="white" strokeWidth="4" />
            <text x="62" y="60" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Inter, sans-serif">₹</text>
        </g>
        
        {/* Text part - Closer and tighter */}
        <g transform="translate(100, 5)">
            <text y="38" fontFamily="Inter, sans-serif" fontSize="38" fontWeight="900" letterSpacing="-1">
                <tspan fill="#1D2B4F">OFFER</tspan>
            </text>
            <text y="72" fontFamily="Inter, sans-serif" fontSize="38" fontWeight="900" letterSpacing="-1">
                <tspan fill="#27AE60">ME</tspan>
                <tspan fill="#1D2B4F">LOAN</tspan>
            </text>
        </g>
    </svg>
);


const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const loanCategories = [
        { title: "Personal Loans" },
        { title: "Home Loans" },
        { title: "Auto Loans" },
        { title: "Business Loans" },
        { title: "Student Loans" },
        { title: "Debt Consolidation" },
        { title: "Medical Loans" },
        { title: "Wedding Loans" }
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isLandingPage = !user && window.location.pathname === '/';
    const linkPrefix = (user || window.location.pathname !== '/') ? '/' : '';
    const navLinkClasses = "text-gray-600 hover:bg-primary-light hover:text-primary-dark transition-all duration-300 font-medium px-4 py-2 rounded-full";
    const isComingSoonPage = window.location.pathname === '/coming-soon';

    if (isComingSoonPage) return null;

    return (
        <>
            <header className="relative z-50 py-4 bg-gray-50">
                 <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center">
                        <a href={`${linkPrefix}#home`} className="flex items-center">
                            <LogoIcon className="h-16 md:h-20" />
                        </a>
                        
                        <nav className="hidden lg:flex items-center space-x-2 bg-white/70 backdrop-blur-xl rounded-full shadow-lg px-4 py-2">
                            <a href={`${linkPrefix}#home`} className={navLinkClasses}>Home</a>
                            
                            <div className="relative group">
                                <a href={`${linkPrefix}#loan-categories`} className={`${navLinkClasses} flex items-center`}>
                                    Loan Categories
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </a>
                                <div className="absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transform group-hover:translate-y-0 translate-y-2 transition-all duration-300 bg-white shadow-xl rounded-xl mt-2 py-2 w-56 z-50 border border-gray-100">
                                    {loanCategories.map(category => (
                                        <a 
                                            key={category.title}
                                            href={`${linkPrefix}#loan-categories`} 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:text-primary transition-colors"
                                        >
                                            {category.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            
                            <a href={`${linkPrefix}#emi-calculator`} className={navLinkClasses}>EMI Calculator</a>
                            <a href="/about-us" className={navLinkClasses}>About Us</a>
                            <a href={user ? '/contact-us' : (isLandingPage ? '#contact-us' : '/#contact-us')} className={navLinkClasses}>Contact Us</a>
                        </nav>

                        <div className="flex items-center space-x-4">
                            {user ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button 
                                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                        className="flex items-center space-x-3 bg-white p-1 pr-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                                    >
                                        <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full border-2 border-primary" />
                                        <div className="hidden sm:flex flex-col items-start leading-tight">
                                            <span className="text-sm font-bold text-secondary">{user.name}</span>
                                            <span className="text-[10px] text-primary font-semibold uppercase tracking-wider">{user.role}</span>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isProfileDropdownOpen && (
                                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-fade-in-up origin-top-right overflow-hidden">
                                            <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                                <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                                                <p className="text-sm font-bold text-secondary truncate">{user.email}</p>
                                            </div>
                                            
                                            <a href="/" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-light hover:text-primary transition-colors">
                                                <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                                                <span>Dashboard</span>
                                            </a>
                                            <a href="/" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-light hover:text-primary transition-colors">
                                                <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                                <span>Active Loans</span>
                                            </a>
                                            <a href="/" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-light hover:text-primary transition-colors">
                                                <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                                                <span>Messages</span>
                                                <span className="ml-auto bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                                            </a>
                                            <a href="/" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-light hover:text-primary transition-colors">
                                                <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                                <span>Update Profile</span>
                                            </a>
                                            
                                            <div className="border-t border-gray-50 mt-1">
                                                <button
                                                    onClick={() => {
                                                        setIsProfileDropdownOpen(false);
                                                        logout();
                                                    }}
                                                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                                >
                                                    <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                                                    <span className="font-semibold">Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsAuthModalOpen(true)}
                                    className="px-6 py-2 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-dark transition-colors duration-300 shadow-md"
                                >
                                    Login / Sign Up
                                </button>
                            )}
                        </div>
                    </div>
                 </div>
            </header>
            {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
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

    if (isComingSoonPage) return null;

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
            
            <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm relative z-10 mb-12">
                <div className="text-center sm:text-left mb-4 sm:mb-0 text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Offer Me Loan. All rights reserved.</p>
                    <p className="mt-2">
                        203, 2nd Floor, D Mall, Netaji Subhash Place, Pitampura, Delhi - 110034
                    </p>
                </div>
                <div className="flex items-center space-x-6">
                    {socialLinks.map(link => (
                        <a key={link.name} href={link.href} className="text-gray-400 hover:text-primary transition-colors" aria-label={link.name}>
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>

            {/* Partners / Trust Strip */}
            <div className="bg-white text-gray-800 py-6 border-t border-gray-100">
                <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-8">
                    {/* Quick Campus */}
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="flex items-end leading-none items-center sm:items-start">
                             <div className="flex items-end gap-0">
                                 {/* Custom Q - Proper Q without 't' elements */}
                                 <div className="relative w-10 h-12"> 
                                    <svg viewBox="0 0 60 80" className="w-full h-full overflow-visible" fill="none" stroke="black" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
                                        {/* o */}
                                        <circle cx="30" cy="40" r="20" />
                                        {/* tail under o - yellow */}
                                        <path d="M15 70 Q 30 80 45 70" stroke="#FDB913" strokeWidth="8" />
                                    </svg>
                                 </div>
                                 <span className="text-4xl font-light text-black tracking-tight leading-none">uick</span>
                                 <span className="text-4xl font-bold text-black tracking-tight leading-none">Campus</span>
                            </div>
                            <span className="ml-2 bg-[#FDB913] text-black text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider mb-2">Online</span>
                        </div>
                        <span className="text-[11px] text-gray-900 font-medium tracking-wide mt-1">The EduTech Marketplace</span>
                    </div>

                    {/* Made in India */}
                    <div className="text-center">
                        <p className="font-semibold text-gray-800 flex items-center justify-center gap-2 text-sm">
                            Made with <span className="text-red-500 text-lg">❤️</span> in India
                        </p>
                    </div>

                    {/* Product of / Listed on */}
                    <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
                        <div className="flex flex-col items-center sm:items-end">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Product of</p>
                            <div className="flex items-center gap-3">
                                {/* QuickTouch Logo */}
                                <div className="relative h-14 w-20">
                                    <svg viewBox="0 0 100 80" className="w-full h-full overflow-visible" fill="none" stroke="black" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
                                        {/* o */}
                                        <circle cx="30" cy="40" r="20" />
                                        {/* t vertical - straight then curved right */}
                                        <path d="M70 15 V 50 A 10 10 0 0 0 80 60 H 85" />
                                        {/* t crossbar - connecting to o */}
                                        <line x1="50" y1="35" x2="85" y2="35" />
                                        {/* tail under o - yellow */}
                                        <path d="M15 70 Q 30 80 45 70" stroke="#FDB913" strokeWidth="8" />
                                    </svg>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-black text-xl font-light tracking-tight leading-none">Quick</span>
                                    <span className="text-black text-xl font-bold tracking-tight leading-none mt-1">Touch</span>
                                    <span className="text-[7px] text-gray-500 tracking-[0.1em] mt-1 font-bold uppercase leading-none">INNOVATING INTERESTINGLY</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-10 w-px bg-gray-300 hidden sm:block"></div>

                        <div className="flex flex-col items-center sm:items-start">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Listed on</p>
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 relative flex-shrink-0">
                                    {/* Abstract Hexagon Logo for NSE */}
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        <polygon points="50 0, 95 25, 95 75, 50 100, 5 75, 5 25" fill="none" stroke="#652D90" strokeWidth="0" />
                                        <path d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z" fill="white" />
                                        <path d="M50 0 L93.3 25 L50 50 L6.7 25 Z" fill="#FDB913" opacity="0.9" />
                                        <path d="M50 0 L93.3 25 L93.3 75 L50 50 Z" fill="#DA2128" opacity="0.9" />
                                        <path d="M93.3 75 L50 100 L50 50 Z" fill="#652D90" opacity="0.9" />
                                        <path d="M50 100 L6.7 75 L50 50 Z" fill="#2E3192" opacity="0.9" />
                                        <path d="M6.7 75 L6.7 25 L50 50 Z" fill="#0091D2" opacity="0.9" />
                                        <path d="M6.7 25 L50 0 L50 50 Z" fill="#FDB913" opacity="0.9" />
                                    </svg>
                                </div>
                                <div className="font-bold text-xl leading-none flex items-center text-[#2E3192]">
                                    NSE <span className="text-gray-300 mx-2 text-2xl font-light">|</span> <span className="text-[#DA2128]">Emerge</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};


const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((role: UserRole) => {
    const mockUser: User = role === UserRole.BORROWER ? {
        id: 'user-123',
        name: 'Alex Doe',
        email: 'alex.doe@example.com',
        role: UserRole.BORROWER,
        avatarUrl: `https://i.pravatar.cc/150?u=alex`
    } : {
        id: 'agent-456',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: UserRole.AGENT,
        avatarUrl: `https://i.pravatar.cc/150?u=jane`
    };
    setUser(mockUser);
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

// --- NEW UI PROVIDER ---
const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  
  const openApplyModal = useCallback(() => {
    setIsApplyModalOpen(true);
  }, []);

  const closeApplyModal = useCallback(() => {
    setIsApplyModalOpen(false);
  }, []);

  return (
    <UIContext.Provider value={{ openApplyModal }}>
      {children}
      {isApplyModalOpen && <ApplyLoanModal onClose={closeApplyModal} />}
    </UIContext.Provider>
  );
};
// --- END NEW UI PROVIDER ---


export default function App() {
    return (
        <AuthProvider>
            <UIProvider>
                <div className="min-h-screen flex flex-col font-sans">
                    <Header />
                    <main className="flex-grow">
                        <AppContent />
                    </main>
                    <Footer />
                    <Chatbot />
                </div>
            </UIProvider>
        </AuthProvider>
    );
}

function AppContent() {
    const { user } = useAuth();
    
    if (window.location.pathname === '/coming-soon') {
        return <ComingSoonScreen />;
    }

    if (window.location.pathname === '/about-us') {
        return <AboutUsScreen />;
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
