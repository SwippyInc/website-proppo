'use client'

import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
    let router = useRouter()
    useEffect(()=>{
        router.replace('/')
    },[])
  return (
    <div className="flex items-center justify-center h-screen">
        <Loader size={50} className="animate-spin"/>
    </div>
  )
}
