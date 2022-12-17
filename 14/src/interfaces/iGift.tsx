export interface iGift {
    id: string,
    name: string,
    amount: number,
    owner: string,
    image: string
}

export interface iGifts {
    gifts: iGift[],
    editingGift: iGift,

    addGift: (gift: iGift) => void,
    deleteGift: (gift: iGift) => void,
    updateGift: (gift: iGift) => void,
    deleteAll: () => void

    setEditItem: (gift: iGift) => void

    setGifts: (allGifts: iGift[]) => void
}