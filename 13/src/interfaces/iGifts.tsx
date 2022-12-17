export interface iGift {
    id: string,
    name: string,
    amount: number,
    image: string
    owner: string,
}

export interface iGifts {
    gifts: iGift[],
    onEdit: Function,
    onDelete: Function,
    onShow: Function
}