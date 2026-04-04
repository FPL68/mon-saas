import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/auth/register", {
        email, 
        password,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Erreur serveur");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Mon SaaS 🚀</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={register}>Créer un compte</button>

      <p>{message}</p>
    </div>
  );
}

export default App;
console.log("test");
