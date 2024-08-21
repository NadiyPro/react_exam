import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";

const PokemonAllComponent= () => {
    // const navigate = useNavigate();
    const pokemon = useAppSelector(state => state.pokemonAllStore.pokemon);
    const images = useAppSelector(state => state.pokemonAllStore.images);
    const offset = useAppSelector(state => state.pokemonAllStore.offset);
    const limit = useAppSelector(state => state.pokemonAllStore.limit);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(pokemonAllActions.loadPokemonAll({ offset, limit }));
    }, [dispatch, offset, limit]);

    useEffect(() => {
        pokemon.forEach(poke => {
            if (!images[poke.name]) { // Только если изображение ещё не загружено
                dispatch(pokemonAllActions.loadPokemonImage(poke.name));
            }
        });
    }, [pokemon, images, dispatch]);

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
                    <div>{poke.name}</div>
                    <img src={images[poke.name]} alt={poke.name} />
                </div>
            ))}

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