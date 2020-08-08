import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainPageStyle.css";
import { sorted, localityRest } from './../filters/Filters'

function MainPage(props) {
  const [cityName, setCityName] = useState("");
  const [cityId, setCityId] = useState("");
  const [restaurentData, setRestaurentData] = useState([]);

  const [restData, setRestData] = useState([]);
  const [dataFetch, setDataFetch] = useState(false);

  const [newCityName, setNewCityName] = useState("");
  const [qVal, setQval] = useState("");

  useEffect(() => {
    setCityName(props.data);
    setNewCityName(props.data);
  }, []);

  useEffect(() => {
    if (cityName !== "") {
      axios
        .get(`https://developers.zomato.com/api/v2.1/cities?q=${cityName}`, {
          headers: {
            "user-key": "7a77149c434216ebc2ae733a22ab3839",
          },
        })
        .then((data) => {
          setCityId(data.data.location_suggestions[0].id);
        });
    } else {
      console.log("hello");
    }
  }, [cityName]);

  useEffect(() => {
    if (cityId !== "") {
      axios
        .get(
          `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&q=${qVal}`,
          {
            headers: {
              "user-key": "7a77149c434216ebc2ae733a22ab3839",
            },
          }
        )
        .then((data) => {
          setDataFetch(true);
          setRestaurentData(data.data.restaurants);
          setRestData([...sorted(data.data.restaurants, 'popularity')])
        });
    } else {
      console.log("welome");
    }
  }, [cityId, qVal]);

  const changeCityHandler = (e) => {
    setNewCityName(e.target.value);
  };

  const onSearchHandler = () => {
    setCityName(newCityName);
  };

  const changeDish = (e) => {
    setQval(e.target.value);
  };

  let loc = localityRest(restaurentData);
  let keys = Object.keys(loc);

  let localityHandlor = (key) => {
    setRestData([...loc[key]]);
  }

  let listItems = keys.map((key) => {
    return (
      <div onClick={() => localityHandlor(key)} className="locFilter">
        {key}
      </div>
    )
  })

  return (
    <div className="MainPage_container">
      {console.log(cityName)}
      {console.log(cityId)}
      {console.log(restaurentData)}
      <div className="MainPage_nav_container">
        <div>
          <input
            onChange={(e) => {
              changeCityHandler(e);
            }}
            id="typeNewCity"
            type="text"
            value={newCityName}
          />
          <button id="searchNewCity" onClick={onSearchHandler}>
            city
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="search city"
            id="typeCity"
            value={qVal}
            onChange={(e) => {
              changeDish(e);
            }}
          />
          {/* <button id="typeDishes">dishes</button> */}
        </div>

        <div>about</div>

        <div>
          <button id="mainPageLogIn">Log In</button>
          <button id="mainPageSignUP">Sign Up</button>
        </div>
      </div>
      <div className="mainPage_main_data_container">
        <div className="MainPage_filter_container">

          <div>
            <div onClick={() => setRestData([...sorted(restaurentData, 'popularity')])} className="filter">
              Top Picks
            </div>
            <div onClick={() => setRestData([...sorted(restaurentData, 'rating')])} className="filter">
              Best Rating
            </div>
            <div onClick={() => setRestData([...sorted(restaurentData, 'costHL')])} className="filter">
              High To Low
            </div>
            <div onClick={() => setRestData([...sorted(restaurentData, 'costLH')])} className="filter">
              Cost low to high
            </div>
          </div><br /><br />
          {dataFetch ? <div>
            <div className='filter'>Locations of {cityName}</div>
            {listItems}
          </div> : null
          }

        </div>
        <div className="mainPage_restaurent_container">
          <div className="mainPage_card_container">
            {restData.length !== 0 ? (
              restData.map((items) => {
                return (
                  <div
                    className="mainPage_restaurent_inner_container"
                    key={items.restaurant.R.res_id}
                  >
                    <div className="mainPage_restaurent_card_container">
                      <img
                        src={items.restaurant.thumb}
                        alt="food"
                        width="300px"
                        height="130px"
                      />
                      <p>{items.restaurant.name}</p>
                      <span>{items.restaurant.cuisines}</span>
                      <br />
                      <span>
                        {items.restaurant.user_rating.aggregate_rating}
                      </span>
                      <span id="timing">{items.restaurant.timings}</span>
                      <span>
                        {items.restaurant.average_cost_for_two}
                        {items.restaurant.currency}
                      </span>{" "}
                      <br />
                      <br />
                      <button id="btnForCart">Add to Card</button>
                    </div>
                  </div>
                );
              })
            ) : (
                <h1>Loading....</h1>
              )}
          </div>
        </div>
        <div className='mainPage_cart_container'>Cart</div>
      </div>
    </div>
  );
}
export default MainPage;
