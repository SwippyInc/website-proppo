'use client'
import Image from 'next/image'
import hero from '../public/images/hero.png'
import bookings from '../public/images/bookings.png'
import Button from './Button'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useSignUpForm } from '@/hooks/useForm'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut', type: 'spring', stiffness: 100 } }
}

const bounceIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, type: 'spring', stiffness: 120, damping: 10 } }
}

export default function Hero() {
  const router = useRouter()
  const {renderSUForm, formComponent} = useSignUpForm()
  return (
    <>
    {formComponent}
    <div className="flex-center-jc h-screen w-screen hero relative" id="index_hero">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={scaleIn}
        >
          <Image height={1000} width={1000} src={bookings} alt='' className='hero_img' />
        </motion.div>
        <div className="h-[120vh] md:h-screen hero_div md:gap-4 grid md:grid-cols-2 mx-auto w-[90%] md:w-[80%] overflow-hidden">
            <motion.div
              className="flex items-center justify-center md:items-start flex-col gap-2 pt-[10vh] md:pt-0 px-2 md:px-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
                <motion.div
                  className="flex items-center justify-center md:justify-start gap-1"
                  variants={slideInLeft}
                >
                  <div className="text-[10px] md:text-sm bg-[#6840ff]/5 text-[#6840ff] dark:text-white dark:bg-white/5 w-fit text-blue text-center rounded-3xl p-1 px-3 italic font-medium">#Proppo</div>
                  <div className="text-[10px] md:text-sm bg-[#6840ff]/5 text-[#6840ff] dark:text-white dark:bg-white/5 w-fit text-blue text-center rounded-3xl p-1 px-3 italic font-medium">#PropertyManagementSystem</div>
                </motion.div>
                <motion.h1
                  style={{lineHeight:'110%'}}
                  className='text-center md:text-left text-4xl md:text-4xl lg:text-6xl font-bold'
                  variants={fadeInUp}
                >
                  One Product, <br/>Every Solution, <br/><span>Zero Headaches</span>
                </motion.h1>
                <motion.p
                  className='text-sm text-center md:text-left md:text-xl text-gray-800/80 dark:text-white'
                  variants={fadeInUp}
                >
                  Reservations, OTAs, check-ins, food ordering Proppo handles it all for <span className='font-medium'>₹150/room/month</span>.
                </motion.p>
                <motion.p
                  className='text-xs md:text-sm opacity-70 italic bg-blue-800/5 dark:bg-white/5 p-1 px-2 border-r-2 border-r-[#6840ff] dark:border-r-white'
                  variants={fadeInUp}
                >
                  Nope, no asterisk, no tiny fine print. Promise.
                </motion.p>
                <motion.div
                  className="flex items-center justify-center md:justify-center gap-2 mt-2"
                  variants={fadeInUp}
                >
                  <motion.div variants={bounceIn}>
                    <Button styles="btn_pri md:text-lg px-5" onClick={renderSUForm}>Sign Up Now</Button>
                  </motion.div>
                  <motion.div variants={bounceIn} transition={{ delay: 0.2 }}>
                    <Button styles="btn_sec md:text-lg px-5" onClick={() => router.push('/pricing')}>See Pricing</Button>
                  </motion.div>
                </motion.div>
            </motion.div>
            <motion.div
              className="flex-center-jc h-fit md:h-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
            >
              <Image src={hero} height={1200} width={1200} className='h-full w-full object-contain hrimg' alt=''/>
            </motion.div>
        </div>
    </div>
    </>
  )
}