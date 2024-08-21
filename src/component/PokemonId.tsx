import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";

const PokemonId = () => {
    const {name} = useParams();
    const images = useAppSelector(state => state.pokemonAllStore.images);
    const ability = useAppSelector(state => state.pokemonAllStore.ability);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (name){
            dispatch(pokemonAllActions.loadPokemonImage(name));
            dispatch(pokemonAllActions.loadAbilities(name));
        }
    }, [dispatch,name]);


    return (
        <div>
            {name && (
                <div key={name}>
                    <div>{name}</div>
                    <img src={images[name]} alt={name} />
                </div>
            )}

            {/*{<div key={name}>*/}
            {/*    <div>{name}</div>*/}
            {/*    <img src={images[name]} alt={name}/>*/}
            {/*</div>}*/}

            {/*{ability.map((value) => (*/}
            {/*    <div key={value.id}>*/}
            {/*        <div>Ability: {value.name}</div>*/}
            {/*        <div>Effect: {value.effect_entries.map(entry => entry.short_effect).join(', ')}</div>*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    );
};

export default PokemonId;