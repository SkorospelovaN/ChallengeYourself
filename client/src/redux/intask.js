import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    message: undefined,
    error: undefined
}

export const intaskSlice = createSlice({
    name: 'intask',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.message = undefined
            state.error = undefined
            state.loading = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(intaskThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(intaskThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.message = payload.message
            state.loading = false
        })
        builder.addCase(intaskThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload
            state.loading = false
        })
    }
})

export const intaskThunk = createAsyncThunk("intaskThunk", async (data, { rejectWithValue }) => {
    try {
        const result = await fetch('http://localhost:5000/intask', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const json = await result.json()
        if (result.status === 400) {
            rejectWithValue(json)
        }
        window.location.reload();
        return json
    } catch (error) {
        console.log(error);
        return rejectWithValue("Что-то пошло не так")
    }
})

export const { reset } = intaskSlice.actions

export default intaskSlice.reducer