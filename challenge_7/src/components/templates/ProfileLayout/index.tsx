import { ContentProfile, HeadTitle, Header, IconNav, SideBar } from '../..'

function ProfileLayout() {
  return (
    <>
      <HeadTitle title='Profile'/>
      <div className="flex h-screen">
        <IconNav/>
        <div className='w-full'>
          <Header/>
          <div className="flex">
            <SideBar/>
            <ContentProfile/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileLayout