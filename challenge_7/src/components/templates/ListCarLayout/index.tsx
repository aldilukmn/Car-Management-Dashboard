import { ContentListCar, HeadTitle, Header, IconNav, SideBar } from '../..'

function ListCarLayout() {
  return (
    <>
      <HeadTitle title='List Car'/>
      <div className="flex relative">
        <IconNav/>
        <div className='w-full'>
          <Header/>
          <div className="flex">
            <SideBar/>
            <ContentListCar/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListCarLayout