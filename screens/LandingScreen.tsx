
import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';
import EMICalculator from '../components/EMICalculator';
import ContactUsSection from '../components/ContactUsSection';
import { useUI } from '../App';
import { UserRole } from '../types';

// Fix: Replaced JSX.Element with React.ReactNode to resolve namespace issue.
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 border border-gray-100">
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

const loanCategories = [
    { title: "Personal Loans", imageUrl: "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Home Loans", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Auto Loans", imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Business Loans", imageUrl: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Student Loans", imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Debt Consolidation", imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Medical Loans", imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Wedding Loans", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

const LoanCategoryCard: React.FC<{ title: string; imageUrl: string }> = ({ title, imageUrl }) => (
    <div className="relative rounded-xl overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300 h-48">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
    </div>
);

const TestimonialCard: React.FC<{ name: string; role: string; quote: string; avatarUrl: string; }> = ({ name, role, quote, avatarUrl }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
        <span className="absolute top-0 left-0 text-9xl text-primary-light font-bold -translate-x-4 -translate-y-6 select-none opacity-50">“</span>
        <div className="relative z-10 flex flex-col flex-grow">
            <p className="text-gray-700 italic mb-6 flex-grow">
                {quote}
            </p>
            <div className="flex items-center mt-auto">
                <img src={avatarUrl} alt={name} className="h-12 w-12 rounded-full mr-4 border-2 border-primary" />
                <div>
                    <p className="font-bold text-secondary">{name}</p>
                    <p className="text-sm text-gray-500">{role}</p>
                </div>
            </div>
        </div>
    </div>
);

const testimonials = [
    {
        name: 'Priya Sharma',
        role: 'Borrower, Mumbai',
        quote: 'Offer Me Loan was a lifesaver! I needed funds for a family emergency, and the process was incredibly fast. I received multiple offers within a day and chose the one that best suited me. Highly recommended!',
        avatarUrl: 'https://i.pravatar.cc/150?u=rajesh'
    },
    {
        name: 'Rajesh Kumar',
        role: 'Loan Agent, Delhi',
        quote: 'As an agent, finding genuine leads is the biggest challenge. This platform provides quality, verified loan requests, which has significantly boosted my business. The interface is clean and easy to use.',
        avatarUrl: 'https://i.pravatar.cc/150?u=priya'
    },
    {
        name: 'Anjali Singh',
        role: 'Borrower, Bangalore',
        quote: 'I was skeptical at first, but the transparency of the platform won me over. I could compare interest rates and terms from different agents without any pressure. It felt empowering.',
        avatarUrl: 'https://i.pravatar.cc/150?u=anjali'
    }
];


const LandingScreen: React.FC = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalRole, setAuthModalRole] = useState<UserRole>(UserRole.BORROWER);
    const [authModalView, setAuthModalView] = useState<'login' | 'register'>('register');
    const { openApplyModal } = useUI();

    const handleOpenAuth = (role: UserRole, view: 'login' | 'register' = 'register') => {
        setAuthModalRole(role);
        setAuthModalView(view);
        setIsAuthModalOpen(true);
    };

    return (
        <div className="bg-gray-50">
            {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} initialRole={authModalRole} initialView={authModalView} />}
            
            {/* Hero Section */}
            <section id="home" className="relative bg-secondary text-white overflow-hidden">
                 <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    src="https://videos.pexels.com/video-files/8254536/8254536-hd.mp4"
                    key="hero-video"
                >
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-secondary/80 z-1"></div>
                
                <div className="relative container mx-auto px-6 py-32 text-center z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                        Your Loan, Your Terms.
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                        The fastest, most transparent way to connect with loan agents ready to fund your future.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button 
                            onClick={() => handleOpenAuth(UserRole.BORROWER, 'register')}
                            className="px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-transform transform hover:scale-105"
                        >
                            I'm a Borrower
                        </button>
                        <button 
                            onClick={() => handleOpenAuth(UserRole.AGENT, 'register')}
                            className="px-8 py-3 bg-white/20 text-white backdrop-blur-sm font-semibold rounded-lg hover:bg-white/30 transition"
                        >
                            I'm a Loan Agent
                        </button>
                    </div>
                </div>
            </section>

            {/* EMI Calculator Section */}
            <section id="emi-calculator" className="relative py-24 bg-secondary overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Plan Your Finances</h2>
                        <p className="text-gray-200 text-lg max-w-2xl mx-auto">
                            Take the guesswork out of your loan. Use our calculator to estimate your monthly installments.
                        </p>
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                       <EMICalculator />
                    </div>
                </div>
            </section>
            
            {/* Loan Categories Section */}
            <section id="loan-categories" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary">Find the Right Loan for You</h2>
                        <p className="text-gray-500 mt-2">Whatever your needs, we have a loan category to match.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loanCategories.map((category) => (
                            <LoanCategoryCard key={category.title} {...category} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section - REDESIGNED */}
            <section className="py-24 relative overflow-hidden bg-gray-50">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">How It Works</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            Your journey to funding is simple, transparent, and fast.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line for Desktop */}
                        <div className="hidden md:block absolute top-[40px] left-[16%] right-[16%] h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 border-t-2 border-dashed border-primary/30 z-0"></div>

                        <div className="grid md:grid-cols-3 gap-12">
                            <StepCard 
                                number="1"
                                title="Submit Your Request"
                                description="Fill out one simple application. Our smart algorithm matches your profile with verified agents who specialize in your loan type."
                                icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                            />
                            
                            <StepCard 
                                number="2"
                                title="Agents Compete"
                                description="Sit back as loan agents review your request and bid for your business. You'll receive multiple competitive offers with clear terms."
                                icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>}
                            />

                            <StepCard 
                                number="3"
                                title="Choose & Get Funded"
                                description="Compare interest rates and fees. Select the best offer, digitally sign, and get the funds transferred directly to your bank account."
                                icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Apply Now CTA Section */}
            <section id="apply-now" className="relative py-24 bg-secondary overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616529775421-a720613898a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
                ></div>
                <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"></div>
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="relative container mx-auto px-6 text-center z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Ready to Find Your Loan?</h2>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10">
                        You've explored the possibilities. Now, let's connect you with lenders who can make it happen. Our simple application takes just minutes.
                    </p>
                    <button 
                        onClick={openApplyModal}
                        className="group inline-flex items-center justify-center space-x-3 px-10 py-4 bg-gradient-to-r from-primary via-accent to-primary text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/40 transition-all duration-500 bg-200% bg-pos-0 hover:bg-pos-100"
                    >
                        <span>Apply for a Loan Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </section>


            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary">Why Choose Us?</h2>
                        <p className="text-gray-500 mt-2">We empower you with choice and transparency.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                            title="Fast & Efficient"
                            description="Connect with lenders in record time. No more waiting for weeks for a bank's decision."
                        />
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                            title="Secure & Private"
                            description="Your data is encrypted and protected. We value your privacy and security above all."
                        />
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                            title="Competitive Offers"
                            description="Lenders compete for your business, ensuring you get the best possible rates and terms."
                        />
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                            title="Transparent Process"
                            description="No hidden fees or surprise charges. We believe in complete clarity, so you can make decisions with confidence."
                        />
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                            title="Wide Lender Network"
                            description="Gain access to a diverse network of verified loan agents and financial institutions from all over India."
                        />
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                            title="Personalized Support"
                            description="Our platform and partner agents are here to help you navigate your financial journey, offering support when you need it."
                        />
                    </div>
                </div>
            </section>

            {/* Mobile App Section - ENHANCED */}
            <section id="mobile-app" className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-blue-50/50">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                 {/* Abstract shapes */}
                 <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/5 to-transparent skew-x-12 transform origin-top-right"></div>
                 <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl"></div>

                <div className="relative container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-block px-4 py-1 mb-4 bg-primary/10 text-primary font-bold rounded-full text-xs tracking-widest uppercase">
                             Mobile Exclusive
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-extrabold text-secondary mb-6 leading-tight">
                            Manage Your Loans <br/><span className="text-primary">On The Go</span>
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Experience the power of Offer Me Loan in your pocket. Track applications, chat with agents, and get funded faster with our secure mobile app.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-10 text-left max-w-lg mx-auto lg:mx-0">
                            {[
                                { title: "Instant Alerts", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
                                { title: "Biometric Login", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.858.571-4.186M19 12h2m-2-3h2m-2-6h2m-2 9h2" /></svg> },
                                { title: "Paperless Uploads", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
                                { title: "24/7 Support Chat", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-primary">
                                        {item.icon}
                                    </div>
                                    <span className="font-semibold text-gray-700">{item.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                            <div className="flex space-x-4">
                                <a href="/coming-soon" className="bg-secondary text-white px-5 py-3 rounded-xl flex items-center space-x-3 hover:bg-gray-900 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
                                    <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.1 0 183.1 0 241.2c0 61.6 43.1 113.7 103.1 113.7 20.2 0 45.4-14.5 73.1-14.5 27.6 0 52.2 14.5 73.8 14.5 58.1 0 104.4-50.5 104.4-113.7 0-27.9-10.6-54.4-29.7-74.2zm-155.6-141.3c3-11.2 10.3-21.6 20.2-27.7 10.1-6.1 21.6-8.1 31.9-5.1 1.9 11.2-4.5 24.3-14.5 30.5-10.1 6-22.1 7.9-32.1 5.1-1.3-2.1-2.4-4.2-2.9-7.3z"/></svg>
                                    <div className="text-left">
                                        <div className="text-[10px] uppercase tracking-wider opacity-70">Download on the</div>
                                        <div className="text-sm font-bold leading-none font-sans">App Store</div>
                                    </div>
                                </a>
                                <a href="/coming-soon" className="bg-secondary text-white px-5 py-3 rounded-xl flex items-center space-x-3 hover:bg-gray-900 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
                                     <svg className="w-7 h-7 group-hover:scale-110 transition-transform" viewBox="0 0 32 32"><path fill="currentColor" d="M29.5,13.2L4.6,0.3c-1.1-0.6-2.5,0.4-2.5,1.6v27.9c0,1.2,1.4,2.2,2.5,1.6l24.9-12.8C30.6,17.9,30.6,14.1,29.5,13.2z M22,20.9l-10.2-3l-0.1,6.1L22,20.9z M11.7,14.1l10.2-3L11.8,8L11.7,14.1z M4,4.2l6.8,3.5l0.1,16.5L4,27.7V4.2z M23.9,15.9 L23.9,15.9l-11,3.2L24,12.7L23.9,15.9z"></path></svg>
                                    <div className="text-left">
                                        <div className="text-[10px] uppercase tracking-wider opacity-70">Get it on</div>
                                        <div className="text-sm font-bold leading-none font-sans">Google Play</div>
                                    </div>
                                </a>
                            </div>
                            
                            <div className="hidden lg:flex items-center gap-4 pl-6 border-l border-gray-200">
                                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                    <svg className="w-14 h-14 text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 3H9V9H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15 3H21V9H15V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M3 15H9V21H3V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15 15H17V17H15V15Z" fill="currentColor"/>
                                        <path d="M19 15H21V17H19V15Z" fill="currentColor"/>
                                        <path d="M15 19H17V21H15V19Z" fill="currentColor"/>
                                        <path d="M19 19H21V21H19V19Z" fill="currentColor"/>
                                        <path d="M12 12H13V13H12V12Z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div className="text-xs text-gray-500 leading-tight">
                                    <p>Scan to</p>
                                    <p className="font-bold text-secondary text-sm">Download</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center lg:justify-end items-center mt-12 lg:mt-0 min-h-[550px]">
                        <div className="relative w-[320px] h-[550px] lg:w-[480px]">
                            
                             {/* Floating Icon 1: Percentage/Rate */}
                             <div className="absolute top-20 left-0 lg:-left-8 z-20 animate-bounce" style={{ animationDuration: '3.5s' }}>
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center border border-gray-100 transform -rotate-12">
                                    <span className="text-2xl font-bold text-primary">%</span>
                                    <span className="text-[10px] text-gray-500 font-medium">Low Rate</span>
                                </div>
                            </div>

                            {/* Floating Icon 2: Currency */}
                            <div className="absolute top-40 -right-4 lg:-right-12 z-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
                                <div className="w-14 h-14 bg-secondary text-white rounded-full shadow-xl flex items-center justify-center border-4 border-white/20">
                                    <span className="text-2xl font-bold">₹</span>
                                </div>
                            </div>

                            {/* Floating Icon 3: Approval */}
                            <div className="absolute bottom-32 -left-4 lg:-left-10 z-20 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                                <div className="w-12 h-12 bg-accent rounded-full shadow-lg flex items-center justify-center text-secondary border-2 border-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Floating Icon 4: Badge */}
                             <div className="absolute bottom-10 right-4 lg:-right-4 z-20 animate-pulse">
                                <div className="px-4 py-2 bg-white rounded-full shadow-xl border border-gray-100 flex items-center space-x-2 transform rotate-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                                    <span className="text-xs font-bold text-gray-700">Fast Approval</span>
                                </div>
                            </div>


                            {/* Phone 1 (Back) */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-[70%] -translate-y-1/2 -rotate-15 transition-transform duration-500 hover:rotate-[-20deg] hover:scale-105">
                                <div className="relative mx-auto border-gray-300 bg-gray-300 border-[8px] rounded-[2rem] h-[450px] w-[220px] lg:h-[550px] lg:w-[270px] shadow-xl">
                                    <div className="w-[100px] h-[14px] bg-gray-300 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                                    <div className="h-[36px] w-[2px] bg-gray-300 absolute -start-[10px] top-[100px] rounded-s-lg"></div>
                                    <div className="h-[36px] w-[2px] bg-gray-300 absolute -start-[10px] top-[148px] rounded-s-lg"></div>
                                    <div className="h-[52px] w-[2px] bg-gray-300 absolute -end-[10px] top-[114px] rounded-e-lg"></div>
                                    <div className="rounded-[1.5rem] overflow-hidden w-full h-full bg-white">
                                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Mobile app dashboard with charts" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Phone 2 (Front) */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-[30%] -translate-y-1/2 rotate-15 z-10 transition-transform duration-500 hover:rotate-[20deg] hover:scale-105">
                                <div className="relative mx-auto border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[500px] w-[250px] lg:h-[600px] lg:w-[300px] shadow-2xl">
                                    <div className="w-[120px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[13px] top-[124px] rounded-s-lg"></div>
                                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[13px] top-[178px] rounded-s-lg"></div>
                                    <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[13px] top-[142px] rounded-e-lg"></div>
                                    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
                                        <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Loan application screen with financial data" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary">What Our Users Say</h2>
                        <p className="text-gray-500 mt-2">Real stories from borrowers and agents who trust us.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial.name} {...testimonial} />
                        ))}
                    </div>
                </div>
            </section>
            
            <ContactUsSection />
        </div>
    );
};

export default LandingScreen;
