
import React from 'react';
import { motion } from 'motion/react';
import { Shield, Target, Zap, Users, Award, TrendingUp } from 'lucide-react';

const AboutUsScreen: React.FC = () => {
    return (
        <div className="bg-white font-sans text-gray-700">
            {/* Hero Section */}
            <div className="relative bg-secondary py-32 isolate overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <img
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Digital financial services"
                        className="h-full w-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/60 to-secondary"></div>
                </div>
                
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
                                Our Story
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-8">
                                Empowering Your <br />
                                <span className="text-primary">Financial Future</span>
                            </h1>
                            <p className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto font-light">
                                Offer Me Loan is more than just a marketplace. We are a bridge between dreams and reality, 
                                connecting ambitious individuals with the capital they need to thrive in a modern economy.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision Section - Split Layout */}
            <div className="py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                            <div className="relative z-10">
                                <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">The Mission</h2>
                                <h3 className="text-4xl font-black text-secondary mb-8 leading-tight">
                                    Redefining the way <br />India borrows.
                                </h3>
                                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                    We started with a simple observation: the traditional loan process was broken. 
                                    It was slow, opaque, and often exclusionary. Our mission is to fix that by 
                                    leveraging cutting-edge technology to create a transparent, competitive, 
                                    and lightning-fast marketplace.
                                </p>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                                            <Shield className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary">Zero Friction</h4>
                                            <p className="text-gray-500 text-sm">Eliminating paperwork and redundant checks.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                                            <TrendingUp className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary">Total Transparency</h4>
                                            <p className="text-gray-500 text-sm">Real-time offers from multiple verified agents.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1546&q=80" 
                                    alt="Financial planning" 
                                    className="w-full h-[600px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                                    <p className="text-white font-medium italic">
                                        "Our goal is to make financial support accessible to every corner of the country, 
                                        empowering small businesses and individuals alike."
                                    </p>
                                    <p className="text-primary font-bold mt-2 text-sm">— Arjun Mehta, CEO</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Statistics Section - Modern Dark Grid */}
            <div className="bg-secondary py-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#74B559_1px,transparent_1px)] [background-size:40px_40px]"></div>
                </div>
                <div className="container mx-auto px-6 relative z-10">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm"
                        >
                            <div className="text-5xl font-black text-primary mb-3 tracking-tighter">50k+</div>
                            <div className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold">Applications</div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm"
                        >
                            <div className="text-5xl font-black text-white mb-3 tracking-tighter">₹100Cr+</div>
                            <div className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold">Disbursed</div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm"
                        >
                            <div className="text-5xl font-black text-accent mb-3 tracking-tighter">2.5k+</div>
                            <div className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold">Agents</div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm"
                        >
                            <div className="text-5xl font-black text-white mb-3 tracking-tighter">98%</div>
                            <div className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold">Satisfaction</div>
                        </motion.div>
                     </div>
                </div>
            </div>

            {/* Core Values - Bento Grid Style */}
             <div className="py-32 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mb-20">
                        <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Our Values</h2>
                        <h3 className="text-4xl font-black text-secondary leading-tight">The principles that drive <br />every decision we make.</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Transparency', description: 'No hidden fees or terms. We believe in complete clarity for all parties involved.', icon: <Target className="w-8 h-8 text-primary" /> },
                            { title: 'Security', description: 'Your data integrity is our top priority. We use bank-grade encryption to keep information safe.', icon: <Shield className="w-8 h-8 text-primary" /> },
                            { title: 'Innovation', description: 'We continuously improve our platform to provide faster matches and better user experiences.', icon: <Zap className="w-8 h-8 text-primary" /> },
                            { title: 'Community', description: 'Building a network of trust where borrowers and agents grow together.', icon: <Users className="w-8 h-8 text-primary" /> },
                            { title: 'Excellence', description: 'Striving for the highest standards in financial services and customer support.', icon: <Award className="w-8 h-8 text-primary" /> },
                            { title: 'Growth', description: 'Helping individuals and businesses scale their dreams with the right capital.', icon: <TrendingUp className="w-8 h-8 text-primary" /> },
                        ].map((value, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group"
                            >
                                <div className="mb-6 bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-black text-secondary mb-4">{value.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-medium">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
             </div>

            {/* Team Section - Modern Portraits */}
            <div className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">The Leadership</h2>
                        <h3 className="text-4xl font-black text-secondary">The minds behind the vision.</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
                        {[
                            { name: 'Arjun Mehta', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { name: 'Priya Singh', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { name: 'Vikram Das', role: 'Chief Technology Officer', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                        ].map((member, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="text-center group"
                            >
                                <div className="relative mb-8 inline-block">
                                    <div className="absolute inset-0 bg-primary rounded-[3rem] rotate-6 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                    <div className="relative rounded-[3rem] overflow-hidden w-64 h-80 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-secondary mb-1">{member.name}</h3>
                                <p className="text-primary font-bold tracking-wider uppercase text-xs">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section - Immersive */}
            <div className="py-32 bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2000&q=80" alt="Abstract background" className="w-full h-full object-cover" />
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                            Ready to Experience the <br />
                            <span className="text-primary">Future of Lending?</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
                            Whether you are looking to borrow or lend, Offer Me Loan provides the secure and efficient platform you need.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <a href="/#apply-now" className="px-10 py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary-dark transition-all shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1">
                                Apply for a Loan
                            </a>
                            <a href="/contact-us" className="px-10 py-5 bg-white text-secondary font-black rounded-2xl hover:bg-gray-50 transition-all shadow-xl transform hover:-translate-y-1">
                                Contact Support
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsScreen;
