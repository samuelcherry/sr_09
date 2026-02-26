const handleLogin = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const user = response.json();
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default handleLogin;
