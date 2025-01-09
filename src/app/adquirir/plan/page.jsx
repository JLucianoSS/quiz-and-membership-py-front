import { LandingPlanes } from "@/app/(landing)/components";
import { Footer2, HeaderNoAccess } from "@/components";

export default function AdquirirPlanPage() {
  return (
    <div>
      <div className="mt-10 mb-16 px-6 lg:px-20 xl:px-44">
        <HeaderNoAccess />
        <LandingPlanes/>
      </div>
        <Footer2/>
    </div>
  );
}