import axios from 'axios';
import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IChar } from '../types/char';
import transformData from '../helpers/transformDataHero';
import getArray from '../helpers/getHeroesArray';

const heroesAdapter = createEntityAdapter<IChar>();

const initialState = heroesAdapter.getInitialState({
    loading: 'loading',
    limit: 12,
    error: undefined || ''
});

export const fetchHeroes = createAsyncThunk<
    IChar
>('heroes/fetchHeroes',
    async () => {
        const arr = getArray();
        try {
            const res = await axios.get(`https://rickandmortyapi.com/api/character/${arr}`);
            const items = res.data;
            const data = items.map((item: IChar) => {
                return transformData(item);
            })
            return data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
        }
    }
);

const heroesSlice = createSlice({

    name: 'heroes',
    initialState,
    reducers: {
        viewHeroesChanged: (state) => {
            state.limit += 12
        },
        getDeleteHero: (state, action: any) => {
            heroesAdapter.removeOne(state, action.payload)
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => { state.loading = 'loading' })
            .addCase(fetchHeroes.fulfilled, (state, action: any) => {
                state.loading = 'success'
                heroesAdapter.addMany(state, action.payload);

            })
            .addCase(fetchHeroes.rejected, (state, action: any) => {
                state.error = action.error.message
            })
            .addDefaultCase(() => { })
    }
});
const { actions, reducer } = heroesSlice;

export default reducer;

export const { selectAll: allHeroes } = heroesAdapter.getSelectors((state: RootState) => state.heroes);

export const {
    viewHeroesChanged,
    getDeleteHero
} = actions;


export const getViewHeroes = createSelector(
    allHeroes,
    (state: RootState) => state.heroes.limit,
    (heroes, count) => {
        return [...heroes].slice(0, count)
    }
)


