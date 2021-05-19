import * as api from '../api/index.js'

export const signin = async ({dispatch, payload}) => {
  try {
    const { data } = await api.signIn(payload.formData)

    payload.history.push("/")
    
    return dispatch({ 
      type: 'LOGIN', payload: data
    })
  } catch (err) {
    console.log("Something is wrong!")
    alert(err.message)
  }
}

export const signup = async ({dispatch, payload}) => {
  try {
    const { data } = await api.signUp(payload.formData)
    payload.history.push("/")
    
    return dispatch({ 
      type: 'LOGIN', payload: data
    })
  } catch (err) {
    console.log(err.message)
  }
}