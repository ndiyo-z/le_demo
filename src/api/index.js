import { api } from './ajax'
import jsonp from 'jsonp'

export const login = async (user) => {
  let result;
  try {
    await api.post('/user/login', user).then(res => result = res.data)
  } catch (error) {
    result = { status: 9, message: error.message }
  }
  return result
}

export const getWeather = () => {
  return new Promise((resolve, reject) => {
    jsonp('https://restapi.amap.com/v3/weather/weatherInfo?key=c2caeffc1a6082087f4fb91ebfc9c9aa&city=530921', 
      {}, (err, data) => {
        if(err) reject(err)
        resolve(data.lives[0])
      })
  })
}

export const getPlateWeightList = async () => {
  let result;
  try {
    result = await api.post('/plateWeight/search');
  } catch (error) {
    result = { status: 9, message: error.message }
  }
  return result
}




