import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-app-83f21.firebaseio.com/',
});

export default instance;