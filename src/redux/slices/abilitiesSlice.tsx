import {IAbilityNameUrl} from '../../models/IAbilityAll';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import loadAbility from "../reducers/loadAbility";
interface AbilityState {
    abilities: IAbilityNameUrl[];
    error: string | null;
    offset: number;
    limit: number;
}

const initialState: AbilityState = {
    abilities: [],
    error: null,
    offset: 0,
    limit: 20,
};

export const abilitiesSlice = createSlice({
    name: 'abilitiesSlice',
    initialState: initialState,
    reducers:{
       setOffset:(state, action:PayloadAction<number>)=>{
            state.offset = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                loadAbility.fulfilled, (state, action) => {
                    state.abilities = action.payload;
                }
            )
    }
});



export const abilityActions = {
    ...abilitiesSlice.actions,
    loadAbility
};