import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";
import axios from "axios";

const PokemonAllComponent= () => {
    const pokemon = useAppSelector(state => state.pokemonAllStore.pokemon);
    const offset = useAppSelector(state => state.pokemonAllStore.offset);
    const limit = useAppSelector(state => state.pokemonAllStore.limit);
    const dispatch = useAppDispatch();

    const [pokemonImages, setPokemonImages] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        dispatch(pokemonAllActions.loadPokemonAll({offset, limit}))
    }, [dispatch, offset, limit]);

    useEffect(() => {
        const fetchImages = async () => {
            const images = await Promise.all(
                pokemon.map(async (poke) => {
                    const pokemonId = getPokemonIdFromUrl(poke.url);
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                    return { name: poke.name, imageUrl: response.data.sprites.front_default };
                })
            );

            const imageMap = images.reduce((acc, { name, imageUrl }) => {
                acc[name] = imageUrl;
                return acc;
            }, {} as { [key: string]: string });

            setPokemonImages(imageMap);
        };

        fetchImages();
    }, [pokemon]);

    const nextPage = () => {
        dispatch(pokemonAllActions.setOffset(offset + limit));
    };

    const prevPage = () => {
        if (offset > 0) {
            dispatch(pokemonAllActions.setOffset(offset - limit));
        }
    };
    const getPokemonIdFromUrl = (url: string) => {
        const segments = url.split('/').filter(Boolean);
        return segments[segments.length - 1];
    };


    const fetchPokemonImage = async (url: string) => {
        const pokemonId = getPokemonIdFromUrl(url);
        const response = await axios.get(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`);
        return response.data.sprites.front_default;
    };

    return (
        <div>
            {pokemon.map(poke => (
                <div key={poke.name}>
                    {poke.name}
                    <br />
                    {pokemonImages[poke.name] && (
                        <img src={pokemonImages[poke.name]} alt={poke.name} />
                    )}
                </div>
            ))}
                {/*{pokemon.map(pokemon => <div>*/}
                {/*    {pokemon.name} {pokemon.url}*/}
                {/*    </div>*/}

                {/*)}*/}

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