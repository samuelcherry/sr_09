import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handleLogin from "../API/handleLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    try {
      await handleLogin(formData);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <form
          onSubmit={onSubmit}
          className=" bg-gray-400 rounded-lg p-2 m-2 w-1/5"
        >
          <div className="flex flex-col items-center">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white p-2 m-2"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white p-2 m-2"
            />
          </div>
          <div className="flex flex-row justify-between">
            <button type="submit" className="bg-white! p-2 m-2 rounded-lg">
              Login
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="bg-white p-2 m-2 rounded-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
