export type iGift = {
    id: string,
    name: string,
    owner: string,
    image: string,
    price: number,
    amount: number
}

export type iGifts = {
    gifts: iGift[],
    editingGift: iGift,
    idToDelete: string,

    add: (g: iGift) => void,
    setEditingGift: (g: iGift) => void,
    delete: (id: string) => void,
    edit: (g: iGift) => void,
    deleteAll: () => void,

    modalPreviewOpen: boolean,
    setModalPreviewOpen: (open: boolean) => void,
}

export const createEmptyGift = () => {
    return {
        id: "",
        amount: 1,
        price: 1,
        owner: "",
        image: "",
        name: ""
    } as iGift
} 