import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";
import {useParams} from "react-router-dom";

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
const FormPokemon = () => {
    const {name} = useParams();
    const formDetails = useAppSelector(state => state.pokemonAllStore.formDetails);
    const typeDetails = useAppSelector(state => state.pokemonAllStore.typeDetails);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (name){
            dispatch(pokemonAllActions.loadFormDetails(name));
        }
    }, [dispatch,name]);

    const [selectedTypeDetail, setSelectedTypeDetail] = useState<TypeDetail | null>(null);

    const handleTypeClick = (typeDetail: TypeDetail) => {
        if (selectedTypeDetail?.name === typeDetail.name) {
            setSelectedTypeDetail(null);
        } else {
            setSelectedTypeDetail(typeDetail);
        }
    };

    return (
        <div>
            <div>
                {formDetails.map((formDetail) => {

                    return (
                        <div key={formDetail.id}>
                            <h6>form_name: {formDetail.name}</h6>
                            <h6>{formDetail.types.map(value => value.type.name)}</h6>
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


                            <h5>type form </h5>
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
                    );
                })}
            </div>
        </div>
    );
};

export default FormPokemon;