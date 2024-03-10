import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    message: undefined,
    error: undefined
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.message = undefined
            state.error = undefined
            state.loading = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(taskThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(taskThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.message = payload.message
            state.loading = false
        })
        builder.addCase(taskThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload
            state.loading = false
        })
    }
})

export const taskThunk = createAsyncThunk("taskThunk", async (data, { rejectWithValue }) => {
    try {
        const result = await fetch('http://localhost:5000/addnew', {
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
        return json
    } catch (error) {
        console.log(error);
        return rejectWithValue("Что-то пошло не так")
    }
})

export const { reset } = taskSlice.actions

export default taskSlice.reducer