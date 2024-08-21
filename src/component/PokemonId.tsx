import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";

const PokemonId = () => {
    const {name} = useParams();
    const pokemon = useAppSelector(state => state.pokemonAllStore.pokemon);
    const images = useAppSelector(state => state.pokemonAllStore.images);
    const ability = useAppSelector(state => state.pokemonAllStore.ability);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (name){
            const imag = dispatch(pokemonAllActions.loadPokemonImage(name));
            const ability = dispatch(pokemonAllActions.loadAbilities(name));
        }
    }, [dispatch]);


    return (
        <div>

            {
                pokemon.map(value => (
                <div key={value.name}>
                    <div>{value.name}</div>
                    <img src={images[value.name]} alt={value.name}/>
                </div>
            ))
            }


            {
                ability.map(value => (
                    <div key={value.id}>
                        {value.id} {value.name}
                    </div>
                ))
            }
        </div>
    );
};

export default PokemonId;