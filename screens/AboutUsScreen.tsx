
import React from 'react';

const AboutUsScreen: React.FC = () => {
    return (
        <div className="bg-white font-sans text-gray-700">
            {/* Hero Section */}
            <div className="relative bg-secondary py-24 sm:py-32 isolate overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                    alt="Modern office environment"
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
                     <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                        About <span className="text-primary">Offer Me Loan</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                        We are a fintech marketplace dedicated to simplifying the borrowing experience in India. By leveraging technology, we bridge the gap between borrowers and verified loan agents, ensuring you get the funds you need on terms that work for you.
                    </p>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-secondary mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                To democratize access to credit by creating a transparent, efficient, and competitive marketplace. We believe that everyone deserves a fair chance at securing financial support without the hassle of traditional bureaucratic hurdles.
                            </p>
                             <h2 className="text-3xl font-bold text-secondary mb-6">Our Vision</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                To become India's most trusted financial partner, where finding a loan is as easy as sending a text. We envision a future where financial inclusion is a reality for every individual and business.
                            </p>
                        </div>
                        <div className="relative">
                             <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
                             <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
                             <img 
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                                alt="Team brainstorming" 
                                className="relative rounded-2xl shadow-2xl w-full object-cover hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-secondary py-20">
                <div className="container mx-auto px-6">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                        <div className="p-4">
                            <div className="text-4xl font-bold text-primary mb-2">50k+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Applications Processed</div>
                        </div>
                         <div className="p-4">
                            <div className="text-4xl font-bold text-white mb-2">₹100Cr+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Loan Amount Disbursed</div>
                        </div>
                         <div className="p-4">
                            <div className="text-4xl font-bold text-accent mb-2">2,500+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Verified Agents</div>
                        </div>
                         <div className="p-4">
                            <div className="text-4xl font-bold text-white mb-2">98%</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Customer Satisfaction</div>
                        </div>
                     </div>
                </div>
            </div>

            {/* Our Values Grid */}
             <div className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-secondary">Core Values</h2>
                        <p className="mt-4 text-gray-600">The principles that drive every decision we make.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Transparency', description: 'No hidden fees or terms. We believe in complete clarity for all parties involved.', icon: <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> },
                            { title: 'Security', description: 'Your data integrity is our top priority. We use bank-grade encryption to keep information safe.', icon: <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
                            { title: 'Innovation', description: 'We continuously improve our platform to provide faster matches and better user experiences.', icon: <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
                        ].map((value, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                <div className="mb-4 bg-primary-light w-16 h-16 rounded-full flex items-center justify-center">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
             </div>

            {/* Team Section */}
            <div className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-secondary">Meet The Team</h2>
                        <p className="mt-4 text-gray-600">The passionate minds behind Offer Me Loan.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {[
                            { name: 'Arjun Mehta', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { name: 'Priya Singh', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { name: 'Vikram Das', role: 'Chief Technology Officer', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                        ].map((member, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="relative mb-6 inline-block rounded-full overflow-hidden w-48 h-48 border-4 border-gray-50 shadow-lg group-hover:border-primary transition-colors">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <h3 className="text-xl font-bold text-secondary">{member.name}</h3>
                                <p className="text-primary font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary-light py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-secondary mb-6">Ready to Experience the Future of Lending?</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Whether you are looking to borrow or lend, Offer Me Loan provides the secure and efficient platform you need.
                    </p>
                     <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="/#apply-now" className="px-8 py-3 bg-secondary text-white font-bold rounded-full hover:bg-gray-900 transition shadow-lg transform hover:-translate-y-1">
                            Apply for a Loan
                        </a>
                        <a href="/contact-us" className="px-8 py-3 bg-white text-secondary font-bold rounded-full hover:bg-gray-50 transition shadow-lg transform hover:-translate-y-1">
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsScreen;
