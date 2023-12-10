import { useContext } from 'react';
import { UserContext } from '../../../context';
import { Gap, Img, Text, Title } from '../..';
import { defaultImg } from '../../../assets';

function Profile() {
  const user = useContext(UserContext);

  return (
    <>
      <div className="border rounded flex flex-col items-center py-24">
        <Img src={user.image_url ? user.image_url : defaultImg} alt='image-person' className='w-32 rounded-full'/>
        <Gap height={20}/>
        <Title title={user.username}/>
        <Gap height={5}/>
        <Text text={user.email}/>
      </div>
    </>
  )
}

export default Profile