import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {pokemonService} from "../../service/api.service";
import {IPokemonNameUrl} from "../../models/IPokemonPagNameUrl";


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

const loadPokemonOne = createAsyncThunk(
    'pokemonOneSlice',
    async  (name: string, thunkAPI) => {
        try {
            let response = await pokemonService.getPokemon(name);
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
const loadAbilitiesDetails = createAsyncThunk(
    'pokemonAbilitiesSlice',
    async (name: string, thunkAPI) => {
        try {
            let abilities = await pokemonService.getAbilities(name);
            let abilitiesNames = abilities.map(ability => ability.ability.name);
            let abilitiesDetails = await pokemonService.getAbilitiesDetails(abilitiesNames);

            return  thunkAPI.fulfillWithValue({abilitiesDetails, abilities});
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

const loadStatDetails = createAsyncThunk(
    'pokemonStatSlice',
    async (name: string, thunkAPI) => {
        try {
            let stat = await pokemonService.getStats(name);
            let statNames = stat.map(value => value.stat.name);
            let statDetails = await pokemonService.getStatsDetails(statNames);

            return  thunkAPI.fulfillWithValue({statDetails, stat});
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

const loadTypeDetails = createAsyncThunk(
    'pokemonTypeSlice',
    async (name: string, thunkAPI) => {
        try {
            let type = await pokemonService.getType(name);
            let typeNames = type.map(value => value.type.name);
            let typeDetails = await pokemonService.getTypeDetails(typeNames);

            return  thunkAPI.fulfillWithValue({typeDetails, type});
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

const loadFormDetails = createAsyncThunk(
    'pokemonFormSlice',
    async (name: string, thunkAPI) => {
        try {
            let form = await pokemonService.getForms(name);
            let formNames = form.map(value => value.name);
            let formDetails = await pokemonService.getFormsDetails(formNames);

            return  thunkAPI.fulfillWithValue({formDetails, form});
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);
const loadSpecies = createAsyncThunk(
    'pokemonSpecies',
    async  (name: string, thunkAPI) => {
        try {
            let species = await pokemonService.getSpecies(name);
            let speciesUrl = species.evolution_chain.url.split('/').filter(Boolean);
            let getSpeciesUrlId =  speciesUrl[speciesUrl.length - 1];

            return thunkAPI.fulfillWithValue(getSpeciesUrlId);
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

const loadEvolutionDetails = createAsyncThunk(
    'pokemonEvolutionSlice',
    async (id: number, thunkAPI) => {
        try {
            let evolution = await pokemonService.getEvolution(id);
            let evolutionSpeciesName = evolution.species.name;
            let evolutionEvolves_toSpeciesName = evolution && (evolution.evolves_to.map(value => value.species.name));
            let evolutionEvolves_toEvolves_toSpeciesName = evolution && (evolution.evolves_to.map(value => value.evolves_to.map(item => item.species.name)))

            return  thunkAPI.fulfillWithValue({evolutionSpeciesName,evolutionEvolves_toSpeciesName,evolutionEvolves_toEvolves_toSpeciesName});
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);
const loadAllPokemonSearch = createAsyncThunk(
    'pokemonAll',
    async  (_, thunkAPI) => {
        try {
            let allPokemon:IPokemonNameUrl[] = [];
            let offset = 0;
            const limit = 1000;

            while (true) {
                const response = await pokemonService.getAll(offset, limit);
                allPokemon = [...allPokemon, ...response];

                if (response.length < limit) {
                    break;
                }

                offset += limit;
            }

            return thunkAPI.fulfillWithValue(allPokemon);
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

const loadAbilitySearch = createAsyncThunk(
    'pokemonAbilitiesSearch',
    async ( ability: string, thunkAPI) => {
        try {
            let response = await pokemonService.getAbilitySearch(ability);
            return thunkAPI.fulfillWithValue(response);
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

export {
    loadPokemonAll,
    loadPokemonOne,
    loadPokemonImage,
    loadAbilitiesDetails,
    loadStatDetails,
    loadTypeDetails,
    loadFormDetails,
    loadSpecies,
    loadEvolutionDetails,
    loadAllPokemonSearch,
    loadAbilitySearch
};