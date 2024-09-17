
"use client"
import { useRef } from "react";
import { LandingFAQ, LandingInfo, LandingPlanes, LandingSwiper } from ".."


export const LandingContent = () => {

  const planesRef = useRef(null);

  const scrollToPlans = () => {
    if (planesRef.current) {
      planesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
     <div className="mt-6 mb-20 px-6 lg:px-20 xl:px-44">
        <div className="mt-6"><LandingSwiper onScrollToPlans={scrollToPlans}/></div>
        <div className="mt-6"><LandingInfo onScrollToPlans={scrollToPlans}/></div>
        <div className="mt-10"><LandingPlanes ref={planesRef}/></div>
        <div className="mt-6"><LandingFAQ/></div>
    </div>
  )
}
