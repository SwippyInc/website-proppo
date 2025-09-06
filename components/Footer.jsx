'use client'
import Image from "next/image";

import proppo_white_logo from '../public/images/proppo_logo.png'

import Link from "next/link";
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function Footer() {
  const links = [
    {name:'Instagram',url:'https://www.instagram.com/swippytech/',icon:'instagram_logo'},
    {name:'YouTube',url:'https://www.youtube.com/@SwippyTech',icon:'youtube_logo'},
    {name:'X',url:'https://x.com/Swippy_tech',icon:'x_logo'},
    {name:'LinkedIn',url:'https://in.linkedin.com/company/swippytech',icon:'linkedin_logo'},
    {name:'F6S',url:'https://www.f6s.com/company/swippy-tech-llp',icon:'f6s_logo'},
    {name:'Crunchbase',url:'https://www.crunchbase.com/organization/swippy-tech',icon:'crunchbase_logo'},
  ]
  return (
    <footer className="py-16 bg-[#6840ff]/5">
      <motion.div
        className="w-[90%] md:w-[80%] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="flex flex-col items-start justify-start"
            variants={scaleIn}
          >
            <Image src={proppo_white_logo} height={100} width={300} className="h-10 w-auto" alt="Proppo" />
            <p className="text-[8px] opacity-80 text-gray-800 uppercase mt-2 tracking-widest dark:text-white">
              Copyright &copy; Proppo. All Rights Reserved.
            </p>
          </motion.div>
          <motion.div
            className="text-gray-800 dark:text-white"
            variants={fadeInUp}
          >
            <p className="text-lg font-semibold mb-4"><span className="bl_un">Quick</span> Links</p>
            <ul className="list-none flex flex-col gap-2 text-xs md:text-sm leading-4">
              <li><Link href="/termsandconditions" className="hover:text-[#6840ff] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#6840ff] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refundandcancellation" className="hover:text-[#6840ff] transition-colors">Refund and Cancellation Policy</Link></li>
              <li><Link href="/data-deletion" className="hover:text-[#6840ff] transition-colors">Data Policy</Link></li>
            </ul>
          </motion.div>
          <motion.div
            className="text-gray-800 dark:text-white"
            variants={fadeInUp}
          >
            <p className="text-lg font-semibold mb-4"><span className="bl_un">Contact</span> Us</p>
            <ul className="list-none flex flex-col gap-1 text-xs md:text-sm leading-5">
              <li>
                Swippy Tect LLP<br />
                Kasumpti, Shimla (HP) - 171009
              </li>
              <li><Link href="mailto:mail@proppo.in" title="Mail Us" className="hover:text-[#6840ff] transition-colors">mail@proppo.in</Link></li>
              <li><Link href="tel:+919418855294" title="Call Us" className="hover:text-[#6840ff] transition-colors">+91 94188 55294</Link></li>
            </ul>
          </motion.div>
          <motion.div
            className="text-gray-800 dark:text-white w-full flex items-start lg:items-center justify-center flex-col lg:flex-row md:col-span-2 lg:col-span-3 lg:justify-between gap-2 lg:gap-0"
            variants={fadeInUp}
          >
            <p className="text-xs md:text-sm italic text-gray-800/80 bg-blue-800/5 p-1 px-2 border-r-[#6840ff] border-r-2 dark:bg-white/5 dark:border-r-white dark:text-white">
              Built with ❤️ by Proppo
            </p>
            <ul className="flex items-center justify-start gap-1 lg:w-[32%]">
              {links.map((link,index)=>{
                let {name,url,icon} = link
                return <Link className="flex items-center justify-center flex-col border rounded-full p-2 transition duration-300 hover:border-[#6840ff]" key={index} href={url} target="_blank" title={name}>
                <img src={`/icons/${icon}.png`} className="w-6 lg:w-4 object-contain"/>
                  {/* <Image src={icon} className="h-8 object-contain"/> */}
                </Link>
              })}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  )
}
