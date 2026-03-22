import React from 'react';
import { useUI } from '../App';
import EMICalculator from '../components/EMICalculator';
import { ShieldCheck, CheckCircle2, FileText, Banknote, Clock, Home, Car, Briefcase, GraduationCap, Building, Coins, RefreshCw } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-secondary mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border-b border-gray-200 py-4">
            <button 
                className="w-full text-left flex justify-between items-center focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-bold text-secondary text-lg">{question}</span>
                <span className="text-primary ml-4 text-2xl leading-none">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <p className="mt-4 text-gray-600 leading-relaxed">{answer}</p>}
        </div>
    );
};

interface LoanData {
    title: string;
    heroImage: string;
    heroSubtitle: string;
    heroDescription: string;
    maxAmount: string;
    interestRate: string;
    tenure: string;
    processingFee: string;
    features: { icon: React.ReactNode; title: string; description: string }[];
    eligibility: string[];
    documents: string[];
    faqs: { question: string; answer: string }[];
}

const loanDataMap: Record<string, LoanData> = {
    '/home-loan': {
        title: 'Home Loans',
        heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        heroSubtitle: 'Build Your Dream Home',
        heroDescription: 'Get the best interest rates on home loans with flexible repayment options and quick processing. Make your dream home a reality today.',
        maxAmount: 'Up to ₹5 Cr',
        interestRate: '8.35%* p.a.',
        tenure: 'Up to 30 Yrs',
        processingFee: '0.5%*',
        features: [
            { icon: <Home />, title: 'High Loan Amount', description: 'Get up to 90% of the property value as a loan.' },
            { icon: <Clock />, title: 'Long Tenure', description: 'Flexible repayment tenure up to 30 years.' },
            { icon: <Banknote />, title: 'Tax Benefits', description: 'Save tax under Section 80C and 24(b) of the Income Tax Act.' }
        ],
        eligibility: ['Age: 21 to 65 years', 'Resident Indian or NRI', 'Salaried or Self-employed', 'Minimum CIBIL score of 700'],
        documents: ['Identity Proof (Aadhaar/PAN)', 'Address Proof', 'Income Proof (Salary slips/ITR)', 'Property Documents'],
        faqs: [
            { question: 'What is the maximum home loan amount I can get?', answer: 'You can get up to 90% of the property value, subject to your income and repayment capacity.' },
            { question: 'Can I prepay my home loan?', answer: 'Yes, you can prepay your home loan. No prepayment charges apply for floating rate home loans for individuals.' }
        ]
    },
    '/vehicle-loan': {
        title: 'Vehicle Loans',
        heroImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        heroSubtitle: 'Drive Your Dream Car',
        heroDescription: 'Get behind the wheel with our fast and easy vehicle loans. Enjoy up to 100% on-road funding and competitive interest rates.',
        maxAmount: 'Up to 100%',
        interestRate: '8.75%* p.a.',
        tenure: 'Up to 7 Yrs',
        processingFee: 'Minimal',
        features: [
            { icon: <Car />, title: '100% Funding', description: 'Get up to 100% on-road funding for select car models.' },
            { icon: <Clock />, title: 'Quick Approval', description: 'Instant approval for pre-approved customers.' },
            { icon: <Banknote />, title: 'Special EV Rates', description: 'Get discounted interest rates on Electric Vehicles.' }
        ],
        eligibility: ['Age: 21 to 60 years', 'Minimum 1 year of employment/business vintage', 'Minimum income of ₹25,000/month'],
        documents: ['Identity Proof', 'Address Proof', 'Last 3 months salary slips or ITR', 'Proforma Invoice of the vehicle'],
        faqs: [
            { question: 'Do you finance used cars?', answer: 'Yes, we offer loans for both new and pre-owned vehicles.' },
            { question: 'Is a guarantor required?', answer: 'A guarantor is generally not required unless the credit profile does not meet our standard criteria.' }
        ]
    },
    '/business-loan': {
        title: 'Business Loans',
        heroImage: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        heroSubtitle: 'Fuel Your Business Growth',
        heroDescription: 'Unsecured business loans to help you expand your operations, manage working capital, or upgrade machinery.',
        maxAmount: 'Up to ₹50L',
        interestRate: '12.00%* p.a.',
        tenure: '12 - 60 Mos',
        processingFee: 'Up to 2%',
        features: [
            { icon: <Briefcase />, title: 'Collateral Free', description: 'No security or collateral required for loans up to ₹50 Lakhs.' },
            { icon: <Clock />, title: 'Fast Disbursal', description: 'Funds credited to your account within 48 hours of approval.' },
            { icon: <RefreshCw />, title: 'Overdraft Facility', description: 'Pay interest only on the amount you utilize.' }
        ],
        eligibility: ['Business vintage of minimum 3 years', 'Profitable operations for the last 2 years', 'Minimum annual turnover of ₹40 Lakhs'],
        documents: ['KYC Documents of Promoters', 'Business Proof (GST/Registration)', 'Last 2 years ITR and Financials', 'Last 6 months bank statements'],
        faqs: [
            { question: 'What can I use the business loan for?', answer: 'You can use it for working capital, buying inventory, upgrading equipment, or expanding your business.' },
            { question: 'Do I need to provide collateral?', answer: 'No, our standard business loans up to ₹50 Lakhs are completely unsecured.' }
        ]
    },
    '/student-loan': {
        title: 'Student Loans',
        heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        heroSubtitle: 'Invest in Your Future',
        heroDescription: 'Comprehensive education loans covering tuition, accommodation, and living expenses for studies in India and abroad.',
        maxAmount: 'Up to ₹1.5 Cr',
        interestRate: '9.00%* p.a.',
        tenure: 'Up to 15 Yrs',
        processingFee: 'Nil*',
        features: [
            { icon: <GraduationCap />, title: '100% Coverage', description: 'Covers tuition fees, hostel charges, laptops, and travel expenses.' },
            { icon: <Clock />, title: 'Moratorium Period', description: 'Repayment starts after course completion + 6 months to 1 year.' },
            { icon: <Banknote />, title: 'Tax Benefits', description: 'Unlimited tax deduction on interest paid under Section 80E.' }
        ],
        eligibility: ['Indian national', 'Secured admission to a recognized university/college', 'Co-applicant (parent/guardian) required'],
        documents: ['Admission Letter', 'Fee Structure', 'KYC of Student and Co-applicant', 'Income proof of Co-applicant'],
        faqs: [
            { question: 'When do I have to start repaying the loan?', answer: 'Repayment typically starts 6 months to 1 year after you complete your course or get a job, whichever is earlier.' },
            { question: 'Is collateral required for an education loan?', answer: 'Loans up to ₹7.5 Lakhs generally do not require collateral. Higher amounts may require tangible collateral or a third-party guarantee.' }
        ]
    },
    '/mortgage-loan': {
        title: 'Mortgage Loans',
        heroImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        heroSubtitle: 'Unlock Your Property\'s Value',
        heroDescription: 'Loan Against Property (LAP) to meet your personal or business needs at lower interest rates by leveraging your real estate.',
        maxAmount: 'Up to ₹10 Cr',
        interestRate: '9.50%* p.a.',
        tenure: 'Up to 15 Yrs',
        processingFee: '1%',
        features: [
            { icon: <Building />, title: 'High Value Loans', description: 'Get up to 70% of your property\'s market value.' },
            { icon: <Clock />, title: 'Longer Tenure', description: 'Enjoy lower EMIs with repayment tenures up to 15 years.' },
            { icon: <CheckCircle2 />, title: 'Any Purpose', description: 'Use the funds for business expansion, marriage, medical emergencies, etc.' }
        ],
        eligibility: ['Property must be residential or commercial', 'Clear title and ownership', 'Stable income source to service the EMI'],
        documents: ['Property Title Deeds', 'KYC Documents', 'Income Proof (ITR/Salary Slips)', 'Bank Statements'],
        faqs: [
            { question: 'Can I get a loan against a vacant plot?', answer: 'Generally, loans are provided against constructed residential or commercial properties. Plots may have stricter criteria.' },
            { question: 'Will I have to hand over original property documents?', answer: 'Yes, the original title deeds will be kept securely with the bank until the loan is fully repaid.' }
        ]
    },
    '/gold-loan': {
        title: 'Gold Loans',
        heroImage: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        heroSubtitle: 'Instant Cash Against Gold',
        heroDescription: 'Get instant funds by pledging your gold ornaments. Enjoy the highest per-gram rate and lowest interest charges.',
        maxAmount: 'Up to ₹1.5 Cr',
        interestRate: '8.99%* p.a.',
        tenure: 'Up to 36 Mos',
        processingFee: 'Zero*',
        features: [
            { icon: <Coins />, title: 'Instant Disbursal', description: 'Get cash or account transfer within 30 minutes.' },
            { icon: <ShieldCheck />, title: '100% Safe', description: 'Your gold is stored in highly secure bank vaults.' },
            { icon: <RefreshCw />, title: 'Flexible Repayment', description: 'Pay interest monthly and principal at the end, or regular EMIs.' }
        ],
        eligibility: ['Age: 18 to 75 years', 'Must possess gold ornaments of 18K to 24K purity'],
        documents: ['Identity Proof (Aadhaar/Voter ID/Passport)', 'Address Proof', 'No income proof required'],
        faqs: [
            { question: 'How is the gold valued?', answer: 'Your gold is valued based on its purity and weight using the current market rate.' },
            { question: 'What happens if I cannot repay on time?', answer: 'We will send reminders. If unpaid for a long period, the pledged gold may be auctioned to recover the dues as per RBI guidelines.' }
        ]
    },
    '/loan-transfer': {
        title: 'Loan Transfer',
        heroImage: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        heroSubtitle: 'Lower Your EMI Burden',
        heroDescription: 'Transfer your existing high-interest loans to us and save big on interest payments. Get top-up loans easily.',
        maxAmount: 'As per existing',
        interestRate: '10.25%* p.a.',
        tenure: 'Flexible',
        processingFee: 'Minimal',
        features: [
            { icon: <RefreshCw />, title: 'Lower Rates', description: 'Significantly reduce your interest rate and EMI.' },
            { icon: <Banknote />, title: 'Top-up Facility', description: 'Get additional funds over and above your transferred loan amount.' },
            { icon: <FileText />, title: 'Minimal Paperwork', description: 'Fast-track processing based on your existing loan track record.' }
        ],
        eligibility: ['Existing loan with another bank/NBFC', 'Clear repayment track record for at least 6-12 months', 'Good CIBIL score'],
        documents: ['Existing Loan Account Statement', 'Foreclosure Letter', 'KYC Documents', 'Income Proof'],
        faqs: [
            { question: 'What is a balance transfer?', answer: 'It is the process of transferring your outstanding loan amount from one lender to another to avail a lower interest rate.' },
            { question: 'Are there charges for transferring a loan?', answer: 'Your existing lender may charge a foreclosure fee, and we may charge a nominal processing fee. However, the overall interest savings usually outweigh these costs.' }
        ]
    }
};

const GenericLoanScreen: React.FC = () => {
    const { openApplyModal } = useUI();
    const currentPath = window.location.pathname;
    const loanData = loanDataMap[currentPath] || loanDataMap['/home-loan'];

    return (
        <div className="bg-white font-sans text-gray-700 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-secondary py-20 lg:py-28 isolate overflow-hidden">
                <img
                    src={loanData.heroImage}
                    alt={loanData.title}
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-10"
                    referrerPolicy="no-referrer"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold text-sm mb-6 border border-primary/30">
                            <ShieldCheck className="w-4 h-4" />
                            100% Secure Process
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                            {loanData.heroSubtitle}
                        </h1>
                        <p className="mt-4 text-lg leading-8 text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                            {loanData.heroDescription}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button 
                                onClick={openApplyModal}
                                className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary-dark transition-colors text-lg"
                            >
                                Apply Now
                            </button>
                            <a 
                                href="#emi-calculator"
                                className="px-8 py-4 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-colors text-lg text-center"
                            >
                                Calculate EMI
                            </a>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full max-w-md lg:max-w-none">
                        <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 transform lg:rotate-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Interest Rate</p>
                                    <p className="text-xl font-extrabold text-secondary">{loanData.interestRate}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Loan Amount</p>
                                    <p className="text-xl font-extrabold text-secondary">{loanData.maxAmount}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Tenure</p>
                                    <p className="text-xl font-extrabold text-secondary">{loanData.tenure}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Processing</p>
                                    <p className="text-xl font-extrabold text-secondary">{loanData.processingFee}</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <p className="text-sm text-gray-500 text-center mb-4">Trusted by over 10,000+ customers</p>
                                <button onClick={openApplyModal} className="w-full py-3 bg-secondary text-white font-bold rounded-xl hover:bg-secondary-dark transition-colors">
                                    Check Eligibility in 1 Min
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">Features & Benefits</h2>
                        <p className="text-lg text-gray-600">Why choose our {loanData.title.toLowerCase()}? Here are the key advantages.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {loanData.features.map((feature, idx) => (
                            <FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} />
                        ))}
                    </div>
                </div>
            </div>

            {/* EMI Calculator Section */}
            <div id="emi-calculator" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">{loanData.title} EMI Calculator</h2>
                        <p className="text-lg text-gray-600">Plan your repayment easily. Adjust the sliders to find an EMI that fits your budget.</p>
                    </div>
                    <EMICalculator />
                </div>
            </div>

            {/* Eligibility & Documents */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">Eligibility & Documentation</h2>
                        <p className="text-lg text-gray-600">Simple criteria and minimal paperwork to get your loan approved faster.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                                <CheckCircle2 className="text-primary w-8 h-8" />
                                Eligibility Criteria
                            </h3>
                            <ul className="space-y-4">
                                {loanData.eligibility.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-sm font-bold">✓</span>
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                                <FileText className="text-accent w-8 h-8" />
                                Required Documents
                            </h3>
                            <ul className="space-y-4">
                                {loanData.documents.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-accent/10 text-accent-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-sm font-bold">✓</span>
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">Frequently Asked Questions</h2>
                        <p className="text-lg text-gray-600">Got questions? We've got answers.</p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                        {loanData.faqs.map((faq, idx) => (
                            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to get your {loanData.title}?</h2>
                    <p className="text-xl text-primary-light mb-10">Apply online in just 2 minutes and get instant approval.</p>
                    <button 
                        onClick={openApplyModal}
                        className="inline-block px-10 py-4 bg-white text-primary font-bold rounded-full shadow-xl hover:bg-gray-50 hover:shadow-2xl transition-all transform hover:-translate-y-1 text-lg"
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenericLoanScreen;
