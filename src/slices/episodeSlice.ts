import axios from 'axios';
import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {IEpisode} from '../types/episode'
import { RootState } from "../store";
import transformDataEpisode from '../helpers/transformDataEpisode';

const episodeAdapter = createEntityAdapter<IEpisode>();

const initialState = episodeAdapter.getInitialState({
    loading: 'loading',
    error: undefined || '',
});

export const fetchEpisode = createAsyncThunk<
    IEpisode,
    number,
    { rejectValue: any }
>('episode/fetchEpisode',
    async ( id: number, { rejectWithValue }: any) => {
        try {
            const res = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
            if (res.status === 200) {
                const item = res.data as IEpisode;
                const data = transformDataEpisode(item);
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

const episodeSlice = createSlice({
    name: 'episode',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEpisode.pending, state => { state.loading = 'loading' })
            .addCase(fetchEpisode.fulfilled, (state, action: any) => {
                state.loading = 'success'
                episodeAdapter.addOne(state, action.payload);

            })
            .addCase(fetchEpisode.rejected, (state, action: any) => {
                state.error = action.error.message
            })
            .addDefaultCase(() => { })
    }
});
const { reducer } = episodeSlice;

export default reducer;

export const { selectAll: getEpisode } = episodeAdapter.getSelectors((state: RootState) => state.episode);
