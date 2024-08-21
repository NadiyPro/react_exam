import {IPokemonNameUrl} from '../../models/IPokemonPagNameUrl';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import loadPokemonAll from "../reducers/loadAbility";
interface PokemonAllState {
    pokemon: IPokemonNameUrl[];
    error: string | null;
    offset: number;
    limit: number;
}

const initialState: PokemonAllState = {
    pokemon: [],
    error: null,
    offset: 0,
    limit: 20,
};

export const pokemonAllSlice = createSlice({
    name: 'pokemonAllSlice',
    initialState: initialState,
    reducers:{
       setOffset:(state, action:PayloadAction<number>)=>{
            state.offset = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                loadPokemonAll.fulfilled, (state, action) => {
                    state.pokemon = action.payload;
                }
            )
    }
});



export const pokemonAllActions = {
    ...pokemonAllSlice.actions,
    loadPokemonAll
};