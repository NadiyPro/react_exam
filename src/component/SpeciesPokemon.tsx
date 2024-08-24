import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";


const SpeciesPokemon = () => {
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
            {evolution.map(value => <div key={value.species.name}>{value.species.name}</div>)}
        </div>
    );
};

export default SpeciesPokemon;