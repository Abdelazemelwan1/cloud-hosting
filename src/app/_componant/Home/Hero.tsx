import Image from 'next/image'
import {TiTick} from 'react-icons/ti'
import CloudImage from "../../../../public/cloud-hosting.png";

export default function Hero() {
  return (
    <div className='h-auto md:h-[calc(100vh-100px)] flex flex-col md:flex-row items-center justify-center md:justify-around text-[rgb(10,9,9)] py-0 px-3.5 md:px-8 '>
        <div className='max-md:bg-[snow] max-md:my-5 max-md:mx-0 max-md:rounded-[20px] max-md:w-full max-md:p-3.5'>
            <h1 className='text-5xl font-bold text-black py-2'>Cloud Hosting</h1>
            <p className='text-xl'>The best web hosting solution for your online success</p>
            <div className='p-1.5 mt-4'>
                <div className='flex items-center text-xl font-bold mb-1.5 text-[#555]'><TiTick/> Easy To Use Control panel</div>
                <div className='flex items-center text-xl font-bold mb-1.5 text-[#555]'><TiTick/> Secure Hosting</div>
                <div className='flex items-center text-xl font-bold mb-1.5 text-[#555]'><TiTick/> Website Maintenance</div>
            </div>
        </div>
        <div>
            <Image  src={CloudImage} alt='CloudImage' width={500} height={500}/>
        </div>
    </div>
  )
}
