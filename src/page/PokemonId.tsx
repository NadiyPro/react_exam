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
    const [selectedTypeDetail, setSelectedTypeDetail] = useState<TypeDetail | null>(null);

    const handleAbilityClick = (abilityDetail: AbilityDetail) => {
        if (selectedAbilityDetail?.name === abilityDetail.name) {
            setSelectedAbilityDetail(null);
        } else {
            setSelectedAbilityDetail(abilityDetail);
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
                       <div className={'div_PokemonId_form'} key={name}>
                           <div>
                               <h3>Pokemon name: {name}</h3>
                           </div>
                           <div>
                               {formDetails.map((formDetail) => {

                                   return (
                                       <div className={'div_PokemonId_row'} key={formDetail.id}>
                                               <div className={'div_type_height_weight'}>
                                                       {pokemonOne && (
                                                           <div className={'div_id_height'}>
                                                               <div>
                                                                   <div><h5 className={'h5_id_base'}>id: {pokemonOne.id}</h5></div>
                                                                   <div>
                                                                       <h5>species: {pokemonOne.species.name}</h5>
                                                                   </div>
                                                               </div>
                                                               <div className={'div_height_weight'}>
                                                                   <div className={'div_height_weight_item'}>
                                                                       <div>
                                                                           <img alt={'img'}
                                                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXklEQVR4nO3TQQrAIBAEQf//6c59DyuJwRbGhr0XjI4xj8VbjlMAb7sAdkyA/QawAV15AOwJsAG1DAD2N8QGdOUBsCfABtQyANjfEBvQlQfAngAbULsA/p6Aj3c24AGLFvEPeZntyQAAAABJRU5ErkJggg=="/>
                                                                       </div>
                                                                       <div>
                                                                           <h5 className={'h5_height_weight'}>height: {pokemonOne.height}</h5>
                                                                       </div>
                                                                   </div>
                                                                   <div className={'div_height_weight_item'}>
                                                                       <div>
                                                                           <img
                                                                               alt={'img'}
                                                                               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACXElEQVR4nO2avWtUQRTFf4ZoCiWkikkkYJVGUKy0ULGNq12KiOhaayGCH60QCxtFC8FKm4AIpknqqIVB8gdEUygWikIKwcQiWmTkynkwPHbZmZf9GMkcGNidOffOue/OnbfvzUJGRkZVnAUWgV+A63HbkJZabBB3ExDvmrSZmEyYwSZwAxil9xgFbkqTC83MK5EtiNRwS9psmbXEhsgjpIcRaVsPIRdrMRb7gDPAPWABWAV+AL/V7PMHYF6cSdnEwoXqiwmkDzgHzElsbOHamn+pujRfXQ/EJr2oK+wLsyzcB+rAKWDcGxtXX12c1ZLte+ACsKtbgRwB3pVELAMTFfxNyNb3tQQc7mQgdqWue0toDbgDbKn4BitMPCjbLflaE9fmuNYkO9sKZAB44Y09AYY09hr4BBwN8H269N1sPsqHYUi+i3mea+62BbLgbXtTpbH9gYV6CHjcoN9sh0t9U5rLae5W+hqiEfG8+v4AJ4jHXmAFuBzIP+bdxesB+hqiGfGR+r9V+NnyTLYHA7jDwBfxH0boCyb2A2809hbYHeJMWTCbzwHcftVLsXvtidAXRbR6+KpxuxeE1EXxGGBZaYUH4n4HxiroiyIe97bgSwF1UfhrVR/TXh2e3Ia+KOLVNj9j+O1KG/RFEZ92IIjZNuoLJ/YILgeSGFzOSGJwOSOJweWMJAaXM5IYXM5IYnA5I4nB5YwkBrfjMrIuYgpHbmUckLafBGBRZDuzSw23Y47eaiJv6syu2fulbmJMQRSvoYKPqWc6+Lqna8fTBWpKYXE4+l/+YSAjI4N/+AsUpdOtE+HlwgAAAABJRU5ErkJggg=="/>
                                                                       </div>
                                                                       <div>
                                                                           <h5 className={'h5_height_weight'}>weight: {pokemonOne.weight}</h5>
                                                                       </div>
                                                                   </div>
                                                               </div>
                                                               <div className={'div_type_ability'}>
                                                                   <div>
                                                                       <h5 className={'h5_type_abilities'}>type:</h5>
                                                                       {typeDetails.map((typeDetail) => (
                                                                           <div key={typeDetail.id}>
                                                                               <button className={'button_PokemonId'}
                                                                                       onClick={() => handleTypeClick(typeDetail)}>
                                                                                   {typeDetail.name}
                                                                               </button>
                                                                           </div>
                                                                       ))}
                                                                   </div>

                                                                   <div>
                                                                       {selectedTypeDetail && (
                                                                           <div className={'div_selected_button'}>
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
                                                           </div>
                                                       )}
                                               </div>
                                               <div className={'formImag'}>
                                                   <div>
                                                       <div className={'div_img_row'}>
                                                           <div className={'div_img_form'}>
                                                               <h5>front default</h5>
                                                               <img src={formDetail.sprites.front_default}
                                                                    alt={'front_shiny'}/>
                                                           </div>
                                                           <div className={'div_img_form'}>
                                                               <h5>back default</h5>
                                                               <img src={formDetail.sprites.back_default}
                                                                    alt={'back_default'}/>
                                                           </div>
                                                       </div>
                                                       <hr/>
                                                       <div className={'div_img_row'}>
                                                           <div className={'div_img_form'}>
                                                               <h5>front shiny</h5>
                                                               <img src={formDetail.sprites.front_shiny}
                                                                    alt={'front_shiny'}/>
                                                           </div>
                                                           <div className={'div_img_form'}>
                                                               <h5>back shiny</h5>
                                                               <img src={formDetail.sprites.back_shiny}
                                                                    alt={'back_shiny'}/>
                                                           </div>
                                                       </div>
                                                   </div>

                                                   <div>
                                                       {
                                                           species && (
                                                               <button className={'button_PokemonId'}
                                                                   onClick={() => navigate(`/evolution-chain/${species}`)}>
                                                                   evolution
                                                               </button>
                                                           )
                                                       }
                                                   </div>
                                               </div>
                                               <div className={'div_base_stat'}>
                                                   <div>
                                                       <h5 className={'h5_id_base'}>base stat:</h5>
                                                       {
                                                           stat.map((value, index) =>
                                                               <div key={index}>
                                                                   <p>{value.stat.name} - {value.base_stat}</p>
                                                               </div>
                                                           )
                                                       }
                                                   </div>
                                                   <div>
                                                       <h5 className={'h5_type_abilities'}>abilities:</h5>
                                                       <div className={'div_type_ability'} key={name}>
                                                           {abilitiesDetails.map((abilityDetail) => (
                                                               <div key={abilityDetail.id}>
                                                                   <button className={'button_PokemonId'}
                                                                       onClick={() => handleAbilityClick(abilityDetail)}>
                                                                       {abilityDetail.name}
                                                                   </button>
                                                               </div>
                                                           ))}
                                                       </div>
                                                       {selectedAbilityDetail && (
                                                           <div className={'div_selected_button'}>
                                                               <ul>
                                                                   {selectedAbilityDetail.effect_entries.map((value, index) => (
                                                                       <li key={index}>{value.short_effect}</li>
                                                                   ))}
                                                               </ul>
                                                           </div>
                                                       )}
                                                   </div>
                                               </div>

                                       </div>
                                   )
                               })}
                           </div>
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