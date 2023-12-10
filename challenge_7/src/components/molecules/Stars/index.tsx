import { Icon } from '../..'
import { FaStar } from "react-icons/fa";

function Stars() {
  return (
    <>
      <div className="flex">
        <Icon icon={<FaStar/>} classname='text-yellow-500'/>
        <Icon icon={<FaStar/>} classname='text-yellow-500'/>
        <Icon icon={<FaStar/>} classname='text-yellow-500'/>
        <Icon icon={<FaStar/>} classname='text-yellow-500'/>
        <Icon icon={<FaStar/>} classname='text-yellow-500'/>
      </div>
    </>
  )
}

export default Stars