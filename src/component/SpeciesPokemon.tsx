import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";


const SpeciesPokemon = () => {
    const {id} = useParams();
    const evolution = useAppSelector(state => state.pokemonAllStore.evolution);
    const images = useAppSelector(state => state.pokemonAllStore.images);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id){
            dispatch(pokemonAllActions.loadEvolutionDetails(+id));
        }
    }, [dispatch,id]);

    useEffect(() => {
        evolution.forEach(value => {
            if (!images[value.species.name]) { /**!images value.name перевіряємо чи завантажено вже зображення для цього покемона, щоб не завантажити дубль малюнку**/
            dispatch(pokemonAllActions.loadPokemonImage(value.species.name));
            }
        });
    }, [images, dispatch]);

    return (
        <div>
            {evolution.map(value =>
                <div key={value.species.name}>
                    pokemon name: {value.species.name}
                    <img src={images[value.species.name]} alt={value.species.name}/>
                </div>)}
        </div>
    );
};

export default SpeciesPokemon;