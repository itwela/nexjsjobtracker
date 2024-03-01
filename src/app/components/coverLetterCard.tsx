'use client'




import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { FaRegCopy } from "react-icons/fa";
import { toast } from "sonner";



export default function CoverLetterCard() {
    const [isLoading, setIsLoading] = useState(false)
    const [coverText, setCoverText] = useState()
    const [inputText, setInputText] = useState('')
    
    const handleInputChange = (event: any) => {
        setInputText(event.target.value);
        console.log(inputText)
    }

    const handleSubmit = async (event: any) => {
        
        const jobDescription = inputText // Assuming your textarea has the name 'input'
        // console.log(jobDescription);

        try {
            const response = await fetch('/api/openai/coverletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    input: jobDescription
                })
            });
        
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
        
            const data = await response.json();
            const { text } = data;
            console.log(text)
            const lines = text.split('\n');
            const formattedText = lines.map((line:any, index:any) => (
                <p key={index}>{line}</p>
            ));

            // Add extra space after the first 3 lines
            if (lines.length > 3) {
                formattedText.splice(3, 0, <br key="extra-space-1" />);
            }

            // Add extra space before the 3rd to last line
            if (lines.length > 4) {
                formattedText.splice(formattedText.length - 3, 0, <br key="extra-space-2" />);
            }
            setCoverText(formattedText); // Set the formatted text in your state variable

            toast("Success!: Cover Letter Generated",{
                description: "Congragulations, you're one steop closer to your next job!",
              })

        } catch (error) {
            // Handle error
        }
    };

    function copyText() {
        const element = document.getElementById("cov-text");
      
        if (element instanceof HTMLSpanElement) {
          const textToCopy = element.innerText;
      
          navigator.clipboard.writeText(textToCopy)
        }

          toast("Success!: Cover Letter Copied", {
            description: "Congratulations, you're one step closer to your next job!",
        });        

    }


    return (
        <>
                <form action={handleSubmit} className=' flex flex-col gap-2'>
                        <Textarea onChange={handleInputChange} name="" id="input" className='min-h-[30vh] border-transparent'>

                        </Textarea>
                    <Button className='bg-main-w/80 hover:bg-main-w text-mprimary'>Submit</Button>
                </form>

                
                <div className='relative my-8 w-[100%] nosb border-main-w/40 hover:border-main-w/70   text-left  bg-mprimary p-5 rounded-[1em]'>
                <FaRegCopy size={36} onClick={copyText} className="absolute cursor-pointer top-2 right-3 cursor-pointer text-main-w/70 hover:text-main-w font-black p-2" />

                  <h1 className='text-2xl font-semibold text-main-w/70 hover:text-main-w leading-none tracking-tight my-4'>
                    Your Cover Letter:
                  </h1>
                    <span id='cov-text'>{coverText}</span>
                </div>
                  
        </>
    )
}