
import React from 'react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-light text-primary mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-secondary mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);


const AboutUsScreen: React.FC = () => {
    return (
        <div className="bg-gray-50">
            {/* Page Header */}
            <section className="py-20 bg-primary-light">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4">About Offer Me Loan</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We're revolutionizing the lending landscape by creating a transparent and efficient marketplace for borrowers and loan agents.
                    </p>
                </div>
            </section>
            
            {/* Our Story & Mission */}
            <section className="py-20">
                 <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                         <div>
                            <h2 className="text-3xl font-bold text-secondary mb-4">Our Story</h2>
                             <p className="text-gray-700">
                                Founded on the principle of financial empowerment, Offer Me Loan was born from a desire to simplify the loan application process. We saw the challenges faced by both borrowers searching for fair terms and agents looking for qualified clients. Our platform bridges this gap, fostering a competitive environment where everyone benefits.
                             </p>
                         </div>
                         <div>
                             <h2 className="text-3xl font-bold text-secondary mb-4">Our Mission</h2>
                              <p className="text-gray-700">
                                Our mission is to provide a secure, user-friendly platform that connects individuals and businesses with a wide network of verified financial partners. We believe in transparency, speed, and choice, ensuring that our users can make informed financial decisions with confidence.
                              </p>
                         </div>
                    </div>
                </div>
            </section>

            {/* Our Values / Why Choose Us */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary">Our Core Values</h2>
                        <p className="text-gray-500 mt-2">The principles that guide us.</p>
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
        </div>
    );
};

export default AboutUsScreen;
