const commonUrl = import.meta.env.VITE_API_URL;
const socketUrl = import.meta.env.VITE_SOCKET_URL;
const config = {
  apiUrl: commonUrl + "api/",
  baseUrl: commonUrl + 'api/',
  imageUrl: commonUrl + 'images/',
  socketUrl
};

export default config;
