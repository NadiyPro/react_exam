import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {pokemonService} from "../../service/api.service";
import React from "react";
import {pokemonAllActions} from "../slices/pokemonAllSlice";

const loadPokemonAll = createAsyncThunk(
    'pokemonAllSlice',
    async  ({ offset, limit }: { offset: number; limit: number }, thunkAPI) => {
        try {
            let response = await pokemonService.getAll(offset,limit);
            return thunkAPI.fulfillWithValue(response);
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

const loadPokemonImage = createAsyncThunk(
    'pokemonImageSlice',
    async (name: string, thunkAPI) => {
        try {
            let response = await pokemonService.getPokemonImage(name);
            return thunkAPI.fulfillWithValue({ name, imageUrl: response });
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

// const loadAbilities = createAsyncThunk(
//     'pokemonAbilitiesSlice' ,
// async(name: string, thunkAPI)=>{
//     try {
//         let response = await pokemonService.getAbilities(name)
//         return response;
//     } catch (e) {
//         let error = e as AxiosError;
//         return thunkAPI.rejectWithValue(error?.response?.data);
//     }
// }
// )
const loadAbilitiesDetails = createAsyncThunk(
    'pokemonAbilitiesSlice',
    async (name: string, thunkAPI) => {
        try {
            let abilities = await pokemonService.getAbilities(name);

            let abilitiesNames = abilities.map(ability => ability.ability.name);

            let abilitiesDetails = await pokemonService.getAbilitiesDetails(abilitiesNames);
console.log(thunkAPI.fulfillWithValue(abilitiesDetails))
            return  thunkAPI.fulfillWithValue({abilitiesDetails, abilities});
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

export {
    loadPokemonAll,
    loadPokemonImage,
    loadAbilitiesDetails
};