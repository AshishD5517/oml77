import React, { useState, useEffect, useRef } from 'react';
import { useUI } from '../App';
import { UserRole } from '../types';

interface ApplyLoanModalProps {
  onClose: () => void;
  inline?: boolean;
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
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);
// --- END ICONS ---

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

const ApplyLoanModal: React.FC<ApplyLoanModalProps> = ({ onClose, inline }) => {
    const [formData, setFormData] = useState({
        location: '',
        loanType: '',
        amount: '50000',
        name: '',
        email: ''
    });
    
    const { openAuthModal } = useUI();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | {name: string, value: string}>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        openAuthModal(UserRole.BORROWER, 'register');
        if (!inline) {
            onClose();
        }
    };

    const handleClose = () => {
        if (inline) {
            setFormData({
                location: '',
                loanType: '',
                amount: '50000',
                name: '',
                email: ''
            });
        } else {
            onClose();
        }
    };

    const renderContent = () => {
        return <Step1 formData={formData} handleChange={handleChange} handleNextStep={handleNextStep} />;
    };
    
    const content = (
        <div className={`bg-white rounded-2xl shadow-xl w-full ${inline ? 'h-full max-w-none' : 'max-w-3xl m-4 transform transition-all duration-300 scale-95 hover:scale-100'} relative overflow-hidden flex flex-col md:flex-row border border-gray-200/80`} onClick={(e) => e.stopPropagation()}>
            
            {/* Left Side - Green Branding */}
            <div className="hidden md:flex md:w-5/12 bg-primary p-10 flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
                
                <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold mb-4 leading-tight">Fast & Easy<br/>Loan Application</h2>
                    <p className="text-white/80 mb-8 text-sm leading-relaxed">Get matched with the best lenders in minutes. Secure, transparent, and completely hassle-free.</p>
                    
                    <ul className="space-y-5">
                        <li className="flex items-center text-sm font-medium">
                            <svg className="w-5 h-5 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Instant Approval
                        </li>
                        <li className="flex items-center text-sm font-medium">
                            <svg className="w-5 h-5 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Lowest Interest Rates
                        </li>
                        <li className="flex items-center text-sm font-medium">
                            <svg className="w-5 h-5 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Zero Hidden Fees
                        </li>
                    </ul>
                </div>
                
                <div className="relative z-10 mt-12">
                    <div className="flex -space-x-3 mb-3">
                        <img className="w-10 h-10 rounded-full border-2 border-primary" src="https://i.pravatar.cc/100?img=1" alt="User" />
                        <img className="w-10 h-10 rounded-full border-2 border-primary" src="https://i.pravatar.cc/100?img=2" alt="User" />
                        <img className="w-10 h-10 rounded-full border-2 border-primary" src="https://i.pravatar.cc/100?img=3" alt="User" />
                        <div className="w-10 h-10 rounded-full border-2 border-primary bg-white text-primary flex items-center justify-center text-xs font-bold">+10k</div>
                    </div>
                    <p className="text-xs text-white/80 font-medium">Trusted by thousands of happy customers</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-7/12 p-8 md:p-10 relative z-10 bg-gradient-to-br from-white to-green-50 flex flex-col justify-center min-h-[500px]">
                {!inline && <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none transition-colors z-20">&times;</button>}
                
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-secondary mb-1">Apply for a Loan</h2>
                    <p className="text-gray-500 text-sm mb-6">A few simple steps to connect with lenders.</p>
                </div>
                
                <div className="relative">
                    {renderContent()}
                </div>
            </div>
        </div>
    );

    if (inline) {
        return <div className="w-full h-full flex justify-center animate-fade-in-up">{content}</div>;
    }

    return (
        <div className="fixed inset-0 bg-primary/30 flex items-center justify-center z-50 backdrop-blur-md" onClick={onClose}>
            {content}
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
        <button type="submit" className="w-full mt-8 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg">Apply</button>
    </form>
);

export default ApplyLoanModal;