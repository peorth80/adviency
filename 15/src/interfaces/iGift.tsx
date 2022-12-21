export interface iGift {
    id: string,
    name: string,
    amount: number,
    image: string,
    owner: string
}

export interface iGifts {
    gifts: iGift[],
    addGift: (gift: iGift) => void
}