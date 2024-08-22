import axios from "axios";
import {IPokemonNameUrl} from "../models/IPokemonPagNameUrl";
import {IAbility, IForm, IStat, IType} from "../models/IPokemon";
import {IAbilityDetail} from "../models/IAbilityDetail";
import {IStatDetail} from "../models/IStatDetail";
import {ITypeDetail} from "../models/ITypeDetail";
import {IFormDetail} from "../models/IFormDetail";

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
    getAbilities: async (name: string): Promise<IAbility[]> => {
        const response = await axiosInstance.get(`/pokemon/${name}`);
        return response.data.abilities; // Вернем массив объектов Ability
    },
    getAbilitiesDetails: async (names: string[]): Promise<IAbilityDetail[]> => {
        const response = names.map((name) => axiosInstance.get(`/ability/${name}`)
            .then(response => response.data));
        return Promise.all(response);
    },
    getStats: async (name: string) : Promise<IStat[]> => {
        const response = await axiosInstance.get(`/pokemon/${name}`);
        return response.data.stats;
    },
    getStatsDetails: async (names: string[]): Promise<IStatDetail[]> => {
        const response = names.map((name) => axiosInstance.get(`/stat/${name}`)
            .then(response => response.data));
        return Promise.all(response);
    },
    getType: async (name: string) : Promise<IType[]> => {
        const response = await axiosInstance.get(`/pokemon/${name}`);
        console.log(response.data.types)
        return response.data.types;
    },
    getTypeDetails: async (names: string[]): Promise<ITypeDetail[]> => {
        const response = names.map((name) => axiosInstance.get(`/type/${name}`)
            .then(response => response.data));
        return Promise.all(response);
    },
    getForms: async (name: string) : Promise<IForm[]> => {
        const response = await axiosInstance.get(`/pokemon/${name}`);
        console.log(response.data.forms)
        return response.data.forms;
    },
    getFormsDetails: async (names: string[]): Promise<IFormDetail[]> => {
        const response = names.map((name) => axiosInstance.get(`/pokemon-form/${name}`)
            .then(response => response.data));
        return Promise.all(response);
    }



    // getForms: async (name: string) : Promise<Form[]> => {
    //     const response = await axiosInstance.get(`/pokemon-form/${name}`);
    //     return response.data.forms;
    // }
};

export {
    pokemonService
}