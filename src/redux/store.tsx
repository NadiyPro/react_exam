import {configureStore} from "@reduxjs/toolkit";
import {abilityAllSlice} from "./slices/abilityAllSlice";
import {useDispatch, useSelector} from "react-redux";


export const store = configureStore({
    reducer: {
        abilityStore: abilityAllSlice.reducer
    }
});

export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();