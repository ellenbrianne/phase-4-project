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
        }
    }
})

export const { setExp, addExp }  = expSlice.actions 
export default expSlice.reducer 