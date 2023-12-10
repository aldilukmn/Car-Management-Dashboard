import { FormNewCar, Navigation, TitlePage } from '../..'

function ContentAddNewCar() {
  return (
    <>
      <div className="flex flex-col m-5 w-full">
      <Navigation/>
        <TitlePage/>
        <FormNewCar/>
      </div>
    </>
  )
}

export default ContentAddNewCar