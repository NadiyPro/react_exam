import {IPokemonNameUrl} from '../../models/IPokemonPagNameUrl';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadAbilitiesDetails, loadPokemonAll, loadPokemonImage} from "../reducers/loadAbility";
import {IAbilityDetail} from "../../models/IAbilityDetail";
interface PokemonAllState {
    pokemon: IPokemonNameUrl[];
    images: { [key: string]: string };
    ability: IAbilityDetail[];
    error: string | null;
    offset: number;
    limit: number;
}

const initialState: PokemonAllState = {
    pokemon: [],
    images: {},
    ability: [],
    error: null,
    offset: 0,
    limit: 20
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
            .addCase(loadPokemonImage.fulfilled, (state, action) => {
                const { name, imageUrl } = action.payload as { name: string; imageUrl: string };
                state.images[name] = imageUrl;
            })
            .addCase(
                loadAbilitiesDetails.fulfilled, (state, action) => {
                    state.ability = action.payload;
                }
            )
    }
});



export const pokemonAllActions = {
    ...pokemonAllSlice.actions,
    loadPokemonAll,
    loadPokemonImage,
    loadAbilitiesDetails
};