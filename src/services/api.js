import axios from 'axios';
import { proxy } from '../config'

const apiService = (() => {
  function fetchApiData() {
    return axios.get(`${proxy}http://api.backcountry.com/v1/products/SMX0027`, {});
  }
  return {
    fetchApiData
  };
})();

export default apiService;
