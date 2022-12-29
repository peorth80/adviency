import create from 'zustand'
import { persist } from 'zustand/middleware';
import { iGift, iGifts } from "../interfaces/iGift";
import { v4 as uuidv4 } from 'uuid';

const giftStore = create<iGifts>()(
    persist(
        (set, get) => (
            {
                gifts: [] as iGift[],
                giftToEdit: { amount: 0, id: "", image: "", name: "", owner: "", price: 0 } as iGift,
                add: (gift: iGift) => {
                    gift.id = uuidv4();
                    set(
                        (state) => ({ gifts: [...state.gifts, gift] })
                    );
                },

                edit: (gift: iGift) => {
                    set(
                        state => ({ gifts: state.gifts.map(s => s.id == gift.id ? gift : s) })
                    )
                },

                deleteAll: () => {
                    set(
                        state => ({ gifts: [] })
                    )
                },

                delete: (id: string) => {
                    set(
                        state => ({ gifts: state.gifts.filter(s => s.id != id) })
                    )
                },

                setEditingGift: (gift: iGift) => {
                    set(
                        state => ({ giftToEdit: gift })
                    )
                },
                giftToDelete: "",
                setDeletingGift: (id: string) => {
                    set(
                        ({ giftToDelete: id })
                    )
                }
            })
        , { name: "gifts" })
);

export default giftStore;