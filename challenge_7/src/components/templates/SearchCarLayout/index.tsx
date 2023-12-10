import { FooterLanding, Gap, HeadTitle, HeaderLanding, SearchCar } from '../..'

function SearchCarLayout() {
  return (
    <>
      <HeadTitle title='Search Car'/>
      <HeaderLanding>
        <SearchCar/>
      </HeaderLanding>
      <Gap height={200}/>
      <FooterLanding/>
    </>
  )
}

export default SearchCarLayout