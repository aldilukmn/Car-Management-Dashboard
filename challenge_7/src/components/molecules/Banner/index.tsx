import { Button, Text, Title } from '../..'
import { useNavigate } from 'react-router-dom'
import type { NavigateFunction } from 'react-router-dom';

function Banner() {
  const navigate: NavigateFunction = useNavigate();

  const handleNavigate = (): void => {
    navigate('/search-car');
  }

  return (
    <>
      <Title title='Sewa Mobil di (Lokasimu) Sekarang' className='font-semibold text-4xl text-white'/>
      <Text text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' classname='text-sm w-10/12 text-slate-200'/>
      <Button name="Mulai Sewa Mobil" className='text-white bg-green-500 py-2 px-3' onClick={handleNavigate}/>
    </>
  )
}

export default Banner