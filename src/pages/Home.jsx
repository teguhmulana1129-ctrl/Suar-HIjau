
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import FeaturedPrograms from '../components/home/FeaturedPrograms';
import ImpactPreview from '../components/home/ImpactPreview';
import HealthPuzzle from '../components/home/HealthPuzzle';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <FeaturedPrograms />
            <ImpactPreview />
            <HealthPuzzle />
            <Newsletter />
        </>
    );
}
