import { api } from './ajax'

export const login = async (user) => {
  let result;
  try {
    await api.post('/user/login', user).then(res => result = res.data)
  } catch (error) {
    result = { status: 9, message: error.message }
  }
  return result
}