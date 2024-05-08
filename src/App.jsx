import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import axios from "axios";

function CountryCard({ imageUrl, name, countryKey, alt }) {
  return (
    <div className="card" key={countryKey}>
      <img src={imageUrl} alt={alt} width="70px" height="50px" />
      <h5>{name}</h5>
    </div>
  );
}

CountryCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  countryKey: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default function App() {
  const API_URL = "https://restcountries.com/v3.1/all";
  const [countryData, setCountryData] = React.useState([]);
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        const data = res.data;
        console.log(data);
        setCountryData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>XCountries</h1>
      <div className="container">
        {countryData.map((item) => (
          <CountryCard
            imageUrl={item.flags.png}
            name={item.name.common}
            countryKey={item.cca2}
            alt={item.flags.alt}
            key={item.cca2}
          />
        ))}
      </div>
    </div>
  );
}
