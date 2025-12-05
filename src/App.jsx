// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import Doctors from './components/Doctors';
import About from './components/About';
import Footer from './components/Footer';
import Appointment from './components/Appointment';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;