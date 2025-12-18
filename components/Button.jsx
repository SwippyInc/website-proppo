'use client'

import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'
import { useState, useEffect } from "react"

export default function Button(props) {
    const {children,styles} = props
  return (
    <button {...props} className={cn('btn rounded-xl p-2 px-4',styles)}>{children}</button>
  )
}

export function GoBackButton(){
  return <Link
    href="/"
    style={{zIndex:5}}
    className="fixed bottom-4 right-4 bg-blue text-white px-4 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg hover:bg-blue/80 transition-colors dark:bg-white dark:text-black dark:hover:text-white"
  >
    Go Back
  </Link>
}

export function NextButton(props) {
  let {text} = props
return (
  <button {...props} className={` text-white rounded-xl p-4 px-6 md:px-12 transition duration-500 text-sm md:text-xl min-w-[200px] bg-blue disabled:opacity-40 disabled:pointer-events-none`}>{text}</button>
)
}

export function RoundButton1(props){
  let {children,classes,url,fun,bgNone} = props
  let class_string = `h-8 w-8 flex items-center justify-center mr-2 rounded-full text-sm ${classes} ${bgNone?'bg-none':'bg-gray-400/20'} duration-300 hover:bg-gray-400/40 disabled:pointer-events-none disabled:opacity-50`
  if (url){
      return(
          <Link href={url} className={class_string}>
              {children}
          </Link>
      )
  }
  return(
      <button className={class_string} onClick={fun?fun:null} {...props} style={{zIndex:4}}>
          {children}
      </button>
  )
}

export function RoundButton(props){
  let {children,classes,url,fun,bgNone,title} = props
  let class_string = `h-10 w-10 flex items-center justify-center mr-2 rounded-full text-sm ${classes} ${bgNone?'bg-none':'bg-gray-400/20'} duration-300 hover:bg-gray-400/40`
  if (url){
      return(
        <Link href={url} className={class_string}>
            {children}
        </Link>
      )
  }
  return(
      <button className={class_string} onClick={fun?fun:null} title={title || ''} style={{zIndex:4}}>
          {children}
      </button>
  )
}

export function PopInput(props){
  let {label} = props
  return(
    <div className="inpGrp w-full md:w-[70%] flex items-center justify-center flex-col mb-4">
      <p className="text-xl md:text-2xl lg:text-3xl font-medium w-full mb-2">{label}</p>
      <input className="mt-4 p-4 md:p-5 rounded-xl bg-red text-white w-full md:text-lg outline-none border-none text-center" {...props} autoComplete="off"/>
    </div>
  )
}

export function PopNumberInput(props) {
  let {label,fun,val} = props
  useEffect(()=>{
    document.querySelector('._phninp').querySelector('input').classList.remove('PhoneInputInput')
    // document.querySelector('._phninp').querySelector('select').classList.remove('PhoneInputCountrySelect')
    document.querySelector('._phninp').querySelector('input').focus()
  },[])
  const [value, setValue] = useState(val || '');
  const [error, setError] = useState('');
  const handleChange = (phoneNumber) => {
    setValue(phoneNumber);
    if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
      setError('');
      fun(value)
    } else {
      setError('Please enter a valid number.');
      fun('')
    }
  };
  return (
    <div className="inpGrp w-full md:w-[70%] mb-4 _phninp relative">
      <p className="text-xl md:text-2xl lg:text-3xl font-medium w-full mb-2">{label}</p>
      <PhoneInput
        placeholder="9876543210"
        defaultCountry="IN"
        className={`mt-4 p-2 md:p-5 rounded-xl bg-gray-100/10 text-white w-full text-sm md:text-lg outline-none border-none text-center ${error && 'ring-1 ring-red'}`}
        onChange={handleChange}
        value={value}
        />
      {error && <p className="text-xs text-red text-left absolute -bottom-5 left-2 flex gap-1 items-center justify-start"><AlertCircle size={12} className="-mt-[2px]"/> {error}</p>}
    </div>
  )
}