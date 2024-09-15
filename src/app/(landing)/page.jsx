import { Footer } from "@/components";
import { LandingFAQ, LandingHeader, LandingHero, LandingInfo, LandingPlanes, LandingSwiper } from "./components";


export default function LandingHomPage() {
  return (
    <>
      <LandingHeader/>
      <LandingHero/>

      <div className="mt-6 mb-20 px-6 lg:px-20 xl:px-44">
        <div className="mt-6"><LandingSwiper/></div>
        <div className="mt-6"><LandingInfo/></div>
        <div className="mt-10"><LandingPlanes/></div>
        <div className="mt-10"><LandingFAQ/></div>
      </div>

      <Footer/>
    </>
  );
}