import HeroSection from "../../components/home/HeroSection.jsx";
import FeaturesSection from "../../components/home/FeaturesSection.jsx";
import HowItWorks from "../../components/home/HowItWorks.jsx";
import TopDoctors from "../../components/home/TopDoctors.jsx";
import StatisticsSection from "../../components/home/StatisticsSection.jsx";
import TestimonialsSection from "../../components/home/Testimonials.jsx";
import CTASection from "../../components/home/CTASection.jsx";
import Footer from "../../components/layout/Footer.jsx";

const Home = () => {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <HowItWorks />
            <TopDoctors />
            <StatisticsSection />
            <TestimonialsSection />
            <CTASection />
            <Footer/>
        </>
    );
};

export default Home;