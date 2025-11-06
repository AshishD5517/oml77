import React from 'react';

const FeatureCard: React.FC<{ imageUrl: string; title: string; description: string; }> = ({ imageUrl, title, description }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-secondary mb-2">{title}</h3>
            <p className="text-gray-600 text-sm flex-grow">{description}</p>
        </div>
    </div>
);


const AboutUsScreen: React.FC = () => {
    return (
        <div className="bg-gray-50">
            {/* Page Header */}
            <section className="py-20 bg-primary-light">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4">About Offer Me Loan</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We're revolutionizing the lending landscape by creating a transparent and efficient marketplace for borrowers and loan agents.
                    </p>
                </div>
            </section>
            
            {/* Our Story & Mission */}
            <section className="py-20">
                 <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                         <div>
                            <h2 className="text-3xl font-bold text-secondary mb-4">Our Story</h2>
                             <p className="text-gray-700">
                                Founded on the principle of financial empowerment, Offer Me Loan was born from a desire to simplify the loan application process. We saw the challenges faced by both borrowers searching for fair terms and agents looking for qualified clients. Our platform bridges this gap, fostering a competitive environment where everyone benefits.
                             </p>
                         </div>
                         <div>
                             <h2 className="text-3xl font-bold text-secondary mb-4">Our Mission</h2>
                              <p className="text-gray-700">
                                Our mission is to provide a secure, user-friendly platform that connects individuals and businesses with a wide network of verified financial partners. We believe in transparency, speed, and choice, ensuring that our users can make informed financial decisions with confidence.
                              </p>
                         </div>
                    </div>
                </div>
            </section>

            {/* Our Values / Why Choose Us */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary">Our Core Values</h2>
                        <p className="text-gray-500 mt-2">The principles that guide us.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            imageUrl="https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=800&auto=format&fit=crop"
                            title="Fast & Efficient"
                            description="Connect with lenders in record time. No more waiting for weeks for a bank's decision."
                        />
                        <FeatureCard 
                            imageUrl="https://images.unsplash.com/photo-1550751827-4138d04d475d?q=80&w=800&auto=format&fit=crop"
                            title="Secure & Private"
                            description="Your data is encrypted and protected. We value your privacy and security above all."
                        />
                        <FeatureCard 
                            imageUrl="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800&auto=format&fit=crop"
                            title="Competitive Offers"
                            description="Lenders compete for your business, ensuring you get the best possible rates and terms."
                        />
                        <FeatureCard 
                            imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
                            title="Transparent Process"
                            description="No hidden fees or surprise charges. We believe in complete clarity, so you can make decisions with confidence."
                        />
                        <FeatureCard 
                            imageUrl="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop"
                            title="Wide Lender Network"
                            description="Gain access to a diverse network of verified loan agents and financial institutions from all over India."
                        />
                        <FeatureCard 
                            imageUrl="https://images.unsplash.com/photo-1573496773905-f5b17e76b254?q=80&w=800&auto=format&fit=crop"
                            title="Personalized Support"
                            description="Our platform and partner agents are here to help you navigate your financial journey, offering support when you need it."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsScreen;