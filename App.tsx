
import React, { useState, useContext, createContext, useCallback } from 'react';
import type { User } from './types';
import { UserRole } from './types';
import AuthModal from './components/AuthModal';
import LandingScreen from './screens/LandingScreen';
import BorrowerDashboard from './screens/BorrowerDashboard';
import AgentDashboard from './screens/AgentDashboard';
import ComingSoonScreen from './screens/ComingSoonScreen';
import AboutUsScreen from './screens/AboutUsScreen';

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

const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4C12.95 4 4 12.95 4 24C4 35.05 12.95 44 24 44C35.05 44 44 35.05 44 24C44 12.95 35.05 4 24 4Z" fill="#00C49F" />
        <path d="M24 14L34 24L24 34L14 24L24 14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 24V34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 24H34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    
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

    const linkPrefix = user ? '/' : '';

    const navLinkClasses = "text-gray-600 hover:bg-primary-light hover:text-primary-dark transition-all duration-300 font-medium px-4 py-2 rounded-full";

    const isComingSoonPage = window.location.pathname === '/coming-soon';

    if (isComingSoonPage) return null;

    return (
        <>
            <header className="relative z-30 py-3 bg-gray-50">
                 <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center">
                        <a href={`${linkPrefix}#home`} className="flex items-center space-x-2">
                            <LogoIcon className="h-8 w-8" />
                            <span className="text-xl font-bold text-secondary">Offer Me Loan</span>
                        </a>
                        
                        <nav className="hidden lg:flex items-center space-x-2 bg-white/70 backdrop-blur-xl rounded-full shadow-lg px-4 py-2">
                            <a href={`${linkPrefix}#home`} className={navLinkClasses}>Home</a>
                            
                            <div className="relative group">
                                <a href={`${linkPrefix}#loan-categories`} className={`${navLinkClasses} flex items-center`}>
                                    Loan Categories
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </a>
                                <div className="absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transform group-hover:translate-y-0 translate-y-2 transition-all duration-300 bg-white shadow-lg rounded-md mt-2 py-2 w-56 z-50 border border-gray-100">
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
                            <a href={`${linkPrefix}#contact-us`} className={navLinkClasses}>Contact Us</a>
                        </nav>

                        <div className="flex items-center space-x-4">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-600 hidden sm:block">Welcome, {user.name}!</span>
                                    <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full border-2 border-primary" />
                                    <button
                                        onClick={logout}
                                        className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-300"
                                    >
                                        Logout
                                    </button>
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
        <footer className="bg-secondary text-white mt-16 py-8">
            <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm">
                <p className="text-gray-400 text-center sm:text-left mb-4 sm:mb-0">
                    &copy; {new Date().getFullYear()} Offer Me Loan. All rights reserved.
                </p>
                <div className="flex items-center space-x-6">
                    {socialLinks.map(link => (
                        <a key={link.name} href={link.href} className="text-gray-400 hover:text-primary transition-colors" aria-label={link.name}>
                            {link.icon}
                        </a>
                    ))}
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


export default function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col font-sans">
                <Header />
                <main className="flex-grow">
                    <AppContent />
                </main>
                <Footer />
            </div>
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