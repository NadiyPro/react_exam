export interface IStatDetail {
    id: number
    name: string
    game_index: number
    is_battle_only: boolean
    affecting_moves: AffectingMoves
    affecting_natures: AffectingNatures
    characteristics: Characteristic[]
    move_damage_class: MoveDamageClass
    names: Name[]
}

export interface AffectingMoves {
    increase: Increase[]
    decrease: Decrease[]
}

export interface Increase {
    change: number
    move: Move
}

export interface Move {
    name: string
    url: string
}

export interface Decrease {
    change: number
    move: Move2
}

export interface Move2 {
    name: string
    url: string
}

export interface AffectingNatures {
    increase: Increase2[]
    decrease: Decrease2[]
}

export interface Increase2 {
    name: string
    url: string
}

export interface Decrease2 {
    name: string
    url: string
}

export interface Characteristic {
    url: string
}

export interface MoveDamageClass {
    name: string
    url: string
}

export interface Name {
    name: string
    language: Language
}

export interface Language {
    name: string
    url: string
}