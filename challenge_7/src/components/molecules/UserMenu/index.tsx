import { useContext } from 'react';
import { Img, Text } from '../..'
import { UserContext } from '../../../context';

function UserMenu() {
  const user = useContext(UserContext);

  return (
    <>
      <div className='flex gap-5 my-1'>
        {
          user.image_url !== null ? (
            <Img src={user.image_url} alt='image-person' className='w-8 rounded-full'/>
          ) : (
            <Text text={user.username.charAt(0).toUpperCase()} classname='bg-indigo-100 px-3 py-1 rounded-full font-semibold'/>
          )
        }
        <Text text={`${user.username}`} classname='py-1'/>
      </div>
    </>
  )
}

export default UserMenu