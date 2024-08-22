export interface IFormDetail {
    id: number
    name: string
    order: number
    form_order: number
    is_default: boolean
    is_battle_only: boolean
    is_mega: boolean
    form_name: string
    pokemon: Pokemon
    sprites: Sprites
    types: Type[]
    version_group: VersionGroup
}

export interface Pokemon {
    name: string
    url: string
}

export interface Sprites {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export interface Type {
    slot: number
    type: Type2
}

export interface Type2 {
    name: string
    url: string
}

export interface VersionGroup {
    name: string
    url: string
}
