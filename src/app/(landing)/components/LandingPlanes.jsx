import { PlansGrid } from "@/components";
import { forwardRef } from "react";

export const LandingPlanes = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="py-12">
      <div className="mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold">Nuestros Planes</h2>
        <p className="text-gray-600 mt-4">Elige el plan que mejor se adapte a ti</p>
      </div>
      <PlansGrid/>
    </section>
  );
});

LandingPlanes.displayName = "LandingPlanes";
