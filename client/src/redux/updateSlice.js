import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    id: localStorage.getItem("task_id"),
    error: undefined
}

export const updateSlice = createSlice({
    name: 'update',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(updateThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateThunk.fulfilled, (state, action) => {
            const payload = action.payload
            state.id = payload.id

            localStorage.setItem("task_id", payload.id)

            state.error = undefined
            state.loading = false
        })
        builder.addCase(loginThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload.message
            state.loading = false
        })
    }
})

export const updateThunk = createAsyncThunk("updateThunk", async (data, { rejectWithValue }) => {
    const { id } = data

    try {
        const result = await fetch('http://localhost:5000/updatestatus', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const json = await result.json()
        if (result.status === 400) {
            return rejectWithValue(json)
        }
        window.location.reload();
        return json
        
        
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})

export const deleteThunk = createAsyncThunk("deleteThunk", async (data, { rejectWithValue }) => {
    const { id } = data

    try {
        const result = await fetch('http://localhost:5000/deletetask', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const json = await result.json()
        if (result.status === 400) {
            return rejectWithValue(json)
        }
        window.location.reload();
        return json
        
        
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})

export const finishThunk = createAsyncThunk("finishThunk", async (data, { rejectWithValue }) => {
    const { id } = data

    try {
        const result = await fetch('http://localhost:5000/finishtask', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const json = await result.json()
        if (result.status === 400) {
            return rejectWithValue(json)
        }
        window.location.reload();
        return json
        
        
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})

export default updateSlice.reducer