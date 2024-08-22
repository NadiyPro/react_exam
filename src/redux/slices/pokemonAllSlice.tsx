import {IPokemonNameUrl} from '../../models/IPokemonPagNameUrl';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    loadAbilitiesDetails,
    loadPokemonAll,
    loadPokemonImage,
    loadStatDetails,
    loadTypeDetails
} from "../reducers/loadAbility";
import {IAbilityDetail} from "../../models/IAbilityDetail";
import {IAbility, IStat, IType} from "../../models/IPokemon";
import {IStatDetail} from "../../models/IStatDetail";
import {ITypeDetail} from "../../models/ITypeDetail";

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
    type:IType[]
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
    type:[]
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
    }
});



export const pokemonAllActions = {
    ...pokemonAllSlice.actions,
    loadPokemonAll,
    loadPokemonImage,
    loadAbilitiesDetails,
    loadStatDetails,
    loadTypeDetails
};