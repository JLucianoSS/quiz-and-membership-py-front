"use client"
import { useRef, useEffect } from "react"
import { LandingFAQ, LandingInfo, LandingPlanes, LandingSwiper } from ".."
import { useScrollStore } from "../../../../store/ui"

export const LandingContent = () => {
  const planesRef = useRef(null)
  const infoRef = useRef(null)
  const faqRef = useRef(null)
  
  const setScrollToPlans = useScrollStore((state) => state.setScrollToPlans)
  const setScrollToInfo = useScrollStore((state) => state.setScrollToInfo)
  const setScrollToFAQ = useScrollStore((state) => state.setScrollToFAQ)
  
  const scrollToPlans = useScrollStore((state) => state.scrollToPlans)
  const scrollToInfo = useScrollStore((state) => state.scrollToInfo)
  const scrollToFAQ = useScrollStore((state) => state.scrollToFAQ)

  const scrollWithOffset = (element, offset) => {
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    const headerHeight = 80; // Adjust this value to match your header's height

    setScrollToPlans(() => {
      if (planesRef.current) {
        scrollWithOffset(planesRef.current, headerHeight);
      }
    })

    setScrollToInfo(() => {
      if (infoRef.current) {
        scrollWithOffset(infoRef.current, headerHeight);
      }
    })

    setScrollToFAQ(() => {
      if (faqRef.current) {
        scrollWithOffset(faqRef.current, headerHeight);
      }
    })
  }, [setScrollToPlans, setScrollToInfo, setScrollToFAQ])

  return (
    <div className="mt-6 mb-20 px-6 lg:px-20 xl:px-44">
      <div className="mt-6">
        <LandingSwiper 
          onScrollToPlans={scrollToPlans}
          onScrollToInfo={scrollToInfo}
          onScrollToFAQ={scrollToFAQ}
        />
      </div>
      <div className="mt-6" ref={infoRef}>
        <LandingInfo 
          onScrollToPlans={scrollToPlans}
          onScrollToInfo={scrollToInfo}
          onScrollToFAQ={scrollToFAQ}
        />
      </div>
      <div className="mt-10" ref={planesRef}>
        <LandingPlanes />
      </div>
      <div className="mt-6" ref={faqRef}>
        <LandingFAQ />
      </div>
    </div>
  )
}