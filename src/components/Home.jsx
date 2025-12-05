// Home.jsx
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import CallButton from './CallButton';

// Custom hook for intersection observer
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return { ref, inView: isInView };
};

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTime;
      let animationFrame;

      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        setCount(Math.floor(percentage * end));

        if (progress < duration) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };

      animationFrame = requestAnimationFrame(updateCount);
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count}+</span>;
};

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const reviewsRef = useRef(null);

  // Navigation functions for the carousel
  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % 3);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + 3) % 3);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(nextReview, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Large Moving Gradient Orbs */}
        <div 
          className="absolute top-20 -right-20 w-[600px] h-[600px] bg-blue-800 rounded-full opacity-25 blur-3xl transition-all duration-200 ease-out animate-orb-float"
          style={{
            transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px) scale(1.1)`
          }}
        ></div>
        <div 
          className="absolute -bottom-32 -left-32 w-[700px] h-[700px] bg-indigo-900 rounded-full opacity-20 blur-3xl transition-all duration-200 ease-out animate-orb-float-delayed"
          style={{
            transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * -0.6}px) scale(1.05)`
          }}
        ></div>
        
        {/* Third Large Orb */}
        <div 
          className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-cyan-900 rounded-full opacity-15 blur-3xl transition-all duration-200 ease-out animate-orb-slow"
          style={{
            transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * -0.4}px)`
          }}
        ></div>

        {/* Enhanced Floating Particles */}
        <div className="absolute top-100 left-125 w-4 h-4 bg-blue-300 rounded-full animate-particle-float-1"></div>
        <div className="absolute top-43 right-1/5 w-4 h-4 bg-indigo-400 rounded-full animate-particle-float-2"></div>
        <div className="absolute top-28 left-115 w-7.5 h-7.5 bg-indigo-400 rounded-full animate-particle-float-3"></div>
        <div className="absolute top-25 right-40 w-2 h-2 bg-pink-400 rounded-full animate-particle-float-4"></div>
        
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-9">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in-up ">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-blue-900/50 px-4 py-2 rounded-full border border-blue-700/30 backdrop-blur-sm animate-glow">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-300">Trusted Healthcare Since 2010</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-text-focus">
                <span className="text-blue-400 block animate-text-glow">Healthcare</span>
                For Everyone
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in-delayed">
                Experience compassionate care with cutting edge medical technology. 
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left">
              <Link
                to="/appointment"
                className="group inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 "
              >
                <span>Book Appointment</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                to="/services"
                className="group inline-flex items-center justify-center gap-3 border border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm hover:bg-gray-800/50"
              >
                <span>Our Services</span>
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-8 pt-4 animate-stats-fade-in">
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-white animate-text-glow">
                  <AnimatedCounter end={50} duration={2000} />
                </div>
                <div className="text-sm text-gray-400 mt-1">Expert Doctors</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-white animate-text-glow">24/7</div>
                <div className="text-sm text-gray-400 mt-1">Emergency Care</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-white animate-text-glow">
                  <AnimatedCounter end={99} duration={2500} />
                </div>
                <div className="text-sm text-gray-400 mt-1">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="relative animate-fade-in-right">
            {/* Main Photo Container */}
            <div className="relative bg-gray-800 rounded-2xl p-4 shadow-2xl border border-gray-700 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-500 animate-card-float">
              <img
                src="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Modern Hospital Facility"
                className="rounded-xl w-full h-100 object-cover"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-600 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm animate-card-float-1 m-2">
                <div className="flex items-center gap-3 ">
                  <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center animate-icon-bounce">
                    <span className="text-green-400 text-lg">👨‍⚕️</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Expert Team</div>
                    <div className="text-sm text-gray-400">Specialized Doctors</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-600 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm animate-card-float-2 m-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center animate-icon-bounce-delayed">
                    <span className="text-blue-400 text-lg">🏥</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Modern Facility</div>
                    <div className="text-sm text-gray-400">Advanced Equipment</div>
                  </div>
                </div>
              </div>

              {/* Third Floating Card */}
              <div className="absolute top-1/2 -left-8 bg-gray-800 p-3 m-2 rounded-xl shadow-lg border border-gray-600 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm animate-card-float-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center animate-icon-bounce-slow">
                    <span className="text-purple-400 text-lg">⭐</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">5-Star Care</div>
                    <div className="text-sm text-gray-400">Rated Excellent</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -z-10 top-6 -right-6 w-full h-full bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-2xl transform rotate-2 animate-rotate-slow"></div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section - Horizontal Carousel */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-900/30 px-4 py-2 rounded-full border border-blue-700/30 backdrop-blur-sm mb-4">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-blue-300">Patient Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by <span className="text-blue-400">Our Patients</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear what our patients have to say about their healthcare experience
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevReview}
              className="absolute left-20 bottom-0 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 transform hover:scale-110 group"
              aria-label="Previous review"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextReview}
              className="absolute right-20 bottom-0 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 transform hover:scale-110 group"
              aria-label="Next review"
            >
              <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Track */}
            <div 
              ref={reviewsRef}
              className="overflow-hidden"
            >
              <div 
                className="flex transition-all duration-500 ease-out"
                style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
              >
                {/* Review Card 1 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-500 max-w-3xl mx-auto">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-md md:text-lg text-gray-300 mb-8 italic leading-relaxed">
                      "The care I received was exceptional. The doctors were attentive and the staff went above and beyond to make me feel comfortable. The modern facilities and cutting-edge technology truly made a difference in my recovery. Highly recommend!"
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-blue-900/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-semibold text-lg">SA</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-lg">Sarah Anderson</h4>
                        <p className="text-gray-400">Cardiology Patient</p>
                        <p className="text-sm text-gray-500 mt-1">Treated in March 2024</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Card 2 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-500 max-w-3xl mx-auto">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="ttext-md md:text-lg text-gray-300 mb-8 italic leading-relaxed">
                      "Modern facility with cutting-edge equipment. The entire process was seamless from appointment booking to treatment. The emergency care team was incredibly responsive and professional. Truly world-class healthcare experience."
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-semibold text-lg">MR</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-lg">Michael Roberts</h4>
                        <p className="text-gray-400">Orthopedic Surgery</p>
                        <p className="text-sm text-gray-500 mt-1">Treated in February 2024</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Card 3 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 max-w-3xl mx-auto">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-md md:text-lg text-gray-300 mb-8 italic leading-relaxed">
                      "Emergency care saved my father's life. The team was responsive, professional, and compassionate throughout the entire process. The 24/7 support and expert doctors provided the care we needed during a critical time. We're forever grateful."
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-purple-900/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-semibold text-lg">EJ</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-lg">Emily Johnson</h4>
                        <p className="text-gray-400">Family Care</p>
                        <p className="text-sm text-gray-500 mt-1">Treated in January 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReviewIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentReviewIndex === index 
                      ? 'bg-blue-500 w-10' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div 
            className="absolute top-1/4 left-10 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl transition-transform duration-500"
            style={{
              transform: `translateX(${mousePosition.x * 0.2}px) translateY(${mousePosition.y * 0.2}px)`
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-indigo-900/10 rounded-full blur-3xl transition-transform duration-500"
            style={{
              transform: `translateX(${-mousePosition.x * 0.2}px) translateY(${-mousePosition.y * 0.2}px)`
            }}
          ></div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-20px, 20px) scale(1.05); }
          50% { transform: translate(15px, -15px) scale(0.95); }
          75% { transform: translate(-10px, 10px) scale(1.02); }
        }
        
        @keyframes particle-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          25% { transform: translate(20px, -25px) scale(1.1); opacity: 1; }
          50% { transform: translate(-15px, -40px) scale(0.9); opacity: 0.6; }
          75% { transform: translate(25px, -15px) scale(1.05); opacity: 0.9; }
        }
        
        @keyframes particle-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-30px, -20px) scale(1.2); }
          50% { transform: translate(10px, -35px) scale(0.8); }
          75% { transform: translate(-20px, -10px) scale(1.1); }
        }
        
        @keyframes particle-float-3 {
          0%, 100% { transform: translate(0, 0); opacity: 0.7; }
          33% { transform: translate(25px, -30px); opacity: 1; }
          66% { transform: translate(-20px, -45px); opacity: 0.5; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(96, 165, 250, 0.5); }
          50% { text-shadow: 0 0 30px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.4); }
        }
        
        @keyframes button-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 25px rgba(59, 130, 246, 0.25); }
          50% { transform: scale(1.02); box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4); }
        }
        
        @keyframes card-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes icon-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
        }

        /* New horizontal slide animations */
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-out-right {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-100px);
          }
        }
        
        @keyframes slide-out-left {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100px);
          }
        }

        /* Animation Classes */
        .animate-orb-float { animation: orb-float 15s ease-in-out infinite; }
        .animate-orb-float-delayed { animation: orb-float 18s ease-in-out infinite 2s; }
        .animate-orb-slow { animation: orb-float 20s ease-in-out infinite 1s; }
        
        .animate-particle-float-1 { animation: particle-float-1 8s ease-in-out infinite; }
        .animate-particle-float-2 { animation: particle-float-2 9s ease-in-out infinite 1s; }
        .animate-particle-float-3 { animation: particle-float-3 10s ease-in-out infinite 2s; }
        .animate-particle-float-4 { animation: particle-float-1 11s ease-in-out infinite 3s; }
        
        .animate-fade-in-up { animation: fade-in-up 1.2s ease-out; }
        .animate-fade-in-right { animation: fade-in-right 1.2s ease-out 0.3s both; }
        .animate-fade-in-delayed { animation: fade-in-up 1.2s ease-out 0.6s both; }
        .animate-slide-in-left { animation: fade-in-up 1.2s ease-out 0.9s both; }
        .animate-stats-fade-in { animation: fade-in-up 1.2s ease-out 1.2s both; }
        
        .animate-text-glow { animation: text-glow 3s ease-in-out infinite; }
        .animate-button-pulse { animation: button-pulse 3s ease-in-out infinite; }
        .animate-card-float { animation: card-float 6s ease-in-out infinite; }
        .animate-card-float-1 { animation: card-float 5s ease-in-out infinite 1s; }
        .animate-card-float-2 { animation: card-float 5.5s ease-in-out infinite 1.5s; }
        .animate-card-float-3 { animation: card-float 6s ease-in-out infinite 2s; }
        
        .animate-icon-bounce { animation: icon-bounce 2s infinite; }
        .animate-icon-bounce-delayed { animation: icon-bounce 2s infinite 0.5s; }
        .animate-icon-bounce-slow { animation: icon-bounce 2s infinite 1s; }
        
        .animate-rotate-slow { animation: rotate-slow 120s linear infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        
        .animate-review-fade-in {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-text-focus {
          animation: fade-in-up 1.5s ease-out;
        }

        /* New horizontal animation classes */
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
        .animate-slide-out-right { animation: slide-out-right 0.6s ease-out; }
        .animate-slide-out-left { animation: slide-out-left 0.6s ease-out; }
      `}</style>

      <CallButton />
    </div>
  );
};

export default Home;