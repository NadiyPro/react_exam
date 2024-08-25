import React, { useEffect} from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { pokemonAllActions } from "../redux/slices/pokemonAllSlice";

interface FormData {
    nameForm: string;
}

const MainLayout = () => {
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm<FormData>();
    const pokemonAll = useAppSelector(state => state.pokemonAllStore.pokemonAll);
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
        } else {
            alert('No Pokémon found with that name');
        }
        // const searchAbility =
    };

    return (
        <div>
            <form onSubmit={handleSubmit(registerHandle)}>
                <label>
                    <input
                        type="text"
                        {...register('nameForm')}
                        placeholder="Enter the name of the pokemon or species or ability"
                        className="input_FormComponent"
                    />
                </label>
                <button type="submit">Search</button>
            </form>
            <Outlet />
        </div>
    );
};
export default MainLayout;
