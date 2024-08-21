import axios from "axios";
import {IAbilityAll} from "../models/IAbilityAll";

export const baseURL = 'https://pokeapi.co/api/v2/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {}
});

export const pokemonService = {
    getAll: async (offset:number, limit: number):Promise<IAbilityAll[]> => {
        const response = await axiosInstance.get(baseURL + `ability?offset=${offset}&limit=${limit}`);
        return response.data;
    }
}