
import React, { useState } from 'react';
import { useAuth } from '../App';
import { UserRole } from '../types';

interface AuthModalProps {
  onClose: () => void;
}

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


const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.BORROWER);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
              defaultValue={`demo@${isRegister ? selectedRole : 'borrower'}.com`}
            />
          </div>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
              defaultValue="password"
            />
          </div>

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
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg"
          >
            {isRegister ? 'Sign Up' : `Login as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
          </button>

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
