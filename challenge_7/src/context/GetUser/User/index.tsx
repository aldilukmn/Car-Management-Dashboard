import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Users from "./script";
import { UserContext } from "..";

interface UserProps {
  children: React.ReactNode;
}

function User({children}: UserProps) {
  const [user, setUser] = useState<UserContext>(Object);
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = localStorage.getItem('access_token');

    if(getToken !== null) {
      const getData = async (token: string) => {
        try {
         const data = await Users.getUser(token);
           if(data.status.code === 401) throw new Error();
           setUser(data.result.user)
         } catch (error) {
           if(error instanceof Error) {
             navigate('/login');
           }
         }
       }
       getData(getToken);
    }
  }, [])

  return (
    <>
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    </>
  )
}

export default User;