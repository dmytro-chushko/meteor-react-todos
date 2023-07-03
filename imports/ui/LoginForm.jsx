import React, { useState } from "react";
import { login } from "../api/user";
import { LoginWithGithub } from "./LoginWithGitHub";

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
      <LoginWithGithub />
      <div>
        <label htmlFor="username">Username</label>

        <input
          type="text"
          placeholder="Username"
          id="username"
          required
          onChange={handleOnChangeUsername}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          type="text"
          placeholder="Paasword"
          id="password"
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
