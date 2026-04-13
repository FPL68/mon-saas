import { useState } from "react";
import axios from "axios";
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