import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    token: localStorage.getItem('token'),
    role: localStorage.getItem("role"),
    id: localStorage.getItem("id"),
    fio: localStorage.getItem("fio"),
    login: localStorage.getItem("login"),
    phone: localStorage.getItem("phone"),
    done: localStorage.getItem("done"),
    error: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.error = undefined
            state.loading = true
            state.fio = undefined
            state.id = undefined
            state.login = undefined
            state.phone = undefined
            state.role = undefined
            state.token = undefined
            state.done = undefined

            localStorage.removeItem("token")
            localStorage.removeItem("fio")
            localStorage.removeItem("login")
            localStorage.removeItem("phone")
            localStorage.removeItem("role")
            localStorage.removeItem("id")
            localStorage.removeItem("done")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            const payload = action.payload
            state.token = payload.token
            state.fio = payload.user.fio
            state.login = payload.user.login
            state.phone = payload.user.phone
            state.role = payload.user.role
            state.id = payload.user.id
            state.done = payload.user.done

            localStorage.setItem("token", payload.token)
            localStorage.setItem("fio", payload.user.fio)
            localStorage.setItem("login", payload.user.login)
            localStorage.setItem("phone", payload.user.phone)
            localStorage.setItem("role", payload.user.role)
            localStorage.setItem("id", payload.user.id)
            localStorage.setItem("done", payload.user.done)

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

export const loginThunk = createAsyncThunk("logThunk", async (data, { rejectWithValue }) => {
    const { login, password } = data

    try {
        const result = await fetch('http://localhost:5000/auth', {
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
        return json
        
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})

export const updateuserThunk = createAsyncThunk("updateuserThunk", async (data, { rejectWithValue }) => {
    const { id } = data

    try {
        const result = await fetch('http://localhost:5000/updateuser', {
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

export const { logOut } = authSlice.actions

export default authSlice.reducer