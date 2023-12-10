import { Navcar, Text } from '../..'
import { useLocation } from "react-router-dom";


function Navigation() {
  const location = useLocation();
  const getUrl = location.pathname.split('/')[1];

  return (
    <>
      <div className="flex items-center mb-5 gap-1">
        {
          getUrl === 'list-car' ? <Navcar/> : getUrl === 'add-new-car' ? <Navcar/> : getUrl === 'edit-car' ? <Navcar/> : getUrl === 'profile' ? <Text text='Profile' classname='text-sm'/> : ''
        }
      </div>
    </>
  )
}

export default Navigation