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

            {/*{*/}
            {/*    ability.map(value => <div>*/}
            {/*        {value.name}*/}
            {/*    </div>)*/}
            {/*}*/}


        </div>
    );
};

export default PokemonId;