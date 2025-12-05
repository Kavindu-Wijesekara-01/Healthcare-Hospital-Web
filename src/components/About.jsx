// About.jsx
import { Link } from 'react-router-dom';
import CallButton from './CallButton';
import { useState, useEffect, useRef } from 'react';

// Animated Counter Component for Facilities
const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let start = 0;
          const increment = end / (duration / 16); // 60fps
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <div ref={countRef} className="text-2xl font-bold text-white mb-2">
      {count}{suffix}
    </div>
  );
};

// For non-numeric values like "24/7"
const StaticCounter = ({ value }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div ref={countRef} className="text-2xl font-bold text-white mb-2">
      {hasAnimated ? value : '0'}
    </div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with Blurred Background Image */}
      <div className="relative overflow-hidden">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1153&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            filter: 'blur(3px)'
          }}
        />
        
        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-gray-900/70 to-black/90"></div>
        
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-800/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-700/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 text-sm">Since 2010</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-blue-400">Modern Healthcare</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Leading medical care with compassion, innovation, and excellence for over a decade
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { value: '13+', label: 'Years Experience' },
            { value: '50+', label: 'Expert Doctors' },
            { value: '10,000+', label: 'Patients Treated' },
            { value: '98%', label: 'Success Rate' }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50">
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {/* Mission */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:translate-y-[-5px]  items-center justif-center">
            
            <h3 className="text-2xl font-bold text-white mb-4 flex justify-center">Our Mission</h3>
            <p className="text-gray-300">
              To provide exceptional, compassionate healthcare through advanced medical technology, 
              expert professionals, and personalized patient care that improves lives and promotes wellness.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:translate-y-[-5px]">
            
            <h3 className="text-2xl font-bold text-white mb-4 flex justify-center">Our Vision</h3>
            <p className="text-gray-300">
              To be the leading healthcare provider recognized for excellence in patient care, 
              medical innovation, and community health advancement.
            </p>
          </div>
        </div>


        {/* Facilities with Animated Numbers */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-gray-700/50 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Facilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Emergency Department', count: '24/7', type: 'static' },
              { name: 'Operating Rooms', count: '12', type: 'animated' },
              { name: 'ICU Beds', count: '45', type: 'animated' },
              { name: 'Diagnostic Labs', count: '8', type: 'animated' },
              { name: 'Patient Rooms', count: '200', suffix: '+', type: 'animated' },
              { name: 'Specialty Clinics', count: '15', type: 'animated' },
              { name: 'Imaging Centers', count: '5', type: 'animated' },
              { name: 'Rehab Centers', count: '3', type: 'animated' }
            ].map((facility, index) => (
              <div 
                key={index} 
                className="bg-gray-900/50 rounded-2xl p-9 text-center border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:translate-y-[-5px]"
              >
                {facility.type === 'animated' ? (
                  <AnimatedCounter 
                    end={parseInt(facility.count)} 
                    suffix={facility.suffix || ''} 
                    duration={2000 + (index * 300)}
                  />
                ) : (
                  <StaticCounter value={facility.count} />
                )}
                <div className="text-gray-300 group-hover:text-white transition-colors">{facility.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Patients Choose Us Section - Like Asiri Health */}
        <div className="mb-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Patients Choose Us</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We are committed to providing exceptional healthcare services with a patient-centered approach
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image */}
            <div className="lg:col-span-1 relative">
              <div className="relative rounded-xl overflow-hidden h-full min-h-[500px]">
                <img
                  src="https://asirihealth.com/public/frontend/asiri_health/images/about.jpg"
                  alt="Why Choose Us"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
                {/* Overlay for better text readability on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
              </div>
            </div>

            {/* Right Column - Reasons */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: '👨‍⚕️',
                    title: 'Expert Medical Team',
                    description: 'Our board-certified physicians and specialists bring decades of experience and stay current with the latest medical advancements.'
                  },
                  {
                    icon: '🏥',
                    title: 'State-of-the-Art Facilities',
                    description: 'Equipped with the latest medical technology and diagnostic equipment for accurate diagnosis and effective treatment.'
                  },
                  {
                    icon: '❤️',
                    title: 'Patient-Centered Care',
                    description: 'We prioritize your comfort and well-being with personalized treatment plans and compassionate support throughout your healthcare journey.'
                  },
                  {
                    icon: '⚡',
                    title: 'Quick & Easy Access',
                    description: 'Same-day appointments, minimal wait times, and streamlined processes ensure you get the care you need when you need it.'
                  },
                  {
                    icon: '🤝',
                    title: 'Transparent Communication',
                    description: 'Clear explanations of diagnoses, treatment options, and costs with no hidden fees or surprises.'
                  },
                  {
                    icon: '🌐',
                    title: 'Comprehensive Services',
                    description: 'From preventive care to complex treatments, we offer a wide range of medical services under one roof.'
                  }
                ].map((reason, index) => (
                  <div 
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:translate-y-[-5px]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">{reason.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                        <p className="text-gray-400 text-sm">{reason.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '❤️',
                title: 'Compassion',
                description: 'Treating every patient with empathy, respect, and dignity'
              },
              {
                icon: '⚡',
                title: 'Excellence',
                description: 'Maintaining the highest standards of medical care and service'
              },
              {
                icon: '🔬',
                title: 'Innovation',
                description: 'Embracing new technologies and treatment methods'
              },
              {
                icon: '🤝',
                title: 'Integrity',
                description: 'Upholding ethical practices and transparent communication'
              },
              {
                icon: '👥',
                title: 'Teamwork',
                description: 'Collaborating to provide comprehensive patient care'
              },
              {
                icon: '🌍',
                title: 'Community',
                description: 'Serving and improving the health of our community'
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center text-xl mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        

        
      </div>
      <CallButton />
    </div>
  );
};

export default About;