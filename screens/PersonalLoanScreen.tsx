import React from 'react';
import { useUI } from '../App';
import EMICalculator from '../components/EMICalculator';
import { CheckCircle2, Clock, FileText, Banknote, Plane, HeartPulse, Home, Users, ShieldCheck } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-secondary mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const LoanTypeCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex gap-4 items-start p-6 bg-gray-50 rounded-2xl border border-gray-100">
        <div className="w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-bold text-secondary mb-1">{title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
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

const PersonalLoanScreen: React.FC = () => {
    const { openApplyModal } = useUI();

    return (
        <div className="bg-white font-sans text-gray-700 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-secondary py-20 lg:py-28 isolate overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Personal Loan"
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-10"
                    referrerPolicy="no-referrer"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold text-sm mb-6 border border-primary/30">
                            <ShieldCheck className="w-4 h-4" />
                            100% Paperless Process
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                            Instant Personal Loan up to <span className="text-primary">₹40 Lakhs</span>
                        </h1>
                        <p className="mt-4 text-lg leading-8 text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                            Fulfill your dreams with our quick and hassle-free personal loans. Enjoy competitive interest rates, flexible repayment tenures, and minimal documentation.
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
                                    <p className="text-xl font-extrabold text-secondary">10.49%* p.a.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Loan Amount</p>
                                    <p className="text-xl font-extrabold text-secondary">Up to ₹40L</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Tenure</p>
                                    <p className="text-xl font-extrabold text-secondary">12 - 84 Mos</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Processing</p>
                                    <p className="text-xl font-extrabold text-secondary">Instant</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">Features & Benefits</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Experience a seamless borrowing journey with features designed to put your needs first.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard 
                            icon={<Banknote className="w-6 h-6" />}
                            title="High Loan Amount"
                            description="Get access to funds up to ₹40 Lakhs to meet all your financial requirements without compromise."
                        />
                        <FeatureCard 
                            icon={<Clock className="w-6 h-6" />}
                            title="Flexible Tenure"
                            description="Choose a repayment period that suits your budget, ranging from 12 to 84 months."
                        />
                        <FeatureCard 
                            icon={<CheckCircle2 className="w-6 h-6" />}
                            title="Quick Disbursal"
                            description="Experience lightning-fast processing with funds disbursed directly to your bank account."
                        />
                        <FeatureCard 
                            icon={<FileText className="w-6 h-6" />}
                            title="Minimal Documentation"
                            description="Enjoy a 100% paperless process with simple KYC and income verification."
                        />
                    </div>
                </div>
            </div>

            {/* EMI Calculator Section */}
            <div id="emi-calculator" className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">Personal Loan EMI Calculator</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Plan your repayment easily. Adjust the sliders below to calculate your monthly EMI.</p>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <EMICalculator />
                    </div>
                </div>
            </div>

            {/* Types of Personal Loans */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/3">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-6">A Loan for Every Milestone</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Life is full of surprises and celebrations. Our personal loans are designed to be versatile, so you can use the funds exactly how you need them.
                            </p>
                            <button 
                                onClick={openApplyModal}
                                className="px-8 py-3 bg-secondary text-white font-bold rounded-full shadow-md hover:bg-secondary-dark transition-colors"
                            >
                                Check Eligibility
                            </button>
                        </div>
                        <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
                            <LoanTypeCard 
                                icon={<Users className="w-5 h-5" />}
                                title="Wedding Loan"
                                description="Make your special day perfect without compromising on your dream venue, attire, or guest list."
                            />
                            <LoanTypeCard 
                                icon={<Plane className="w-5 h-5" />}
                                title="Travel Loan"
                                description="Explore the world and tick off your bucket list destinations with easy financing."
                            />
                            <LoanTypeCard 
                                icon={<HeartPulse className="w-5 h-5" />}
                                title="Medical Emergency"
                                description="Get instant funds for unexpected medical bills, surgeries, or treatments."
                            />
                            <LoanTypeCard 
                                icon={<Home className="w-5 h-5" />}
                                title="Home Renovation"
                                description="Upgrade your living space, buy new furniture, or repair your home effortlessly."
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Eligibility & Documentation */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">Eligibility & Documentation</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Keep these basic requirements ready for a smooth and instant approval process.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Eligibility */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary-light text-primary rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                Eligibility Criteria
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-600"><strong className="text-secondary">Age:</strong> 21 to 60 years</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-600"><strong className="text-secondary">Employment:</strong> Salaried employees of public/private limited companies or government sector.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-600"><strong className="text-secondary">Income:</strong> Minimum net monthly income of ₹15,000.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-600"><strong className="text-secondary">Credit Score:</strong> A CIBIL score of 750 or above is preferred for the best rates.</p>
                                </li>
                            </ul>
                        </div>

                        {/* Documentation */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-accent/20 text-accent-dark rounded-full flex items-center justify-center">
                                    <FileText className="w-5 h-5" />
                                </div>
                                Required Documents
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-600"><strong className="text-secondary">Identity Proof:</strong> PAN Card / Aadhaar Card / Passport / Voter ID.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-600"><strong className="text-secondary">Address Proof:</strong> Aadhaar Card / Utility Bill / Passport / Driving License.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-600"><strong className="text-secondary">Income Proof:</strong> Latest 2 months' salary slips.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-600"><strong className="text-secondary">Bank Statement:</strong> Latest 3 months' bank statement showing salary credits.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interest Rates & Charges */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">Interest Rates & Charges</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Transparent pricing with no hidden surprises. Here are the applicable charges for your personal loan.</p>
                    </div>
                    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="py-4 px-6 font-bold text-secondary">Fee/Charge Type</th>
                                    <th className="py-4 px-6 font-bold text-secondary">Amount/Rate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-gray-700 font-medium">Interest Rate</td>
                                    <td className="py-4 px-6 text-gray-600">Starting from 10.49% p.a.</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-gray-700 font-medium">Processing Fee</td>
                                    <td className="py-4 px-6 text-gray-600">Up to 2% of the loan amount + GST</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-gray-700 font-medium">Prepayment/Foreclosure Charges</td>
                                    <td className="py-4 px-6 text-gray-600">0% - 5% depending on the tenure completed</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-gray-700 font-medium">Late Payment Penalty</td>
                                    <td className="py-4 px-6 text-gray-600">2% per month on the overdue EMI amount</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-gray-700 font-medium">Stamp Duty</td>
                                    <td className="py-4 px-6 text-gray-600">As per state laws</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* How to Apply */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">How to Apply for a Personal Loan?</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Get your loan disbursed in 4 simple steps.</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
                        
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center relative z-10 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-white shadow-sm">1</div>
                            <h3 className="text-lg font-bold text-secondary mb-2">Fill the Form</h3>
                            <p className="text-sm text-gray-600">Provide your basic details and check your eligibility instantly.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center relative z-10 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-white shadow-sm">2</div>
                            <h3 className="text-lg font-bold text-secondary mb-2">Choose Offer</h3>
                            <p className="text-sm text-gray-600">Select the loan amount and tenure that best suits your needs.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center relative z-10 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-white shadow-sm">3</div>
                            <h3 className="text-lg font-bold text-secondary mb-2">Upload Documents</h3>
                            <p className="text-sm text-gray-600">Complete your KYC and income verification online.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center relative z-10 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-white shadow-sm">4</div>
                            <h3 className="text-lg font-bold text-secondary mb-2">Get Funds</h3>
                            <p className="text-sm text-gray-600">Receive the loan amount directly in your bank account.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600 text-lg">Got questions? We've got answers.</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <div className="space-y-2">
                            <FAQItem 
                                question="What is the maximum personal loan amount I can get?"
                                answer="You can avail a personal loan of up to ₹40 Lakhs, subject to your income, credit score, and repayment capacity."
                            />
                            <FAQItem 
                                question="How long does it take for the loan to be disbursed?"
                                answer="Once your application is approved and documents are verified, the loan amount is typically disbursed within 24 to 48 hours. For pre-approved customers, it can be instant."
                            />
                            <FAQItem 
                                question="Can I prepay or foreclose my personal loan?"
                                answer="Yes, you can prepay or foreclose your personal loan. However, foreclosure charges may apply depending on the tenure completed. Please refer to our charges section for details."
                            />
                            <FAQItem 
                                question="Do I need to provide any collateral or security?"
                                answer="No, our personal loans are unsecured, which means you do not need to provide any collateral or security to avail the loan."
                            />
                            <FAQItem 
                                question="How does my credit score affect my personal loan application?"
                                answer="A higher credit score (typically 750 and above) indicates good credit health, which increases your chances of approval and helps you secure a lower interest rate."
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-primary-light py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-secondary mb-6">Ready to get your Personal Loan?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Apply online in minutes and get instant approval. No hidden charges, complete transparency.</p>
                    <button 
                        onClick={openApplyModal}
                        className="inline-block px-10 py-4 bg-primary text-white font-bold rounded-full shadow-xl hover:bg-primary-dark hover:shadow-2xl transition-all transform hover:-translate-y-1 text-lg"
                    >
                        Apply for a Personal Loan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalLoanScreen;
