import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAllActions} from "../redux/slices/pokemonAllSlice";
import '../module/global.css';

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
    const abilitiesDetails = useAppSelector(state => state.pokemonAllStore.abilitiesDetails);
    const abilities = useAppSelector(state => state.pokemonAllStore.abilities);
    const statDetails = useAppSelector(state => state.pokemonAllStore.statDetails);
    const stat = useAppSelector(state => state.pokemonAllStore.stat);
    const formDetails = useAppSelector(state => state.pokemonAllStore.formDetails);
    const typeDetails = useAppSelector(state => state.pokemonAllStore.typeDetails);
    const species = useAppSelector(state => state.pokemonAllStore.species);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (name){
            dispatch(pokemonAllActions.loadPokemonOne(name));
            dispatch(pokemonAllActions.loadFormDetails(name));
            dispatch(pokemonAllActions.loadAbilitiesDetails(name));
            dispatch(pokemonAllActions.loadStatDetails(name));
            dispatch(pokemonAllActions.loadTypeDetails(name));
            dispatch(pokemonAllActions.loadSpecies(name));
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
           <div>
               {
                   name && (
                       <div key={name}>
                           <div><h5>Pokemon name: {name}</h5></div>

                           {formDetails.map((formDetail) => {

                               return (
                                   <div key={formDetail.id} >
                                       <div className='formImag'>
                                           <div className={'div_img_form'}>
                                               <h6>front default</h6>
                                               <img src={formDetail.sprites.front_default} alt={'front_shiny'}/>
                                           </div>
                                           <div className={'div_img_form'}>
                                               <h6>back default</h6>
                                               <img src={formDetail.sprites.back_default} alt={'back_default'}/>
                                           </div>

                                           <div className={'div_img_form'}>
                                               <h6>front shiny</h6>
                                               <img src={formDetail.sprites.front_shiny} alt={'front_shiny'}/>
                                           </div>
                                           <div className={'div_img_form'}>
                                               <h6>back shiny</h6>
                                               <img src={formDetail.sprites.back_shiny} alt={'back_shiny'}/>
                                           </div>
                                       </div>

                                       <div>
                                           {pokemonOne && (
                                               <div>
                                                   <div><p>id: {pokemonOne.id}</p></div>
                                                   <div>
                                                       <img alt={'img'}
                                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXklEQVR4nO3TQQrAIBAEQf//6c59DyuJwRbGhr0XjI4xj8VbjlMAb7sAdkyA/QawAV15AOwJsAG1DAD2N8QGdOUBsCfABtQyANjfEBvQlQfAngAbULsA/p6Aj3c24AGLFvEPeZntyQAAAABJRU5ErkJggg=="/>
                                                       <p> height: {pokemonOne.height}</p>
                                                   </div>
                                                   <div>
                                                       <img
                                                           alt={'img'}
                                                           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACXElEQVR4nO2avWtUQRTFf4ZoCiWkikkkYJVGUKy0ULGNq12KiOhaayGCH60QCxtFC8FKm4AIpknqqIVB8gdEUygWikIKwcQiWmTkynkwPHbZmZf9GMkcGNidOffOue/OnbfvzUJGRkZVnAUWgV+A63HbkJZabBB3ExDvmrSZmEyYwSZwAxil9xgFbkqTC83MK5EtiNRwS9psmbXEhsgjpIcRaVsPIRdrMRb7gDPAPWABWAV+AL/V7PMHYF6cSdnEwoXqiwmkDzgHzElsbOHamn+pujRfXQ/EJr2oK+wLsyzcB+rAKWDcGxtXX12c1ZLte+ACsKtbgRwB3pVELAMTFfxNyNb3tQQc7mQgdqWue0toDbgDbKn4BitMPCjbLflaE9fmuNYkO9sKZAB44Y09AYY09hr4BBwN8H269N1sPsqHYUi+i3mea+62BbLgbXtTpbH9gYV6CHjcoN9sh0t9U5rLae5W+hqiEfG8+v4AJ4jHXmAFuBzIP+bdxesB+hqiGfGR+r9V+NnyTLYHA7jDwBfxH0boCyb2A2809hbYHeJMWTCbzwHcftVLsXvtidAXRbR6+KpxuxeE1EXxGGBZaYUH4n4HxiroiyIe97bgSwF1UfhrVR/TXh2e3Ia+KOLVNj9j+O1KG/RFEZ92IIjZNuoLJ/YILgeSGFzOSGJwOSOJweWMJAaXM5IYXM5IYnA5I4nB5YwkBrfjMrIuYgpHbmUckLafBGBRZDuzSw23Y47eaiJv6syu2fulbmJMQRSvoYKPqWc6+Lqna8fTBWpKYXE4+l/+YSAjI4N/+AsUpdOtE+HlwgAAAABJRU5ErkJggg=="/>
                                                       <p>weight: {pokemonOne.weight}</p>
                                                   </div>
                                                   <div>
                                                       <p>species: {pokemonOne.species.name}</p>
                                                   </div>
                                               </div>
                                           )}
                                           <div>
                                               {
                                                   species && (
                                                       <button
                                                           onClick={() => navigate(`/evolution-chain/${species}`)}>
                                                           evolution
                                                       </button>
                                                   )
                                               }
                                           </div>
                                       </div>

                                       <div>
                                           <div>
                                               {typeDetails.map((typeDetail) => (
                                                   <div key={typeDetail.id}>
                                                       <h5>type: {typeDetail.name}</h5>
                                                       <button onClick={() => handleTypeClick(typeDetail)}>
                                                           detail: {typeDetail.name}
                                                       </button>
                                                   </div>
                                               ))}
                                           </div>

                                           <div>
                                               {selectedTypeDetail && (
                                                   <div>
                                                       <ul>
                                                           1. double damage
                                                           from: {selectedTypeDetail.damage_relations.double_damage_from.map((value, index) =>
                                                           <li key={index}>{value.name}</li>)}
                                                           <br/>
                                                           2. double damage
                                                           to: {selectedTypeDetail.damage_relations.double_damage_to.map((value, index) =>
                                                           <li key={index}>{value.name}</li>)}
                                                           <br/>
                                                           3. half damage
                                                           from:{selectedTypeDetail.damage_relations.half_damage_from.map((value, index) =>
                                                           <li key={index}>{value.name}</li>)}
                                                           <br/>
                                                           4. half damage
                                                           to:{selectedTypeDetail.damage_relations.half_damage_to.map((value, index) =>
                                                           <li key={index}>{value.name}</li>)}
                                                       </ul>
                                                   </div>
                                               )}
                                           </div>
                                       </div>


                                       <div>
                                           <h5>abilities</h5>
                                           <div>
                                               {
                                                   abilities.map(value =>
                                                       <div key={value.slot}>
                                                           <p>is_hidden: {`${value.is_hidden}`} <br/> {value.ability.name}
                                                           </p>
                                                       </div>
                                                   )
                                               }
                                           </div>
                                           <div key={name}>
                                               {abilitiesDetails.map((abilityDetail) => (
                                                   <div key={abilityDetail.id}>
                                                       <button onClick={() => handleAbilityClick(abilityDetail)}>
                                                           detail: {abilityDetail.name}
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
                                                           detail: {statDetail.name}
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

                                   </div>
                               )
                           })}
                       </div>)
               }
           </div>
            <div className={'div_button'}>
                <button className={'button_pagination'} onClick={() => navigate(`/`)}>
                    Home
                </button>
            </div>
        </div>
    )
};
export default PokemonId;