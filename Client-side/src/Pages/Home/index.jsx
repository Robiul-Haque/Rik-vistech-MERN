
import Contact from "../Contact/Contact";
import AboutUs from "./AboutUs";
import Events from "./Events";
import FunFact from "./FunFact";
import HeroArea from "./HeroArea";
import PopularCourses from "./PopularCourses";
import Statistic from "./Statistic";


const Home = () => {
    return (
        <div>
           <HeroArea />
           <Statistic />
           <AboutUs />
           <FunFact />
           <PopularCourses />
           <Events />
        </div>
    );
};

export default Home;