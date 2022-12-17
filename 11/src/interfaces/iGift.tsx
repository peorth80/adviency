export interface iGift {
    name: string,
    amount: number,
    image: string,
    onDelete: Function
}

export interface iGifts {
    array: iGift[]
    onDelete: Function
}