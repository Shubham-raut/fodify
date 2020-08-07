import React, { useState } from "react";
import "./landingPageStyle.css";

function LandingPage(props) {
  const [cityInput, setCityInput] = useState("");

  const changeHandler = (e) => {
    setCityInput(e.target.value);
  };

  const clickHandler = () => {
    props.getCityName(cityInput);
  };

  return (
    <div className="landing_page_main_container">
      <div className="landing_page_header_container">
        <div className="fodify">fodify</div>
        <div className="signUpLoginButtons">
          <button>Log In</button>
          <br />
          <button>Sign Up</button>
        </div>
      </div>
      <div className="landing_page_search_by_city_container">
        <div>
          <input
            id="citySearch"
            type="text"
            placeholder="type city name to search"
            value={cityInput}
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>
        <div>
          <button id="citySearchbtn" onClick={clickHandler}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
