import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        value: null
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload 
        },
        delUser: (state) => {
            state.value = null
        }
    }
})

export const { setUser, delUser }  = userSlice.actions 
export default userSlice.reducer 