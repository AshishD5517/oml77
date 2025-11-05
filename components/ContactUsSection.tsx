import React from 'react';

const ContactUsSection: React.FC = () => {
    const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Thank you for your message! We'll get back to you shortly.");
        (e.target as HTMLFormElement).reset();
    };

    return (
        <section id="contact-us" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-secondary">Get in Touch</h2>
                    <p className="text-gray-500 mt-2">Have questions? We're here to help.</p>
                </div>
                <div className="max-w-xl mx-auto">
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input type="text" id="name" placeholder="Your Name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input type="email" id="email" placeholder="Your Email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="sr-only">Contact No</label>
                            <input type="tel" id="phone" placeholder="Your Contact No" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" />
                        </div>
                        <div>
                            <label htmlFor="message" className="sr-only">Message</label>
                            <textarea id="message" placeholder="Your Message" rows={4} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUsSection;