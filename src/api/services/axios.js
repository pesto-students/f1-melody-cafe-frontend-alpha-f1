import axios  from "axios";

let baseUrl = process.env.BASE_URL || 'https://yhwyjsf4yb.us-east-2.awsapprunner.com';

const instance = axios.create({
    baseURL: baseUrl
})

export default instance;