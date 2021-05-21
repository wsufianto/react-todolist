import axios from 'axios'

// const API = axios.create({ baseURL: 'https://newsappmern.herokuapp.com/'})
const API = axios.create({ baseURL: 'http://localhost:5000/'})
// export const source = axios.CancelToken.source();

API.interceptors.request.use((req) => {
  if(localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
  }
  return req

})

export const fetchNews = (region, source) => API.get(`/news/${region}`, { cancelToken: source.token});
export const addNews = (newsItem) => API.post('/news/save', newsItem);
export const deleteNews = (id) => API.delete(`/news/delete/${id}`);
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);