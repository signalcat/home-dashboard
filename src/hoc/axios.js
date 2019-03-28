import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://home-dashboard-eb1c4.firebaseio.com/'
});

export default instance;