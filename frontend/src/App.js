import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      const res = await axios.post(
        "https://backend-vwot.onrender.com/api/auth/register",
        {
          email,
          password,
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Erreur");
    }
  };

  return (
    <div className="container">
      <h1>Mon SaaS 🚀</h1>

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

      <p>{message}</p>
    </div>
  );
}

export default App;