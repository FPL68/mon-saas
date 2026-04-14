import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      const res = await axios.post(
        "https://backend-vwot.onrender.com/api/auth/register",
        { email, password }
      );
      setMessage(res.data.message);
    } catch {
      setMessage("Erreur register");
    }
  };

 const login = async () => {
  try {
    const res = await axios.post(
      "https://backend-vwot.onrender.com/api/auth/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("email", res.data.email);

    setIsLogged(true);
    setMessage("Connecté !");
  } catch {
    setMessage("Erreur login");
  }
};
    try {
      await axios.post(
        "https://backend-vwot.onrender.com/api/auth/login",
        { email, password }
      );
      setMessage("Connecté !");
    } catch {
      setMessage("Erreur login");
    }
  };

return (
  <div className="container">
    <h1>Mon SaaS 🚀</h1>

    {isLogged ? (
      <>
        <h2>Bienvenue {localStorage.getItem("email")} 👋</h2>

        <button onClick={() => {
          localStorage.clear();
          setIsLogged(false);
        }}>
          Se déconnecter
        </button>
      </>
    ) : (
      <>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register}>
          Créer un compte
        </button>

        <button onClick={login}>
          Se connecter
        </button>
      </>
    )}

    <p>{message}</p>
  </div>
);
}

export default App;