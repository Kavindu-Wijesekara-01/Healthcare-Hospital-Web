// Footer.jsx
import { Link } from 'react-router-dom';
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Hospital Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🏥</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Modern Healthcare</h3>
                <p className="text-sm text-gray-400">Since 2010</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Providing exceptional healthcare with compassion and advanced medical technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-200 text-3xl hover:text-white">
                <FaFacebookSquare />
              </a>
              <a href="#" className="text-gray-200 text-3xl hover:text-white">
                <FaSquareTwitter />
              </a>
              <a href="#" className="text-gray-200 text-3xl hover:text-white">
                <FaInstagramSquare />
              </a>
              <a href="#" className="text-gray-200 text-3xl hover:text-white">
                <FaSquareYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-400 hover:text-white transition-colors">
                  Doctors
                </Link>
              </li>
              
              <li>
                <Link to="/appointment" className="text-gray-400 hover:text-white transition-colors">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">
                  High level Road<br />
                  Nugegoda.
                </span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
                    011-1234567
                  </a>
                  <div className="text-sm text-gray-500 mt-1">General Inquiries</div>
                </div>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <a href="tel:+11234567890" className="text-gray-400 hover:text-white transition-colors">
                    011-2223334
                  </a>
                  <div className="text-sm text-gray-500 mt-1">Emergency 24/7</div>
                </div>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@modernhealthcare.com" className="text-gray-400 hover:text-white transition-colors">
                  info@modernhealthcare.com
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Opening Hours</h4>
            <ul className="space-y-3">
              <li className="flex space-x-5">
                <span className="text-gray-400">Monday - Friday</span>
                <span className="text-white">8:00 AM - 8:00 PM</span>
              </li>
              <li className="flex space-x-5 ">
                <span className="text-gray-400">Saturday</span>
                <span className="text-white">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex space-x-5 ">
                <span className="text-gray-400">Sunday</span>
                <span className="text-white">10:00 AM - 4:00 PM</span>
              </li>
              <li className="pt-4 border-t border-gray-800">
                <div className="text-red-400 font-medium">Emergency Department</div>
                <div className="text-white">Open 24/7</div>
              </li>
            </ul>
          </div>
        </div>

        

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="text-gray-400 text-sm">
              &copy; 2025 All rights reserved | Developed By Kavindu Wijesekara.
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;