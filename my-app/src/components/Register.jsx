import { useState } from "react";

export default function Register({ register }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div>

      <h2>📝 Регистрация</h2>


      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />


      <br />
      <br />


      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />


      <br />
      <br />


      <button
        onClick={() => register(email, password)}
      >
        Зарегистрироваться
      </button>


    </div>
  );
}