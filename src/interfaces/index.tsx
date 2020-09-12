export interface IBeer {
    id: string,
    name: string,
    tagline: string,
    first_brewed: string,
    image_url: string
}

export interface IBeerModal extends IBeer {
    description: string, 
    abv: number, 
    ingredients: any[], 
    food_pairings: string[], 
}