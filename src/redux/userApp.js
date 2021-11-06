import remove from 'lodash.remove'

// Action Types

export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

// Action Creators

let noteID = 0

export function addUser(user) {
  return {
    type: ADD_USER,
    id: noteID++,
    user
  }
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    id: noteID++,
    user
  }
}

export function deleteUser(id) {
  return {
    type: DELETE_USER,
    payload: id
  }
}

// reducer

const initialState = []

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        {
          id: action.id,
          user: action.user
        }
      ]

    case UPDATE_USER:
      return [
        ...state,
        {
          id: action.id,
          user: action.user
        }
      ]

    case DELETE_USER:
      const deletedNewArray = remove(state, obj => {
        return obj.id != action.payload
      })
      return deletedNewArray

    default:
      return state
  }
}

export default userReducer
