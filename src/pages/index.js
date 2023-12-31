import Image from 'next/image'
import { Inter } from 'next/font/google'
import Nav from "../components/navigation"
import Countdown from "../components/countdown"
import Days from "../components/days"
import Interest from "../components/interest-form"
import Previous from "../components/previous-projects"
import Faq from "../components/faq"

export default function Home() {
  return (
   <>
   <Nav/>
   <Countdown/>
   <Days/>
   <Interest/>
   <Faq/>

   </>
  )
}
