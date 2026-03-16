import React from 'react';

const AboutLoansScreen: React.FC = () => {
    return (
        <div className="bg-white font-sans text-gray-700 min-h-screen">
            <div className="relative bg-secondary py-24 sm:py-32 isolate overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                        About <span className="text-primary">Our Loans</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                        We offer a variety of loan products designed to meet your unique financial needs. From personal loans to business financing, our platform connects you with the best agents to secure the most favorable terms.
                    </p>
                </div>
            </div>

            <div className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Types of Loans We Support</h2>
                    
                    <div className="space-y-12">
                        <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-primary mb-4">Personal Loans</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Personal loans are unsecured loans that can be used for a variety of purposes, including medical emergencies, weddings, travel, or debt consolidation. They offer flexibility and quick access to funds without requiring collateral.
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Quick approval process</li>
                                <li>No collateral required</li>
                                <li>Flexible repayment tenures</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-primary mb-4">Business Loans</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Whether you're a startup looking for initial capital or an established business aiming to expand, our network of agents can help you secure the right business loan. We support working capital loans, equipment financing, and more.
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Tailored for business growth</li>
                                <li>Competitive interest rates</li>
                                <li>Support for MSMEs</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-primary mb-4">Home Loans</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Make your dream home a reality with our home loan options. We connect you with lenders offering long-term financing with attractive interest rates for purchasing, constructing, or renovating your home.
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Long repayment periods</li>
                                <li>Tax benefits available</li>
                                <li>High loan-to-value ratio</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <a href="/" className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary-dark transition-colors">
                            Apply for a Loan Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutLoansScreen;
