import { useNavigate } from 'react-router-dom';
import { Alert, Button, Gap, Img, Text, Title } from '../..'
import { Car, RoleJwtPayload } from '../../../models';
import { Cars, carBeepBeep } from '../../../assets';
import { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { IoTimeOutline } from "react-icons/io5";
import { FiTrash } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { MessageContext, SearchContext } from '../../../context';

function ListCar({sizeFilter}: { sizeFilter: string }) {
  const [cars, setCars] = useState<Car[]>([]);
  const navigate = useNavigate();
  const [delCar, setDelCar] = useState<boolean>(false);
  const [messageFail, setMessageFail] = useState<string>('');
  const [getId, setGetId] = useState<number>(0);
  const {messageSuccess, setMessageSuccess}= useContext(MessageContext);
  const {search} =useContext(SearchContext);
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);

  const handleEditCar = async (id: number) => {
    await Cars.getCarById(id);
    navigate(`/edit-car/${id}`);
  }

  useEffect(() => {
    const getToken = localStorage.getItem('access_token');
    const queryParams = new URLSearchParams();

    if(getToken !== null) {
    const decoded = jwtDecode(getToken) as RoleJwtPayload;

      const getData = async (token: string, role: string) => {
       try {
        const data = await Cars.getCar(token, role, sizeFilter, search, page, perPage);
          if(data.status.code === 401) throw new Error();
          setCars(data.result.cars);
          setPage(data.result.current_page);
          setPerPage(data.result.per_page);
          setTotalPage(Math.ceil(data.result.total_data_car / perPage));
        } catch (error) {
          if(error instanceof Error) {
            navigate('/login');
          }
        }
      }
      getData(getToken, decoded.role);
    }

    if(sizeFilter) {
      queryParams.set('size', sizeFilter);
    }

    if(search) {
      queryParams.set('search', search);
    }

    if(1 < page) {
      queryParams.set('page', page.toString());
    }

    navigate(`/list-car?${queryParams.toString()}`);

    setTimeout(() => {
      setMessageSuccess('');
    }, 2000);

  }, [sizeFilter, navigate, setMessageSuccess, search, page, perPage])

  const handleDeleteCar = async () => {
    const getToken = localStorage.getItem('access_token');
    try {
      if(getToken === null) {
        throw new Error("User token not provided!");
      }
      const decoded = jwtDecode(getToken) as RoleJwtPayload;
      const response = await Cars.deleteCar(getToken, decoded.role, getId);
      setCars((car) => car.filter((car) => car.id !== getId));
      setMessageFail(response.status.message);
    } catch (error) {
      if(error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setDelCar(false);
      setTimeout(() => {
        setMessageFail('');
      }, 2000)
    }
  }

  const handleShowDelete = (id: number) => {
    setDelCar(true);
    setGetId(id);
  }

  const handleCancelDel = () => {
    setDelCar(false);
  }

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  }

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  }

  return (
    <> 
      {messageFail && <Alert msg={messageFail} className='mb-4 rounded bg-black py-2 text-white absolute w-1/2 left-1/3 text-center font-semibold top-24'/>}
      {messageSuccess && <Alert msg={messageSuccess} className='mb-4 rounded bg-green-500 py-2 text-white absolute w-1/2 left-1/3 text-center font-semibold top-24'/>}
      <div className={`p-4 rounded border`}>
        <div className={`${cars.length !== 0 ? 'grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5' : 'h-96'}`}>
          {cars.length !== 0 ? cars.map((car, index) => {
            return (
              <div className='border rounded shadow' key={index}>
                <Img src={car.image_url} alt='car-img' className='rounded-t object-cover h-60 w-full' />
                <div className='p-2'>
                  <Text text={`${car.name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} `} span={`(${car.size.charAt(0).toUpperCase()}${car.size.slice(1)})`} classSpan='text-xs text-gray-700'/>
                  <Gap height={5}/>
                  <Title title={`Rp. ${car.rent.toLocaleString('id')} / Hari`}/>
                  <Gap height={5}/>
                  <div className="flex items-center gap-1">
                    <IoTimeOutline className="text-gray-700"/>
                    <Text text={`Updated at ${car.updated_at}`} classname='text-xs text-gray-700'/>
                  </div>
                  <Gap height={10}/>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <Button children={<FiTrash/>} name='Delete'className='border py-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded flex gap-1 items-center justify-center font-semibold' onClick={() => handleShowDelete(car.id)}/>
                    <Button children={<FaRegEdit/>} name='Edit'className='border py-1 bg-green-500 text-white hover:bg-green-600 rounded flex gap-1 items-center justify-center font-semibold' onClick={() => handleEditCar(car.id)}/>
                  </div>
                  <Gap height={5}/>
                </div>
                {delCar && <>
                  <div className="border bg-black z-10 absolute left-0 right-0 top-0 bottom-0 opacity-10"></div>
                  <div className="card absolute border top-56 left-[40%] p-10 flex flex-col items-center w-96 bg-white z-20">
                    <Img src={carBeepBeep} alt='car-beep-beep-img'/>
                    <div className='flex flex-col items-center text-center gap-3'>
                      <Title title='Menghapus Data Mobil' className='text-lg font-bold'/>
                      <Text text='Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?'/>
                      <div className="flex gap-5 font-semibold">
                        <Button name='Ya' className='bg-blue-600 hover:bg-blue-700 w-20 py-2 text-white rounded' onClick={() => handleDeleteCar()}/>
                        <Button name='Tidak' className='bg-white w-20 py-2 border rounded border-blue-600 hover:border-blue-700 text-blue-600 hover:text-blue-700' onClick={handleCancelDel}/>
                      </div>
                    </div>
                  </div>
                </>}
              </div>
            )
          }) : <Text text='Car Not Found ☹️☹️' classname='text-center font-semibold text-2xl mt-36'/>}
        </div>
        <Gap height={30}/>
        <div className="flex gap-5 justify-center items-center">
          <Button name='Prev Page' className={`bg-blue-700 text-white py-1 px-2 rounded ${page <= 1 || Boolean(search) ? 'bg-blue-400' : ''}`} onClick={handlePrevPage} disabled={page <= 1 || Boolean(search)}/>
          <Text text={`${page <= totalPage ? page : totalPage} / ${totalPage}`} classname='font-semibold'/>
          <Button name='Next Page' className={`bg-blue-700 text-white px-2 py-1 rounded ${page >= totalPage ? 'bg-blue-400' : ''}`} onClick={handleNextPage} disabled={page >= totalPage}/>
      </div>
      </div>
    </>
  )
}

export default ListCar