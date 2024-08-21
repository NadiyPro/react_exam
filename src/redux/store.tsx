import {configureStore} from "@reduxjs/toolkit";
import {abilitiesSlice} from "./slices/abilitiesSlice";
import {useDispatch, useSelector} from "react-redux";


export const store = configureStore({
    reducer: {
        abilityStore: abilitiesSlice.reducer
    }
});

export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();