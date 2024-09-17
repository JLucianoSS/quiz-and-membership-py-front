import { Footer } from "@/components";
import { LandingContent, LandingHeader, LandingHero } from "./components";


export default function LandingHomPage() {
  return (
    <div className="bg-gray-100">
      <LandingHeader/>
      <LandingHero/>
      <LandingContent/>
     
      <Footer/>
    </div>
  );
}