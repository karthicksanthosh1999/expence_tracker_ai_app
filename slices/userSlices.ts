import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserState {
    id: string | null;
    name: string | null;
    email: string | null;
    image: string | null;
}

const initialState: IUserState = {
    id: null,
    name: null,
    email: null,
    image: null,
};
const userSlices = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUserState>) {
            return { ...state, ...action.payload }
        },
        clearUser() {
            return initialState
        }
    }
})

export const { clearUser, setUser } = userSlices.actions;
export default userSlices.reducer