import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchArtwork = createAsyncThunk("artwork/fetchArtwork", () => {
    return fetch("/artworks")
    .then(r => r.json())
    .then(artworks => artworks)
})

const initialState = {
    entities: [],
    status: "idle"
}

const artworkSlice = createSlice({
    name: 'artwork',
    initialState,
    reducers: {
        noUser: (state) => {
            Object.assign(state, initialState)
        }
    },
    extraReducers:
    (builder) => {
        builder
        .addCase(fetchArtwork.pending, (state) => {
            state.status = "loading"
        })
        .addCase(fetchArtwork.fulfilled, (state, action) => {
            state.entities = action.payload
            state.status = "idle"
        })
        // [fetchArtwork.pending](state) {
        //     state.status = "loading"
        // },
        // [fetchArtwork.fulfilled](state, action) {
        //     state.entities = action.payload
        //     state.status = "idle"
        // }
    }
})
export const {noUser} = artworkSlice.actions
export default artworkSlice.reducer