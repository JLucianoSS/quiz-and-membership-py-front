import { Checkout, Footer2, HeaderNoAccess } from "@/components";

export default function AdquirirPlanCheckoutPage() {
  return (
    <div>
      <div className="mt-10 mb-16 px-6 lg:px-20 xl:px-44">
        <HeaderNoAccess />
        <Checkout/>
      </div>
      <Footer2 />
    </div>
  );
}
