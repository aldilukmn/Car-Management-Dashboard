import { useNavigate } from 'react-router-dom';
import { Button, Img } from '../..'
import { landingPageLogo } from '../../../assets'
import type { NavigateFunction } from 'react-router-dom';

function NavLanding() {

  const navigate: NavigateFunction = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  }


  const handleRegisterNav = () => {
    navigate('/register');
  }

  return (
    <>
      <div className="flex justify-between pt-8">
        <Img src={landingPageLogo} alt="landing-page-logo" onClick={handleNavigate} className='cursor-pointer'/>
        <div className="flex gap-8 font-semibold">
          <Button name='Our Services'/>
          <Button name='Why Us'/>
          <Button name='Testimonial'/>
          <Button name='FAQ'/>
          <Button name='Register' className='bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded' onClick={handleRegisterNav}/>
        </div>
      </div>
    </>
  )
}

export default NavLanding