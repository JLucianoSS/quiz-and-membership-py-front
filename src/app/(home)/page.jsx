import { Sidebar } from "@/components";
import { SwiperActions, SwiperCategories, SwiperHeros } from "./components";
import { especialidades } from "@/data/especialidades";

export default function HomePage() {




  return (
    <>
      <div className="px-6 lg:px-20 xl:px-44">
        <SwiperHeros/>
        <SwiperCategories especialidades={especialidades}/>
        <SwiperActions/>
        <div className="mb-20"></div>
      </div>




      <Sidebar />
    </>
  );
}
