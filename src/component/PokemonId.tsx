import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";

interface EffectEntry {
    short_effect: string;
}

interface AbilityDetail {
    id: number;
    name: string;
    effect_entries: EffectEntry[];
}

interface StatDetail {
    id: number;
    name: string;
    affecting_moves: {
        increase: { move: { name: string } }[];
    };
}
interface TypeDetail {
    id: number;
    name: string;
    damage_relations: {
        double_damage_from: { name: string }[];
        double_damage_to: { name: string }[];
        half_damage_from: { name: string }[];
        half_damage_to: { name: string }[];
    };
}
const PokemonId = () => {
    const {name} = useParams();
    const navigate = useNavigate();
    const pokemonOne = useAppSelector(state => state.pokemonAllStore.pokemonOne);
    const images = useAppSelector(state => state.pokemonAllStore.images);
    const abilitiesDetails = useAppSelector(state => state.pokemonAllStore.abilitiesDetails);
    const abilities = useAppSelector(state => state.pokemonAllStore.abilities);
    const statDetails = useAppSelector(state => state.pokemonAllStore.statDetails);
    const stat = useAppSelector(state => state.pokemonAllStore.stat);
    const typeDetails = useAppSelector(state => state.pokemonAllStore.typeDetails);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (name){
            dispatch(pokemonAllActions.loadPokemonOne(name));
            dispatch(pokemonAllActions.loadPokemonImage(name));
            dispatch(pokemonAllActions.loadAbilitiesDetails(name));
            dispatch(pokemonAllActions.loadStatDetails(name));
            dispatch(pokemonAllActions.loadTypeDetails(name));
        }
    }, [dispatch,name]);

    const [selectedAbilityDetail, setSelectedAbilityDetail] = useState<AbilityDetail | null>(null);
    const [selectedStatDetail, setSelectedStatDetail] = useState<StatDetail | null>(null);
    const [selectedTypeDetail, setSelectedTypeDetail] = useState<TypeDetail | null>(null);

    const handleAbilityClick = (abilityDetail: AbilityDetail) => {
        if (selectedAbilityDetail?.name === abilityDetail.name) {
            setSelectedAbilityDetail(null);
        } else {
            setSelectedAbilityDetail(abilityDetail);
        }
    };
    const handleStatClick = (statDetail: StatDetail) => {
        if (selectedStatDetail?.name === statDetail.name) {
            setSelectedStatDetail(null);
        } else {
            setSelectedStatDetail(statDetail);
        }
    };
    const handleTypeClick = (typeDetail: TypeDetail) => {
        if (selectedTypeDetail?.name === typeDetail.name) {
            setSelectedTypeDetail(null);
        } else {
            setSelectedTypeDetail(typeDetail);
        }
    };
    return (
        <div>
            {
                name && (
                    <div key={name}>
                        <div>Pokemon name: {name}</div>
                        <img src={images[name]} alt={name}/>
                        <div>
                            {pokemonOne && (
                                <div>
                                    <p key={pokemonOne.name}>id: {pokemonOne.id} <br/> height: {pokemonOne.height}
                                        <br/> weight: {pokemonOne.weight}</p>
                                </div>
                            )}
                        </div>
                        <div>
                            <h5>abilities</h5>
                            <div>
                                {
                                    abilities.map(value =>
                                        <div key={value.slot}>
                                            <p>is_hidden: {`${value.is_hidden}`} <br/> {value.ability.name}</p>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                {abilitiesDetails.map((abilityDetail) => (
                                    <div key={abilityDetail.id}>
                                        <button onClick={() => handleAbilityClick(abilityDetail)}>
                                            Detail: {abilityDetail.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {selectedAbilityDetail && (
                                <div>
                                    <ul>
                                        {selectedAbilityDetail.effect_entries.map((value, index) => (
                                            <li key={index}>{value.short_effect}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div>
                            <h5>base_stat</h5>
                            <div>
                                {
                                    stat.map((value, index) =>
                                        <div key={index}>
                                            <p>{value.stat.name}: {value.base_stat}</p>
                                        </div>
                                    )
                                }
                            </div>

                            <div>
                                {statDetails.map((statDetail) => (
                                    <div key={statDetail.id}>
                                        <button onClick={() => handleStatClick(statDetail)}>
                                            Detail: {statDetail.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {selectedStatDetail && (
                                <div>
                                    <ul>
                                        {selectedStatDetail.affecting_moves.increase.map((value, index) => (
                                            <li key={index}>{value.move.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div>
                            <h5>form</h5>
                            <button onClick={() => navigate(`/pokemon-form/${name}`)}>Detail form</button>
                        </div>

                        <div>
                            <h5>type form</h5>
                            <div>
                                {typeDetails.map((typeDetail) => (
                                    <div key={typeDetail.id}>
                                        <button onClick={() => handleTypeClick(typeDetail)}>
                                            type form detail: {typeDetail.name}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div>
                                {selectedTypeDetail && (
                                    <div>
                                        <ul>
                                            double_damage_from: {selectedTypeDetail.damage_relations.double_damage_from.map((value, index) =>
                                            <li key={index}>{value.name}</li>)}
                                            <br/>
                                            double_damage_to: {selectedTypeDetail.damage_relations.double_damage_to.map((value, index) =>
                                            <li key={index}>{value.name}</li>)}
                                            <br/>
                                            half_damage_from:{selectedTypeDetail.damage_relations.half_damage_from.map((value, index) =>
                                            <li key={index}>{value.name}</li>)}
                                            <br/>
                                            half_damage_to:{selectedTypeDetail.damage_relations.half_damage_to.map((value, index) =>
                                            <li key={index}>{value.name}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

        </div>
    );
};

export default PokemonId;