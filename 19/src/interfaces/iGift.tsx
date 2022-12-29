export type iGift = {
    name: string,
    id: string,
    owner: string,
    image: string,
    price: number,
    amount: number
}

export type iGifts = {
    gifts: iGift[],
    giftToEdit: iGift,
    giftToDelete: string,
    add: (gift: iGift) => void,
    edit: (gift: iGift) => void,
    deleteAll: () => void,
    delete: (id: string) => void,
    setEditingGift: (gift: iGift) => void
    setDeletingGift: (id: string) => void
}

export function createEmptyObject<iGift>() {
    return { amount: 1, price: 1, name: "", owner: "", image: "", id: "" } as iGift;    //ya se que esta mal, pero dejenme ser
}

