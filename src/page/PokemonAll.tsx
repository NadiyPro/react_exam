import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {useNavigate} from "react-router-dom";
import '../module/global.css';
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";

const PokemonAll= () => {
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
            if (!images[value.name]) { /**!images value.name перевіряємо чи завантажено вже зображення для цього покемона, щоб не завантажити дубль малюнку**/
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
        <div className={'div_PokemonAll'}>
            <div>
                <h3>Pokemon all</h3>
            </div>
            <div className={'div_inner_PokemonAll'}>
                {pokemon.map(value => (
                    <div className={'div_img'} key={value.name}>
                        <div><h5>{value.name}</h5></div>
                        <img src={images[value.name]} alt={'img'} onClick={() => navigate(`pokemon/${value.name}`)}/>
                    </div>
                ))}
            </div>
            <div className={'div_button'}>
                <button onClick={prevPage} disabled={offset === 0}>
                    Prev
                </button>
                <button onClick={nextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default PokemonAll;