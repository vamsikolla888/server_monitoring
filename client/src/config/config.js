const commonUrl = import.meta.env.VITE_API_URL;
const config = {
  apiUrl: commonUrl + "api/",
  baseUrl: commonUrl + 'api/',
  imageUrl: commonUrl + 'images/',
};

export default config;
