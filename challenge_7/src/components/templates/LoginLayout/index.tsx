import { HeadTitle, Img, SignIn } from '../..'
import { signBg } from '../../../assets'

function LoginLayout() {
  return (
    <>
      <div className="flex h-screen">
        <HeadTitle title='Login'/>
        <Img src={signBg} alt="sign-img" className="object-cover sm:w-3/4 w-0"/>
        <SignIn/>
      </div>
    </>
  )
}

export default LoginLayout