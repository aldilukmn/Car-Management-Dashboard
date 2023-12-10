import { Img, Text } from '../..'
import { landingPageLogo } from '../../../assets'

function CopyrigthFooter() {
  return (
    <>
      <div className="flex flex-col gap-5 w-72">
        <Text text='Copyright Binar 2022'/>
        <Img src={landingPageLogo} alt='landing-page-logo' classname=' w-32'/>
      </div>
    </>
  )
}

export default CopyrigthFooter