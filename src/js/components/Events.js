import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../setupEnv';


const Event = () => {
  const [data, setData] = useState([]);
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const grant_type = process.env.GRANT_TYPE;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  console.log("SHOW ENV Value")
  console.log(username)
  console.log(password)
  console.log(grant_type)
  console.log(client_id)
  console.log(client_secret)
  // Filtered Data removed blank Title and Teaser
  const filteredData = data.filter(item => item.title !== "" && item.teaser !== "");
  console.log("This is Filter Event State")
  console.log(filteredData)

  const fetchData = async () => {
    console.log("Execute login Function")
    try {
      const data = {
            "username": username,
            "password": password,
            "grant_type": grant_type,
            "client_id": client_id,
            "client_secret": client_secret,
          }

      // Perform login action
      const response = await axios.post('/oauth/token', data);

      const setToken = sessionStorage.setItem('token', response.data.access_token);
      const setRefreshToken = sessionStorage.setItem('refreshToken', response.data.refresh_token);
      const token = sessionStorage.getItem('token');

      //setToken(response);
      const dataResponse = await axios.get('/api/sportsdata/events', {
          headers: {
              'Accept' : 'application/json',
              'Authorization' : `Bearer ${token}`
          }
      })
      console.log("fetchData Response")
      console.log(dataResponse)
      const lastTen = dataResponse.data.data.slice(-10);
      // last 10 data
      setData(lastTen)

    } catch (error) {
      console.error('Error Fetching Data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Removed html tags in Events
  const removeHtmlTags = (html) => {
      const regex = /(<([^>]+)>)/gi;
      return html.replace(regex, "");
    };

  return (
    <React.Fragment>
        <p></p>
        <p></p>

        <h3>
          <span className="logintxt">EVENTS</span>
        </h3>

        <div className="picklisttbl m-md-0">

          {filteredData.map((item) => (
          <div key={item.pick_id}className="container pb-3 p-0">
            <div className="row m-0 pl-card-title-row">
              <div className="row m-0">
                <div className="col-12">
                  <div className="text-justify mx-1 mt-2 mb-3" >
                    <p className="text-center">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row m-0 px-1 py-2">
              {/*
              {item.teaser}
                  */}
              {removeHtmlTags(item.teaser)}
            </div>
          </div>
          ))}

        </div>
    </React.Fragment>
  );
};

export default Event;

