/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISearchState {
  website: string
}

const initialState: ISearchState = {
  website: '',
}

const searchSlice = createSlice({
  name: 'searchState',
  initialState,
  reducers: {
    setSearchedWebsite: (state, action: PayloadAction<string>) => {
      state.website = action.payload
    },
    reset: () => initialState,
  },
})

export const { setSearchedWebsite, reset } = searchSlice.actions

export default searchSlice.reducer
