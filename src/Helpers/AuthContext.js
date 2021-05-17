// reducer to keep track of user login/logout
const LOGIN = `LOGIN`
const LOGOUT = `LOGOUT`

export const initialState = {
  isAuthenticated: false,
  userData: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      // console.log(action.payload)
      localStorage.setItem("user", JSON.stringify(action.payload))
      return { 
        ...state, 
        isAuthenticated: true,
        userData: action.payload
      }
    case LOGOUT:
      localStorage.clear()
      return {
        isAuthenticated: false,
        userData: null
      }
    default:
      return state;  
  }
}