import React, { useState } from "react";
import { login } from "../api/user";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChangeUsername = (e) => setUsername(e.target.value);

  const handleOnChangePass = (e) => setPassword(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    login(username, password);
  };

  return (
    <form onSubmit={onSubmit} className="login-form">
      <div>
        <label htmlFor="username">Username</label>

        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={handleOnChangeUsername}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          type="text"
          placeholder="Paasword"
          name="password"
          required
          onChange={handleOnChangePass}
        />
      </div>

      <div>
        <button type="submit">Log In</button>
      </div>
    </form>
  );
};
