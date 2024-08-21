import axios from "axios";
import {IAbilityNameUrl} from "../models/IAbilityAll";

export const baseURL = 'https://pokeapi.co/api/v2/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {}
});

const pokemonService = {
    getAll: async (offset:number, limit: number):Promise<IAbilityNameUrl[]> => {
        const response = await axiosInstance.get(baseURL + `ability?offset=${offset}&limit=${limit}`);
        return response.data.results;
    }
};

export {
    pokemonService
}