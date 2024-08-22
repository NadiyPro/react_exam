export interface ITypeDetail {
    id: number
    name: string
    damage_relations: DamageRelations
    past_damage_relations: PastDamageRelation[]
    game_indices: Index[]
    generation: Generation3
    move_damage_class: MoveDamageClass
    names: Name[]
    pokemon: Pokemon[]
    moves: Mfe[]
}

export interface DamageRelations {
    no_damage_to: NoDamageTo[]
    half_damage_to: HalfDamageTo[]
    double_damage_to: DoubleDamageTo[]
    no_damage_from: NoDamageFrom[]
    half_damage_from: HalfDamageFrom[]
    double_damage_from: DoubleDamageFrom[]
}

export interface NoDamageTo {
    name: string
    url: string
}

export interface HalfDamageTo {
    name: string
    url: string
}

export interface DoubleDamageTo {
    name: string
    url: string
}

export interface NoDamageFrom {
    name: string
    url: string
}

export interface HalfDamageFrom {
    name: string
    url: string
}

export interface DoubleDamageFrom {
    name: string
    url: string
}

export interface PastDamageRelation {
    generation: Generation
    damage_relations: DamageRelations2
}

export interface Generation {
    name: string
    url: string
}

export interface DamageRelations2 {
    no_damage_to: NoDamageTo2[]
    half_damage_to: HalfDamageTo2[]
    double_damage_to: DoubleDamageTo2[]
    no_damage_from: NoDamageFrom2[]
    half_damage_from: HalfDamageFrom2[]
    double_damage_from: DoubleDamageFrom2[]
}

export interface NoDamageTo2 {
    name: string
    url: string
}

export interface HalfDamageTo2 {
    name: string
    url: string
}

export interface DoubleDamageTo2 {
    name: string
    url: string
}

export interface NoDamageFrom2 {
    name: string
    url: string
}

export interface HalfDamageFrom2 {
    name: string
    url: string
}

export interface DoubleDamageFrom2 {
    name: string
    url: string
}

export interface Index {
    game_index: number
    generation: Generation2
}

export interface Generation2 {
    name: string
    url: string
}

export interface Generation3 {
    name: string
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

export interface Pokemon {
    slot: number
    pokemon: Pokemon2
}

export interface Pokemon2 {
    name: string
    url: string
}

export interface Mfe {
    name: string
    url: string
}