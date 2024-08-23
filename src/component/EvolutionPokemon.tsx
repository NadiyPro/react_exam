import React, {useEffect} from 'react';
import '../module/global.css';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";

const EvolutionPokemon = () => {

    const {id} = useParams();
    const evolution = useAppSelector(state => state.pokemonAllStore.evolution);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id){
            dispatch(pokemonAllActions.loadEvolutionDetails(+id));
        }
    }, [dispatch,id]);

    return (
        <div>
            {evolution.map(v => v.evolves_to)}

        </div>
    );
};
export default EvolutionPokemon;
