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
    add: (g: iGift) => void,
    edit: (g: iGift) => void,
    delete: (id: string) => void,
    deleteAll: () => void,

    giftToEdit: iGift,
    setEditingGift: (g: iGift) => void,

    giftToDelete: string,
    setIdToDelete: (id: string) => void,

    showPreviewModal: boolean
    setShowPreviewModal: (show: boolean) => void
}

export const emptyGift = {
    id: "",
    amount: 1,
    image: "",
    name: "",
    owner: "",
    price: 1
} as iGift