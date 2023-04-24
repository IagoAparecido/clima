import "./Card.css";
import { useState } from "react";

interface WeatherData {
  weatherData?: any;
  city?: string;
  name: string;
  main?: {
    temp?: number;
    feels_like?: number;
    humidity?: number;
  };
  weather?: Array<{
    description?: string;
    main?: string;
  }>;
  wind?: {
    speed?: number;
  };
  sys: {
    country: string;
  };
}

function Card() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [time, setTime] = useState();
  const [clicked, setClicked] = useState(false);

  const API_KEY = "941f281b8d94d7ce02451d1c05edd5c5";

  const getData = async () => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    setWeatherData(data);
    const hour: any = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(hour);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleClick = () => {
    getData();
    setClicked(true);
  };

  console.log(weatherData);

  return (
    <>
      <section className=" container_card">
        <div className="container py-5 h-100 ">
          <div className="row d-flex justify-content-center align-items-center content_card ">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <h3 className="mb-4 pb-2 fw-normal">Pesquise por cidade</h3>

              <div className="input-group rounded mb-3">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="City"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  onChange={handleCityChange}
                />
                <a onClick={handleClick} type="button">
                  <span
                    className="input-group-text border-0 fw-bold"
                    id="search-addon"
                  >
                    Check!
                  </span>
                </a>
              </div>

              <div className="mb-4 pb-2">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Celsius
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Farenheit
                  </label>
                </div>
              </div>
            </div>

            {clicked && (
              <div className="col-md-8 col-lg-6 col-xl-4">
                <div
                  className="card"
                  style={{ color: "#4B515D", borderRadius: "35px" }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex">
                      <h6 className="flex-grow-1">
                        {weatherData?.name}, {weatherData?.sys?.country}
                      </h6>
                      <h6>{time}</h6>
                    </div>

                    <div className="d-flex flex-column text-center mt-5 mb-4">
                      <h6
                        className="display-4 mb-0 font-weight-bold"
                        style={{ color: "#1C2331" }}
                      >
                        {" "}
                        {weatherData?.main?.temp}
                        {" C "}
                      </h6>
                      <span className="small" style={{ color: "#868B94" }}>
                        {weatherData?.weather?.[0]?.main}
                      </span>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                        <div>
                          <i
                            className="fas fa-wind fa-fw"
                            style={{ color: "#868B94" }}
                          ></i>{" "}
                          <span className="ms-1">
                            {" "}
                            {weatherData?.wind?.speed} km/h
                          </span>
                        </div>
                        <div>
                          <i
                            className="fas fa-tint fa-fw"
                            style={{ color: "#868B94" }}
                          ></i>{" "}
                          <span className="ms-1">
                            {" "}
                            {weatherData?.main?.humidity}%{" "}
                          </span>
                        </div>
                        <div>
                          <i
                            className="fas fa-sun fa-fw"
                            style={{ color: "#868B94" }}
                          ></i>{" "}
                          <span className="ms-1">
                            Feels like: {weatherData?.main?.feels_like} C
                          </span>
                        </div>
                      </div>
                      <div>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp"
                          width="100px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Card;
