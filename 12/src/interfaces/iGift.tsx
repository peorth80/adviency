export interface iGift {
    name: string,
    amount: number,
    image: string,
    recipient: string,
}


export interface iGifts {
    gifts: iGift[],
    onDelete: Function
}