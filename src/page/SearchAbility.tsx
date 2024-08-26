import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";

const SearchAbility = () => {
    const {ability} = useParams();
    const navigate = useNavigate();
    const abilitiesDetails = useAppSelector(state => state.pokemonAllStore.abilitiesDetails);
    const images = useAppSelector(state => state.pokemonAllStore.images);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (ability) {
            dispatch(pokemonAllActions.loadAbilitySearch(ability));
        }
    }, [dispatch, ability]);


    useEffect(() => {
        abilitiesDetails.map(value => value.pokemon.map(item => {
            if (!images[item.pokemon.name ]) {
            dispatch(pokemonAllActions.loadPokemonImage(item.pokemon.name));
            }
        } ));

    }, [images, dispatch,abilitiesDetails]);


    return (
        <div className={'div_SearchAbilityAll'}>
            <div>
                <h3>Search all ability</h3>
            </div>
                {abilitiesDetails.map(value =>
                    <div className={'div_search_ability'} key={value.id}>{value.pokemon.map(item =>
                        <div className={'div_img'}>
                            <p>{item.pokemon.name}</p>
                            <img src={images[item.pokemon.name]} alt={'img'}
                                 onClick={() => navigate(`/pokemon/${item.pokemon.name}`)}/>
                        </div>)}
                    </div>)
                }
            <div className={'div_button'}>
                <button className={'button_pagination'} onClick={() => navigate(`/`)}>
                    Home
                </button>
            </div>
        </div>
    );
};

export default SearchAbility;