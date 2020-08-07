import React from "react";

function signUpLogIn() {
  return (
    <div className="signUpLogIn_main_container">
      <div className="signUpLogIn_container">
        <div className="login_container">
          <input type="text" placeholder="ex.abc@gmail.com" />
          <br />
          <button>Log In</button>
        </div>
        <div className="signUp_container">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default signUpLogIn;
