import axios from 'axios';

const GEO_API_URL = 'https://get.geojs.io/v1/ip/geo.json';

export const fetchLocation = () => {
  return axios.get(GEO_API_URL);
};
