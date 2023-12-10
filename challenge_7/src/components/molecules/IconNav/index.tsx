import { useLocation, useNavigate } from 'react-router-dom';
import { Icon, Img, Title } from '../..'
import { siderBarLogo } from '../../../assets'
import { FiTruck } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import type { NavigateFunction } from 'react-router-dom';

function IconNav() {
  const location = useLocation();
  const getNav = location.pathname.split('/')[1];
  const navigate: NavigateFunction = useNavigate();

  const handleProfile = () => {
    navigate('/profile');
  }

  const handleCars = () => {
    navigate('/list-car');
  }

  return (
    <>
      <div className="bg-blue-700 flex flex-col pt-4 w-16 items-center gap-5">
        <Img src={siderBarLogo} alt='sider-bar-logo'/>
        <div className='w-full flex flex-col gap-3 mt-2'>
          <div className={`flex flex-col items-center gap-1 text-white w-full py-2 cursor-pointer ${getNav === 'profile' ? 'bg-indigo-300' : ''}`} onClick={handleProfile}>
            <Icon icon={<IoPersonOutline/>} classname='text-2xl'/>
            <Title title='Profile' className='text-xs font-semibold'/>
          </div>
          <div className={`flex flex-col items-center gap-1 w-full py-2 text-white cursor-pointer ${getNav === 'list-car' ? 'bg-indigo-300' : getNav === 'edit-car' ? 'bg-indigo-300' : getNav === 'add-new-car' ? 'bg-indigo-300' : '' }`} onClick={handleCars}>
            <Icon icon={<FiTruck/>} classname='text-2xl'/>
            <Title title='Cars' className='text-xs font-semibold'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default IconNav