import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handleRegister from "../API/handleRegister";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();

    const formData = {
      username,
      email,
      password,
    };
    try {
      await handleRegister(formData);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    navigate("/login");
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
