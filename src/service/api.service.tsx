import axios from "axios";
import {IPokemonNameUrl} from "../models/IPokemonPagNameUrl";
import {Ability} from "../models/IPokemon";
import {IAbilityDetail} from "../models/IAbilityDetail";

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
    getAbilities: async (name: string): Promise<Ability[]> => {
        const response = await axiosInstance.get(`/pokemon/${name}`);
        console.log(response.data.abilities)
        return response.data.abilities; // Вернем массив объектов Ability
    },
    getAbilitiesDetails: async (names: string[]): Promise<IAbilityDetail[]> => {
        const promises = names.map((name) => axiosInstance.get(`/ability/${name}`)
            .then(response => response.data));
        return Promise.all(promises);
    }

    // getAbilitiesAll: async (name: string): Promise<IAbilityDetail[]> => {
    //     const response = await axiosInstance.get(`/ability/${name}`);
    //     return response.data
    // },


    // getStats: async (name: string) : Promise<Stat[]> => {
    //     const response = await axiosInstance.get(`/stat/${name}`);
    //     return response.data.stats;
    // },
    // getType: async (name: string) : Promise<Type[]> => {
    //     const response = await axiosInstance.get(`/type/${name}`);
    //     return response.data.type;
    // },
    // getForms: async (name: string) : Promise<Form[]> => {
    //     const response = await axiosInstance.get(`/pokemon-form/${name}`);
    //     return response.data.forms;
    // }
};

export {
    pokemonService
}