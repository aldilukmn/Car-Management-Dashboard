import { useContext, useEffect, useState } from "react"
import { Alert, Button, Gap, Logo, Input, Label, SignLink, Title } from "../.."
import { UserRequest } from "../../../models";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from "@react-oauth/google";
import Login from "./script";
import { MessageContext } from "../../../context";

function SignIn() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageFail, setMessageFail] = useState<string>('');
  const navigate = useNavigate();
  const {messageSuccess, setMessageSuccess}= useContext(MessageContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch(name) {
      case "username":
        setUsername(value);
      break;
      case "password":
        setPassword(value);
      break;
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    try {
      event.preventDefault();
      const payload: UserRequest = {
        username,
        password
      }
      const response = await Login.doLogin(payload);
      if(response.status.code === 400) {
        throw new Error(response.status.message);
      }
      const token = response.result.token;
      localStorage.setItem('access_token', token);
      navigate('/list-car');
    } catch (error) {
      if (error instanceof Error) {
        setMessageFail(error.message);
        setTimeout(() => {
          setMessageFail('');
        }, 2000);
      } else {
        console.log('An error occurred without a message.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setMessageSuccess('');
    }, 2000);
  }, [])

  const handleCredentialResponse = async (credentialResponse: CredentialResponse) => {
    const response = await Login.googleLogin(credentialResponse);
    if(response.status.code === 400) {
      throw new Error(response.status.message);
    }
    const token = response.result.token;
    localStorage.setItem('access_token', token);
    navigate('/list-car');
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex-initial w-72 self-center mx-auto relative">
        <Logo/>
        <Gap height={20}/>
        <Title title={'Welcome, Admin BCR'}/>
        <Gap height={10}/>
        {messageSuccess && <Alert msg={messageSuccess} className="rounded bg-green-200 px-2 py-1 text-green-700 w-full text-center font-semibold"/>}
        {messageFail && <Alert msg={messageFail} className="rounded px-2 py-1 bg-red-200 text-red-800 w-full text-center font-semibold"/>}
        <Gap height={10}/>
        <Label label="Username" htmlFor="username" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white"/>
        <Input className="focus:border-indigo-700 rounded-md px-2 py-1 border outline-none w-full" type="text" id="username" placeholder="Username" value={username} name="username" onChange={handleChange}/>
        <Gap height={20}/>
        <Label label="Password" htmlFor="password" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white"/>
        <Input className="focus:border-indigo-700 rounded-md px-2 py-1 border outline-none w-full" type="password" id="password" placeholder="Password" value={password} name="password" onChange={handleChange}/>
        <Gap height={40}/>
        <div className="flex flex-col items-center">
          <Button
            name={isLoading ? "Loading ..." : "Sign In"}
            className={`bg-indigo-600 hover:bg-indigo-700 w-full text-white py-1 rounded font-semibold ${
              (!username || !password || isLoading) ? 'opacity-75 cursor-not-allowed hover:bg-indigo-600' : ''
            }`}
            disabled={!username || !password || isLoading}
          />
          <Gap height={20}/>
          <GoogleOAuthProvider clientId='2182170302-4qed8hhs52i94pq1bob86itln3vj01f3.apps.googleusercontent.com'>
            <GoogleLogin onSuccess={handleCredentialResponse}/>
          </GoogleOAuthProvider>
        </div>
        <Gap height={20}/>
        <SignLink link="/register" name="Don't have an account?" className="text-blue-600 hover:underline text-center"/>
      </form>
    </>
  )
}

export default SignIn