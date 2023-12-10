import { SignLink } from '../..'

function NavFooter() {
  return (
    <>
      <div className='flex flex-col gap-5 w-48'>
        <SignLink link='/' name='Our Services' classname='text-black font-semibold'/>
        <SignLink link='/' name='Why Us' classname='text-black font-semibold'/>
        <SignLink link='/' name='Testimonial' classname='text-black font-semibold'/>
        <SignLink link='/' name='FAQ' classname='text-black font-semibold'/>
      </div>
    </>
  )
}

export default NavFooter