import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "../landing-page/LandingPage";
import MainPage from "../main-page/MainPage";
import { useHistory } from "react-router-dom";

function MyRoute() {
  const history = useHistory();

  const [cityName, setCityName] = useState("");

  const cityNameFromInputField = (cityName) => {
    setCityName(cityName);
    if (cityName === "") {
      alert("Please fill correct city Name");
    } else {
      history.push("/restaurent");
    }
  };

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <LandingPage getCityName={cityNameFromInputField} />}
        />
      </Switch>
      <Switch>
        <Route
          path="/restaurent"
          component={() => <MainPage data={cityName} />}
        />
      </Switch>
    </div>
  );
}
export default MyRoute;
