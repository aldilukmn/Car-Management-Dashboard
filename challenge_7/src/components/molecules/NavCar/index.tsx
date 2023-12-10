import { FaChevronRight } from "react-icons/fa6";
import { Text } from '../..'
import { useLocation } from "react-router-dom";

function Navcar() {
  const location = useLocation();
  const getUrl = location.pathname.split('/')[1];
  return (
    <>
      <Text text='Cars' classname='font-bold text-sm'/>
        <FaChevronRight className='text-sm'/>
        <Text text='List Car' classname={`text-sm ${getUrl === 'add-new-car' ? 'font-bold' : getUrl === 'edit-car' ? 'font-bold' : ''}`}/>
        {getUrl === 'add-new-car' ? 
        <>
          <FaChevronRight className='text-sm'/>
          <Text text='Add New Car' classname='text-sm'/>
        </> : 
        getUrl === 'edit-car' ?
        <>
          <FaChevronRight className='text-sm'/>
          <Text text='Edit Car' classname='text-sm'/>
        </> : ''
        }
    </>
  )
}

export default Navcar