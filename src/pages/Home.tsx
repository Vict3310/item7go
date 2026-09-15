import CinematicHero from '../components/CinematicHero';
import Intro from '../components/Intro';
import FoodShowcase from '../components/FoodShowcase';
import Filmstrip from '../components/Filmstrip';
import ChefsSpecial from '../components/ChefsSpecial';
import Experience from '../components/Experience';
import Testimonials from '../components/Testimonials';
import Locations from '../components/Locations';
import Footer from '../components/Footer';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BackToTop from '../components/BackToTop';
import FloatingOrderCTA from '../components/FloatingOrderCTA';
import AwardsBar from '../components/AwardsBar';
import ParticleField from '../components/ParticleField';
import FilmGrain from '../components/FilmGrain';

export default function Home() {
  return (
    <>
      <ParticleField />
      <FilmGrain />
      <ScrollProgressBar />
      <CinematicHero />
      <AwardsBar />
      <Intro />
      <ChefsSpecial />
      <Filmstrip />
      <FoodShowcase />
      <Experience />
      <Testimonials />
      <Locations />
      <Footer />
      <BackToTop />
      <FloatingOrderCTA />
    </>
  );
}
