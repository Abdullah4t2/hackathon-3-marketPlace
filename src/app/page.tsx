import Image from "next/image";
import HomePage from "./HomePage/page";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";


export default function Home() {
  return (
    <div>
            <Header/>
            <Hero/>


      <HomePage/>
      <Footer/>
      
    </div>
  );
}
