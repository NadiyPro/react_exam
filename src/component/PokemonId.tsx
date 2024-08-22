import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";
import {loadTypeDetails} from "../redux/reducers/loadAbility";

const PokemonId = () => {
    const {name} = useParams();
    const images = useAppSelector(state => state.pokemonAllStore.images);
    const abilitiesDetails = useAppSelector(state => state.pokemonAllStore.abilitiesDetails);
    const abilities = useAppSelector(state => state.pokemonAllStore.abilities);
    const statDetails = useAppSelector(state => state.pokemonAllStore.statDetails);
    const stat = useAppSelector(state => state.pokemonAllStore.stat);
    const typeDetails = useAppSelector(state => state.pokemonAllStore.typeDetails);
    const type = useAppSelector(state => state.pokemonAllStore.type);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (name){
            dispatch(pokemonAllActions.loadPokemonImage(name));
            dispatch(pokemonAllActions.loadAbilitiesDetails(name));
            dispatch(pokemonAllActions.loadStatDetails(name));
            dispatch(pokemonAllActions.loadTypeDetails(name));
        }
    }, [dispatch,name]);


    return (
        <div>
            {
                name && (
                    <div key={name}>
                        <div>{name}</div>
                        <img src={images[name]} alt={name}/>
                        <div>
                            <h5>abilities</h5>
                            <div>
                                {
                                    abilities.map(value =>
                                        <div key={value.slot}>
                                            <p>is_hidden: {`${value.is_hidden}`} <br/> name: {value.ability.name}</p>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                {abilitiesDetails.map((abilityDetail) => {
                                    return (
                                        <div key={abilityDetail.id}>
                                            <p>name: {abilityDetail.name}:</p>
                                            <ul>
                                                {abilityDetail.effect_entries.map((value, index) => (
                                                    <li key={index}>{value.short_effect}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h5>stat</h5>
                            <div>
                                {
                                    stat.map((value, index) =>
                                        <div key={index}>
                                            <p>base_stat: {value.base_stat} <br/> effort:{value.effort}
                                                <br/> name: {value.stat.name}</p>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                {statDetails.map((statDetail) => {
                                    return (
                                        <div key={statDetail.id}>
                                            <p>name: {statDetail.name} </p>
                                            {/*<ul>*/}
                                            {/*    {statDetail.affecting_moves.increase.map((value, index) => (*/}
                                            {/*        <li key={index}>{value.move.name}</li>*/}
                                            {/*    ))}*/}
                                            {/*</ul>*/}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h5>type</h5>
                            <div>
                                {
                                    type.map((value, index) =>
                                        <div key={index}>
                                            <p> name: {value.type.name} <br/> slot: {value.slot} </p>
                                        </div>
                                    )
                                }
                            </div>
                            {/*<div>*/}
                            {/*    {typeDetails.map((typeDetail) => {*/}
                            {/*        return (*/}
                            {/*            <div key={typeDetail.id}>*/}
                            {/*                <p>name: {typeDetail.name} </p>*/}
                            {/*                <ul>*/}
                            {/*                    {typeDetails.map((value, index) => (*/}
                            {/*                        <li key={index}>{value}</li>*/}
                            {/*                    ))}*/}
                            {/*                </ul>*/}
                            {/*            </div>*/}
                            {/*        );*/}
                            {/*    })}*/}
                            {/*</div>*/}
                        </div>
                    </div>
                )}

        </div>
    );
};

export default PokemonId;