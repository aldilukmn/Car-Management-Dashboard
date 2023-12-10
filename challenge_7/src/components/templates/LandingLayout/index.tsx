import { BannerLanding, FAQLanding, FooterLanding, HeadTitle, HeaderLanding, OurServicesLanding, TestimonialLanding, WhyUsLanding } from '../..'

function LandingLayout() {
  return (
    <>
      <HeadTitle title='Binar Rental Car'/>
      <HeaderLanding/>
      <OurServicesLanding/>
      <WhyUsLanding/>
      <TestimonialLanding/>
      <BannerLanding/>
      <FAQLanding/>
      <FooterLanding/>
    </>
  )
}

export default LandingLayout