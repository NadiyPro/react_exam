export interface IPokemonPagNameUrl{
    count: number
    next: string
    previous: any
    results: IPokemonNameUrl[]
}

export interface IPokemonNameUrl {
    name: string
    url: string
}