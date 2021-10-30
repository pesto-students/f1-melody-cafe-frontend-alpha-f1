import axios from "axios";

let baseUrl = "https://yhwyjsf4yb.us-east-2.awsapprunner.com";
// 'https://yhwyjsf4yb.us-east-2.awsapprunner.com'

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;
