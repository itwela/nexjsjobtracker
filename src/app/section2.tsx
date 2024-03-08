'use client'

import { CardContent } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import { Card } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { SlEnvolopeLetter } from "react-icons/sl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSectionTwo() {

  // Hovering -----------------
  useGSAP(() => {

    setInvisile();

  }, [])

  const setInvisile = () => {
    gsap.set([
      '#offersmall',
      '#yellowsmall',
      '#blacksmall',
      '#bluesmall',],
      { opacity: 0, duration: 0.5 }
    ); 
  }


  // ScrollTrigger ---------
  const triggerRef = useRef(null);

  useGSAP(() => {

    const trigger = triggerRef.current;

    let tl2 = gsap.timeline({
      defaults: {ease: 'power2.out', duration: 0.5},
      scrollTrigger: {
        trigger: trigger,
        start: "top 60%",
        end: "top 5%",
        // scrub: true,
        // markers: true,
        toggleActions: 'restart none none reverse'
      },
    })

    tl2.from(("#madeby"),{
      y:'39',
      opacity: 0
    }).from([
      "#clbutton", 
      "#fubutton", 
      "#atbutton", 
      "#csoon", 
      '#extrainfo',
    ],{
      opacity: 0,
      y:'39',
      stagger: 0.218
    }).from([
      '#introcard', 
      '#appliedcard', 
      '#interviewcard', 
      '#hiredcard',
    ],{
      xPercent:'3000',
      opacity: 0,
      stagger: 0.1,
      duration: 1.4
    })


  })


  const [isHovered, setIsHovered] = useState(null);

  const handleHover = (id: any) => {
    setIsHovered(id);
  };

  useEffect(() => {
    if (isHovered !== null) {
      gsap.to(
        `#${isHovered}`,
        { opacity: 1, duration: 0.5 }
      );
    } else {
      setInvisile();
    }
  }, [isHovered]);
  
  
    return(
        <>
           {/* section 2 made by for */}
        <section ref={triggerRef} className="second-wrapper w-[100vw] bg-lprimary gap-3  flex flex-col md:flex-row h-max ">

          <div className="h-[100vh] w-[100%] px-[2em] pt-[2em] pb-[3em] overflow-hidden  justify-start hidden lg:flex flex-col text-center gap-2">

            <div className="flex flex-col gap-5  place-items-start h-[20vh] text-main-w">
              <h1 id='madeby' className="text-center text-7xl ">
                Track Applications
              </h1>

            </div>

            <div className="h-[70%]  flex">

              <div className="w-[40%] text-main-w flex flex-col justify-between h-full ">
                {/* button group */}
                <div className=" flex flex-col  place-items-start  place-content-center gap-4">

                  <span id="clbutton" className="h-[50px]  leading-[1em] bg-gradient-to-l  outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                    <span>
                      <SlEnvolopeLetter />
                    </span>
                    <span>
                      Cover Letters
                    </span>
                  </span>

                  <span id="fubutton" className="h-[50px]  leading-[1em] bg-gradient-to-l  outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                    <span>
                      <LuMessagesSquare />
                    </span>
                    <span>
                      Follow-up Messages
                    </span>
                  </span>

                  <span id="atbutton" className="h-[50px]  leading-[1em] bg-gradient-to-l  outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                    <span>
                      <FaRegCheckCircle />
                    </span>
                    <span>
                      Application Tracking
                    </span>
                  </span>

                  <span id="csoon">And much more coming soon...</span>

                </div>

                <h3 id="extrainfo" className=" text-left w-[70%]">
                  Add jobs, update status, gain valuable insights into where to spend your time applying, learn what resumes perform the best, all in one platform.
                </h3>
              </div>

              <div className="h-full w-[60%] flex gap-2 nosb overflow-x-auto nosb   ">

                <div className="flex gap-7  ">
                  <div
                    id="introcard" className="flex cursor-pointer flex-col w-[30em] h-full place-items-end"
                    onMouseEnter={() => handleHover("blacksmall")}
                    onMouseLeave={() => handleHover(null)}
                  >
                    <div id="blacksmall" className="w-[40%] h-[5%] bg-gray-700 rounded-t-[0.7em] mr-[15%] flex place-content-center place-items-center">
                      <h3 className="text-main-w">Interested</h3>
                    </div>
                    <div className="w-full p-[4vw] py-[7vh] flex flex-col justify-between h-[95%] bg-main-w rounded-[2em]">
                        
                        <div id="addgif" className="h-[50%] w-full flex place-content-center place-items-center">
                        </div>
                        
                        <div className="h-[50%] w-full flex place-content-center place-items-center">
                          <span className="text-left">
                            Ever lose track of a job you applied for? Want to save it
                            for later? Keep track of all your dream jobs in one place.
                          </span>
                        </div>
                    </div>
                  </div>

                  <div
                    onMouseEnter={() => handleHover("bluesmall")}
                    onMouseLeave={() => handleHover(null)}
                    id="appliedcard" className="flex flex-col w-[30em] h-full place-items-end">
                    <div id='bluesmall' className="w-[40%] h-[5%] bg-blue-500 flex place-content-center rounded-t-[0.7em] mr-[15%] place-items-center">
                      <h3 className="text-main-w">Applied</h3>
                    </div>
                    <div className="w-full p-[4vw] py-[7vh] flex flex-col justify-between h-[95%] bg-main-w rounded-[2em]">
                        
                        <div id="intr" className="h-[50%] w-full flex place-content-center place-items-center">

                        </div>

                        <div className="h-[50%] w-full flex place-content-center place-items-center">
                          <span className="text-left">
                            Congrats, you applied to your dream job! Update your status
                            easily and even add more too.
                          </span>
                        </div>

                    </div>
                  </div>

                  <div
                    onMouseEnter={() => handleHover("yellowsmall")}
                    onMouseLeave={() => handleHover(null)}
                    id="interviewcard" className="flex flex-col w-[30em] h-full place-items-end">
                    <div id="yellowsmall" className="w-[40%] h-[5%]  flex place-content-center bg-yellow-500 rounded-t-[0.7em] mr-[15%] place-items-center">
                      <h3 className="text-main-w">Intereviewing</h3>

                    </div>
                    <div className="w-full p-[4vw] py-[7vh] flex flex-col justify-between h-[95%] bg-main-w rounded-[2em]">
                        
                    <div id="intr" className="h-[50%] w-full flex place-content-center place-items-center">
                    </div>

                        <div className="h-[50%] w-full flex place-content-center place-items-center">
                          <span className="text-left">
                            Update your job status when that recuiter finally reaches out to you!
                            Gain valuable insights on what got you that interview from reusme used, to keywords, and if your cover letter was effective.
                          </span>
                        </div>

                    </div>
                  </div>

                  <div
                    onMouseEnter={() => handleHover("offersmall")}
                    onMouseLeave={() => handleHover(null)}
                    id="hiredcard" className="flex flex-col w-[30em] h-full place-items-end">
                    <div id="offersmall" className="w-[40%] h-[5%] bg-green-500 rounded-t-[0.7em] mr-[15%] flex place-content-center place-items-center">
                      <h3 className="text-main-w">Offer</h3>
                    </div>
                    <div className="w-full p-[4vw] py-[7vh] flex flex-col justify-between h-[95%] bg-main-w rounded-[2em]">
                    
                        <div id="intr" className="h-[50%] w-full flex place-content-center place-items-center">
                        </div>

                        <div className="h-[50%] w-full flex place-content-center place-items-center">
                          <span className="text-left">
                              Congrats! You got an offer! Update your status to reflect your new job. Share with friends,
                              gain valuable data for friends and family on how exactly you got that dream job!
                          </span>
                        </div>

                    </div>
                  </div>
                </div>


              </div>

            </div>


          </div>

          <div className="hidden  h-[100vh] w-[100%] px-[2em] pt-[2em] pb-[3em] overflow-hidden  justify-start sm:flex lg:hidden flex-col text-center gap-2">

            <div className="flex flex-col gap-5  place-items-start h-[20vh] text-main-w">
              <h1 id='madeby' className="text-center text-5xl ">
                Track Applications
              </h1>

            </div>

            <div className="h-[70%]  flex">

              <div className="w-[40%] text-main-w flex flex-col justify-between h-full ">
                {/* button group */}
                <div className=" flex flex-col  place-items-start  place-content-center gap-4">

                  <span id="clbutton" className="h-[50px] text-sm  leading-[1em] bg-gradient-to-l  outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                    <span>
                      <SlEnvolopeLetter />
                    </span>
                    <span>
                      Cover Letters
                    </span>
                  </span>

                  <span id="fubutton" className="h-[50px] text-sm   leading-[1em] bg-gradient-to-l  outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                    <span>
                      <LuMessagesSquare />
                    </span>
                    <span>
                      Follow-up Messages
                    </span>
                  </span>

                  <span id="atbutton" className="h-[50px] text-sm  leading-[1em] bg-gradient-to-l  outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                    <span>
                      <FaRegCheckCircle />
                    </span>
                    <span>
                      Application Tracking
                    </span>
                  </span>

                  <span id="csoon text-sm text-left w-[80%]">& more coming soon...</span>

                </div>

                <h3 id="extrainfo" className="text-sm text-left w-[80%]">
                  Add jobs, update status, gain valuable insights into where to spend your time applying, learn what resumes perform the best, all in one platform.
                </h3>
              </div>

              <div className="h-full text-dprimary w-[60%] flex gap-2 nosb   ">

                <div className="flex flex-col gap-7 w-full text-[1.5vw] ">
                 {/* div 1 */}
                  <div
                    id="introcard" className="flex cursor-pointer flex-col w-full h-[25%] place-items-end"
                    onMouseEnter={() => handleHover("blacksmall")}
                    onMouseLeave={() => handleHover(null)}
                  >
                    <div id="blacksmall" className="w-[40%] h-[15%] bg-gray-700 rounded-t-[0.7em] mr-[15%] flex place-content-center place-items-center">
                      <h3 className="text-main-w">Interested</h3>
                    </div>
                    <div className="w-full px-8 py-4 flex place-items-center place-content-center h-[95%] bg-main-w rounded-[2em]">
                        <span>
                          Ever lose track of a job you applied for? Want to save it
                          for later? Keep track of all your dream jobs in one place.
                        </span>
                    </div>
                  </div>
                 {/* div 2 */}

                  <div
                    onMouseEnter={() => handleHover("bluesmall")}
                    onMouseLeave={() => handleHover(null)}
                    id="appliedcard" className="flex flex-col w-[100%] h-[25%] place-items-end">
                    <div id='bluesmall' className="w-[40%] h-[15%] bg-blue-500 flex place-content-center rounded-t-[0.7em] mr-[15%] place-items-center">
                      <h3 className="text-main-w">Applied</h3>
                    </div>
                    <div className="w-full px-8 py-4 flex place-items-center place-content-center h-[95%] bg-main-w rounded-[2em]">
                          <span className="text-left">
                            Congrats, you applied to your dream job! Update your status
                            easily and even add more too.
                          </span>
                    </div>
                  </div>
                 {/* div 3 */}
                 <div
                    onMouseEnter={() => handleHover("yellowsmall")}
                    onMouseLeave={() => handleHover(null)}
                    id="interviewcard" className="flex flex-col w-[100%] h-[25%] place-items-end">
                    <div id="yellowsmall" className="w-[40%] h-[15%]  flex place-content-center bg-yellow-500 rounded-t-[0.7em] mr-[15%] place-items-center">
                      <h3 className="text-main-w">Intereviewing</h3>

                    </div>
                    <div className="w-full px-8 py-4 flex place-items-center place-content-center h-[95%] bg-main-w rounded-[2em]">
                          <span className="text-left">
                            Update your job status when that recuiter finally reaches out to you!
                            Gain valuable insights on what got you that interview from reusme used, to keywords, and if your cover letter was effective.
                          </span>
                    </div>
                  </div>
                 {/* div 14*/}

                  <div
                    onMouseEnter={() => handleHover("offersmall")}
                    onMouseLeave={() => handleHover(null)}
                    id="hiredcard" className="flex flex-col w-[100%] h-[25%] place-items-end">
                    <div id="offersmall" className="w-[40%] h-[15%] bg-green-500 rounded-t-[0.7em] mr-[15%] flex place-content-center place-items-center">
                      <h3 className="text-main-w">Offer</h3>
                    </div>
                    <div className="w-full px-8 py-4 flex place-items-center place-content-center h-[95%] bg-main-w rounded-[2em]">
                          <span className="text-left">
                              Congrats! You got an offer! Update your status to reflect your new job. Share with friends,
                              gain valuable data for friends and family on how exactly you got that dream job!
                          </span>
                    </div>
                  </div>
                </div>


              </div>

            </div>


          </div>

          <div className=" w-[100%] px-[2em] pt-[2em] pb-[3em]   justify-start sm:hidden flex-col text-center gap-4">

            <div className="flex flex-col gap-5 mb-1  place-items-start text-main-w">
              <h1 id='madeby' className="text-center text-3xl ">
                Track Applications
              </h1>

            </div>

            <div className=" flex flex-col">

              <div className="w-[100%] text-main-w flex mb-3  flex-col justify-between  ">
             

                <h3 id="extrainfo" className="text-[0.7em] text-center text-main-w/60 w-[100%]">
                  Add jobs, update status, gain valuable insights into where to spend your time applying, learn what resumes perform the best, all in one platform.
                </h3>
              </div>

              <div className="text-dprimary w-[100%] flex nosb   ">

                <div className="flex flex-col w-full text-[3.5vw] gap-3 ">
                  
                  {/* div 1 */}
                  <div
                    id="introcard" className="flex cursor-pointer flex-col w-full h-max place-items-end"
                    onMouseEnter={() => handleHover("blacksmall")}
                    onMouseLeave={() => handleHover(null)}
                  >
                    <div id="blacksmall" className="w-[40%] h-[15%] bg-gray-700 rounded-t-[0.7em] mr-[15%] flex place-content-center place-items-center">
                      <h3 className="text-main-w">Interested</h3>
                    </div>
                    <div className="w-full px-8 py-5 flex place-items-center place-content-center min-h-[15em] bg-main-w rounded-[2em]">
                      <span>
                        Ever lose track of a job you applied for? Want to save it
                        for later? Keep track of all your dream jobs in one place.
                      </span>
                    </div>
                  </div>
                  {/* div 2 */}

                  <div
                    onMouseEnter={() => handleHover("bluesmall")}
                    onMouseLeave={() => handleHover(null)}
                    id="appliedcard" className="flex flex-col w-[100%] h-max place-items-end">
                    <div id='bluesmall' className="w-[40%] h-[15%] bg-blue-500 flex place-content-center rounded-t-[0.7em] mr-[15%] place-items-center">
                      <h3 className="text-main-w">Applied</h3>
                    </div>
                    <div className="w-full px-8 py-5 flex place-items-center place-content-center min-h-[15em] bg-main-w rounded-[2em]">
                      <span className="text-left">
                        Congrats, you applied to your dream job! Update your status
                        easily and even add more too.
                      </span>
                    </div>
                  </div>
                  {/* div 3 */}
                  <div
                    onMouseEnter={() => handleHover("yellowsmall")}
                    onMouseLeave={() => handleHover(null)}
                    id="interviewcard" className="flex flex-col w-[100%] h-max place-items-end">
                    <div id="yellowsmall" className="w-[40%] h-[15%]  flex place-content-center bg-yellow-500 rounded-t-[0.7em] mr-[15%] place-items-center">
                      <h3 className="text-main-w">Intereviewing</h3>

                    </div>
                    <div className="w-full px-8 py-5 flex place-items-center place-content-center min-h-[15em] bg-main-w rounded-[2em]">
                      <span className="text-left">
                        Update your job status when that recuiter finally reaches out to you!
                        Gain valuable insights on what got you that interview from reusme used, to keywords, and if your cover letter was effective.
                      </span>
                    </div>
                  </div>
                  {/* div 14*/}

                  <div
                    onMouseEnter={() => handleHover("offersmall")}
                    onMouseLeave={() => handleHover(null)}
                    id="hiredcard" className="flex flex-col w-[100%] h-max place-items-end">
                    <div id="offersmall" className="w-[40%] h-[15%] bg-green-500 rounded-t-[0.7em] mr-[15%] flex place-content-center place-items-center">
                      <h3 className="text-main-w">Offer</h3>
                    </div>
                    <div className="w-full px-8 py-5 flex place-items-center place-content-center h-[15em] bg-main-w rounded-[2em]">
                      <span className="text-left">
                        Congrats! You got an offer! Update your status to reflect your new job. Share with friends,
                        gain valuable data for friends and family on how exactly you got that dream job!
                      </span>
                    </div>
                  </div>

                </div>


              </div>

            </div>


          </div>

        </section>

       
        </>
    )
}