
import React, { useState, useRef } from 'react';
import { Camera, Upload, Check } from 'lucide-react';

const UpdateProfile: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        gender: '',
        dob: '',
        maritalStatus: '',
        state: '',
        city: '',
        address: '',
        pincode: '',
        aadhar: '',
        pan: '',
        cibil: '',
        income: ''
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (field: 'gender' | 'maritalStatus', value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Profile Data:', { ...formData, profileImage });
        alert('Profile updated successfully!');
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Image Upload Picker */}
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <Camera className="w-8 h-8 text-gray-400" />
                                )}
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                >
                                    <Upload className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleImageChange} 
                                className="hidden" 
                                accept="image/*"
                            />
                        </div>
                        <p className="text-sm font-medium text-gray-500">Upload Profile Photo</p>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Email Address</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email address"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all"
                            />
                        </div>

                        {/* Mobile */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
                            <input 
                                type="tel" 
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                placeholder="Enter your mobile number"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all"
                            />
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Gender</label>
                            <div className="flex items-center space-x-6 h-[50px]">
                                <label className="flex items-center space-x-2 cursor-pointer group">
                                    <div 
                                        onClick={() => handleCheckboxChange('gender', 'Male')}
                                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${formData.gender === 'Male' ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}`}
                                    >
                                        {formData.gender === 'Male' && <Check className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <span className="text-sm text-gray-600">Male</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer group">
                                    <div 
                                        onClick={() => handleCheckboxChange('gender', 'Female')}
                                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${formData.gender === 'Female' ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}`}
                                    >
                                        {formData.gender === 'Female' && <Check className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <span className="text-sm text-gray-600">Female</span>
                                </label>
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
                            <input 
                                type="date" 
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all"
                            />
                        </div>

                        {/* Marital Status */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Marital Status</label>
                            <div className="flex items-center space-x-6 h-[50px]">
                                <label className="flex items-center space-x-2 cursor-pointer group">
                                    <div 
                                        onClick={() => handleCheckboxChange('maritalStatus', 'Married')}
                                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${formData.maritalStatus === 'Married' ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}`}
                                    >
                                        {formData.maritalStatus === 'Married' && <Check className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <span className="text-sm text-gray-600">Married</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer group">
                                    <div 
                                        onClick={() => handleCheckboxChange('maritalStatus', 'Unmarried')}
                                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${formData.maritalStatus === 'Unmarried' ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}`}
                                    >
                                        {formData.maritalStatus === 'Unmarried' && <Check className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <span className="text-sm text-gray-600">Unmarried</span>
                                </label>
                            </div>
                        </div>

                        {/* State */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">State</label>
                            <input 
                                type="text" 
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                placeholder="Enter your state"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all"
                            />
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">City</label>
                            <input 
                                type="text" 
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="Enter your city"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all"
                            />
                        </div>

                        {/* Present Address */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Present Address</label>
                            <textarea 
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter your full present address"
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all resize-none"
                            />
                        </div>

                        {/* Pin Code */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Pin Code</label>
                            <input 
                                type="text" 
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                placeholder="Enter pin code"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all"
                            />
                        </div>

                        {/* Aadhar Card */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Aadhar Card</label>
                            <input 
                                type="text" 
                                name="aadhar"
                                value={formData.aadhar}
                                onChange={handleInputChange}
                                placeholder="Enter Aadhar number"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all"
                            />
                        </div>

                        {/* PAN CARD */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">PAN CARD</label>
                            <input 
                                type="text" 
                                name="pan"
                                value={formData.pan}
                                onChange={handleInputChange}
                                placeholder="Enter PAN number"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all"
                            />
                        </div>

                        {/* Cibil Score */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Cibil Score</label>
                            <input 
                                type="number" 
                                name="cibil"
                                value={formData.cibil}
                                onChange={handleInputChange}
                                placeholder="Enter CIBIL score"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all"
                            />
                        </div>

                        {/* Monthly Income */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Monthly Income</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                <input 
                                    type="number" 
                                    name="income"
                                    value={formData.income}
                                    onChange={handleInputChange}
                                    placeholder="Enter monthly income"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit"
                            className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
