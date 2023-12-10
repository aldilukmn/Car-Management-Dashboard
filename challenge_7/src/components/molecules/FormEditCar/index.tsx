import { useNavigate, useParams } from 'react-router-dom';
import { Button, Gap, Img, Input, Label, Option, Select } from '../..'
import { Cars, defaultImg } from '../../../assets';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { RoleJwtPayload } from '../../../models';
import { MessageContext } from '../../../context';

function FormEditCar() {
  const carId = useParams<{ id: string }>();
  const parseIntId = Number(carId.id);
  const [name, setName] = useState<string>('');
  const [rent, setRent] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [userToken, setUserToken] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateImg, setUpdateImg] = useState<File | null>(null);
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const {setMessageSuccess} = useContext(MessageContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if(name === 'image_url') {
      const selectedImg = (event.target as HTMLInputElement).files;
      if(selectedImg && selectedImg.length > 0) {
        setUpdateImg(selectedImg[0]);
        handleChangeImg();
      }
    }
    switch(name) {
      case "name":
        setName(value);
      break;
      case "rent":
        setRent(value);
      break;
      case "size":
        setSize(value);
      break;
    }
  }

  function handleChangeImg() {
    if (fileRef.current && fileRef.current.files) {
      const image = fileRef.current.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (setImg) {
          setImg(reader.result as string);
        }
      });
      reader.readAsDataURL(image);
    }
  }
  
  const getCarById = async () => {
    const getToken = localStorage.getItem('access_token');
    try {
      if(getToken === null) {
        throw new Error("User token not provided!");
      }
      const decoded = jwtDecode(getToken) as RoleJwtPayload;

      setRole(decoded.role);
      setUserToken(getToken);
      
      const data = await Cars.getCarById(parseIntId);
      setName(data.result.name);
      setRent(data.result.rent);
      setSize(data.result.size);
      setImg(data.result.image_url);
    } catch (error) {
     if(error instanceof Error) {
      console.log(error.message);
     }
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("rent", rent);
    formData.append("size", size);
    if (updateImg) {
      formData.append("image_url", updateImg);
    }
    try {
      setIsLoading(true)
      if(userToken === null) throw new Error();
      const response = await Cars.updateCar(parseIntId, userToken, role, formData);
      navigate("/list-car");
      setMessageSuccess(response.status.message)
    } catch (error) {
      if(error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsLoading(false)
    }
  };

  function cancelNavigate() {
    navigate('/list-car');
  }

  useEffect(() => {
    getCarById();
  }, [carId])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-28 items-center p-4 rounded border">
        <form id='update-car' onSubmit={onSubmit}>
        <div className="flex-none md:flex items-center">
            <Label label="Name" htmlFor="name" className="block text-sm font-normal text-gray-900 dark:text-white w-52"/>
            <Gap height={10}/>
            <Input className="focus:border-indigo-700 rounded-md px-2 py-1 border outline-none w-full md:w-80" type="text" id="name" placeholder="Avanza" value={name} name="name" onChange={handleChange}/>
          </div>
          <Gap height={20}/>
          <div className="flex-none md:flex items-center">
            <Label label="Rent" htmlFor="rent" className="block text-sm font-normal text-gray-900 dark:text-white w-52"/>
            <Gap height={10}/>
            <Input className="focus:border-indigo-700 rounded-md px-2 py-1 border outline-none w-full md:w-80" type="number" id="rent" placeholder="Rp900.000,-" name="rent" value={rent} onChange={handleChange}/>
          </div>
          <Gap height={20}/>
          <div className="flex-none md:flex items-center">
            <Label label="Size" htmlFor="size" className="block text-sm font-normal text-gray-900 dark:text-white w-52"/>
            <Gap height={10}/>
            <Select id="size" name="size" value={size} className="border w-full md:w-80 px-2 py-1 rounded-md outline-none focus:border-indigo-700" onChange={handleChange}>
              <Option value="" size="Choose your car size"/>
              <Option value="small" size="Small"/>
              <Option value="medium" size="Medium"/>
              <Option value="large" size="Large"/>
            </Select>
          </div>
          <Gap height={20}/>
          <div className="flex-none md:flex items-center">
            <Label label="Image" htmlFor="image" className="block text-sm font-normal text-gray-900 dark:text-white w-52"/>
            <Gap height={10}/>
            <Input className="focus:border-indigo-700 rounded-md px-2 py-1 border outline-none w-full md:w-80" type="file" id="image" placeholder="image" name="image_url" onChange={handleChange} ref={fileRef}/>
          </div>
        </form>
        <div>
        <Img src={!img ? defaultImg : img} alt="default-img" className="rounded h-72 md:h-56 w-full md:w-56 object-cover md:ms-auto"/>
        </div>
      </div>
      <div className="flex gap-3 mt-40">
        <Button name="Cancel" className="border border-indigo-700 px-2 text-indigo-700 rounded font-semibold py-1 w-24" onClick={cancelNavigate}/>
        <Button form="update-car" name={isLoading ? "Loading..." : "Update"} className={`bg-indigo-600 w-24 text-white py-1 rounded font-semibold ${
          (!name || !rent || !size || !img || isLoading) ? 'opacity-75 cursor-not-allowed hover:bg-indigo-600' : 'bg-indigo-700'
        }`} disabled={!name || !rent || !size || !img || isLoading}/>
      </div>
    </>
  )
}

export default FormEditCar