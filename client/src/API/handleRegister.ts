interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const handleRegister = async (data: RegisterData) => {
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Registration Failed");
  }

  return response.json();
};

export default handleRegister;
