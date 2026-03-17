
import React from 'react';
import { useUI } from '../App';

const AboutUsScreen: React.FC = () => {
    const { openApplyModal } = useUI();

    return (
        <div className="bg-white font-sans text-gray-700 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-secondary py-24 sm:py-32 isolate overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Digital Bridge"
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
                    referrerPolicy="no-referrer"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                        The Digital Bridge Between <span className="text-primary">You and Your Loan</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                        Whether it’s a personal, business, or home loan, we simplify the process by matching you with trusted lenders based on your needs and location. Start your loan journey with confidence.
                    </p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="space-y-16">
                        
                        {/* Section 1 */}
                        <div className="bg-gray-50 p-12 md:p-16 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1">
                                <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8">One Platform Endless Loan Options</h2>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    OfferMeLoan connects you with verified agents, banks, and NBFCs - helping you find, compare, and apply for the right loan, all in one place. Fast, transparent, and hassle-free.
                                </p>
                            </div>
                            <div className="flex-1 w-full">
                                <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Endless Loan Options" className="rounded-2xl shadow-md w-full h-80 md:h-96 object-cover" referrerPolicy="no-referrer" />
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="bg-white p-12 md:p-16 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row-reverse items-center gap-12">
                            <div className="flex-1">
                                <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8">Our Objective</h2>
                                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                                    OfferMeLoan is a digital platform connecting loan seekers with banks, NBFCs, and verified agents. We offer a new, tech-driven approach to loan processing - transparent, efficient, and user-friendly.
                                </p>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Our tools like chat, document tracking, and secure storage ensure smooth communication between borrowers and lenders - all on one platform.
                                </p>
                            </div>
                            <div className="flex-1 w-full">
                                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Our Objective" className="rounded-2xl shadow-md w-full h-80 md:h-96 object-cover" referrerPolicy="no-referrer" />
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="bg-gray-50 p-12 md:p-16 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1">
                                <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8">Our Team</h2>
                                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                                    Our expert team works tirelessly to deliver reliable access to loans at competitive rates. As a trusted digital mediator, we focus on transparency and convenience - not replacing lenders, but connecting them better.
                                </p>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    We believe in the power of technology to simplify finance and empower people.
                                </p>
                            </div>
                            <div className="flex-1 w-full">
                                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Our Team" className="rounded-2xl shadow-md w-full h-80 md:h-96 object-cover" referrerPolicy="no-referrer" />
                            </div>
                        </div>

                    </div>

                    <div className="mt-16 text-center">
                        <button 
                            onClick={openApplyModal}
                            className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary-dark transition-colors"
                        >
                            Apply for a Loan Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsScreen;
