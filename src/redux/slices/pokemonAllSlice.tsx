import {IPokemonNameUrl} from '../../models/IPokemonPagNameUrl';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import  {loadPokemonImages, loadPokemonAll} from "../reducers/loadAbility";
interface PokemonAllState {
    pokemon: IPokemonNameUrl[];
    error: string | null;
    offset: number;
    limit: number;
    pokemonImages: { [key: string]: string };
}

const initialState: PokemonAllState = {
    pokemon: [],
    error: null,
    offset: 0,
    limit: 20,
    pokemonImages: {}
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
            .addCase(loadPokemonImages.fulfilled, (state, action) => {
                state.pokemonImages = action.payload;
            });
    }
});



export const pokemonAllActions = {
    ...pokemonAllSlice.actions,
    loadPokemonAll,
    loadPokemonImages
};