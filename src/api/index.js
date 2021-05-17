import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
  if(localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
  }
  return req

})

export const fetchNews = () => API.get('/news');
export const addNews = (newsItem) => API.post('/news/save', newsItem);
export const deleteNews = (id) => API.delete(`/news/delete/${id}`);
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);