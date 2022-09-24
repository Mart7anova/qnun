import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0' : 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const instanceForHeroku = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})