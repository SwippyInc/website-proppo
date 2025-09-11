'use client'
import { ArrowLeft, X } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { isValidEmail, isValidIndianMobile, timeToDateTime } from "../app/functions"
import Button, { PopInput, PopNumberInput, NextButton, RoundButton, RoundButton1 } from "./Button"
import Input from "./Input"
import Data from "@/app/_backend_service/Service"
import moment from "moment"
import { useRouter } from "next/navigation"

// Fade-in animation for ResponsiveDialog
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }
}

// Success/Error message animation for forms
const messageAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } }
}

export default function ResponsiveDialog({ hideFun, children }) {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-gray-400/10 flex items-center justify-center backdrop-blur-sm bsht" style={{ zIndex: 41 }}>
      <div className="relative h-full w-full flex items-end md:items-center justify-center">
        <motion.div
          className="relative w-full md:w-auto min-w-[200px] md:max-w-[80vw] h-auto max-h-[90vh] md:max-h-[80vh] min-h-[40vh] bg-white rounded-3xl shadow-lg shadow-[#6840ff]/5 border border-gray-200/50 overflow-y-auto p-6 md:p-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="absolute top-1 md:top-3 right-1 md:right-3 z-10">
            <RoundButton1
              className="text-[#6840ff] hover:bg-[#6840ff]/10 rounded-full p-2"
              fun={hideFun}
              title="Close"
            >
              <X size={20} />
            </RoundButton1>
          </div>
          <div className="flex items-center justify-center flex-col pt-4 pb-6 md:pt-0 md:pb-0">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export function GetStartedForm({ hideFun }) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [disabled,setDisabled] = useState(true)
  const [message,setMessage] = useState('Fill your details to get started 🎉')
  const [isError,setIsError] = useState(false)
  const [success,setSuccess] = useState(false)
  const router = useRouter()
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
    anything_else: ''
  })

  useEffect(()=>{
    let {name,email,phone} = state
    if(!name || !email || !phone){
      setDisabled(true)
    }else{
      setDisabled(false)
    }
  },[state])

  function generateHTML() {
    let { name, email, phone, anything_else } = state
    let html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta content="IE=edge" http-equiv="X-UA-Compatible"><meta content="width=device-width,initial-scale=1" name="viewport"><style>*{padding:0;margin:0;box-sizing:border-box;font-family:arial}.body{padding:50px 5px;background-color:#f4f7ff}.bodyContainer{background:#fff;padding:30px;box-shadow:0 4px 10px rgba(99,99,99,.1);margin:20px auto;width:95%;max-width:600px;border-radius:10px}.messageTxt{font-size:118%;color:#3d3d3d}.messageHead{font-size:150%;color:#3d3d3d;font-weight:700;margin-bottom:10px}.bottomCredit{font-size:85%;text-align:center;color:#5c5c5c}a{text-decoration:none;color:#141414}.flex{display:flex;align-items:center;justify-content:space-between}.link{text-decoration:none;background-color:#6840ff;padding:14px;border-radius:10px;text-align:center;width:50%;display:block;margin:20px auto;font-size:110%;color:#fff;border:none;outline:0;cursor:pointer}.table{width:100%;border-collapse:collapse;color:#3d3d3d;font-size:105%}.booking_detail_div{margin:15px auto;border:1px solid #eee;padding:12px;border-radius:8px}.pd_head{font-weight:700;font-size:125%;color:#3d3d3d;margin-bottom:7px}.td{padding:4px 0}.td.right{margin-left:5px;font-weight:700;width:65%;position:relative}.div2{border:none;background-color:rgba(14,38,26,.06);padding:15px 12px}.link2{width:40%;text-transform:uppercase;border-style:solid;margin-bottom:0;margin-top:10px}.responseUL{font-size:100%;opacity:.8;margin:10px 0 40px 10px} .responseUL li{margin-bottom:5px}</style></head><body><div class="body"><center><img src="https://pms.proppo.in/favicon.ico" height="80px" /></center><div class="bodyContainer"><div class="flex"><div><p class="messageHead">Hey Admin,</p><p class="messageTxt">New sign up request received. Kindly look into.</p><br></div></div><br><p class="messageTxt">Contact Details:</p><div class="booking_detail_div"><table class="table"><tr class="tr"><td class="td left">Name<td class="td right">${name}<tr class="tr"><td class="td left">Email<td class="td right">${email}<tr class="tr"><td class="td left">Phone<td class="td right">${phone}<tr class="tr"><td class="td left">Remarks<td class="td right">${anything_else}</table></div><br><div class="messageTxt">`
    html += `</div><br><br><p class="messageTxt">Best,<br>Proppo Team</div><p class="bottomCredit">Copyright &copy; Proppo. All rights reserved.<br /><a href="mailto:hello@swippy.in">hello@swippy.in</a></p></div></body></html>`
    return html
  }

  async function handleSubmit(e){
    e.preventDefault()
    let {email,phone} = state
    let isValidMail = isValidEmail(email)
    let isValidPhone = isValidIndianMobile(phone)
    if(!isValidMail){
      setIsError(true)
      setSuccess(false)
      setMessage('Please enter a valid email address')
      return
    }
    if(!isValidPhone){
      setIsError(true)
      setSuccess(false)
      setMessage('Please enter a valid mobile number')
      return
    }
    setSubmitting(true)
    let htmlMessage = generateHTML()
    let obj = {htmlMessage,receipent:'aniket@swippy.in',subject:'New Signup Request',senderName:"Proppo",emailType:'signup'}
    Data.send_mail(obj).then(d=>{
      let {message,status} = d
      if(status == 'success'){
        setState(s=>({...s,name:'',phone:'',email:'',anything_else:''}))
        setIsError(false)
        Data.setUser({is_submitted:true})
        router.push(`/thanks?t=SIGNUP`)
      }else{
        setIsError(true)
        setSuccess(false)
        setMessage(message)
      }
    }).catch(err=>{
      setMessage(err.message)
      setIsError(true)
      setSuccess(false)
    }).finally(()=>setSubmitting(false))
  }

  return (
    <div className="w-full md:w-[90vw] lg:w-[45vw] text-gray-800 text-center overflow-x-hidden relative">
      <h2 className="text-xl md:text-3xl font-semibold text-gray-800 ">Get started with <span className="bl_un">Proppo</span>! </h2>
      <p className={`text-xs md:text-sm italic mt-2 p-1 px-2  border-r-2 max-w-[80vw] dark:bg-white/5 dark:border-r-white dark:text-white w-fit mx-auto ${isError ? 'border-r-red-500 text-red-500 bg-red-500/5' : success ? 'border-r-green-500 text-green-500 bg-green-500/5' : 'border-r-[#6840ff] text-gray-800/80 bg-blue-800/5'}`}>{message}</p>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 text-left mx-auto w-[95%]">
          <Input label="Name" value={state.name} onChange={e=>setState(s=>({...s,name:e.target.value}))} placeholder="Rakesh Kumar" required/>
          <Input type="email" label="Email" value={state.email} onChange={e=>setState(s=>({...s,email:e.target.value}))} placeholder="mail@example.com" required/>
          <Input type="phone" label="Mobile" value={state.phone} onChange={e=>{
            let val = e.target.value
            // if(typeof val !== 'number') return
            setState(s=>({...s,phone:val}))}} placeholder="9876543210" required/>
          <Input label="Remarks" value={state.anything_else} onChange={e=>setState(s=>({...s,anything_else:e.target.value}))} placeholder="Special requirements..."/>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button type="submit" disabled={disabled || submitting} styles="btn_pri md:text-lg px-5 disabled:pointer-events-none disabled:opacity-50">📩 Submit</Button>
        </div>
      </form>
    </div>
  )
}

export function GetDemoForm({ hideFun }) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [disabled,setDisabled] = useState(true)
  const [isError, setIsError] = useState(false)
  const [success,setSuccess] = useState(false)
  const [message,setMessage] = useState('Fill your details to book a call 🎉')
  const router = useRouter()
  const [state, setState] = useState({
    name: '',phone: '',
    anything_else: '',time:null
  })

  useEffect(()=>{
    let {name, phone} = state
    if(!name || !phone){
      setDisabled(true)
    }else{
      setDisabled(false)
    }
  },[state])
  
  async function handleSubmit(e){
    e.preventDefault()
    let {phone} = state
    let isValidPhone = isValidIndianMobile(phone)
    if(!isValidPhone){
      setIsError(true)
      setSuccess(false)
      setMessage('Please enter a valid mobile number')
      return
    }
    setSubmitting(true)
    let htmlMessage = generateHTML()
    let obj = {htmlMessage,receipent:'aniket@swippy.in',subject:'Callback Request',senderName:"Proppo",emailType:'callback'}
    Data.send_mail(obj).then(d=>{
      let {message,status} = d
      if(status == 'success'){
        setState(s=>({...s,name:'',phone:'',anything_else:'',time:null}))
        setIsError(false)
        Data.setUser({is_submitted:true})
        router.push(`/thanks?t=DEMO_REQUEST`)
      }else{
        setIsError(true)
        setSuccess(false)
        setMessage(message)
      }
    }).catch(err=>{
      setMessage(err.message)
      setIsError(true)
      setSuccess(false)
    }).finally(()=>setSubmitting(false))
  }


  function generateHTML() {
    let { name, time, phone, anything_else } = state
    let html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta content="IE=edge" http-equiv="X-UA-Compatible"><meta content="width=device-width,initial-scale=1" name="viewport"><style>*{padding:0;margin:0;box-sizing:border-box;font-family:arial}.body{padding:50px 5px;background-color:#f4f7ff}.bodyContainer{background:#fff;padding:30px;box-shadow:0 4px 10px rgba(99,99,99,.1);margin:20px auto;width:95%;max-width:600px;border-radius:10px}.messageTxt{font-size:118%;color:#3d3d3d}.messageHead{font-size:150%;color:#3d3d3d;font-weight:700;margin-bottom:10px}.bottomCredit{font-size:85%;text-align:center;color:#5c5c5c}a{text-decoration:none;color:#141414}.flex{display:flex;align-items:center;justify-content:space-between}.link{text-decoration:none;background-color:#6840ff;padding:14px;border-radius:10px;text-align:center;width:50%;display:block;margin:20px auto;font-size:110%;color:#fff;border:none;outline:0;cursor:pointer}.table{width:100%;border-collapse:collapse;color:#3d3d3d;font-size:105%}.booking_detail_div{margin:15px auto;border:1px solid #eee;padding:12px;border-radius:8px}.pd_head{font-weight:700;font-size:125%;color:#3d3d3d;margin-bottom:7px}.td{padding:4px 0}.td.right{margin-left:5px;font-weight:700;width:65%;position:relative}.div2{border:none;background-color:rgba(14,38,26,.06);padding:15px 12px}.link2{width:40%;text-transform:uppercase;border-style:solid;margin-bottom:0;margin-top:10px}.responseUL{font-size:100%;opacity:.8;margin:10px 0 40px 10px} .responseUL li{margin-bottom:5px}</style></head><body><div class="body"><center><img src="https://pms.proppo.in/favicon.ico" height="80px" /></center><div class="bodyContainer"><div class="flex"><div><p class="messageHead">Hey Admin,</p><p class="messageTxt">New callback received. Kindly look into.</p><br></div></div><br><p class="messageTxt">Contact Details:</p><div class="booking_detail_div"><table class="table"><tr class="tr"><td class="td left">Name<td class="td right">${name}<tr class="tr"><td class="td left">Time<td class="td right">${moment(time)?.format('DD-MMM-y (HH:MM A)')}<tr class="tr"><td class="td left">Phone<td class="td right">${phone}<tr class="tr"><td class="td left">Remarks<td class="td right">${anything_else}</table></div><br><div class="messageTxt">`
    html += `</div><br><br><p class="messageTxt">Best,<br>Proppo Team</div><p class="bottomCredit">Copyright &copy; Proppo. All rights reserved.<br /><a href="mailto:hello@swippy.in">hello@swippy.in</a></p></div></body></html>`
    return html
  }

  return (
    <div className="w-full md:w-[90vw] lg:w-[45vw] text-gray-800 text-center overflow-x-hidden relative">
      <h2 className="text-xl md:text-3xl font-semibold text-gray-800 ">Book a <span className="bl_un">Call</span>! </h2>
      <p className={`text-xs md:text-sm italic mt-2 p-1 px-2  border-r-2 max-w-[80vw] dark:bg-white/5 dark:border-r-white dark:text-white w-fit mx-auto ${isError ? 'border-r-red-500 text-red-500 bg-red-500/5' : success ? 'border-r-green-500 text-green-500 bg-green-500/5' : 'border-r-[#6840ff] text-gray-800/80 bg-blue-800/5'}`}>{message}</p>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 text-left mx-auto w-[95%]">
          <Input label="Name" value={state.name} onChange={e=>setState(s=>({...s,name:e.target.value}))} placeholder="Rakesh Kumar"/>
          <Input type="phone" label="Mobile" value={state.phone} onChange={e=>setState(s=>({...s,phone:e.target.value}))} placeholder="9876543210"/>
          <Input type="datetime-local" label="Time" value={state.time} onChange={e=>setState(s=>({...s,time:e.target.value}))} placeholder=""/>
          <Input label="Remarks" value={state.anything_else} onChange={e=>setState(s=>({...s,anything_else:e.target.value}))} placeholder="Special requirements..."/>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button disabled={disabled || submitting} styles="btn_pri md:text-lg px-5 disabled:pointer-events-none disabled:opacity-50">Book a Call</Button>
        </div>
      </form>
    </div>
  )
}