import { Button, Img, Text } from "../.."
import { carLandingPage } from "../../../assets"
import type { NavigateFunction } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom'

function Jumbotron() {
  const location = useLocation();
  const getUrl = location.pathname.split('/')[1];
  const navigate: NavigateFunction = useNavigate();

  const handleNavigate = () => {
    navigate('/search-car');
  }

  return (
    <>
      <div className="mt-40 flex h-56">
        <div className="flex flex-col gap-6 w-6/12">
          <Text text="Sewa & Rental Mobil Terbaik di Kawasan (Lokasimu)" classname="font-bold text-3xl"/>
          <Text text="Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam." classname='w-4/5'/>
          {getUrl === 'search-car' ? '' : <Button name="Mulai Sewa Mobil" className="w-40 py-2 rounded text-white bg-green-400 hover:bg-green-500 font-semibold" onClick={handleNavigate}/>}
        </div>
        <Img src={carLandingPage} alt="car-landing-image" className="absolute right-0 bottom-0 w-6/12"/>
      </div>
    </>
  )
}

export default Jumbotron