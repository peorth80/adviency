export interface iGift {
    id: string,
    name: string,
    amount: number,
    image: string,
    owner: string,
    price: number
}

export interface iGifts {
    gifts: iGift[],
    giftToEdit: iGift,
    add: (gift: iGift) => void,
    delete: (id: string) => void,
    edit: (gift: iGift) => void
    deleteAll: () => void
    setGiftToEdit: (gift: iGift) => void
}