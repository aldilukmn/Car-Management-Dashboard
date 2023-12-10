import { ContentEditCar, HeadTitle, Header, IconNav, SideBar } from '../..'

function EditCarLayout() {
  return (
    <>
      <HeadTitle title='Edit Car'/>
      <div className="flex">
        <IconNav/>
        <div className="w-full">
          <Header/>
          <div className="flex">
            <SideBar/>
            <ContentEditCar/>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditCarLayout