
import React, { useState } from 'react';
import type { LoanRequest } from '../types';

interface MakeOfferModalProps {
  loanRequest: LoanRequest;
  onClose: () => void;
  onSubmit: () => void;
}

const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const MakeOfferModal: React.FC<MakeOfferModalProps> = ({ loanRequest, onClose, onSubmit }) => {
    const [rate, setRate] = useState(loanRequest.interestRate);
    const [fee, setFee] = useState(Math.round(loanRequest.amount * 0.01));
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        console.log({
            loanRequestId: loanRequest.id,
            offeredRate: rate,
            processingFee: fee,
            message,
        });
        onSubmit();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 m-4 transform transition-all duration-300" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-secondary">Make an Offer</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
                </div>

                <div className="bg-primary-light p-4 rounded-lg mb-6 text-sm">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div>
                            <p className="text-gray-600">Borrower:</p>
                            <p className="font-semibold text-secondary">{loanRequest.borrowerName}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Loan Amount:</p>
                            <p className="font-semibold text-secondary">{formatCurrency(loanRequest.amount)}</p>
                        </div>
                         <div>
                            <p className="text-gray-600">Purpose:</p>
                            <p className="font-semibold text-secondary">{loanRequest.purpose}</p>
                        </div>
                         <div>
                            <p className="text-gray-600">Credit Score:</p>
                            <p className="font-semibold text-secondary">{loanRequest.creditScore}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (% p.a.)</label>
                            <input
                                type="number"
                                id="rate"
                                value={rate}
                                onChange={(e) => setRate(parseFloat(e.target.value))}
                                step="0.01"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="fee" className="block text-sm font-medium text-gray-700 mb-1">Processing Fee (₹)</label>
                            <input
                                type="number"
                                id="fee"
                                value={fee}
                                onChange={(e) => setFee(parseInt(e.target.value, 10))}
                                step="100"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            />
                        </div>
                    </div>
                    <div>
                         <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message to Borrower (Optional)</label>
                         <textarea
                            id="message"
                            rows={3}
                            placeholder="Add a personal note or highlight key benefits..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-2 bg-accent text-secondary py-3 rounded-lg font-semibold hover:opacity-90 transition-transform transform hover:scale-105 shadow-lg"
                    >
                        Submit Offer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MakeOfferModal;
