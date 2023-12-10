import { useContext, useState } from "react";
import { Button, Gap, Logo, Input, Label, SignLink, Title, Alert } from "../.."
import { useNavigate } from "react-router-dom";
import { UserRequest } from "../../../models";
import Register from "./script";
import { MessageContext } from "../../../context";

function SignUp() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [msg, setMsg] = useState<string>('');
  const navigate = useNavigate();
  const {setMessageSuccess} = useContext(MessageContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch(name) {
      case "email":
        setEmail(value);
      break;
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
        email,
        username,
        password
      }
      const response = await Register.doRegister(payload);
      if(response.status.code === 400) {
        throw new Error(response.status.message);
      }
      setMessageSuccess(response.status.message)
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        setMsg(error.message);
        setTimeout(() => {
          setMsg('');
        }, 2000);
      } else {
        console.log('An error occurred without a message.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex-initial w-72 self-center mx-auto relative">
        <Logo/>
        <Gap height={20}/>
        <Title title={'Welcome, Admin BCR'}/>
        <Gap height={10}/>
        {msg && <Alert msg={msg} className="rounded px-2 py-1 bg-red-200 text-red-800 w-full text-center font-semibold"/>}
        <Gap height={10}/>
        <Label label="Email" htmlFor="email" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white"/>
        <Input type="text" id="email" placeholder="Nama@mail.com" className="focus:border-indigo-700 rounded-md px-2 py-1 border outline-none w-full" name="email" onChange={handleChange} value={email}/>
        <Gap height={20}/>
        <Label label="Username" htmlFor="username" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white"/>
        <Input type="text" id="username" placeholder="Username" className="focus:border-indigo-700 rounded-md px-2 py-1 border outline-none w-full" name="username" onChange={handleChange} value={username}/>
        <Gap height={20}/>
        <Label label="Password" htmlFor="password" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white"/>
        <Input type="password" id="password" placeholder="Password" className="focus:border-indigo-700 rounded-md px-2 py-1 border outline-none w-full" name="password" onChange={handleChange} value={password}/>
        <Gap height={40}/>
        <Button name={isLoading ? "Loading ..." : "Sign Up"} className={`bg-indigo-600 hover:bg-indigo-700 w-full text-white py-1 rounded font-semibold ${!email || !username || !password || isLoading ? 'opacity-75 cursor-not-allowed hover:bg-indigo-600' : ''}`} disabled={!email || !username || !password || isLoading}/>
        <Gap height={20}/>
        <SignLink link="/login" name="Have an account?" className="text-blue-600 hover:underline text-center"/>
      </form>
    </>
  )
}

export default SignUp