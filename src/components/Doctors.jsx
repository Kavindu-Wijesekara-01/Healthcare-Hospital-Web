// Doctors.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CallButton from './CallButton';

const Doctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Pooja Umashankar',
      specialty: 'Cardiologist',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      days: ['Monday', 'Wednesday', 'Friday']
    },
    {
      id: 2,
      name: 'Dr. Kavindu Weeesekara',
      specialty: 'Neurologist',
      photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      days: ['Tuesday', 'Thursday', 'Saturday']
    },
    {
      id: 3,
      name: 'Dr. Lashmitha Krunadasa',
      specialty: 'Pediatrician',
      photo: 'https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      days: ['Monday', 'Tuesday', 'Friday']
    },
    {
      id: 4,
      name: 'Dr. Induwala Nirmal',
      specialty: 'Orthopedic Surgeon',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      days: ['Wednesday', 'Thursday', 'Saturday']
    },
    {
      id: 5,
      name: 'Dr. Yenuli Ayansa',
      specialty: 'Dermatologist',
      photo: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      days: ['Monday', 'Thursday', 'Friday']
    },
    
    {
      id: 7,
      name: 'Dr. Amanda Fernando',
      specialty: 'Dental',
      photo: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      days: ['Monday', 'Thursday', 'Friday']
    }
    
  ];

  const specializations = [
    'All Specialties',
    'Cardiologist',
    'Neurologist',
    'Pediatrician',
    'Orthopedic Surgeon',
    'Dermatologist',
    'Emergency Medicine',
    'Gynecologist',
    'Psychiatrist'
  ];

  const filteredDoctors = selectedSpecialty === 'All Specialties'
    ? doctors
    : doctors.filter(doctor => doctor.specialty === selectedSpecialty);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        
         {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'
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
              <span className="text-blue-300 text-sm">Meet Our Medical Team</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-blue-400">Doctors</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Expert medical professionals dedicated to your health and well-being
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { value: '50+', label: 'Expert Doctors' },
            { value: '15+', label: 'Specialties' },
            { value: '98%', label: 'Satisfaction' },
            { value: '24/7', label: 'Availability' }
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
        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            
            <div className="flex items-center gap-4">
              <select 
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <div 
                key={doctor.id} 
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-700/50"
              >
                {/* Doctor Photo */}
                <div className="relative">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Doctor Info */}
                <div className="p-6">
                  {/* Name & Specialty */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">{doctor.name}</h3>
                    <div className="text-blue-400">{doctor.specialty}</div>
                  </div>

                  {/* Available Days */}
                  <div className="mb-6">
                    <div className="text-gray-400 mb-2">Available Days:</div>
                    <div className="flex flex-wrap gap-2">
                      {doctor.days.map((day, index) => (
                        <div 
                          key={index} 
                          className="px-3 py-1 bg-gray-700 rounded-lg text-sm text-gray-300"
                        >
                          {day.slice(0, 3)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Book Appointment Button */}
                  <Link
                    to={`/appointment?doctor=${doctor.id}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium text-center transition-colors"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
      <CallButton />
    </div>
  );
};

export default Doctors;