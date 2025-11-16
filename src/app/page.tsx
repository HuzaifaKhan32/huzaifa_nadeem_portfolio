import Navbar from "./components/Navbar";
import TopBackground from "./components/Hero/TopBackground";
import Sections from "./components/Sections";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative overflow-clip" id="Home">
        <Sections/>
        <Navbar />
        <TopBackground />
        <Image src={"/bottom_gradient_mobile.svg"} alt='bottom gradient background' width={1024} height={700} className='absolute bottom-0 -z-50 md:hidden min-w-[1024px] min-h-[700px]' />
        <Image src={"/bottom_gradient.svg"} alt='bottom gradient background' width={1557} height={936} className='absolute -z-50 hidden md:block min-w-[1556px] min-h-[936px] -bottom-[175px] -translate-x-1/2 left-1/2' />
    </div>
  );
}
