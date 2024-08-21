export interface IAbilityAll{
    count: number
    next: string
    previous: any
    results: IAbilityNameUrl[]
}

export interface IAbilityNameUrl {
    name: string
    url: string
}