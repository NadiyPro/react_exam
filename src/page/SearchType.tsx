import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";

const SearchType = () => {
    const {type} = useParams();
    const navigate = useNavigate();
    const typeDetails = useAppSelector(state => state.pokemonAllStore.typeDetails);
    const images = useAppSelector(state => state.pokemonAllStore.images);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (type) {
            dispatch(pokemonAllActions.loadTypeSearch(type));
        }
    }, [dispatch, type]);

    useEffect(() => {
        typeDetails.map(value => value.pokemon.forEach(item => {
            if (!images[item.pokemon.name ]) {
                dispatch(pokemonAllActions.loadPokemonImage(item.pokemon.name));
            }
        } ));

    }, [images, dispatch,typeDetails]);

    return (
        <div className={'div_SearchAbilityAll'}>
            <div>
                <h3>Search all type</h3>
            </div>
            {typeDetails.map(value =>
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

export default SearchType;