import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        displayIsVisible: true
    },
    reducers: {
        toggleDisplay(state){
            state.displayIsVisible = !state.displayIsVisible;
        }
    }
})

export const uiActions = uiSlice.actions;

export default uiSlice;