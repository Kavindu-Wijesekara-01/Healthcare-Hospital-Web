// Services.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CallButton from './CallButton';

const Services = () => {
  const [activeTab, setActiveTab] = useState('all');

  const services = [
    {
      id: 1,
      icon: '❤️',
      title: 'Cardiology',
      description: 'Advanced heart care with state-of-the-art cardiac technology',
      category: 'specialized'
    },
    {
      id: 2,
      icon: '🧠',
      title: 'Neurology',
      description: 'Comprehensive brain and nervous system care',
      category: 'specialized'
    },
    {
      id: 3,
      icon: '🦴',
      title: 'Orthopedics',
      description: 'Bone, joint, and muscle treatments',
      category: 'surgical'
    },
    {
      id: 4,
      icon: '👶',
      title: 'Pediatrics',
      description: 'Complete healthcare for children',
      category: 'surgical'
    },
    {
      id: 5,
      icon: '🚨',
      title: 'Emergency',
      description: '24/7 emergency and trauma care',
      category: 'emergency'
    },
    {
      id: 6,
      icon: '🔬',
      title: 'Diagnostics',
      description: 'Advanced imaging and lab testing',
      category: 'diagnostic'
    },
    {
      id: 7,
      icon: '✨',
      title: 'Dermatology',
      description: 'Skin care and cosmetic treatments',
      category: 'specialized'
    },
    {
      id: 8,
      icon: '♿',
      title: 'Rehabilitation',
      description: 'Physical therapy and recovery',
      category: 'therapy'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'specialized', label: 'Specialized' },
    { id: 'surgical', label: 'Surgical' },
    { id: 'diagnostic', label: 'Diagnostics' },
    { id: 'therapy', label: 'Therapy' },
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(s => s.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        
         {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
            filter: 'blur(3px)'
          }}
        />
        
        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-gray-900/70 to-black/90"></div>
      

        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-800/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-700/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 text-sm">Comprehensive Healthcare</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Medical <span className="text-blue-400">Services</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              World-class medical care with cutting-edge technology and expert specialists
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { value: '50+', label: 'Expert Doctors' },
            { value: '24/7', label: 'Emergency Care' },
            { value: '98%', label: 'Success Rate' },
            { value: '5000+', label: 'Patients Treated' }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50">
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16 max-w-7xl mx-auto">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-700/50"
            >
              
              
              <div className="p-6">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gray-700/50 flex items-center justify-center text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md shadow-gray-500/50">
                  {service.icon}
                </div>

                {/* Title & Description */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                </div>

                {/* Category */}
                <div className="text-center mb-6">
                  <div className="text-xs px-3 py-1 bg-gray-700/50 rounded-full inline-block text-gray-300">
                    {service.category}
                  </div>
                </div>

                {/* Button */}
                <div className="text-center">
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium group/link"
                  >
                    Learn More
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl overflow-hidden border border-red-500/20">
            <div className="flex flex-col lg:flex-row items-center justify-between p-8">
              <div className="mb-6 lg:mb-0 lg:mr-8 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Emergency Services</h3>
                <p className="text-gray-300 mb-4">Immediate medical attention 24/7</p>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm text-gray-300">Live Emergency Team</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">011-1234567</div>
                <Link
                  to="/emergency"
                  className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Call Emergency
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        
      </div>
      <CallButton />
    </div>
  );
};

export default Services;