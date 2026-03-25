import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../App';
import { UserRole } from '../types';

// --- ICONS ---
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
);

const PanIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v1h-2V4a1 1 0 011-1zM5 5a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5zm4 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        <path d="M7 9a1 1 0 000 2h6a1 1 0 100-2H7z" />
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
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
    disabled?: boolean;
}> = ({ options, value, onChange, name, placeholder, disabled = false }) => {
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
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LocationIcon />
            </div>
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className="w-full text-left pl-12 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
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

const AuthScreen: React.FC = () => {
  const { login } = useAuth();
  
  // Parse query parameters
  const [initialRole, setInitialRole] = useState<UserRole>(UserRole.BORROWER);
  const [initialView, setInitialView] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role');
    const viewParam = params.get('view');
    
    if (roleParam === UserRole.AGENT || roleParam === UserRole.BORROWER) {
      setInitialRole(roleParam as UserRole);
    }
    if (viewParam === 'login' || viewParam === 'register') {
      setInitialView(viewParam);
    }
  }, []);

  const [isRegister, setIsRegister] = useState(initialView === 'register');
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);

  useEffect(() => {
    setIsRegister(initialView === 'register');
    setSelectedRole(initialRole);
  }, [initialRole, initialView]);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pan, setPan] = useState('');
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  
  // PAN Verification state
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  // OTP Login state
  const [loginMethod, setLoginMethod] = useState<'email' | 'otp'>('email');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [mockOtp, setMockOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpError, setOtpError] = useState('');

  const resetOtpFields = () => {
    setMobile('');
    setOtp('');
    setMockOtp('');
    setIsOtpSent(false);
    setOtpError('');
    setIsSendingOtp(false);
  };

  useEffect(() => {
    setEmail(`demo@${selectedRole}.com`);
    setPassword('password');
    // Reset PAN fields when switching forms
    setPan('');
    setFullName('');
    setLocation('');
    setIsVerified(false);
    setVerificationError('');
    resetOtpFields();
    if (!isRegister) {
      setLoginMethod('email');
    }
  }, [isRegister, selectedRole]);

  const handleVerifyPan = async () => {
    setVerificationError('');
    setIsVerified(false);
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase())) {
        setVerificationError('Invalid PAN format. E.g., ABCDE1234F');
        return;
    }
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock response for demo purposes
    if (pan.toUpperCase() === 'ABCDE1234F') {
        setFullName('Ramesh Kumar');
        setLocation('Delhi');
        setIsVerified(true);
    } else {
        setVerificationError('PAN not found or verification failed.');
    }
    setIsVerifying(false);
  };

  const handleLocationChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
      setLocation(e.target.value);
  };

  const handleSendOtp = async () => {
    setOtpError('');
    if (!/^[6-9]\d{9}$/.test(mobile)) {
        setOtpError('Please enter a valid 10-digit mobile number.');
        return;
    }
    setIsSendingOtp(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setMockOtp(generatedOtp);
    setIsOtpSent(true);
    setIsSendingOtp(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isRegister) {
        login(selectedRole);
        window.location.href = '/dashboard';
        return;
    }

    if (loginMethod === 'otp') {
        if (otp === mockOtp) {
            login(selectedRole);
            window.location.href = '/dashboard';
        } else {
            setOtpError('Invalid OTP. Please try again.');
        }
        return;
    }

    // Default email login
    login(selectedRole);
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left side form */}
        <div className="w-full md:w-1/2 p-8 lg:p-16 relative flex flex-col justify-center">
          <a href="/" className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </a>
          
          <div className="mb-8">
              <div className="flex items-center mb-6">
                  <img 
                      src="https://i.postimg.cc/d0nzmvyc/Gemini-Generated-Image-xd7ycnxd7ycnxd7y-removebg-preview.png" 
                      alt="Offer Me Loan Logo" 
                      className="h-10 object-contain"
                      referrerPolicy="no-referrer" 
                  />
              </div>
              <h2 className="text-3xl font-bold text-secondary mb-2">
                  {isRegister ? `Create ${selectedRole === UserRole.BORROWER ? 'Borrower' : 'Agent'} Account` : `Login to Your Account`}
              </h2>
              <p className="text-gray-500 text-sm">
                  {isRegister ? 'Join us to get started with your loan journey.' : 'Access your loan offers and manage your applications'}
              </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister ? (
            <>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><PanIcon /></div>
                    <input
                        type="text"
                        placeholder="PAN Card Number"
                        className="w-full pl-12 pr-24 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={pan}
                        onChange={(e) => {
                            setPan(e.target.value.toUpperCase());
                            setIsVerified(false);
                            setVerificationError('');
                            setFullName('');
                            setLocation('');
                        }}
                        maxLength={10}
                    />
                    <button
                        type="button"
                        onClick={handleVerifyPan}
                        disabled={isVerifying || !pan}
                        className="absolute inset-y-0 right-0 mr-1.5 my-1.5 px-4 text-sm font-semibold rounded-lg bg-secondary text-white hover:bg-opacity-90 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center transition-colors"
                    >
                      {isVerifying ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ) : 'Verify'}
                    </button>
                </div>
                {verificationError && <p className="text-xs text-red-500 -mt-3 ml-1">{verificationError}</p>}
                {isVerified && <p className="text-xs text-green-600 font-medium -mt-3 ml-1">✓ PAN Verified Successfully!</p>}
                
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><UserIcon /></div>
                    <input
                        type="text"
                        placeholder="Full Name (Auto-filled)"
                        readOnly
                        value={fullName}
                        className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                </div>
                
                 <div className="relative">
                    <SearchableDropdown
                        name="location"
                        options={locations}
                        value={location}
                        onChange={handleLocationChange}
                        placeholder="Location (Auto-filled)"
                        disabled={!isVerified}
                    />
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><LockIcon /></div>
                    <input type="password" placeholder="Password" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
            </>
          ) : (
            <>
                {loginMethod === 'email' ? (
                    <>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <input type="text" placeholder="Email / Mobile Number" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><LockIcon /></div>
                            <input type="password" placeholder="Password" className="w-full pl-12 pr-32 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                <a href="#" className="text-sm text-primary font-medium hover:text-primary-dark hover:underline transition-colors">Forgot Password?</a>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><PhoneIcon /></div>
                            <input type="tel" placeholder="Mobile Number" className="w-full pl-12 pr-28 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all" value={mobile} onChange={(e) => {setMobile(e.target.value); setOtpError('');}} maxLength={10} disabled={isOtpSent} />
                            <button type="button" onClick={handleSendOtp} disabled={isSendingOtp || isOtpSent || !mobile} className="absolute inset-y-0 right-0 mr-1.5 my-1.5 px-4 text-sm font-semibold rounded-lg bg-secondary text-white hover:bg-opacity-90 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center w-28 justify-center transition-colors">
                                {isSendingOtp ? (<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>) : (isOtpSent ? 'OTP Sent' : 'Send OTP')}
                            </button>
                        </div>
                        {otpError && <p className="text-xs text-red-500 -mt-3 ml-1">{otpError}</p>}
                        {mockOtp && !otpError && <p className="text-xs text-blue-600 -mt-3 ml-1">For demo purposes, your OTP is: <span className="font-bold">{mockOtp}</span></p>}

                        {isOtpSent && (
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><LockIcon /></div>
                                <input type="text" placeholder="Enter 6-digit OTP" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all" value={otp} onChange={(e) => {setOtp(e.target.value); setOtpError('');}} maxLength={6} required />
                            </div>
                        )}
                    </>
                )}
            </>
          )}

          {isRegister && (
            <div className="pt-3">
              <p className="text-sm font-semibold text-gray-700 mb-3">I am a...</p>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole(UserRole.BORROWER)}
                  className={`w-full py-3 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${selectedRole === UserRole.BORROWER ? 'bg-primary/10 border-primary text-primary shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-100'}`}
                >
                  Borrower
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole(UserRole.AGENT)}
                  className={`w-full py-3 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${selectedRole === UserRole.AGENT ? 'bg-primary/10 border-primary text-primary shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-100'}`}
                >
                  Loan Agent
                </button>
              </div>
            </div>
          )}

          <div className="pt-5">
              <button
                type="submit"
                disabled={(isRegister && !isVerified) || (!isRegister && loginMethod === 'otp' && !isOtpSent)}
                className="w-full bg-primary text-white py-3.5 text-lg rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {isRegister ? 'Create Account' : 'Log In'}
              </button>
          </div>
          
          {!isRegister && (
             <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">
                    <button
                        type="button"
                        onClick={() => {
                            setLoginMethod(prev => prev === 'email' ? 'otp' : 'email');
                            resetOtpFields();
                        }}
                        className="font-semibold text-primary hover:underline"
                    >
                        {loginMethod === 'email' ? 'Login with OTP' : 'Login with Email'}
                    </button>
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>
          )}

          <div className="flex items-center justify-start text-sm text-gray-500 mt-2">
            <LockIcon />
            <span className="ml-2">
                {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="font-semibold text-primary hover:underline"
                >
                {isRegister ? 'Login' : 'Sign Up'}
                </button>
            </span>
          </div>
        </form>
        </div>

        {/* Right side image */}
        <div className="hidden md:flex md:w-1/2 relative items-center justify-center p-12 bg-blue-50/50">
            <div className="max-w-md text-center flex flex-col items-center">
                <img 
                    src={selectedRole === UserRole.BORROWER 
                        ? "https://i.postimg.cc/zXvXJg07/loan-approved-illustration.png" 
                        : "https://illustrations.popsy.co/blue/business-deal.svg"}
                    alt={selectedRole === UserRole.BORROWER ? "Borrower Illustration" : "Agent Illustration"}
                    className="w-full max-w-md object-contain mb-8 drop-shadow-2xl" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        e.currentTarget.src = "https://i.postimg.cc/zXvXJg07/loan-approved-illustration.png";
                    }}
                />
                <h3 className="text-2xl font-bold text-secondary mb-4">
                    {selectedRole === UserRole.BORROWER 
                        ? "Unlock Your Financial Freedom" 
                        : "Grow Your Lending Business"}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    {selectedRole === UserRole.BORROWER 
                        ? "Get access to the best loan offers tailored just for you. Quick approval and a transparent process." 
                        : "Connect with verified borrowers, manage your portfolio, and expand your reach with our platform."}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
