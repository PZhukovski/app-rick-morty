import axios from 'axios';
import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { IChar} from '../types/char';
import transformData from '../helpers/transformDataHero';
import { RootState } from "../store";

const charAdapter = createEntityAdapter<IChar>();

const initialState = charAdapter.getInitialState({
    loading: 'loading',
    error: undefined || '',
});


export const fetchChar = createAsyncThunk<
    IChar,
    number,
    { rejectValue: any }
>('char/fetchChar',
    async ( id: number, { rejectWithValue }: any) => {
        try {
            const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
            if (res.status === 200) {
                const item = res.data as IChar;
                const data = transformData(item);
                return data;
            }
            else if (res.status === 400) {
                return rejectWithValue((res.data) )
            }
        } catch (err : any) {
            if (!err.response) {
              throw err;
            }
        }
    }
);

const charSlice = createSlice({
    name: 'char',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChar.pending, state => { state.loading = 'loading' })
            .addCase(fetchChar.fulfilled, (state, action: any) => {
                state.loading = 'success'
                charAdapter.addOne(state, action.payload);

            })
            .addCase(fetchChar.rejected, (state, action: any) => {
                state.error = action.error.message
            })
            .addDefaultCase(() => { })
    }
});
const { reducer } = charSlice;

export default reducer;


export const { selectAll: getChar } = charAdapter.getSelectors((state: RootState) => state.char);
