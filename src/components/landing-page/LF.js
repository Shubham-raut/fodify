import React, { useState, Component } from "react";
import "./landingPageStyle.css";
import SignUpLogIn from "../SigUp-LogIn/SignUpLogIn";

function LandingPage(props) {
    const [cityInput, setCityInput] = useState("");
    const [loginPopup, setLogInPopUp] = useState(false);
    const [signupPopup, setSignInPopUp] = useState(false);
    const [showCity, setShowCity] = useState(false);

    const changeHandler = (e) => {
        setCityInput(e.target.value);
    };

    const clickHandler = () => {
        props.getCityName(cityInput);
    };

    const loginPopUp = () => {
        setLogInPopUp(!loginPopup);
    };

    const signupPopUp = () => {
        setSignInPopUp(!signupPopup);
    };

    const cityDropDown = () => {

    }

    return (
        <>
            <div className="landing_page_main_container">
                <div className='landing_page_header_container'>

                    <div className="signUpLoginButtons">
                        <button onClick={loginPopUp}>Log In</button>
                        <button onClick={signupPopUp}>Sign Up</button>
                    </div>

                    <div className="title">fodify</div>
                    <div class="subTitle">Order food from favourite restaurants near you...</div>

                    <div className="landing_page_search_by_city_container">






                        <div>
                            <button onclick={() => setShowCity(true)} class="dropbtn">Dropdown</button>
                            {showCity ?
                                <div id="myDropdown" class="dropdown-content">
                                    <div>Mumbai</div>
                                    <div>Delhi</div>
                                    <div>Kolkata</div>
                                    <div>Chennai</div>
                                    <div>Banglore</div>
                                    <div>Pune</div>
                                    <div>Ahmedabad</div>
                                </div> :
                                null
                            }


                            <div class="nearMe"><i class="fa fa-map-marker"></i><span>Top Cities</span></div>
                        </div>







                        <input id="citySearch" type="text" name="search" placeholder="Search for city..." value={cityInput}
                            onChange={(e) => {
                                changeHandler(e);
                            }}
                        />
                        <button id="citySearchbtn" onClick={clickHandler}>
                            <i class="fa fa-search"></i>
                        </button>
                    </div>

                    {loginPopup ? (
                        <SignUpLogIn popUp={loginPopUp} flagOne={loginPopup} />
                    ) : null}

                    {signupPopup ? (
                        <SignUpLogIn popUp={signupPopUp} flagTwo={signupPopup} />
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default LandingPage;
