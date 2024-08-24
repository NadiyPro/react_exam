import {IPokemonNameUrl} from '../../models/IPokemonPagNameUrl';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    loadAbilitiesDetails, loadFormDetails,
    loadPokemonAll,
    loadPokemonImage, loadPokemonOne, loadSpecies,
    loadStatDetails,
    loadTypeDetails
} from "../reducers/loadAbility";
import {IAbilityDetail} from "../../models/IAbilityDetail";
import {IAbility, IForm, IPokemon, IStat, IType} from "../../models/IPokemon";
import {IStatDetail} from "../../models/IStatDetail";
import {ITypeDetail} from "../../models/ITypeDetail";
import {IFormDetail} from "../../models/IFormDetail";
import {EvolvesTo} from "../../models/IEvolution";
import {ISpecies} from "../../models/ISpecies";

interface PokemonAllState {
    pokemon: IPokemonNameUrl[];
    images: { [key: string]: string };
    abilitiesDetails: IAbilityDetail[];
    error: string | null;
    offset: number;
    limit: number;
    abilities: IAbility[];
    statDetails: IStatDetail[];
    stat: IStat[],
    typeDetails: ITypeDetail[];
    type:IType[];
    formDetails:IFormDetail[];
    form:IForm[];
    pokemonOne:IPokemon | null;
    species:ISpecies | null | string;
    evolution: EvolvesTo[];
}

const initialState: PokemonAllState = {
    pokemon: [],
    images: {},
    abilitiesDetails: [],
    error: null,
    offset: 0,
    limit: 20,
    abilities: [],
    statDetails:[],
    stat:[],
    typeDetails:[],
    type:[],
    formDetails:[],
    form:[],
    pokemonOne: null,
    species:null,
    evolution:[]
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
            .addCase(
                loadPokemonOne.fulfilled, (state, action) => {
                    state.pokemonOne = action.payload;
                }
            )
            .addCase(loadPokemonImage.fulfilled, (state, action) => {
                const { name, imageUrl } = action.payload as { name: string; imageUrl: string };
                state.images[name] = imageUrl;
            })
            .addCase(
                loadAbilitiesDetails.fulfilled, (state, action) => {
                    const {abilitiesDetails, abilities} = action.payload as { abilitiesDetails: IAbilityDetail[]; abilities: IAbility[] };
                    state.abilitiesDetails = abilitiesDetails;
                    state.abilities = abilities;
                }
            )
            .addCase(
                loadStatDetails.fulfilled, (state, action) => {
                    const {statDetails, stat} = action.payload as { statDetails: IStatDetail[]; stat: IStat[] };
                    state.statDetails = statDetails;
                    state.stat = stat;
                }
            )
            .addCase(
                loadTypeDetails.fulfilled, (state, action) => {
                    const {typeDetails, type} = action.payload as { typeDetails: ITypeDetail[]; type: IType[] };
                    state.typeDetails = typeDetails;
                    state.type = type;
                }
            )
            .addCase(
                loadFormDetails.fulfilled, (state, action) => {
                    const {formDetails, form} = action.payload as { formDetails: IFormDetail[]; form: IForm[] };
                    state.formDetails = formDetails;
                    state.form = form;
                }
            )
            .addCase(
                loadSpecies.fulfilled, (state, action) => {
                    state.species = action.payload;
                }
            )
            // .addCase(
            //     loadEvolutionDetails.fulfilled, (state, action) => {
            //         state.evolution = action.payload;
            //     }
            // )
    }
});



export const pokemonAllActions = {
    ...pokemonAllSlice.actions,
    loadPokemonAll,
    loadPokemonOne,
    loadPokemonImage,
    loadAbilitiesDetails,
    loadStatDetails,
    loadTypeDetails,
    loadFormDetails,
    loadSpecies
};