import React from 'react';
import {Outlet} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../redux/store";

const MainLayout = () => {
    const {handleSubmit, register} = useForm();
    const pokemon = useAppSelector(state => state.pokemonAllStore.pokemon);
    const dispatch = useAppDispatch();


    // useEffect(() => {
    //     pokemon.forEach(value => {
    //         dispatch(pokemonAllActions.loadPokemonOne(value.name));
    //     });
    // }, [pokemon, dispatch]);
    const registerHandle = () => {
        // pokemon.forEach(value => {
        //   if(value.name === formProps){
        //       dispatch(pokemonAllActions.loadPokemonOne(value.name));
        //   }
        //     // dispatch(pokemonAllActions.loadPokemonOne(value.name));
        // });

        console.log()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(registerHandle)}>
                <label>
                    <input type={"text"} {...register('nameForm')} placeholder={'Enter the name of the pokemon or species or ability'}
                              className='input_FormComponent'/>
                </label>
                <button>Search</button>
            </form>


            <Outlet/>
        </div>
    );
};

export default MainLayout;