import { DropDownMenu, Img, Search, UserMenu } from '../..'
import { logo } from '../../../assets'
import { SlMenu } from "react-icons/sl";
import { useContext } from 'react';
import hiddenSideBarContext from '../../../context/SideBar/HiddenSideBarContext';

function Header() {
  const {toggleMenuClicked, isHiddenSideBar} = useContext(hiddenSideBarContext);

  return (
    <>
      <header className='bg-white border-b flex items-center py-3 px-5 gap-5'>
        <Img src={logo} alt='img-logo' className={`hidden sm:block sm:me-5 ${isHiddenSideBar ? '' : 'md:me-28'}`}/>
        <div className='me-auto cursor-pointer' onClick={toggleMenuClicked}>
          <SlMenu/>
        </div>
        <Search/>
        <UserMenu/>
        <DropDownMenu/>
      </header>
    </>
  )
}

export default Header