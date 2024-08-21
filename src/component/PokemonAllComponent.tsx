import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";
import {loadPokemonAll, loadPokemonImages} from "../redux/reducers/loadAbility";
import {useNavigate} from "react-router-dom";
import {baseURL} from "../service/api.service";

const PokemonAllComponent= () => {
    const navigate = useNavigate();
    const pokemon = useAppSelector(state => state.pokemonAllStore.pokemon);
    const offset = useAppSelector(state => state.pokemonAllStore.offset);
    const limit = useAppSelector(state => state.pokemonAllStore.limit);
    const dispatch = useAppDispatch();

    const pokemonImages = useAppSelector(state => state.pokemonAllStore.pokemonImages);

    useEffect(() => {
        dispatch(pokemonAllActions.loadPokemonAll({offset, limit}))
    }, [dispatch, offset, limit]);

    useEffect(() => {
        const axiosPokemonData = async () => {
            await dispatch(loadPokemonAll({ offset, limit }));
            dispatch(loadPokemonImages(pokemon));
        };

        axiosPokemonData();
    }, [dispatch, offset, limit, pokemon]);

    const nextPage = () => {
        dispatch(pokemonAllActions.setOffset(offset + limit));
    };

    const prevPage = () => {
        if (offset > 0) {
            dispatch(pokemonAllActions.setOffset(offset - limit));
        }
    };


    return (
        <div>

            {pokemon.map(poke => (
                <div key={poke.name}>
                    {poke.name}
                    <br />
                    {pokemonImages[poke.name] && (
                        <img src={pokemonImages[poke.name]} alt={poke.name} onClick={() => navigate(baseURL + `/pokemon-form/${poke.name}/`)}/>
                    )}
                </div>))
            }

            <button onClick={prevPage} disabled={offset === 0}>
                Prev
            </button>
            <button onClick={nextPage}>
                Next
            </button>
        </div>
    );
};

export default PokemonAllComponent;