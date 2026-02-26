const handleRegister = async (
  e: React.ChangeEvent,
  username: string,
  email: string,
  password: string,
) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const user = response.json();
    return user;
  } catch (error) {
    console.error("Registration Error", error);
  }
};

export default handleRegister;
