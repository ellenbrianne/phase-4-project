import { createSlice } from '@reduxjs/toolkit';

const expSlice = createSlice({
    name: "exp",
    initialState: {
        value: []
    },
    reducers: {
        addExp: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        delExp: (state, action) => {
            state.value = state.value.filter(e => (
                e.id != action.payload.id
            ))
        },
        updateExp: (state, action) => {
            state.value = exp.map(e => {
                if (action.payload.id === e.id) {
                    return action.payload
                } else {
                    return e
                }
            })
        }
    }
})

export const { addExp, delExp, updateExp }  = expSlice.actions 
export default expSlice.reducer 