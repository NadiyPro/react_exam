import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";
import {Ability} from "../models/IPokemon";
import {IAbilityDetail} from "../models/IAbilityDetail";


const PokemonId = () => {
    const {name} = useParams();
    const images = useAppSelector(state => state.pokemonAllStore.images);
    const abilities = useAppSelector(state => state.pokemonAllStore.ability);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (name){
            dispatch(pokemonAllActions.loadPokemonImage(name));
            dispatch(pokemonAllActions.loadAbilitiesDetails(name));
        }
    }, [dispatch,name]);

    return (
        <div>
            {
                name && (
                    <div key={name}>
                        <div>{name}</div>
                        <img src={images[name]} alt={name}/>
                        <ul>
                                {abilities.map((abilityDetail) => {
                                    console.log(abilityDetail.effect_entries); // Лог данных
                                    return (
                                        <li key={abilityDetail.id}>
                                            <strong>{abilityDetail.name}:</strong>
                                            <ul>
                                                {abilityDetail.effect_entries.map((entry, index) => (
                                                    <li key={index}>{entry.short_effect}</li>
                                                ))}
                                            </ul>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                )}

        </div>
    );
};

export default PokemonId;