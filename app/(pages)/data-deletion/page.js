'use client'
import { useEffect } from "react"
import Footer from "../../../components/Footer"
import Link from "next/link"
import { GoBackButton } from "@/components/Button"

export default function DataDeletionPolicy() {
  useEffect(() => {
    document.title = 'Data Deletion Policy'
  }, [])

  return (
    <div className="bg-[#6840ff]/5 text-gray-800 relative dark:bg-black/90 dark:text-white">
      <div
        className="w-[90%] md:w-[80%] mx-auto py-10 relative text-xs md:text-sm"
        style={{ zIndex: 2, lineHeight: '180%' }}
      >
        <div className="text-center mb-5 md:mb-10">
          <h1 className="mb-1 text-3xl md:text-5xl font-semibold">
            Data Deletion Policy for <span className="bl_un">Swippy</span> Tech LLP
          </h1>
          <p className="text-sm opacity-80 italic bg-blue-800/5 p-1 px-2 border-r-[#6840ff] border-r-2 w-fit mx-auto mt-4 dark:bg-white/5 dark:border-r-white dark:text-white">
            Last updated: July 14, 2024
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-3xl bg-white/70 shadow-lg shadow-[#6840ff]/5 border border-gray-200/50 dark:bg-black/90 dark:border-gray-800/50">
          <h2 className="text-xl md:text-2xl font-medium mt-8 mb-4">Introduction</h2>
          <p className="mb-4">
            Swippy Tech LLP, located at Dhangvi Kalan, Kotkhai Local Bazaar, Shimla, 171202, is committed to respecting your privacy and ensuring the protection of your personal data. This Data Deletion Policy outlines the procedures for requesting and processing data deletion.
          </p>

          <h2 className="text-xl md:text-2xl font-medium mt-8 mb-4">Contact Information</h2>
          <p className="mb-4">
            For any data deletion requests, please contact us at <a href="mailto:hello@swippy.in" className="text-[#6840ff] hover:underline">hello@swippy.in</a>.
          </p>

          <h2 className="text-xl md:text-2xl font-medium mt-8 mb-4">Data Deletion Process</h2>
          <h3 className="text-lg font-medium mb-2">i) Request Submission</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Users may request the deletion of their personal data by sending an email to <a href="mailto:hello@swippy.in" className="text-[#6840ff] hover:underline">hello@swippy.in</a> with the subject line &quot;Data Deletion Request.&quot;</li>
            <li>Include your full name, contact details, and a description of the data you wish to be deleted.</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">ii) Verification</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Upon receiving a request, Swippy Tech LLP will verify the identity of the requester to ensure the authenticity of the request.</li>
            <li>Additional information may be required to complete the verification process.</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">iii) Processing</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Verified requests will be processed within 30 days of receipt.</li>
            <li>Swippy Tech LLP will delete the requested data from its systems and inform the requester upon completion.</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">iv) Exemptions</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Some data may not be eligible for deletion due to legal or regulatory requirements.</li>
            <li>Swippy Tech LLP will notify the requester if any data cannot be deleted and provide an explanation.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-medium mt-8 mb-4">Retention of Deleted Data</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Deleted data will be permanently removed from active databases.</li>
            <li>Backup copies may exist for a limited period but will also be purged in accordance with our data retention policies.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-medium mt-8 mb-4">Updates to this Policy</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Swippy Tech LLP reserves the right to update this Data Deletion Policy as needed.</li>
            <li>Any changes will be communicated via our website or direct communication.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-medium mt-8 mb-4">Contact Us</h2>
          <p className="mb-4">
            For any questions or concerns regarding this policy, please contact us at <a href="mailto:hello@swippy.in" className="text-[#6840ff] hover:underline">hello@swippy.in</a>.
          </p>
        </div>
      </div>
      <GoBackButton/>
      <Footer />
    </div>
  )
}