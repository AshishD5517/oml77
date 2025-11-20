
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../App';
import { UserRole } from '../types';

interface AuthModalProps {
  onClose: () => void;
  initialRole?: UserRole;
  initialView?: 'login' | 'register';
}

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
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LocationIcon />
            </div>
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className="w-full text-left pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
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


const AuthModal: React.FC<AuthModalProps> = ({ onClose, initialRole = UserRole.BORROWER, initialView = 'login' }) => {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(initialView === 'register');
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);

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
    setEmail(`demo@${isRegister ? selectedRole : 'borrower'}.com`);
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
    // Reduced artificial delay from 1500ms to 500ms
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
    // Reduced artificial delay from 1500ms to 500ms
    await new Promise(resolve => setTimeout(resolve, 500));

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setMockOtp(generatedOtp);
    setIsOtpSent(true);
    setIsSendingOtp(false);
  };

  // Fix: Replaced incorrect type 'HTMLFormEvent' with 'HTMLFormElement' for the form submission event handler.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isRegister) {
        login(selectedRole);
        onClose();
        return;
    }

    if (loginMethod === 'otp') {
        if (otp === mockOtp) {
            login(selectedRole); // Default to borrower role on OTP login
            onClose();
        } else {
            setOtpError('Invalid OTP. Please try again.');
        }
        return;
    }

    // Default email login
    login(selectedRole);
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 m-4 transform transition-all duration-300 scale-95 hover:scale-100" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-secondary">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {isRegister ? (
            <>
                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PanIcon /></div>
                    <input
                        type="text"
                        placeholder="PAN Card Number"
                        className="w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
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
                        className="absolute inset-y-0 right-0 mr-1 my-1 px-3 text-sm font-semibold rounded-lg bg-secondary text-white hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                    >
                      {isVerifying ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ) : 'Verify'}
                    </button>
                </div>
                {verificationError && <p className="text-xs text-red-500 -mt-3 mb-3">{verificationError}</p>}
                {isVerified && <p className="text-xs text-green-600 -mt-3 mb-3">✓ PAN Verified Successfully!</p>}
                
                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
                    <input
                        type="text"
                        placeholder="Full Name (Auto-filled)"
                        readOnly
                        value={fullName}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                </div>
                
                 <div className="relative mb-4">
                    <SearchableDropdown
                        name="location"
                        options={locations}
                        value={location}
                        onChange={handleLocationChange}
                        placeholder="Location (Auto-filled)"
                        disabled={!isVerified}
                    />
                </div>
                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
                    <input type="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockIcon /></div>
                    <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
            </>
          ) : (
            <>
                {loginMethod === 'email' ? (
                    <>
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
                            <input type="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockIcon /></div>
                            <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PhoneIcon /></div>
                            <input type="tel" placeholder="Mobile Number" className="w-full pl-10 pr-28 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" value={mobile} onChange={(e) => {setMobile(e.target.value); setOtpError('');}} maxLength={10} disabled={isOtpSent} />
                            <button type="button" onClick={handleSendOtp} disabled={isSendingOtp || isOtpSent || !mobile} className="absolute inset-y-0 right-0 mr-1 my-1 px-3 text-sm font-semibold rounded-lg bg-secondary text-white hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center w-24 justify-center">
                                {isSendingOtp ? (<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>) : (isOtpSent ? 'OTP Sent' : 'Send OTP')}
                            </button>
                        </div>
                        {otpError && <p className="text-xs text-red-500 -mt-3 mb-3">{otpError}</p>}
                        {mockOtp && !otpError && <p className="text-xs text-blue-600 -mt-3 mb-3">For demo purposes, your OTP is: <span className="font-bold">{mockOtp}</span></p>}

                        {isOtpSent && (
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockIcon /></div>
                                <input type="text" placeholder="Enter 6-digit OTP" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" value={otp} onChange={(e) => {setOtp(e.target.value); setOtpError('');}} maxLength={6} required />
                            </div>
                        )}
                    </>
                )}
            </>
          )}

          {isRegister && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">I am a...</p>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole(UserRole.BORROWER)}
                  className={`w-full py-3 text-sm font-semibold rounded-lg border-2 transition ${selectedRole === UserRole.BORROWER ? 'bg-primary-light border-primary text-primary' : 'bg-gray-100 border-gray-200 text-gray-600 hover:border-gray-400'}`}
                >
                  Borrower
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole(UserRole.AGENT)}
                  className={`w-full py-3 text-sm font-semibold rounded-lg border-2 transition ${selectedRole === UserRole.AGENT ? 'bg-primary-light border-primary text-primary' : 'bg-gray-100 border-gray-200 text-gray-600 hover:border-gray-400'}`}
                >
                  Loan Agent
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={(isRegister && !isVerified) || (!isRegister && loginMethod === 'otp' && !isOtpSent)}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isRegister ? 'Sign Up' : 'Login'}
          </button>
          
          {!isRegister && (
             <p className="text-center text-sm text-gray-500 mt-4">
                or{' '}
                <button
                type="button"
                onClick={() => {
                    setLoginMethod(prev => prev === 'email' ? 'otp' : 'email');
                    resetOtpFields();
                }}
                className="font-semibold text-primary hover:underline"
                >
                {loginMethod === 'email' ? 'Login with Mobile OTP' : 'Login with Email'}
                </button>
            </p>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="font-semibold text-primary hover:underline"
            >
              {isRegister ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
