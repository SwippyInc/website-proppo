'use client'
import { useEffect } from "react"
import Footer from "../../../components/Footer"
import Link from "next/link"
import { GoBackButton } from "@/components/Button"

export default function CancellationRefundPolicy() {
  useEffect(() => {
    document.title = 'Cancellation & Refund Policy'
  }, [])

  return (
    <div className="bg-[#6840ff]/5 text-gray-800 relative dark:bg-black/90 dark:text-white">
      <div
        className="w-[90%] md:w-[80%] mx-auto py-10 relative text-xs md:text-sm"
        style={{ zIndex: 2, lineHeight: '180%' }}
      >
        <div className="text-center mb-5 md:mb-10">
          <h1 className="mb-1 text-3xl md:text-5xl font-semibold">
            Cancellation & Refund Policy for <span className="bl_un">Swippy</span> Tech LLP
          </h1>
          <p className="text-sm opacity-80 italic bg-blue-800/5 p-1 px-2 border-r-[#6840ff] border-r-2 w-fit mx-auto mt-4 dark:bg-white/5 dark:border-r-white dark:text-white">
            Last updated: Dec 17, 2024
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-3xl bg-white/70 shadow-lg shadow-[#6840ff]/5 border border-gray-200/50 dark:bg-black/90 dark:border-gray-800/50">
          <p className="mb-4">
            <span className="bl_un">Swippy</span> Tech LLP maintains a strict non-refundable policy. Under this policy:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>All orders are final and non-refundable. Once an order is placed, it cannot be canceled or modified.</li>
            <li><span className="bl_un">Swippy</span> Tech LLP does not provide refunds or cancellations for any products, including perishable or non-perishable items.</li>
            <li>
              For any complaints, customers may report the issue to our Customer Service team. While we strive for quality, any resolution for such complaints will be at the sole discretion of <span className="bl_un">Swippy</span> Tech LLP.
            </li>
          </ul>
          <p className="mb-4">Thank you for your understanding.</p>
        </div>
      </div>
      <GoBackButton/>
      <Footer />
    </div>
  )
}