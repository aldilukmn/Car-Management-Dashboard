import { Button, Icon } from '../..';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

type TestimonialButtonProps = {
  prevHandlerButton: () => void;
  nextHandlerButton: () => void;
}

function TestimonialButton({prevHandlerButton, nextHandlerButton}: TestimonialButtonProps) {
  return (
    <>
      <div className="absolute bottom-16 w-full text-center">
        <Button name={<Icon icon={<IoIosArrowBack/>} classname='border border-zinc-400 hover:text-white hover:border-green-600 hover:bg-green-600 p-2 rounded-full'/>} onclick={prevHandlerButton} className='me-3'/>
        <Button name={<Icon icon={<IoIosArrowForward/>} classname='border border-zinc-400 hover:text-white hover:border-green-600 hover:bg-green-600 p-2 rounded-full'/>} onclick={nextHandlerButton} className='ms-3'/>
      </div>
    </>
  )
}

export default TestimonialButton