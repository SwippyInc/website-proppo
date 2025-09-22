'use client'
import { NavBar1 } from "@/components/NavBar"
import Footer from "@/components/Footer"
export default function Pricing() {
    const pricing_data = [
        {name:'Yearly',cost:135,off:10},
        {name:'Half Yearly/Quaterly',cost:143,off:5},
        {name:'Monthly',cost:150,off:0},
    ]
    const features = [
        '📋 Unlimited Property Listings',
        '🔔 Real-Time Booking Notifications',
        '💸 Secure Payment Processing',
        '📊 Detailed Analytics Dashboard',
        '🛠️ 24/7 Customer Support',
        '🔄 Automated Booking Management',
        '🔒 Enhanced Data Security'
    ]
  return (
    <>
      <NavBar1/>
      <div className="w-[95%] md:w-[80%] mx-auto py-20 md:pt-40">
        <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl text-center">
            <span className="bl_un">Transparent</span> Pricing
        </h1>
        <p className="w-fit mx-auto mt-4 max-w-[90vw] text-xs md:text-sm opacity-70 italic bg-blue-800/5 p-1 px-2 border-r-[#6840ff] border-r-2 dark:bg-white/5 dark:border-r-white dark:text-white text-center">
        Choose the plan that fits your needs. No hidden fees. Just Powerful Features. 🙌
        </p>

        <div className="relative w-[90%] md:w-[80%] mx-auto mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4">
        {pricing_data.map((item, index) => {
          const { name, cost, off } = item
          return (
            <div
              key={index}
              className="flex items-center flex-col bg-white rounded-4xl shadow-xl justify-start gap-2 py-8 shadow-[#6840ff]/10 border border-gray-200 dark:bg-black/90 dark:border-gray-800/50 relative"
            >
            {off>0 && <div className="absolute -top-2 left-[50%] translate-x-[-50%] bg-[#6840ff] text-white px-2 py-1 rounded-t rounded-b-xl">
                {off}% off
            </div>}
              <div className="p-2 md:px-6">
                <p className="text-xl font-medium mb-2">{name}</p>
                <p className="text-2xl md:text-4xl font-bold text-[#6840ff] mb-2">₹{cost} <span className="text-base font-normal">/room/month</span></p>
                <p className="text-xs opacity-80 mb-2">Minimum ₹2000/month</p>
                <ul className="list-none text-xs md:text-sm mt-8">
                    {features.map((feature, i) => (
                        <li key={i} className={`my-3 ${i !== 0 ? 'border-t border-t-gray-200/50 pt-3 dark:border-gray-100/10' : ''}`}>{feature}</li>
                    ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
      </div>
      <Footer/>
    </>
  )
}
