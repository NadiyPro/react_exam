import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";

const SearchAbility = () => {
    const {ability} = useParams();
    const navigate = useNavigate();
    const abilitiesDetails = useAppSelector(state => state.pokemonAllStore.abilitiesDetails);
    const images = useAppSelector(state => state.pokemonAllStore.images);
    // const offset = useAppSelector(state => state.pokemonAllStore.offset);
    // const limit = useAppSelector(state => state.pokemonAllStore.limit);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (ability){
            dispatch(pokemonAllActions.loadAbilitiesDetails(ability));
        }
    }, [dispatch,ability]);

    useEffect(() => {
        abilitiesDetails.map(value => value.pokemon.map(item => {
            if (!images[item.pokemon.name ]) {
            dispatch(pokemonAllActions.loadPokemonImage(item.pokemon.name));
            }
        } ));

    }, [images, dispatch]);

    // useEffect(() => {
    //     dispatch(pokemonAllActions.loadPokemonAll({ offset, limit }));
    // }, [dispatch, offset, limit]);
    //
    // const nextPage = () => {
    //     dispatch(pokemonAllActions.setOffset(offset + limit));
    // };
    //
    // const prevPage = () => {
    //     if (offset > 0) {
    //         dispatch(pokemonAllActions.setOffset(offset - limit));
    //     }
    // };

    return (
        <div>
            <div>
                {abilitiesDetails.map(value =>
                    <div key={value.id}>{value.pokemon.map(item =>
                        <div>
                            <p>{item.pokemon.name}</p>
                            <img src={images[item.pokemon.name]} alt={'img'}
                                 onClick={() => navigate(`/pokemon/${item.pokemon.name}`)}/>
                        </div>)}
                    </div>)
                }
            </div>
            {/*<button onClick={prevPage} disabled={offset === 0}>*/}
            {/*    Prev*/}
            {/*</button>*/}
            {/*<button onClick={nextPage}>*/}
            {/*    Next*/}
            {/*</button>*/}
            <div>
                <button onClick={() => navigate(`/`)}>
                    Home
                </button>
            </div>
        </div>
    );
};

export default SearchAbility;