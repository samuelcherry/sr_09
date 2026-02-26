import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handleRegister from "../API/handleRegister";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async (e: React.ChangeEvent) => {
    const user = await handleRegister(e, username, email, password);

    if (!user) {
      throw new Error("registration error");
    } else {
      navigate("/login");
    }
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <form
          onSubmit={register}
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
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              Register
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="bg-white p-2 m-2 rounded-lg"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
