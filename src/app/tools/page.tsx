import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "../components/header";
import SecondHeader from "../components/secondHeader";

const Tools = () => {
  
  return (
      <>
      <div className="flex">

        <div className="w-[20vw]">
        <SecondHeader/>
        </div>

        <div className="flex bg-gradient-to-b from-dprimary to-mprimary min-h-screen flex-col place-items-center  w-[90vw] md:w-[80vw] px-6 justify-items-start">
          <Header/>

          <div className="pagewrapper  px-4 text-main-w  w-[80vw]">

                  <div className="flex w-[100%] pt-5">
                  <h1 className="text-4xl font-bold">Tools</h1>
                  </div>
                    <Accordion type="single" collapsible className="w-[100%] px-3">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Job Boards</AccordionTrigger>
                        <AccordionContent>
                          Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>More Useful Resources</AccordionTrigger>
                        <AccordionContent>
                          Yes. It comes with default styles that matches the other
                          components&apos; aesthetic.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
          </div>

          </div>
        </div>
      </>
    );
  };
  
  export default Tools;