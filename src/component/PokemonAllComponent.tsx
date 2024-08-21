import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";
import loadPokemonAll from "../redux/reducers/loadAbility";

const PokemonAllComponent= () => {
    const pokemon = useAppSelector(state => state.pokemonAllStore.pokemon);
    const offset = useAppSelector(state => state.pokemonAllStore.offset);
    const limit = useAppSelector(state => state.pokemonAllStore.limit);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(pokemonAllActions.loadPokemonAll({offset, limit}))
    }, [dispatch, offset, limit]);

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

                {pokemon.map(pokemon => <div>
                    {pokemon.name}
                    </div>

                )}

            {/* Кнопки для переключения страниц */}
            <button onClick={prevPage} disabled={offset === 0}>
                Previous
            </button>
            <button onClick={nextPage}>
                Next
            </button>
        </div>
    );
};

export default PokemonAllComponent;