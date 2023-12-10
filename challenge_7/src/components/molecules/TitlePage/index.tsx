import { useLocation } from "react-router-dom";
import { SignLink, Text } from "../.."
import { FaPlus } from "react-icons/fa6";

function TitlePage() {
  const location = useLocation();
  const getUrl = location.pathname.split('/')[1];

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <Text text={getUrl === 'list-car' ? 'List Car' : getUrl === 'add-new-car' ? 'Add New Car' : getUrl === 'edit-car' ? 'Edit Car' : '' } classname="font-bold"/>
        {getUrl === 'list-car' && (
          <SignLink icon={<FaPlus/>} name="Add New Car" className="border px-3 py-2 rounded text-white bg-indigo-500 hover:bg-indigo-700 flex items-center gap-2" link="/add-new-car"/>
        )}
      </div>
    </>
  )
}

export default TitlePage