import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';
import ApplyLoanModal from '../components/ApplyLoanModal';
import EMICalculator from '../components/EMICalculator';
import ContactUsSection from '../components/ContactUsSection';

// Fix: Replaced JSX.Element with React.ReactNode to resolve namespace issue.
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-light text-primary mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-secondary mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
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
        avatarUrl: 'https://i.pravatar.cc/150?u=priya'
    },
    {
        name: 'Rajesh Kumar',
        role: 'Loan Agent, Delhi',
        quote: 'As an agent, finding genuine leads is the biggest challenge. This platform provides quality, verified loan requests, which has significantly boosted my business. The interface is clean and easy to use.',
        avatarUrl: 'https://i.pravatar.cc/150?u=rajesh'
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
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    return (
        <div className="bg-gray-50">
            {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
            {isApplyModalOpen && <ApplyLoanModal onClose={() => setIsApplyModalOpen(false)} />}
            
            {/* Hero Section */}
            <section id="home" className="relative bg-secondary text-white">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent"></div>
                
                <div className="relative container mx-auto px-6 py-32 text-center z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                        Your Loan, Your Terms.
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                        The fastest, most transparent way to connect with loan agents ready to fund your future.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button 
                            onClick={() => setIsApplyModalOpen(true)}
                            className="px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-transform transform hover:scale-105"
                        >
                            I'm a Borrower
                        </button>
                        <button 
                            onClick={() => setIsAuthModalOpen(true)}
                            className="px-8 py-3 bg-white/20 text-white backdrop-blur-sm font-semibold rounded-lg hover:bg-white/30 transition"
                        >
                            I'm a Loan Agent
                        </button>
                    </div>
                </div>
            </section>

            {/* EMI Calculator Section */}
            <section id="emi-calculator" className="py-20 bg-primary-light">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary">Plan Your Finances</h2>
                        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
                            Use our easy-to-use calculator to estimate your Equated Monthly Installment (EMI) and make informed financial decisions.
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
                        onClick={() => setIsApplyModalOpen(true)}
                        className="inline-flex items-center space-x-3 px-10 py-4 bg-primary text-white text-lg font-bold rounded-full shadow-2xl hover:bg-primary-dark transition-all duration-300 transform hover:scale-110 animate-pulse-slow cursor-pointer"
                    >
                        <span>Apply for a Loan Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary">How It Works</h2>
                        <p className="text-gray-500 mt-2">A simple, three-step process to secure your loan.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="text-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mx-auto mb-4 text-2xl font-bold">1</div>
                            <h3 className="font-bold text-xl text-secondary mb-2">Submit Request</h3>
                            <p className="text-gray-600">Fill out a simple form detailing your loan needs. It's secure and takes just minutes.</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mx-auto mb-4 text-2xl font-bold">2</div>
                            <h3 className="font-bold text-xl text-secondary mb-2">Receive Offers</h3>
                            <p className="text-gray-600">Verified loan agents review your request and send competitive offers directly to you.</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mx-auto mb-4 text-2xl font-bold">3</div>
                            <h3 className="font-bold text-xl text-secondary mb-2">Choose & Fund</h3>
                            <p className="text-gray-600">Compare offers, select the best one for you, and get your funds transferred quickly.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
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
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
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

            {/* Mobile App Section */}
            <section id="mobile-app" className="relative py-20 overflow-hidden">
                 <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
                ></div>
                <div className="absolute inset-0 bg-white/95"></div>

                <div className="relative container mx-auto px-6 z-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-secondary mb-4">Manage Your Loans On The Go</h2>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Get our mobile app for a seamless and convenient loan management experience. Track your applications, get instant notifications, and connect with agents right from your pocket.
                        </p>
                    </div>
                    
                    <div className="flex justify-center mt-12">
                        <img 
                            src="https://images.unsplash.com/photo-1601597111158-2f808541230d?q=80&w=800&auto=format&fit=crop" 
                            alt="Offer Me Loan App on phone" 
                            className="max-h-96 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300" 
                        />
                    </div>
                    
                    <div className="flex space-x-4 justify-center mt-12">
                        <a href="/coming-soon" className="bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-900 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 384 512">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.1 0 183.1 0 241.2c0 61.6 43.1 113.7 103.1 113.7 20.2 0 45.4-14.5 73.1-14.5 27.6 0 52.2 14.5 73.8 14.5 58.1 0 104.4-50.5 104.4-113.7 0-27.9-10.6-54.4-29.7-74.2zm-155.6-141.3c3-11.2 10.3-21.6 20.2-27.7 10.1-6.1 21.6-8.1 31.9-5.1 1.9 11.2-4.5 24.3-14.5 30.5-10.1 6-22.1 7.9-32.1 5.1-1.3-2.1-2.4-4.2-2.9-7.3z"/>
                        </svg>
                            <span>App Store</span>
                        </a>
                        <a href="/coming-soon" className="bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-900 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 32 32"><path fill="currentColor" d="M29.5,13.2L4.6,0.3c-1.1-0.6-2.5,0.4-2.5,1.6v27.9c0,1.2,1.4,2.2,2.5,1.6l24.9-12.8C30.6,17.9,30.6,14.1,29.5,13.2z M22,20.9l-10.2-3l-0.1,6.1L22,20.9z M11.7,14.1l10.2-3L11.8,8L11.7,14.1z M4,4.2l6.8,3.5l0.1,16.5L4,27.7V4.2z M23.9,15.9 L23.9,15.9l-11,3.2L24,12.7L23.9,15.9z"></path></svg>
                            <span>Google Play</span>
                        </a>
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