import axios from "axios";
const apiKey = import.meta.env.VITE_RAWG_API_KEY || "073cd452e68e4ba197fa4331386ad5a8";
if (!import.meta.env.VITE_RAWG_API_KEY) {
  console.warn("VITE_RAWG_API_KEY is not set. Falling back to hardcoded RAWG API key.");
}
export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: apiKey
  }
});