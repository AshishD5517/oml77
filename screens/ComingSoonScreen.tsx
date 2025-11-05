import React from 'react';

const ComingSoonScreen: React.FC = () => {
    return (
        <div
            className="relative min-h-screen flex items-center justify-center text-white text-center px-6 bg-secondary"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 flex flex-col items-center">
                <img 
                    src="https://images.unsplash.com/photo-1588949869355-32939d4197e4?q=80&w=600&auto=format&fit=crop" 
                    alt="Mobile app launching soon illustration" 
                    className="w-64 h-64 object-contain mb-8" 
                />
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-pulse">
                    Coming Soon
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
                    Our mobile app is getting ready for launch! We are working hard to bring you an amazing experience to manage your loans on the go.
                </p>
                <div className="flex space-x-4">
                    <div className="bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2 opacity-50 cursor-not-allowed">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 384 512">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.1 0 183.1 0 241.2c0 61.6 43.1 113.7 103.1 113.7 20.2 0 45.4-14.5 73.1-14.5 27.6 0 52.2 14.5 73.8 14.5 58.1 0 104.4-50.5 104.4-113.7 0-27.9-10.6-54.4-29.7-74.2zm-155.6-141.3c3-11.2 10.3-21.6 20.2-27.7 10.1-6.1 21.6-8.1 31.9-5.1 1.9 11.2-4.5 24.3-14.5 30.5-10.1 6-22.1 7.9-32.1 5.1-1.3-2.1-2.4-4.2-2.9-7.3z"/>
                         </svg>
                        <span>App Store</span>
                    </div>
                     <div className="bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2 opacity-50 cursor-not-allowed">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 32 32"><path fill="currentColor" d="M29.5,13.2L4.6,0.3c-1.1-0.6-2.5,0.4-2.5,1.6v27.9c0,1.2,1.4,2.2,2.5,1.6l24.9-12.8C30.6,17.9,30.6,14.1,29.5,13.2z M22,20.9l-10.2-3l-0.1,6.1L22,20.9z M11.7,14.1l10.2-3L11.8,8L11.7,14.1z M4,4.2l6.8,3.5l0.1,16.5L4,27.7V4.2z M23.9,15.9 L23.9,15.9l-11,3.2L24,12.7L23.9,15.9z"></path></svg>
                        <span>Google Play</span>
                    </div>
                </div>
                <a 
                    href="/" 
                    className="mt-12 px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-transform transform hover:scale-105"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    );
};

export default ComingSoonScreen;