import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
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

const PokemonId = () => {
    const {name} = useParams();
    const pokemonOne = useAppSelector(state => state.pokemonAllStore.pokemonOne);
    const images = useAppSelector(state => state.pokemonAllStore.images);
    const abilitiesDetails = useAppSelector(state => state.pokemonAllStore.abilitiesDetails);
    const abilities = useAppSelector(state => state.pokemonAllStore.abilities);
    const statDetails = useAppSelector(state => state.pokemonAllStore.statDetails);
    const stat = useAppSelector(state => state.pokemonAllStore.stat);
    const typeDetails = useAppSelector(state => state.pokemonAllStore.typeDetails);
    const type = useAppSelector(state => state.pokemonAllStore.type);
    const formDetails = useAppSelector(state => state.pokemonAllStore.formDetails);
    const form = useAppSelector(state => state.pokemonAllStore.form);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (name){
            dispatch(pokemonAllActions.loadPokemonOne(name));
            dispatch(pokemonAllActions.loadPokemonImage(name));
            dispatch(pokemonAllActions.loadAbilitiesDetails(name));
            dispatch(pokemonAllActions.loadStatDetails(name));
            dispatch(pokemonAllActions.loadTypeDetails(name));
            dispatch(pokemonAllActions.loadFormDetails(name));
        }
    }, [dispatch,name]);

    const [selectedAbilityDetail, setSelectedAbilityDetail] = useState<AbilityDetail | null>(null);
    const [selectedStatDetail, setSelectedStatDetail] = useState<StatDetail | null>(null);

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
                                <div className="divAbilities">
                                    <ul>
                                        {selectedAbilityDetail.effect_entries.map((value, index) => (
                                            <li key={index}>{value.short_effect}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        {/*<div>*/}
                        {/*    {abilitiesDetails.map((abilityDetail) => {*/}
                        {/*        return (*/}
                        {/*            <div key={abilityDetail.id}>*/}
                        {/*                <p>name: {abilityDetail.name}:</p>*/}
                        {/*                <ul>*/}
                        {/*                    {abilityDetail.effect_entries.map((value, index) => (*/}
                        {/*                        <li key={index}>{value.short_effect}</li>*/}
                        {/*                    ))}*/}
                        {/*                </ul>*/}
                        {/*            </div>*/}
                        {/*        );*/}
                        {/*    })}*/}
                        {/*</div>*/}
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
                                {/*{statDetails.map((statDetail) => {*/}
                                {/*    return (*/}
                                {/*            <div key={statDetail.id}>*/}
                                {/*                <button onClick={() => handleAbilityClick(statDetail)}>*/}
                                {/*                    Detail: {statDetail.name}*/}
                                {/*                </button>*/}
                                {/*            /!*<ul>*!/*/}
                                {/*            /!*    {statDetail.affecting_moves.increase.map((value, index) => (*!/*/}
                                {/*            /!*        <li key={index}>{value.move.name}</li>*!/*/}
                                {/*            /!*    ))}*!/*/}
                                {/*            /!*</ul>*!/*/}
                                {/*        </div>*/}
                                {/*    );*/}
                                {/*})}*/}
                            </div>
                            {selectedStatDetail && (
                                <div className="divAbilities">
                                    <ul>
                                        {selectedStatDetail.affecting_moves.increase.map((value, index) => (
                                            <li key={index}>{value.move.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/*<div>*/}
                            {/*    {statDetails.map((statDetail) => {*/}
                            {/*        return (*/}
                            {/*            <div key={statDetail.id}>*/}
                            {/*                <p>name: {statDetail.name} </p>*/}
                            {/*                /!*<ul>*!/*/}
                            {/*                /!*    {statDetail.affecting_moves.increase.map((value, index) => (*!/*/}
                            {/*                /!*        <li key={index}>{value.move.name}</li>*!/*/}
                            {/*                /!*    ))}*!/*/}
                            {/*                /!*</ul>*!/*/}
                            {/*            </div>*/}
                            {/*        );*/}
                            {/*    })}*/}
                            {/*</div>*/}
                        </div>

                        <div>
                            <h5>type</h5>
                            {/*<div>*/}
                            {/*    {*/}
                            {/*        type.map((value, index) =>*/}
                            {/*            <div key={index}>*/}
                            {/*                <p> name: {value.type.name} <br/> slot: {value.slot} </p>*/}
                            {/*            </div>*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*</div>*/}
                            <div>
                                {typeDetails.map((typeDetail) => {
                                    return (
                                        <div key={typeDetail.id}>
                                            <div>
                                                {typeDetail.name}
                                                <ul>
                                                    double_damage_from: {typeDetail.damage_relations.double_damage_from.map(value =>
                                                    <li>{value.name}</li>)}
                                                    <br/>
                                                    double_damage_to: {typeDetail.damage_relations.double_damage_to.map(value =>
                                                    <li>{value.name}</li>)}
                                                    <br/>
                                                    half_damage_from:{typeDetail.damage_relations.half_damage_from.map(value =>
                                                    <li>{value.name}</li>)}
                                                    <br/>
                                                    half_damage_to:{typeDetail.damage_relations.half_damage_to.map(value =>
                                                    <li>{value.name}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>


                        <div>
                            <h5>form</h5>
                            <div>
                                {
                                    form.map((value, index) =>
                                        <div key={index}>
                                            <p> name: {value.name} </p>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                {formDetails.map((formDetail) => {
                                    return (
                                        <div key={formDetail.id}>
                                            <div>
                                            <h6>front_default</h6>
                                                <img src={formDetail.sprites.front_default} alt={'front_shiny'}/>
                                            </div>
                                            <div>
                                                <h6>back_default</h6>
                                                <img src={formDetail.sprites.back_default} alt={'back_default'}/>
                                            </div>

                                            <div>
                                                <h6>front_shiny</h6>
                                                <img src={formDetail.sprites.front_shiny} alt={'front_shiny'}/>
                                            </div>
                                            <div>
                                                <h6>back_shiny</h6>
                                                <img src={formDetail.sprites.back_shiny} alt={'back_shiny'}/>
                                            </div>

                                        </div>
                                    );
                                })};
                            </div>
                        </div>
                    </div>
                )}

        </div>
    );
};

export default PokemonId;