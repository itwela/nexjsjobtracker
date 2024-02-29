'use client'

import { useEffect, useState } from "react";

export default function moveMenu() {
    const element = document.getElementById("hamburger");
    
    useEffect (() =>{
        const [isOpem, setIsOpen] = useState(false)
        
        // useGSAP(() => {}
        
        // )
              if (element instanceof HTMLSpanElement) {
      
                if(isOpem != true) {
                    gsap.to('#navbar',{
                      opacity: 0
                    })
                    setIsOpen(!isOpem)
                }
      
                  if(isOpem != false) {
                  gsap.to('#navbar',{
                    opacity: 0
                  })
                  setIsOpen(!isOpem)
                }
      
          }

    })
    }