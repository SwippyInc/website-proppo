"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";
import { useDemoForm, useSignUpForm } from "@/hooks/useForm";
import { IMAGES } from "../../../constants";
import { Check } from "lucide-react";
import Footer from "@/components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
}

const slideInBottom = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const bounceIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, type: 'spring', stiffness: 120, damping: 10 } }
}

export default function LandingPage() {
  const router = useRouter();
  const {renderDemoForm, formComponent} = useDemoForm() 
  const features = [
    { name: 'Property Management System', text: "Manage reservations, check-ins, and housekeeping in one place.", image: IMAGES.pms },
    { name: 'Website Builder', text: "Mobile-friendly website setup in minutes. No coding required.", image: IMAGES.electronic_ticket },
    { name: 'Direct Booking Engine', text: "0% Commission on direct bookings. Keep more revenue.", image: IMAGES.booking_engine },
  ]
  const property_types = [
    { name: 'Hotel', text: "Stop running your hotel like it’s 1998.", image: IMAGES.hotels },
    { name: 'Homestays', text: "More listings, less legwork.", image: IMAGES.homestays },
    { name: 'Villas', text: "More listings, less legwork.", image: IMAGES.villas },
    { name: 'Guest Houses', text: "More listings, less legwork.", image: IMAGES.guest_house },
  ]

  const highlights = [
    'Easy 15-minute setup',
    'Local support in India',
    'Built for Indian properties',
  ]
  return (
    <>{formComponent}
    {/* nav bar */}
    <nav className="flex items-center justify-center fixed top-0 left-0 h-auto w-screen bg-white/70 dark:bg-black/90">
        <div className="flex items-center justify-between w-[90%] md:w-[80%] py-4 madiv">
          <Link href={"/"} className='flex items-center justify-start logo_a'><Image src={IMAGES.proppo_logo} alt='Proppo' height={500} width={500} className="h-6 md:h-8 w-auto p-0 m-0"/></Link>
          <Button styles="btn_pri px-5 block text-lg md:text-base" onClick={renderDemoForm}>Book Demo</Button>
        </div>
    </nav>

    {/* hero section */}
    <section className="flex items-center justify-center relative flex-col pb-8 md:pb-12 lg:pb-20" id="home">
      <Image src={IMAGES.bookings} height={1000} width={1000} alt="" className="h-full w-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5"/>
      <div className="py-8 pt-40 flex flex-col items-center justify-center text-center w-[90%] lg:w-[80%] gap-6 relative">
        <h1 className="font-bold text-5xl lg:text-8xl" style={{lineHeight:'120%'}}>Hotel PMS<br/><span className="bl_un">Made Simple</span></h1>
        <p className="text-2xl md:text-3xl lg:text-4xl text-gray-500 max-w-4xl">PMS + Website Builder + Booking Engine</p>
        <Button styles="btn_pri px-6 md:p-3 md:px-8 block md:w-auto text-xl md:text-2xl rounded-3xl border-none" onClick={renderDemoForm}>Book Free Demo</Button>
        <Link target="_blank" href="/pricing"><Button styles="-mt-3 px-6 md:p-3 md:px-8 block md:w-auto md:text-lg md:text-4xl rounded-3xl">View Pricing</Button></Link>
      </div>
      <Image src={IMAGES.wdpd} height={1000} width={1000} className="object-contain h-auto relative w-[90%] lg:w-[80%]" alt=""/>
    </section>

    {/* features */}
    <section className="min-h-screen py-8 md:py-16 wcp" id="features">
      <motion.div
        className="flex items-center flex-col text-center gap-2 mt-8 md:mt-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl"><span className="bl_un">Everything</span> you need.</h1>
      </motion.div>
      <div className="relative w-[90%] md:w-[80%] mx-auto mt-8 md:mt-12 grid lg:grid-cols-2 gap-4 lg:gap-8 place-items-start">
        <motion.div
          className=""
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInLeft}
        >
          {features.map((item, index) => {
            const { name, text, image } = item
            return (
              <div key={index} className="flex items-center justify-start gap-2 md:gap-4 mb-4 md:mb-8">
                <div className="flex items-center justify-center h-20 md:h-24 aspect-square bg-blue/5 rounded-3xl md:p-4">
                  <Image src={image} alt={name} height={200} width={200} className="h-10 md:h-12 object-contain" />
                </div>
                <div className="p-2">
                  <p className="md:text-2xl font-medium">{name}</p>
                  <p className="text-xs md:text-sm opacity-60">{text}</p>
                </div>
              </div>
            )
          })}
        </motion.div>
        <div className="border-dashed border-gray-200 bg-white rounded-3xl overflow-hidden relative p-4 md:p-8  py-8 border w-full shadow-xl shadow-blue/5">
          <div className="flex items-center justify-start gap-4 mb-4">
            <div className="absolute top-0 right-0 bg-blue text-white text-xs md:text-sm lg:text-base p-1 px-8 rounded-bl-3xl uppercase">Popular Add-on</div>
            <div className="flex items-center justify-center h-16 md:h-24 aspect-square bg-blue/5 rounded-3xl md:p-4">
              <Image src={IMAGES.channel_manager} alt='Channel Manager' height={200} width={200} className="h-8 md:h-12 w-auto" />
            </div>
            <p className="text-lg md:text-2xl font-medium">Channel Manager</p>
          </div>
          <p className="text-lg md:text-2xl font-medium"><span style={{fontWeight:'bold',fontSize:'200%'}}>₹60</span>/room/month</p>
          <p className="text-xs md:text-sm opacity-60">Minimum monthly billing ₹1,000</p>
      </div>
      </div>
    </section>

    {/* built for all property types */}
    <section className="py-8 md:py-16 wcp" id="property_types">
      <motion.div
        className="flex items-center flex-col text-center gap-2 mt-8 md:mt-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl">Built for <span className="bl_un">all</span> property types</h1>
      </motion.div>
      <div className="relative w-[90%] md:w-[80%] mx-auto my-8 md:my-12">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInBottom}
        >
          {property_types.map((item, index) => {
            const { name, image } = item
            return (
              <div key={index} className="p-4 lg:p-8 rounded-3xl bg-white shadow-blue/5 shadow-xl flex items-center justify-center gap-4 flex-col transition duration-300 hover:scale-105">
                <Image src={image} alt={name} height={200} width={200} className="h-10 md:h-20 object-contain" />
                <p className="md:text-2xl font-medium">{name}</p>
              </div>
            )
          })}
        </motion.div>
      </div>
      <div className="flex flex-wrap gap-4 lg:gap-8 items-center justify-start lg:justify-center w-[90%] md:w-[80%] mx-auto mt-8 md:mt-12 mb-16">
          {highlights.map((h,i)=>{
            return(
              <div key={i} className="flex items-center justify-start gap-3 lg:gap-4">
                <div className="aspect-square bg-[#16a34a] text-white rounded-full p-2 md:p-3 lg:p-4">
                  <Check strokeWidth={3} className="h-3 md:h-6 lg:h-8 w-auto"/>
                </div>
                <p className="font-medium text-xl md:text-2xl lg:text-3xl text-gray-600">{h}</p>
              </div>
            )
          })}
      </div>
    </section>
    <Footer/>
    </>
  );
}
