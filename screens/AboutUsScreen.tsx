
import React from 'react';

const AboutUsScreen: React.FC = () => {
    return (
        <div className="bg-white font-sans text-gray-700">
            {/* Company Overview / Hero Section */}
            <div className="relative bg-secondary py-24 sm:py-32 isolate overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1454165833767-027ffea9e778?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Financial growth and partnership"
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-10"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                            Company <span className="text-primary">Overview</span>
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
                            Offer Me Loan is a premier digital lending marketplace designed to bridge the gap between ambitious borrowers and trusted financial institutions. We leverage cutting-edge technology to provide a seamless, transparent, and secure environment for all your financial needs.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-secondary mb-4 flex items-center">
                                    <span className="w-8 h-1 bg-primary mr-4 rounded-full"></span>
                                    Our Mission
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Our mission is to democratize access to credit by connecting borrowers with a network of trusted lenders. We aim to eliminate the complexities of traditional lending, providing a platform where transparency and speed are the standards, not the exceptions.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-secondary mb-4 flex items-center">
                                    <span className="w-8 h-1 bg-primary mr-4 rounded-full"></span>
                                    Our Vision
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    We envision a future where financial support is accessible to everyone at the click of a button. By fostering a community of reliable lenders and informed borrowers, we strive to become the most trusted digital loan platform globally.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80" 
                                alt="Professional collaboration" 
                                className="relative rounded-3xl shadow-2xl w-full object-cover z-10"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* What We Offer Section */}
            <div className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary">What We Offer</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Comprehensive financial solutions tailored to your unique requirements.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Personal Loans",
                                description: "Quick funds for life's unexpected moments, from medical emergencies to dream weddings.",
                                icon: "💳"
                            },
                            {
                                title: "Business Loans",
                                description: "Fuel your entrepreneurial journey with capital designed for growth and expansion.",
                                icon: "📈"
                            },
                            {
                                title: "Home & Auto Loans",
                                description: "Competitive rates to help you secure the keys to your new home or vehicle.",
                                icon: "🏠"
                            },
                            {
                                title: "Debt Consolidation",
                                description: "Simplify your finances by merging multiple debts into one manageable monthly payment.",
                                icon: "🔄"
                            },
                            {
                                title: "Education Loans",
                                description: "Invest in your future with flexible repayment plans for higher studies.",
                                icon: "🎓"
                            },
                            {
                                title: "Instant Approvals",
                                description: "Our automated matching system ensures you get offers from lenders in record time.",
                                icon: "⚡"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-secondary mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8">Why Choose Us?</h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: "Trusted Lenders",
                                        desc: "We partner only with verified and reputable financial institutions to ensure your peace of mind."
                                    },
                                    {
                                        title: "Transparency First",
                                        desc: "No hidden charges or complex jargon. We provide clear terms so you can make informed decisions."
                                    },
                                    {
                                        title: "Bank-Grade Security",
                                        desc: "Your data security is our top priority. We use advanced encryption to protect your personal information."
                                    },
                                    {
                                        title: "Customer-Centric Support",
                                        desc: "Our dedicated team is always here to guide you through every step of your loan application."
                                    }
                                ].map((reason, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-secondary">{reason.title}</h4>
                                            <p className="text-gray-600">{reason.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-8">
                                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-lg" alt="Support" />
                                <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-lg" alt="Finance" />
                            </div>
                            <div className="space-y-4">
                                <img src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-lg" alt="Growth" />
                                <img src="https://images.unsplash.com/photo-1521791136064-7986c2959213?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-lg" alt="Trust" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-secondary py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                        <div className="p-4">
                            <div className="text-4xl font-bold text-primary mb-2">100k+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Happy Borrowers</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-white mb-2">₹500Cr+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Loans Facilitated</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-primary mb-2">500+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Verified Lenders</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-white mb-2">24/7</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Support Available</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary-light py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-secondary mb-6">Experience Transparent Lending Today</h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who found their perfect loan match through Offer Me Loan.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a href="/#apply-now" className="px-10 py-4 bg-secondary text-white font-bold rounded-full hover:bg-gray-900 transition-all shadow-xl transform hover:-translate-y-1">
                            Get Started Now
                        </a>
                        <a href="/contact-us" className="px-10 py-4 bg-white text-secondary font-bold rounded-full border-2 border-secondary/10 hover:bg-gray-50 transition-all shadow-xl transform hover:-translate-y-1">
                            Contact Our Experts
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsScreen;
