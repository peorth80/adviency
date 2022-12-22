export interface iGift {
    id: string,
    name: string,
    amount: number,
    image: string,
    owner: string
}

export interface iGifts {
    gifts: iGift[],
    addGift: (gift: iGift) => void,
    editGift: (gift: iGift) => void,
    deleteGift: (gift: iGift) => void,
    setGifts: (gifts: iGift[]) => void,

    giftToEdit: iGift,
    setGiftToEdit: (gifts: iGift) => void,

    deleteAllGifts: () => void
}