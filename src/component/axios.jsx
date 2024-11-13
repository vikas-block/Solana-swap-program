import axios from "axios";

const Axios = async (api) => {
  console.log("Crypto_token address :-", api);
  const response = await axios.get(`https://price.jup.ag/v6/price?ids=${api}`);

  console.log(response.data.data);
  return response;
};
export default Axios;

