import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";
import {useNavigate} from "react-router-dom";
import '../module/global.css';

const PokemonAllComponent= () => {
    const navigate = useNavigate();
    const pokemon = useAppSelector(state => state.pokemonAllStore.pokemon);
    const images = useAppSelector(state => state.pokemonAllStore.images);
    const offset = useAppSelector(state => state.pokemonAllStore.offset);
    const limit = useAppSelector(state => state.pokemonAllStore.limit);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(pokemonAllActions.loadPokemonAll({ offset, limit }));
    }, [dispatch, offset, limit]);

    useEffect(() => {
        pokemon.forEach(value => {
            if (!images[value.name]) { /**!images[value.name] перевіряємо чи завантажено вже зображення для цього покемона, щоб не завантажити дубль малюнку**/
                dispatch(pokemonAllActions.loadPokemonImage(value.name));
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
            <h5>Pokemon</h5>
            {pokemon.map(value => (
                <div key={value.name}>
                    <div>{value.name}</div>
                    <img src={images[value.name]} alt={value.name} onClick={() => navigate(`pokemon/${value.name}`)}/>
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