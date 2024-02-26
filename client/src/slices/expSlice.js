import { createSlice } from '@reduxjs/toolkit';

const expSlice = createSlice({
    name: 'exp',
    initialState: {
        arr: []
    },
    reducers: {
        setExp: (state, action) => {
            const newState = [...action.payload]
            state.arr = newState
        },
        addExp: (state, action) => {
            const addedState = [...state.arr, action.payload]
            state.arr = addedState
        },
        delExp: (state, action) => {
            const copy = state.arr.filter(e => e.id != action.payload)
            state.arr = copy
        },
        updateExp: (state, action) => {
            const newList = state.arr.map(e => {
                if (e.id === action.payload.id) {
                  return action.payload;
                } else {
                  return e;
                }
              })
            state.arr = newList
        }
    }
})

export const { setExp, addExp, delExp, updateExp }  = expSlice.actions 
export default expSlice.reducer 