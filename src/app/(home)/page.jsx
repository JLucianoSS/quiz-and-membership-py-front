import { Sidebar } from "@/components";
import { Hero } from "./components";

export default function HomePage() {
  return (
    <>
      <div className="px-6 lg:px-20 xl:px-44">
        <Hero />
      </div>
      <Sidebar />
    </>
  );
}
