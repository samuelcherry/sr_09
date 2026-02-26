interface LoginData {
  email: string;
  password: string;
}

const handleLogin = async (data: LoginData) => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Login Failed");
    }
  } catch (error) {
    return null;
  }
};

export default handleLogin;
