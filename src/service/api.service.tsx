import axios from "axios";
import {IPokemonNameUrl} from "../models/IPokemonPagNameUrl";
import {IAbilities} from "../models/IAbilities";

export const baseURL = 'https://pokeapi.co/api/v2';

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {}
});

const pokemonService = {
    getAll: async (offset:number, limit: number):Promise<IPokemonNameUrl[]> => {
        const response = await axiosInstance.get(baseURL + `/pokemon/?offset=${offset}&limit=${limit}`);
        return response.data.results;
    },
    getPokemonImage: async (name: string): Promise<string> => {
        const response = await axiosInstance.get(`/pokemon/${name}`);
        return response.data.sprites.front_default;
    },
    getAbilities: async (name: string): Promise<IAbilities[]> => {
        const response = await axiosInstance.get(`/pokemon/${name}`);
        return response.data.abilities;
    },
    getStats: async (name: string) : Promise<string> => {
        const response = await axiosInstance.get(`/stat/${name}`);
        return response.data.stats;
    },
    getType: async (name: string) : Promise<string> => {
        const response = await axiosInstance.get(`/type/${name}`);
        return response.data.type;
    },
    getForms: async (name: string) : Promise<string> => {
        const response = await axiosInstance.get(`/pokemon-form/${name}`);
        return response.data.forms;
    }
};

export {
    pokemonService
}