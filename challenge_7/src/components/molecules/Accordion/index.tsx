import { Icon, Text, Title } from '../..'
import { useState } from 'react'
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";

type AccordionProps = {
  title: string,
}

function Accordion({title}: AccordionProps) {
  const [hiddenList, setHiddenList] = useState<boolean>(false);
  const handleHiddenFAQList = () => {
    setHiddenList((prev) => !prev);
  }
  return (
    <>
      <div className='border rounded shadow-sm'>
        <div className={`flex items-center justify-between py-2 px-3 cursor-pointer ${hiddenList ? 'border-b' : ''}`} onClick={handleHiddenFAQList}>
          <Title title={title}/>
          <Icon icon={hiddenList ? <FaChevronUp/>  : <FaChevronDown/>}/>
        </div>
        <Text text='The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,' classname={`py-2 px-3 ${!hiddenList ? 'hidden' : ''}`}/>
      </div>
    </>
  )
}

export default Accordion