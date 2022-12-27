export interface iGift {
    id: string
    name: string,
    image: string,
    owner: string,
    amount: number,
    price: number
}

export interface iGifts {
    gifts: iGift[],
    add: (gift: iGift) => void,
    edit: (gift: iGift) => void,
    delete: (id: string) => void,
    deleteAll: () => void,

    editingGift: iGift,
    setEditingGift: (gift: iGift) => void
}