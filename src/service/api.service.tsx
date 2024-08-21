import axios from "axios";
import {IPokemonNameUrl} from "../models/IPokemonPagNameUrl";

export const baseURL = 'https://pokeapi.co/api/v2/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {}
});

const pokemonService = {
    getAll: async (offset:number, limit: number):Promise<IPokemonNameUrl[]> => {
        const response = await axiosInstance.get(baseURL + `pokemon/?offset=${offset}&limit=${limit}`);
        return response.data.results;
    }
};

export {
    pokemonService
}