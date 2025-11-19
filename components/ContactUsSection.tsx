
import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

// --- ICONS ---
const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const InfoPhoneIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);
const InfoMailIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
);
const MailIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
);
const PhoneIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
);
const SpinnerIcon: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
);
const CheckCircleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
);
// --- END ICONS ---


interface AnalysisResult {
    category: string;
    sentiment: string;
    summary: string;
}

const getSuccessMessage = (category: string) => {
    switch (category) {
        case "Loan Application Question":
            return "Thank you for your questions about loan applications. Our team will review your message and provide the details you need shortly.";
        case "Technical Support":
            return "We've received your technical query. Our support specialists will look into it and get back to you as soon as possible.";
        case "Partnership Request":
            return "Thank you for your interest in partnering with us! We'll review your request and be in touch soon.";
        case "General Inquiry":
        default:
            return "Thank you for reaching out! We have received your message and will get back to you shortly.";
    }
};

const ContactUsSection: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const formRef = React.useRef<HTMLFormElement>(null);

    const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setAnalysisResult(null);

        const formData = new FormData(e.target as HTMLFormElement);
        const userMessage = formData.get('message') as string;

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

            const schema = {
                type: Type.OBJECT,
                properties: {
                    category: {
                        type: Type.STRING,
                        description: 'Categorize the user inquiry into one of the following: "General Inquiry", "Loan Application Question", "Technical Support", "Partnership Request", or "Other".'
                    },
                    sentiment: {
                        type: Type.STRING,
                        description: 'Analyze the sentiment of the message. Respond with "Positive", "Neutral", or "Negative".'
                    },
                    summary: {
                        type: Type.STRING,
                        description: 'Provide a one-sentence summary of the user\'s message.'
                    }
                },
                required: ['category', 'sentiment', 'summary']
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Analyze the following user message from a contact form and provide a structured analysis. Message: "${userMessage}"`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                }
            });
            
            const resultJson = JSON.parse(response.text);
            setAnalysisResult(resultJson);
            console.log("Gemini Analysis:", resultJson);

        } catch (error) {
            console.error("Gemini API Error:", error);
            // Set a default result on error to ensure a smooth demo experience
            setAnalysisResult({
                category: "General Inquiry", // Fallback category
                sentiment: "Unknown",
                summary: "Could not process the message via AI."
            });
        }

        // Simulate network delay
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    const resetForm = () => {
        setIsSubmitted(false);
        setAnalysisResult(null);
        formRef.current?.reset();
    };

    return (
        <section id="contact-us" className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-secondary">Get in Touch</h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Have questions, feedback, or need support? We're here to help. Reach out to us through the form or using the contact details below.
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contact Info and Image */}
                    <div className="animate-fade-in-up" style={{ animationDuration: '0.6s' }}>
                        <img 
                            src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=2071&auto=format&fit=crop" 
                            alt="Contact us representative typing on a laptop"
                            className="rounded-xl shadow-lg mb-8 w-full object-cover h-80"
                        />
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary-light rounded-full flex items-center justify-center text-primary"><LocationIcon /></div>
                                <div>
                                    <h3 className="font-semibold text-secondary">Our Office</h3>
                                    <p className="text-gray-600">203, D Mall, Netaji Subhash Place, Delhi - 110034</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary-light rounded-full flex items-center justify-center text-primary"><InfoPhoneIcon /></div>
                                <div>
                                    <h3 className="font-semibold text-secondary">Phone Number</h3>
                                    <p className="text-gray-500 italic">Coming Soon</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary-light rounded-full flex items-center justify-center text-primary"><InfoMailIcon /></div>
                                <div>
                                    <h3 className="font-semibold text-secondary">Email Address</h3>
                                    <p className="text-gray-500 italic">Coming Soon</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-fade-in-up" style={{ animationDuration: '0.6s', animationDelay: '0.2s' }}>
                        {isSubmitted ? (
                            <div className="text-center flex flex-col items-center justify-center min-h-[440px] animate-fade-in-up">
                                <CheckCircleIcon />
                                <h3 className="text-2xl font-bold text-secondary mt-4">Message Sent!</h3>
                                <p className="text-gray-600 mt-2 mb-6">
                                    {analysisResult ? getSuccessMessage(analysisResult.category) : "Thank you for reaching out! We'll get back to you shortly."}
                                </p>
                                
                                {analysisResult && (
                                    <div className="w-full text-left bg-primary-light p-4 rounded-lg space-y-2 text-sm border border-primary/20">
                                        <p className="text-xs font-semibold text-primary-dark uppercase">For Demo: AI Message Analysis</p>
                                        <p><strong className="text-secondary">Category:</strong> {analysisResult.category}</p>
                                        <p><strong className="text-secondary">Sentiment:</strong> {analysisResult.sentiment}</p>
                                        <p><strong className="text-secondary">Summary:</strong> {analysisResult.summary}</p>
                                    </div>
                                )}

                                <button
                                    onClick={resetForm}
                                    className="mt-6 w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-secondary mb-2">Send us a Message</h3>
                                <p className="text-gray-500 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
                                <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
                                        <input type="text" id="name" name="name" placeholder="Your Name" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MailIcon /></div>
                                        <input type="email" id="email" name="email" placeholder="Your Email" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PhoneIcon /></div>
                                        <input type="tel" id="phone" name="phone" placeholder="Your Contact No" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="sr-only">Message</label>
                                        <textarea id="message" name="message" placeholder="Your Message" rows={4} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? <><SpinnerIcon /> <span className="ml-2">Sending...</span></> : 'Send Message'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUsSection;
