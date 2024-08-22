import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";
import {pokemonService} from "../service/api.service";


const PokemonId = () => {
    const {name} = useParams();
    const images = useAppSelector(state => state.pokemonAllStore.images);
    const abilitiesDetails = useAppSelector(state => state.pokemonAllStore.abilitiesDetails);
    const abilities = useAppSelector(state => state.pokemonAllStore.abilities);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (name){
            dispatch(pokemonAllActions.loadPokemonImage(name));
            dispatch(pokemonAllActions.loadAbilitiesDetails(name));
        }
    }, [dispatch,name]);


    return (
        <div>
            {
                name && (
                    <div key={name}>
                        <div>{name}</div>
                        <img src={images[name]} alt={name}/>
                        {/*{abilit.map((value) => (*/}
                        {/*    value.is_hidden && (*/}
                        {/*        <li key={value.slot}>*/}
                        {/*            {value.slot} {value.is_hidden.toString()} {value.ability.name}*/}
                        {/*        </li>*/}
                        {/*    )*/}
                        {/*))}*/}
                        <div>
                            {
                                abilities.map(value =>
                                    <div>
                                        <p>is_hidden: {`${value.is_hidden}`} <br/> slot: {value.slot} <br/> name: {value.ability.name}</p>
                                    </div>
                                )
                            }
                        </div>
                        <div>
                            {abilitiesDetails.map((abilityDetail) => {
                                return (
                                    <div key={abilityDetail.id}>
                                        <p>{abilityDetail.name}:</p>
                                        <ul>
                                            {abilityDetail.effect_entries.map((entry, index) => (
                                                <li key={index}>{entry.short_effect}</li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

        </div>
    );
};

export default PokemonId;