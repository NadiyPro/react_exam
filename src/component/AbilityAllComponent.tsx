import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {abilityActions} from "../redux/slices/abilitiesSlice";

const AbilityAllComponent = () => {
    const abilities = useAppSelector(state => state.abilityStore.abilities);
    const offset = useAppSelector(state => state.abilityStore.offset);
    const limit = useAppSelector(state => state.abilityStore.limit);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(abilityActions.loadAbility({offset, limit}))
    }, [dispatch, offset, limit]);

    const nextPage = () => {
        dispatch(abilityActions.setOffset(offset + limit));
    };

    const prevPage = () => {
        if (offset > 0) {
            dispatch(abilityActions.setOffset(offset - limit));
        }
    };

    return (
        <div>

                {abilities.map(ability => <div>
                    {ability.name} {ability.url}
                    </div>

                )}

            {/* Кнопки для переключения страниц */}
            <button onClick={prevPage} disabled={offset === 0}>
                Previous
            </button>
            <button onClick={nextPage}>
                Next
            </button>
        </div>
    );
};

export default AbilityAllComponent;