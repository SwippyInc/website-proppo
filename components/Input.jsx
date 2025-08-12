'use client'
import { useState, useEffect } from "react"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { cn } from "@/app/functions"

export default function Input(props) {
    let {label,styles,text,password,readOnly,text_styles,input_styles} = props
    let [showPwToggle,setShowPwToggle] = useState(password ? true : false)
    let [mode,setMode] = useState('password')
  return (
    <div className={cn(`relative`,styles)}>
        {label && <label className="text-xs ml-1 block mb-1 capitalize">{label}</label>}
        <input type={password ? mode : ''} className="bg-blue-800/5 block w-full p-3 rounded-xl transition duration-300 border border-[#ccc] hover:border-[#6840ff]/50 focus:border-[#6840ff] outline-none" {...props} autoComplete="off" title={label} readOnly={readOnly}/>
        {text && <p className={cn(`text-xs text-gray-500 dark:text-white mt-1 ml-1`,text_styles)}>{text}</p>}
        {showPwToggle && <>
        <button className="absolute grid items-center h-[40%] bg-white dark:bg-black-black2 top-[60%] right-4 translate-y-[-50%] px-1" type="button" onClick={()=>setMode(s=>s == 'password' ? 'text' : 'password')}>
          {mode !== 'password' ? <Eye size={16} title="Show Password"/> : <EyeOff size={16} title="Hide Password"/>}
        </button>
      </>}
    </div>
  )
}

export function PhoneNumberInput(props) {
  let {label,fun,val,styles} = props
  useEffect(()=>{
    document.querySelector('._phninp').querySelector('input').classList.remove('PhoneInputInput')
    document.querySelector('._phninp').querySelector('input').focus()
  },[])
  const [value, setValue] = useState(val || '');
  const [error, setError] = useState('');
  const handleChange = (phoneNumber) => {
    if (phoneNumber?.length > 13) return;
    setValue(phoneNumber);
    
    if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
      setError("");
      fun(phoneNumber);
    } else {
      setError("Please enter a valid number.");
      fun("");
    }
  };
  return (
    <div className={cn(`input_grp relative _phninp`, styles)}>
      <p className="text-xs ml-1 block mb-1 capitalize">{label}</p>
      <PhoneInput
        placeholder="9876543210"
        defaultCountry="IN"
        className={`input_box relative ${error && 'ring-1 ring-red'}`}
        onChange={handleChange}
        value={value}
        />
      {error && <p className="text-xs text-red text-left absolute -bottom-5 left-2 flex gap-1 items-center justify-start"><AlertCircle size={12} className="-mt-[2px]"/> {error}</p>}
    </div>
  )
}

export function TextArea(props) {
    let {label} = props
  return (
    <div className="input_grp">
        <label className="text-xs ml-1 block mb-1">{label}</label>
        <textarea className="input_box" {...props} autoComplete="off" title={label}></textarea>
    </div>
  )
}