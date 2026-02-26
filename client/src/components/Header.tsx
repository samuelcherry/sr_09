import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <>
      <div>
        <div className="bg-gray-400 flex flex-col items-end">
          <button
            type="button"
            onClick={handleLogout}
            className="bg-white p-2 m-2 rounded-lg"
          >
            Log Out
          </button>
          <div className="flex flex-row m-2 w-full justify-center items-center">
            <input type="text" placeholder="post" className="bg-white h-8" />
            <button type="button" className="bg-white p-2 m-2 rounded-lg">
              POST
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
