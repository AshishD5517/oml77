import React from 'react';
import { useUI } from '../App';

const PersonalLoanScreen: React.FC = () => {
    const { openApplyModal } = useUI();

    return (
        <div className="bg-white font-sans text-gray-700 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-secondary py-24 sm:py-32 isolate overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Personal Loan"
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
                    referrerPolicy="no-referrer"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Achieve Your Dreams with a <span className="text-primary">Personal Loan</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                        Whether it's a medical emergency, a dream vacation, or consolidating debt, our personal loans offer quick approvals, competitive interest rates, and flexible repayment options.
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
                                <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8">Why Choose a Personal Loan?</h2>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Personal loans are unsecured loans, meaning you don't need to pledge any collateral. They provide instant access to funds, making them the perfect solution for urgent financial needs.
                                </p>
                            </div>
                            <div className="flex-1 w-full">
                                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Why Choose a Personal Loan" className="rounded-2xl shadow-md w-full h-80 md:h-96 object-cover" referrerPolicy="no-referrer" />
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="bg-white p-12 md:p-16 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row-reverse items-center gap-12">
                            <div className="flex-1">
                                <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8">Features & Benefits</h2>
                                <ul className="text-xl text-gray-600 leading-relaxed space-y-4 list-disc list-inside">
                                    <li><strong>Quick Disbursal:</strong> Get funds in your account within 24 to 48 hours.</li>
                                    <li><strong>No Collateral Required:</strong> Borrow without pledging any assets.</li>
                                    <li><strong>Flexible Tenure:</strong> Choose a repayment period from 12 to 60 months.</li>
                                    <li><strong>Minimal Documentation:</strong> Simple and hassle-free application process.</li>
                                </ul>
                            </div>
                            <div className="flex-1 w-full">
                                <img src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Features & Benefits" className="rounded-2xl shadow-md w-full h-80 md:h-96 object-cover" referrerPolicy="no-referrer" />
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="bg-gray-50 p-12 md:p-16 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1">
                                <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8">Eligibility Criteria</h2>
                                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                                    To apply for a personal loan, you must meet basic eligibility requirements such as age, income, and credit score. A good credit score ensures lower interest rates and faster approvals.
                                </p>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Our platform connects you with multiple lenders, increasing your chances of finding the best offer that matches your profile.
                                </p>
                            </div>
                            <div className="flex-1 w-full">
                                <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Eligibility Criteria" className="rounded-2xl shadow-md w-full h-80 md:h-96 object-cover" referrerPolicy="no-referrer" />
                            </div>
                        </div>

                    </div>

                    <div className="mt-16 text-center">
                        <button 
                            onClick={openApplyModal}
                            className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary-dark transition-colors"
                        >
                            Apply for a Personal Loan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalLoanScreen;
