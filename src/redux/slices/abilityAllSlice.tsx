import { IAbilityAll } from '../../models/IAbilityAll';
import {createSlice} from "@reduxjs/toolkit";
import loadAbility from "../reducers/loadAbility";
interface AbilityState {
    abilities: IAbilityAll[];
    isLoaded: boolean,
    error: string | null;
    offset: number;
    limit: number;
}

const initialState: AbilityState = {
    abilities: [],
    isLoaded: false,
    error: null,
    offset: 0,
    limit: 20,
};

export const abilityAllSlice = createSlice({
    name: 'abilityAllSlice',
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(
                loadAbility.fulfilled, (state, action) => {
                    state.abilities = action.payload;
                    state.isLoaded = true;
                }
            )
    }
});
export const abilityActions = {
    ...abilityAllSlice.actions,
    loadAbility
};