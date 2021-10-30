import axios from "axios";

let baseUrl = "http://localhost:5000";
// 'https://yhwyjsf4yb.us-east-2.awsapprunner.com'

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;
