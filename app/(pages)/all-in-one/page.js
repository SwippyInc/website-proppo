"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";
import { useDemoForm, useSignUpForm } from "@/hooks/useForm";
import { IMAGES } from "../../../constants";
import { Check, CheckCircle2, Clock12, HandFist, WatchIcon } from "lucide-react";
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
  const inclusions = [
    { name: 'PMS', image: IMAGES.pms },
    { name: 'Channel Manager', image: IMAGES.channel_manager },
    { name: 'Booking Engine', image: IMAGES.booking_engine },
    { name: 'Restaurant POS', image: IMAGES.kitchen_pos },
    { name: 'Kitchen Management', image: IMAGES.kitchen_management },
    { name: 'Hotel Website', image: IMAGES.hotel_website },
    { name: 'WhatsApp Communication', image: IMAGES.whatsapp },
    { name: 'Payment Gateway', image: IMAGES.payment_gateway },
    { name: 'Reports & Integrations', image: IMAGES.all_in_one },
    
  ]

  const why_proppo = [
    {title:'One Software',text:'Manage your entire property from a single dashboard. No more switching tabs.'},
    {title:'No Multiple Vendors',text:'Stop juggling subscriptions. Get everything you need in one place.'},
    {title:'Better Control, Lower Cost',text:'Save up to 40% on operational costs while gaining total visibility.'}
  ]
  
  return (
    <>{formComponent}
    {/* nav bar */}
    <nav className="flex items-center justify-center h-auto w-screen bg-white/70 dark:bg-black/90">
        <div className="flex items-center justify-between w-[90%] md:w-[80%] py-4 madiv">
          <Link href={"/"} className='flex items-center justify-start logo_a'><Image src={IMAGES.proppo_logo} alt='Proppo' height={500} width={500} className="h-6 md:h-8 w-auto p-0 m-0"/></Link>
          <Button styles="btn_pri px-5 block text-lg md:text-base" onClick={renderDemoForm}>Book Demo</Button>
        </div>
    </nav>

    <div className="flex-center-jc py-20 lg:h-screen w-screen relative bg-black" id="index_hero">
        <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
        >
            <Image height={1000} width={1000} src={IMAGES.hero_bg_img} alt='' className='opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full object-cover blur-xs' />
        </motion.div>
        <div className="relative w-[90%] lg:w-[80%] mx-auto flex items-center justify-center h-full flex-col gap-4 text-center text-white">
            <div className="text-xs md:text-sm lg:text-xl bg-white/10 backdrop-blur-xl rounded-3xl p-1 px-3 font-medium">#1 Hospitality Platform</div>
            <h1 style={{lineHeight:'110%'}} className='text-center text-4xl md:text-6xl lg:text-8xl font-bold'>All-in-One<br/><span className="text-blue">Hotel Software</span></h1>
            <p className='text-gray-200 text-sm md:text-base lg:text-xl leading-relaxed max-w-2xl mx-auto opacity-80'>PMS • Channel Manager • Booking Engine • Restaurant • Website • WhatsApp • Payments</p>
            <Button styles="btn_pri md:text-lg px-5 lg:p-3 lg:px-10 rounded-full lg:text-xl" onClick={renderDemoForm}>Book Free Demo</Button>
            <p className='text-gray-100 text-xs leading-relaxed max-w-2xl mx-auto opacity-80 font-extralight -mt-2'>No credit card required</p>
        </div>
    </div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 w_80_90 relative pb-12 items-start">
        <div className="-mt-12 space-y-8">
            <div className="p-4 lg:p-8 rounded-4xl bg-white shadow-xl shadow-blue/5 text-center space-y-4 lg:text-left border border-blue/10">
                <p className="text-gray-600 uppercase lg:text-lg" style={{letterSpacing:'2px'}}>unbeatable pricing</p>
                <p className="text-blue font-semibold text-4xl lg:text-6xl">₹150<span className="text-gray-600 font-normal" style={{fontSize:'40%'}}>/room/month</span></p>
                <p className='text-gray-800 text-xs md:text-sm lg:text-base max-w-2xl mx-auto opacity-80 font-light -mt-2'>Minimum billing ₹1,500/- per month <br/><span style={{fontSize:'80%',opacity:'90%'}}>+ GST extra</span></p>
            </div>
            <div className="text-center lg:text-right">
                <p className='text-gray-800 text-xl md:text-2xl lg:text-4xl leading-relaxed font-medium'>Everything Included</p>
                <p className='text-gray-500 leading-relaxed text-xs md:text-sm lg:text-base'>No hidden modules, one complete suite</p>
            </div>
        </div>
        <div className="lg:col-span-2 p-4 pt-0 lg:p-8">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
                {inclusions.map((inc,i)=>{
                    let {name,image} = inc
                    return <div className="flex flex-col items-center justify-start gap-2 text-center bg-white rounded-2xl p-4 px-2 shadow-xl shadow-blue/5 border border-blue/5 transition duration-300 hover:scale-105 text-gray-600 hover:text-blue" key={i}>
                        <Image src={image} height={500} width={500} alt={name} className="object-contain h-10 lg:h-12"/>
                        <p className="text-[10px] md:text-xs font-light">{name}</p>
                    </div>
                })}
            </div>
        </div>
    </div>
    <div className="flex-center-jc bg-black py-12 lg:py-16">
        <div className="w_80_90 space-y-8">
            <p className="text-2xl mg:text-3xl lg:text-4xl text-white font-semibold">Why choose <span className="text-blue">Proppo?</span></p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {why_proppo.map((item,i)=>{
                    let {title,text} = item
                    return(
                        <div className="flex items-center justify-start gap-2 lg:gap-4" key={i}>
                            <div className="aspect-square bg-white/10 rounded-full grid items-center p-3 lg:p-4">
                                <CheckCircle2 className="text-blue h-8 w-8"/>
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium md:text-lg lg:text-xl text-white">{title}</p>
                                <p className="text-gray-500 text-xs">{text}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    <div className="flex-center-jc py-20  w-screen relative">
        <div className="relative w-[90%] lg:w-[80%] mx-auto flex items-center justify-center h-full flex-col gap-4 text-center">
            <h1 style={{lineHeight:'120%'}} className='text-center text-5xl md:text-6xl lg:text-7xl font-bold'>One System.<br/>One Price. Total Control.</h1>
            <p className='text-blue lg:text-xl leading-relaxed max-w-2xl mx-auto opacity-80'>Join 1000+ hoteliers simplifying their operations today</p>
            <Button styles="btn_pri md:text-lg p-3 lg:p-3 lg:px-10 rounded-full lg:text-xl w-full md:w-fit" onClick={renderDemoForm}>Book Free Demo</Button>
            <div className='flex items-center justify-center gap-1 text-gray-500 text-xs'>
                <Clock12 size={12} className="-mt-[2px]"/> Setup in 24 hours.&nbsp; <HandFist size={12} className="-mt-[2px]"/> 24/7 Support.
            </div>
        </div>
    </div>
    <Footer/>
    </>
  );
}
