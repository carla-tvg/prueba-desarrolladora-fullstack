import axios from 'axios';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
const baseUrl = 'https://gateway.marvel.com/v1/public/';

const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

const marvelAPI = axios.create({
  baseURL: baseUrl,
  params: {
    ts,
    apikey: publicKey,
    hash,
  },
});

export default marvelAPI;