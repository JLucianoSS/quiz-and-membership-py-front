import { Footer, Navbar } from "@/components";



export default function HomeLayout({ children }) {
  return (
    <>
      <Navbar/>
      <div className="pt-14 ">
        { children }
      </div>
      {/* <Footer/> */}
    </>
  );
}