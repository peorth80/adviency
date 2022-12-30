import create from 'zustand'
import { persist } from 'zustand/middleware';
import { emptyGift, iGift, iGifts } from "../interfaces/iGift";
import { v4 as uuidv4 } from 'uuid';

const giftStore = create<iGifts>()(
    persist(
        (set, get) => (
            {
                gifts: [] as iGift[],
                giftToEdit: emptyGift as iGift,
                giftToDelete: "",
                showPreviewModal: false,

                add: (gift: iGift) => {
                    gift.id = uuidv4();
                    set(
                        (state) => ({ gifts: [...state.gifts, gift] })
                    );
                },
                delete: (id: string) => {
                    set(
                        (state) => ({ gifts: state.gifts.filter(s => s.id != id) })
                    )
                },
                edit: (g: iGift) => {
                    set(
                        state => ({ gifts: state.gifts.map(s => { return (s.id == g.id) ? g : s }) })
                    )

                },
                setEditingGift: (g: iGift) => {
                    set(
                        () => ({ giftToEdit: g })
                    )
                },
                setIdToDelete: (id: string) => {
                    set(
                        () => ({ giftToDelete: id })
                    )
                },
                deleteAll: () => {
                    set(
                        () => ({ gifts: [] })
                    )
                },

                setShowPreviewModal: (show: boolean) => {
                    set(
                        () => ({ showPreviewModal: show })
                    )
                }
            })
        , { name: "gifts" })
);


export default giftStore;