import { FormEditCar, Navigation, TitlePage } from '../..'

function ContentEditCar() {
  return (
    <>
      <div className="flex flex-col m-5 w-full">
        <Navigation/>
        <TitlePage/>
        <FormEditCar/>
      </div>
    </>
  )
}

export default ContentEditCar