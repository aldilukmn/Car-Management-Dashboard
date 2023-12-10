import { useLocation, useNavigate } from 'react-router-dom'
import { Gap, Text } from '../..'
import { useContext } from 'react';
import hiddenSideBarContext from '../../../context/SideBar/HiddenSideBarContext';
import type { NavigateFunction } from 'react-router-dom';
import { SearchContext } from '../../../context';

function SideBar() {
  const location = useLocation();
  const getNav = location.pathname.split('/')[1];
  const {isHiddenSideBar} = useContext(hiddenSideBarContext);
  const navigate: NavigateFunction = useNavigate();
  const {setSearch} = useContext(SearchContext)

  const handleProfile = () => {
    navigate('/profile');
  }

  const handleListCar = () => {
    navigate('/list-car');
    setSearch('');
  }

  return (
    <>
      <div className={`bg-white border-r w-72 hidden mt-1 ${isHiddenSideBar ? '' : 'sm:block'}`}>
        <Gap height={20}/>
        <Text text='Profil' classname={`font-bold hover:bg-indigo-200 ps-5 cursor-pointer py-2 ${getNav === 'profile' ? 'bg-indigo-200' : 'text-gray-500'}`} onClick={handleProfile}/>
        <Gap height={33} />
        <Text text='List Car' classname={`font-bold hover:bg-indigo-200 ps-5 cursor-pointer py-2 ${getNav === 'list-car' ? 'text-black bg-indigo-200' : getNav === 'add-new-car' ? 'text-gray-700 bg-indigo-200' : getNav === 'edit-car' ? 'text-gray-700 bg-indigo-200' : 'text-gray-500'}`} onClick={handleListCar}/>
      </div>
    </>
  )
}

export default SideBar