import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";


const SpeciesPokemon = () => {
    const {name} = useParams();
    const species = useAppSelector(state => state.pokemonAllStore.species);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (name){
            dispatch(pokemonAllActions.loadSpeciesDetails(name));
        }
    }, [dispatch,name]);

    return (
        <div>
            
        </div>
    );
};

export default SpeciesPokemon;