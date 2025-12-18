'use client'
import { Suspense } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Data from "@/app/_backend_service/Service";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const bounceIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, type: "spring", stiffness: 120, damping: 10 } },
};

function ThankYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("t");

  useEffect(() => {
    if (!Data.is_submitted || !type || (type !== "SIGNUP" && type !== "DEMO_REQUEST")) {
      router.replace("/");
    } else {
      document.title = "Thank You | Proppo";
    }
  }, [type, router]);

  const isSignup = type === "SIGNUP";
  const subtext = isSignup
    ? "We've received your signup details. Our team will reach out to you soon to get you started with Proppo. 🚀"
    : "Your demo call has been scheduled. Expect a call from us at the preferred time. Let's simplify your property management! 📞";
  const emojiQuote = isSignup
    ? "No more 2 AM Excel battles. Your sanity thanks you. 😌"
    : "Get ready for a hassle-free demo. Coffee's on us (virtually)! ☕";

  return (
    <motion.div
      className="relative w-[90%] md:w-[80%] mx-auto text-center"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <motion.div className="flex items-center flex-col text-center gap-4 mb-8 md:mb-12" variants={scaleIn}>
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-white">
          {isSignup ? "Signup Request" : "Demo Request"} <span className="bl_un">{isSignup ? "Submitted!" : "Submitted!"}</span>{" "}
          🎉
        </h1>
        <p className="text-sm md:text-xl text-gray-800/80 max-w-[90%] md:max-w-[80%] mx-auto mt-2 dark:text-white/80">
          {subtext}
        </p>
        <p className="text-xs md:text-sm opacity-70 italic bg-blue-800/5 p-1 px-2 border-r-[#6840ff] border-r-2 max-w-[90vw] dark:bg-white/5 dark:border-r-white dark:text-white">
          {emojiQuote}
        </p>
      </motion.div>

      <motion.div className="flex items-center justify-center gap-2 md:gap-4" variants={bounceIn}>
        <Button styles="btn_pri text-sm md:text-lg px-5" onClick={() => router.back()}>
          👉 Back to Home
        </Button>
      </motion.div>
    </motion.div>
  );
}

// Main server component
export default function ThankYouPage() {
  return (
    <div className="min-h-screen py-16 flex items-center justify-center bg-[#6840ff]/5 dark:bg-black/90">
      <Suspense fallback={<div>Loading...</div>}>
        <ThankYouContent />
      </Suspense>
    </div>
  );
}