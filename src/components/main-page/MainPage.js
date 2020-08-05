import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainPageStyle.css";
import Filters from "../filters/Filters";

function MainPage(props) {
  const [cityName, setCityName] = useState(null);
  const [cityId, setCityId] = useState("");
  const [restaurentData, setRestaurentData] = useState([]);
  const [filteredData, setFilteredData] = useState();

  let filterData = {};

  let getFilteredData = (filtData) => {
    setFilteredData(filtData)

    console.log('filtered data from main page', filterData);
  }

  useEffect(() => {
    setCityName(props.data);
    if (cityName) {
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
      console.log("hii");
    }
  }, [cityName, props.data]);

  useEffect(() => {
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city`,
        {
          headers: {
            "user-key": "7a77149c434216ebc2ae733a22ab3839",
          },
        }
      )
      .then((data) => {
        setRestaurentData(data.data.restaurants);
      });
  }, [cityId]);

  return (
    <div className="MainPage_container">
      {/* {console.log(restaurentData)} */}
      <div className="MainPage_nav_container">
        <div>
          <input id="typeNewCity" type="text" value={cityName} />
          <button id="searchNewCity">city</button>
        </div>

        <div>
          <input type="text" placeholder="search city" id="typeCity" />
          <button id="typeDishes">dishes</button>
        </div>

        <div>about</div>

        <div>
          <button id="mainPageLogIn">Log In</button>
          <button id="mainPageSignUP">Sign Up</button>
        </div>
      </div>
      <div className="mainPage_main_data_container">
        <div className="MainPage_filter_container">
          {/* <div className='Premium'>Premium</div>
          <div className='Restaurants'>Restaurants</div> */}
          <Filters res={restaurentData} mainPageCallback={getFilteredData} ></Filters>
        </div>
        <div className="mainPage_restaurent_container">
          {/* {restaurentData.data.restaurants((items) => {
            return (
              <div className="mainPage_restaurent_inner_container">
                <div>
                  <img
                    src={items.restaurant.menu_url}
                    with="200px"
                    height="100px"
                    alt="ok"
                  />
                </div>
                <p>{items.restaurant.name}</p>
                <h2>{items.restaurant.cuisines}</h2>
                <p>{items.restaurant.average_cost_for_two}</p>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}
export default MainPage;
