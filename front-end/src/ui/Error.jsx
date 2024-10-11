import { useNavigate } from "react-router-dom";
import MainLayout from "../component/MainLayout";
import { FaArrowRightLong } from "react-icons/fa6";
function Error() {
  let navigate = useNavigate();
  return (
    <MainLayout configWidth="w-[25rem] h-[15rem]">
      <div className="flex items-center justify-center w-full flex-col gap-4">
        <p className="text-4xl font-bold w-full text-center">
          404: Pages Not Found
        </p>
        <button className="text-xl flex items-center gap-3 pb-1 border-b-[2px] border-transparent hover:border-b-red-500 transition-all duration-500" onClick={() => navigate("../home")}>
          <span> Go to the home page</span> <FaArrowRightLong />
        </button>
      </div>
    </MainLayout> 
  );
}

export default Error;
