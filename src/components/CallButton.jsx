// CallButton.jsx
import { useState } from 'react';

const CallButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactInfo = {
    emergency: '(123) 456-7891',
    general: '(123) 456-7890',
    appointment: '(123) 456-7892',
    email: 'info@modernhealthcare.com'
  };

  return (
    <>
      {/* Floating Call Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </button>

      {/* Centered Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-w-sm w-full animate-fade-in">
            {/* Header */}
            <div className="bg-blue-600 p-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-bold text-lg">Contact Information</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Contact Info - Simple List */}
            <div className="p-6 space-y-6">
              {/* Emergency */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 font-bold text-sm">EMERGENCY</span>
                </div>
                <a 
                  href={`tel:${contactInfo.emergency}`}
                  className="text-white text-2xl font-bold hover:text-red-300 transition-colors block"
                >
                  {contactInfo.emergency}
                </a>
                <p className="text-gray-400 text-sm mt-2">24/7 Immediate Response</p>
              </div>

              {/* Horizontal Divider */}
              <div className="border-t border-gray-700"></div>

              {/* General Inquiry */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">General Inquiry</p>
                <a 
                  href={`tel:${contactInfo.general}`}
                  className="text-white text-xl hover:text-blue-300 transition-colors block"
                >
                  {contactInfo.general}
                </a>
              </div>

              {/* Appointment */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Appointment</p>
                <a 
                  href={`tel:${contactInfo.appointment}`}
                  className="text-white text-xl hover:text-green-300 transition-colors block"
                >
                  {contactInfo.appointment}
                </a>
              </div>

              {/* Email */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Email</p>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-white text-lg hover:text-blue-300 transition-colors block truncate"
                >
                  {contactInfo.email}
                </a>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <a 
                  href={`tel:${contactInfo.emergency}`}
                  className="bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
                >
                  Call Emergency
                </a>
                <a 
                  href={`tel:${contactInfo.general}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
                >
                  Call General
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default CallButton;