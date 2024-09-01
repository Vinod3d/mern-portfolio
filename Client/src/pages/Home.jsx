
// import Hero from "./miniComponents/Hero";
import Skills from "./Skills/Skills";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";
import About from "./About/About";
import MyWork from "./MyWork/MyWork";
import Services from "./Services/Services";
import Tools from "./Tools/Tools";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";

const Home = () => {
  return (
    <article className="">
      <Navbar/>
      <Hero/>
      <About/>
      <Services/>
      <Skills />
      <MyWork/>
      <Tools/>
      <Contact/>
      <Footer/>
    </article>
  );
};

export default Home;
