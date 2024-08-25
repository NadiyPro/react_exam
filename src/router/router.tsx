import ErrorElement from "../layout/ErrorElement";
import {createBrowserRouter} from "react-router-dom";
import React from "react";
import MainLayout from "../layout/MainLayout";
import PokemonAllComponent from "../page/PokemonAllComponent";
import PokemonId from "../page/PokemonId";
import SpeciesPokemon from "../page/EvolutionPokemon";
import SearchAbility from "../page/SearchAbility";
import SearchType from "../page/SearchType";



export const router = createBrowserRouter(
    [
        {
            path:'/',
            element: <MainLayout/>,
            errorElement:<ErrorElement/>,
            children: [
                {index: true, element: <PokemonAllComponent/>},
                {path:'/pokemon/:name', element: <PokemonId/>},
                {path:'/evolution-chain/:id', element: <SpeciesPokemon/>},
                {path:'/ability/:ability', element: <SearchAbility/>},
                {path:'/type/:type', element: <SearchType/>}
            ]
        }
    ]
)