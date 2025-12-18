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
    { name: 'PMS', text: "Manage reservations, check-ins, and housekeeping in one place.", image: IMAGES.pms },
    { name: 'Website Builder', text: "Mobile-friendly website setup in minutes. No coding required.", image: IMAGES.electronic_ticket },
    { name: 'Kitchen', text: "0% Commission on direct bookings. Keep more revenue.", image: IMAGES.qr_menu },
    { name: 'Booking Engine', text: "0% Commission on direct bookings. Keep more revenue.", image: IMAGES.booking_engine },
  ]

  const highlights = [
    'Property Management System',
    'Custom Website Builder',
    'Direct Booking Engine',
    '24/7 Priority Support'
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

    <div className="flex-center-jc w-screen relative bg-gradient-to-b from-white to-blue/5" id="index_hero">
        <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
        >
            {/* <Image height={1000} width={1000} src={IMAGES.bo} alt='' className='hero_img' /> */}
        </motion.div>
        <div className="md:h-screen hero_div gap-4 md:gap-8 grid lg:grid-cols-2 mx-auto w-[90%] md:w-[80%] overflow-hidden">
            <motion.div
                className="flex items-center justify-center md:items-start flex-col gap-2 px-2 md:px-0 order-2 lg:order-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
            >
                {/* <motion.h1
                    style={{lineHeight:'110%'}}
                    className='text-center md:text-left text-4xl md:text-4xl lg:text-6xl font-bold text-blue'
                    variants={fadeInUp}
                >
                    PMS <span className="font-medium text-gray-400">+</span> Website Builder + Booking Engine
                </motion.h1> */}
                <h1 style={{lineHeight:'110%'}} className="text-center md:text-left text-4xl md:text-4xl lg:text-6xl font-medium text-gray-400 mb-2">
                    <span className="font-semibold">PMS</span> + <span className="font-semibold">Website Builder</span> + <span className="font-semibold">Booking Engine</span>
                </h1>
                <motion.p
                    className='text-sm text-center md:text-left md:text-xl text-gray-700/80 dark:text-white'
                    variants={fadeInUp}
                >
                    Everything your property needs to sell and manage bookings online
                </motion.p>
            </motion.div>
            <motion.div
                className="flex-center-jc h-fit md:h-auto order-1 lg:order-2 mt-[16vh] lg:mt-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={scaleIn}
            >
                <Image src={IMAGES.proppo_screenshots} height={1200} width={1200} className='h-full w-full object-contain hrimg' alt=''/>
            </motion.div>
        </div>
    </div>
    <div className="py-8 lg:py-0 bg-gradient-to-t from-white to-blue/5 wcp">
        <div className="flex items-center justify-start gap-2 md:gap-3 lg:gap-4 flex-wrap w-[90%] lg:w-[80%] mx-auto mb-8 lg:mb-16">
            {features.map((f,i)=>{
                let {name,image} = f
                return <div key={i} className="flex items-center justify-start p-1/2 px-2 rounded-full bg-blue/5 backdrop-blur-sm text-blue text-sm lg:text-xl lg:p-2 lg:px-4">
                    <div className="aspect-square rounded-full grid items-center p-2">
                        <Image src={image} alt={name} height={100} width={100} className="h-6 md:h-8 w-auto object-contain"/>
                    </div>
                    <p className="font-medium mr-2">{name}</p>
                </div>
            })}
        </div>
        <div className="border border-blue/20 rounded-4xl p-6 lg:p-8 bg-blue/5 text-blue w-[90%] lg:w-[80%] mx-auto space-y-4 lg:space-y-8 mb-8 lg:mb-16">
            <div className="flex items-center justify-between">
                <p className="font-medium text-blue text-lg md:text-xl lg:text-4xl">All-in-One Plan</p>
                <div className="bg-blue text-white rounded-4xl p-2 px-4 lg:px-8 uppercase text-xs md:text-base lg:text-lg" style={{letterSpacing:'2px'}}>Best Value</div>
            </div>
            <p className="text-5xl md:text-6xl lg:text-8xl text-blue font-semibold">₹999<span className="font-normal text-gray-500" style={{fontSize:'40%'}}>/month</span></p>
            <div>
                {highlights.map((h,i)=>{
                return(
                <div key={i} className={`flex items-center justify-start gap-3 lg:gap-4 py-3 lg:py-4 ${i == 0 ? '' : 'border-t border-gray-200'}`}>
                    <div className="aspect-square bg-blue text-white rounded-full p-1 md:p-2 lg:p-4">
                    <Check strokeWidth={3} className="h-4 md:h-6 w-auto"/>
                    </div>
                    <p className="md:text-xl lg:text-2xl  text-gray-600">{h}</p>
                </div>
                )
            })}
          </div>
          <Button styles="btn_pri p-3 px-6 lg:p-5 lg:px-10 block text-lg md:text-xl lg:text-2xl w-full rounded-full font-medium md:w-fit" onClick={renderDemoForm}>Get Started with Proppo</Button>
        </div>
    </div>
    <Footer/>
    </>
  );
}
