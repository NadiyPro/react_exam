import React, { useEffect} from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { pokemonAllActions } from "../redux/slices/pokemonAllSlice";
import '../module/global.css'

interface FormData {
    nameForm: string;
}

const MainLayout = () => {
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm<FormData>();
    const pokemonAll = useAppSelector(state => state.pokemonAllStore.pokemonAll);
    const abilitiesDetails = useAppSelector(state => state.pokemonAllStore.abilitiesDetails);
    const typeDetails = useAppSelector(state => state.pokemonAllStore.typeDetails);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (pokemonAll.length === 0) {
            dispatch(pokemonAllActions.loadAllPokemonSearch());
        }
    }, [dispatch, pokemonAll.length]);

    const registerHandle: SubmitHandler<FormData> = (data) => {
        const searchNamePokemon = pokemonAll.find(value => value.name === data.nameForm);
        if (searchNamePokemon) {
            navigate(`/pokemon/${searchNamePokemon.name}`);
        } else if (abilitiesDetails.find(value => value.name === data.nameForm)){
            const searchAbility = abilitiesDetails.find(value => value.name === data.nameForm)
            if (searchAbility) {
                navigate(`/ability/${searchAbility.name}`);
            }
        } else if (typeDetails.find(value => value.name === data.nameForm)){
            const searchType = typeDetails.find(value => value.name === data.nameForm)
            if (searchType) {
                navigate(`/type/${searchType.name}`);
            }
        }
    };

    return (
        <div className={'div_base'}>
            <div className={'div_logo'}>
                <img className={'img_logo'} alt={'img'} src={'https://i.pinimg.com/originals/34/c1/e5/34c1e5d371d64a581b1902ec5c4509f4.png'} />

                <form  onSubmit={handleSubmit(registerHandle)}>
                    <label>
                        <input
                            type="text"
                            {...register('nameForm')}
                            placeholder="Enter the name or type or ability"
                            className={'input_search'}
                        />
                    </label>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};
export default MainLayout;
