import { Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import Doctors from '../components/Doctors/Doctors';
import Appointment from '../components/Appointment/Appointment';
import Footer from '../components/Footer/Footer';

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Doctors />
      <Appointment />
      <Footer />
    </div>
  );
}

export default LandingPage;
