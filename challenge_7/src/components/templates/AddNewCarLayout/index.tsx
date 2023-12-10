import { ContentNewCar, HeadTitle, Header, IconNav, SideBar } from '../..'

function AddNewCarLayout() {
  return (
    <>
      <HeadTitle title='Add New Car'/>
      <div className="flex">
        <IconNav/>
        <div className="w-full">
          <Header/>
          <div className="flex">
            <SideBar/>
            <ContentNewCar/>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNewCarLayout