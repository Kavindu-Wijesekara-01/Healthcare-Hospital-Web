// Appointment.jsx
import { useState } from 'react';
import emailjs from 'emailjs-com';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    doctor: '',
    department: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Your EmailJS credentials - මේවා ඔබේ ඇත්තටම දාන්න
  const EMAILJS_CONFIG = {
    serviceID: 'service_h811nyf', // EmailJS වලින් ගන්න
    templateID: 'template_zfm5wn4', // EmailJS වලින් ගන්න  
    userID: 'lxWIz-db9TzespDM3' // API Keys වලින් ගන්න
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.serviceID,
        EMAILJS_CONFIG.templateID,
        {
          to_name: 'Hospital Admin',
          to_email: 'tech.kavinduwijesekara@gmail.com', // ඔබගේ hospital email
          from_name: formData.name,
          from_email: formData.email || 'patient@noemail.com',
          phone: formData.phone,
          appointment_date: formData.date,
          appointment_time: formData.time,
          doctor: formData.doctor || 'Not Specified',
          department: formData.department,
          message: formData.message || 'No additional message',
          subject: `New Appointment Request - ${formData.name}`
        },
        EMAILJS_CONFIG.userID
      );

      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        doctor: '',
        department: '',
        message: ''
      });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);

    } catch (err) {
      console.error('EmailJS Error Details:', err);
      
      if (err.text) {
        // Show specific error from EmailJS
        setError(`EmailJS Error: ${err.text}`);
      } else if (err.message) {
        setError(`Error: ${err.message}`);
      } else {
        setError('Failed to send appointment. Please try again or call us directly.');
      }
      
    } finally {
      setLoading(false);
    }
  };

  // For testing - Console log the details
  const handleTestSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment Details:', formData);
    
    // Show success message for testing
    setSuccess(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      doctor: '',
      department: '',
      message: ''
    });
    
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative overflow-hidden">
        
         {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            filter: 'blur(3px)'
          }}
        />
        
        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-gray-900/70 to-black/90"></div>
      

        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-800/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-700/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 text-sm">Book Your Appointment</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Book <span className="text-blue-400">Appointment</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Schedule your visit with our expert medical team
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          {success && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-green-400 font-bold">Appointment Request Sent!</h4>
                  <p className="text-green-300 text-sm">We'll contact you shortly to confirm.</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-red-400 font-bold">Error</h4>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/50">
            {/* Form fields same as before... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 mb-2">Full Name </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Phone Number </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Preferred Date </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={today}
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Preferred Time </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Time</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Department </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Department</option>
                  <option value="General Consultation">General Consultation</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Dental">Dental</option>
                  <option value="Eye Care">Eye Care</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">Preferred Doctor (Optional)</label>
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Doctor (Optional)</option>
                  <option value="Dr. Sarah Johnson - Cardiology">Dr. Pooja Umashankar - Cardiology</option>
                  <option value="Dr. Michael Chen - Neurology">Dr. Kavindu Weeesekara - Neurology</option>
                  <option value="Dr. Emily Rodriguez - Pediatrics">Dr. Lashmitha Krunadasa - Pediatrics</option>
                  <option value="Dr. Robert Williams - Orthopedics">Dr. Dulmi Nawodya - Orthopedics</option>
                  <option value="Dr. Lisa Thompson - Dermatology">Dr. Yenuli Ayansa - Dermatology</option>
                  <option value="Any Available Doctor - General">Any Available Doctor - General</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">Message / Symptoms (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Briefly describe your symptoms or reason for visit"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold transition-colors ${
                  loading
                    ? 'bg-blue-800 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Book Appointment'
                )}
              </button>

              <div className="text-center sm:text-right">
                <div className="text-gray-400 text-sm">Or call us directly:</div>
                <a href="tel:+1234567890" className="text-blue-400 hover:text-blue-300 font-bold text-lg">
                  077-6543765
                </a>
              </div>
            </div>

            
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default Appointment;