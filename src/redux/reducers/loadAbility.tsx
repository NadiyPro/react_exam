import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {pokemonService} from "../../service/api.service";

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

const loadPokemonImages = createAsyncThunk(
    'pokemonAllSliceImag',
    async (pokemon: Array<{ name: string, url: string }>) => {
        const getPokemonIdFromUrl = (url: string) => {
            const segments = url.split('/').filter(Boolean);
            return segments[segments.length - 1];
        };

        const images = await Promise.all(
            pokemon.map(async (poke) => {
                const pokemonId = getPokemonIdFromUrl(poke.url);
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                return { name: poke.name, imageUrl: response.data.sprites.front_default };
            })
        );

        return images.reduce((acc, { name, imageUrl }) => {
            acc[name] = imageUrl;
            return acc;
        }, {} as { [key: string]: string });
    }
);

export {
    loadPokemonAll,
    loadPokemonImages
};