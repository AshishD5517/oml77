import React, { useState, useEffect, useRef } from 'react';

interface ApplyLoanModalProps {
  onClose: () => void;
}

// --- ICONS ---
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);
const LoanTypeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
    </svg>
);
const AmountIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
       <path d="M8.433 7.418c.158-.103.346-.195.574-.277a6.213 6.213 0 014.228 0c.228.082.416.174.574.277a1 1 0 01.567 1.706c-.158.103-.346.195-.574.277a6.213 6.213 0 01-4.228 0c-.228-.082-.416-.174-.574-.277a1 1 0 01.567-1.706z" />
       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
    </svg>
);
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
);
const SpinnerIcon = () => (
    <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-primary" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);
// --- END ICONS ---

const ProgressBar: React.FC<{ step: number }> = ({ step }) => {
    const width = step === 1 ? '0%' : step === 2 ? '50%' : '100%';
    return (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width }}></div>
        </div>
    );
};

const locations = [
    "Agra, Uttar Pradesh", "Ahmedabad, Gujarat", "Ajmer, Rajasthan", "Aligarh, Uttar Pradesh",
    "Allahabad, Uttar Pradesh", "Amravati, Maharashtra", "Amritsar, Punjab",
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh",
    "Asansol, West Bengal", "Assam", "Aurangabad, Maharashtra", "Bareilly, Uttar Pradesh",
    "Belgaum, Karnataka", "Bengaluru, Karnataka", "Bhilai, Chhattisgarh", "Bhiwandi, Maharashtra",
    "Bhopal, Madhya Pradesh", "Bhubaneswar, Odisha", "Bihar", "Bikaner, Rajasthan", "Chandigarh",
    "Chennai, Tamil Nadu", "Chhattisgarh", "Coimbatore, Tamil Nadu", "Cuttack, Odisha",
    "Dadra and Nagar Haveli and Daman and Diu", "Dehradun, Uttarakhand", "Delhi",
    "Dhanbad, Jharkhand", "Durgapur, West Bengal", "Faridabad, Haryana", "Firozabad, Uttar Pradesh",
    "Ghaziabad, Uttar Pradesh", "Goa", "Gorakhpur, Uttar Pradesh", "Gujarat", "Gulbarga, Karnataka",
    "Guntur, Andhra Pradesh", "Gurgaon, Haryana", "Guwahati, Assam", "Gwalior, Madhya Pradesh",
    "Haryana", "Himachal Pradesh", "Howrah, West Bengal", "Hubli-Dharwad, Karnataka",
    "Hyderabad, Telangana", "Indore, Madhya Pradesh", "Jabalpur, Madhya Pradesh", "Jaipur, Rajasthan",
    "Jalandhar, Punjab", "Jalgaon, Maharashtra", "Jammu and Kashmir", "Jammu, Jammu and Kashmir",
    "Jamnagar, Gujarat", "Jamshedpur, Jharkhand", "Jharkhand", "Jhansi, Uttar Pradesh",
    "Jodhpur, Rajasthan", "Kanpur, Uttar Pradesh", "Karnataka", "Kerala", "Kochi, Kerala",
    "Kolhapur, Maharashtra", "Kolkata, West Bengal", "Kota, Rajasthan", "Ladakh", "Lakshadweep",
    "Loni, Uttar Pradesh", "Lucknow, Uttar Pradesh", "Ludhiana, Punjab", "Madhya Pradesh",
    "Madurai, Tamil Nadu", "Maharashtra", "Malegaon, Maharashtra", "Mangalore, Karnataka",
    "Manipur", "Meghalaya", "Meerut, Uttar Pradesh", "Mizoram", "Mumbai, Maharashtra",
    "Mysuru, Karnataka", "Nagaland", "Nagpur, Maharashtra", "Nanded, Maharashtra",
    "Nashik, Maharashtra", "Navi Mumbai, Maharashtra", "Nellore, Andhra Pradesh",
    "Noida, Uttar Pradesh", "Odisha", "Patna, Bihar", "Puducherry", "Pune, Maharashtra", "Punjab",
    "Raipur, Chhattisgarh", "Rajasthan", "Rajkot, Gujarat", "Ranchi, Jharkhand",
    "Saharanpur, Uttar Pradesh", "Salem, Tamil Nadu", "Sangli-Miraj & Kupwad, Maharashtra",
    "Sikkim", "Siliguri, West Bengal", "Solapur, Maharashtra", "Srinagar, Jammu and Kashmir",
    "Surat, Gujarat", "Tamil Nadu", "Telangana", "Thane, Maharashtra", "Tiruchirappalli, Tamil Nadu",
    "Tirunelveli, Tamil Nadu", "Tiruppur, Tamil Nadu", "Tripura", "Udaipur, Rajasthan",
    "Ujjain, Madhya Pradesh", "Ulhasnagar, Maharashtra", "Uttar Pradesh", "Uttarakhand",
    "Vadodara, Gujarat", "Varanasi, Uttar Pradesh", "Vijayawada, Andhra Pradesh",
    "Visakhapatnam, Andhra Pradesh", "Warangal, Telangana", "West Bengal"
];


const SearchableDropdown: React.FC<{
    options: string[];
    value: string;
    onChange: (e: React.ChangeEvent<{ name: string; value: string }>) => void;
    name: string;
    placeholder: string;
}> = ({ options, value, onChange, name, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option: string) => {
        const event = {
            target: { name, value: option },
        } as React.ChangeEvent<{ name: string; value: string }>;
        onChange(event);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LocationIcon />
            </div>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
            >
                {value ? (
                    <span className="text-black">{value}</span>
                ) : (
                    <span className="text-gray-500">{placeholder}</span>
                )}
                <span className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon />
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
                    <div className="p-2 sticky top-0 bg-white">
                        <input
                            type="text"
                            placeholder="Search location..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <ul className="py-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(option => (
                                <li
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className="px-4 py-2 hover:bg-primary-light hover:text-primary cursor-pointer text-sm"
                                >
                                    {option}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-500 text-sm">No locations found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

const ApplyLoanModal: React.FC<ApplyLoanModalProps> = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        location: '',
        loanType: '',
        amount: '50000',
        name: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('Submitting your request...');
    
    useEffect(() => {
        if (isSubmitting) {
            const messages = ['Analyzing your profile...', 'Connecting with top agents...', 'Finding the best offers...'];
            let msgIndex = 0;
            const intervalId = setInterval(() => {
                setSubmissionMessage(messages[msgIndex % messages.length]);
                msgIndex++;
            }, 1500);

            setTimeout(() => {
                clearInterval(intervalId);
                setIsSubmitting(false);
                setStep(4); // Move to success step
            }, 4500);

            return () => clearInterval(intervalId);
        }
    }, [isSubmitting]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | {name: string, value: string}>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(prev => prev + 1);
    };

    const handlePrevStep = () => setStep(prev => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
    };

    const renderContent = () => {
        if (isSubmitting) {
            return (
                <div className="absolute inset-0 bg-secondary bg-opacity-90 flex flex-col items-center justify-center rounded-2xl">
                    <SpinnerIcon />
                    <p className="text-white text-lg mt-4 font-semibold transition-opacity duration-300">{submissionMessage}</p>
                </div>
            );
        }

        switch (step) {
            case 1: return <Step1 formData={formData} handleChange={handleChange} handleNextStep={handleNextStep} />;
            case 2: return <Step2 formData={formData} handleChange={handleChange} handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />;
            case 3: return <Step3 formData={formData} handleSubmit={handleSubmit} handlePrevStep={handlePrevStep} />;
            case 4: return <Step4 onClose={onClose} />;
            default: return null;
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4 transform transition-all duration-300 scale-95 hover:scale-100 relative" onClick={(e) => e.stopPropagation()}>
                <div className="p-8">
                    {step < 4 && (
                        <>
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-2xl font-bold text-secondary">Apply for a Loan</h2>
                                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm">A few simple steps to connect with lenders.</p>
                            <ProgressBar step={step} />
                        </>
                    )}
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

// --- STEP COMPONENTS ---

const Step1: React.FC<{ formData: any, handleChange: any, handleNextStep: any }> = ({ formData, handleChange, handleNextStep }) => (
    <form onSubmit={handleNextStep}>
        <div className="space-y-4">
            <SearchableDropdown
                name="location"
                options={locations}
                value={formData.location}
                onChange={handleChange}
                placeholder="Select Location"
            />
            <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LoanTypeIcon /></div><select name="loanType" value={formData.loanType} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition appearance-none"><option value="" disabled>Select Loan Type</option><option>Personal Loan</option><option>Home Improvement</option><option>Auto Loan</option><option>Business Startup</option><option>Debt Consolidation</option></select></div>
            <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><AmountIcon /></div><input type="number" name="amount" placeholder="Loan Amount (₹)" value={formData.amount} onChange={handleChange} required min="50000" step="1000" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" /></div>
        </div>
        <button type="submit" className="w-full mt-8 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg">Next</button>
    </form>
);

const Step2: React.FC<{ formData: any, handleChange: any, handleNextStep: any, handlePrevStep: any }> = ({ formData, handleChange, handleNextStep, handlePrevStep }) => (
    <form onSubmit={handleNextStep}>
        <div className="space-y-4">
            <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div><input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" /></div>
            <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MailIcon /></div><input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" /></div>
        </div>
        <div className="flex space-x-4 mt-8">
            <button type="button" onClick={handlePrevStep} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">Back</button>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg">Next</button>
        </div>
    </form>
);

const Step3: React.FC<{ formData: any, handleSubmit: any, handlePrevStep: any }> = ({ formData, handleSubmit, handlePrevStep }) => (
    <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold text-secondary mb-4">Review Your Application</h3>
        <div className="bg-primary-light p-4 rounded-lg space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Location:</span><span className="font-semibold text-secondary">{formData.location || 'Not set'}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Loan Type:</span><span className="font-semibold text-secondary">{formData.loanType || 'Not set'}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Amount:</span><span className="font-semibold text-secondary">₹{Number(formData.amount).toLocaleString('en-IN') || 'Not set'}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Name:</span><span className="font-semibold text-secondary">{formData.name || 'Not set'}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Email:</span><span className="font-semibold text-secondary">{formData.email || 'Not set'}</span></div>
        </div>
        <div className="flex space-x-4 mt-8">
            <button type="button" onClick={handlePrevStep} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">Back</button>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg">Submit Application</button>
        </div>
    </form>
);

const Step4: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="text-center flex flex-col items-center">
        <CheckCircleIcon />
        <h2 className="text-2xl font-bold text-secondary mt-4">Application Submitted!</h2>
        <p className="text-gray-600 mt-2 mb-6">We've sent your request to our network of loan agents. You'll receive notifications as offers come in.</p>
        <button onClick={onClose} className="w-full max-w-xs bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg">Done</button>
    </div>
);


export default ApplyLoanModal;