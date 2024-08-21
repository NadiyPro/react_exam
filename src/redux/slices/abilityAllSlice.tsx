import { IAbilityAll } from '../../models/IAbilityAll';
interface AbilityState {
    abilities: IAbilityAll[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    offset: number;
    limit: number;
}

const initialState: AbilityState = {
    abilities: [],
    status: 'idle',
    error: null,
    offset: 0,
    limit: 20,
};
