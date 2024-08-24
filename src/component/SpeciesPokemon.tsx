import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";


const SpeciesPokemon = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const evolutionSpeciesName = useAppSelector(state => state.pokemonAllStore.evolutionSpeciesName);
    const evolutionEvolves_toSpeciesName = useAppSelector(state => state.pokemonAllStore.evolutionEvolves_toSpeciesName);
    const evolutionEvolves_toEvolves_toSpeciesName = useAppSelector(state => state.pokemonAllStore.evolutionEvolves_toEvolves_toSpeciesName);
    const images = useAppSelector(state => state.pokemonAllStore.images);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id){
            dispatch(pokemonAllActions.loadEvolutionDetails(+id));
        }
    }, [dispatch,id]);

    useEffect(() => {
        if (evolutionSpeciesName && !images[evolutionSpeciesName]) {
            dispatch(pokemonAllActions.loadPokemonImage(evolutionSpeciesName));
        }
        if (evolutionEvolves_toSpeciesName) {
            evolutionEvolves_toSpeciesName.forEach((name) => {
                if (name && !images[name]) {
                    dispatch(pokemonAllActions.loadPokemonImage(name));
                }
            });
        }
        if (evolutionEvolves_toEvolves_toSpeciesName) {
            evolutionEvolves_toEvolves_toSpeciesName.forEach((name1) => {
                name1.forEach((name2) => {
                    if (name2 && !images[name2]) {
                        dispatch(pokemonAllActions.loadPokemonImage(name2));
                    }
                });
            });
        }
    }, [evolutionSpeciesName, evolutionEvolves_toSpeciesName, evolutionEvolves_toEvolves_toSpeciesName, images, dispatch]);



    return (
        <div>
            <div>
                <h5>Start evolution</h5>
                {evolutionSpeciesName && <img src={images[evolutionSpeciesName]} alt={'img1'}/>}
            </div>
            <div>
                <h5>Evolution</h5>
                {evolutionEvolves_toSpeciesName?.map((name, index) => (
                    <img key={index} src={images[name]} alt={`img2-${index}`}/>))}
            </div>
            <div><h5>Final evolution</h5>
                {evolutionEvolves_toEvolves_toSpeciesName?.map((innerArray, index) => (
                    innerArray.map((name, innerIndex) => (
                        <img key={`${index}-${innerIndex}`} src={images[name]} alt={`img3-${index}-${innerIndex}`}/>
                    ))))}
            </div>
            <div>
                <button onClick={() => navigate(`/pokemon/${evolutionSpeciesName}`)}>
                    Back
                </button>
                <button onClick={() => navigate(`/`)}>
                    Home
                </button>
            </div>
        </div>
    );
};

export default SpeciesPokemon;