import { createSlice } from "@reduxjs/toolkit";

export const GeneralSlice = createSlice({
  name: 'general',
  initialState: {
    selectedLocation: null,
    showListStore: false
  },
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setShowListStore: (state, action) => {
      state.showListStore = action.payload;
    }
  }
})

// eslint-disable-next-line react-refresh/only-export-components
export const { setSelectedLocation, setShowListStore } = GeneralSlice.actions

export default GeneralSlice.reducer

