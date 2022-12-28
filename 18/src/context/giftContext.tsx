import create from 'zustand'
import { persist } from 'zustand/middleware';
import { iGift, iGifts } from "../interfaces/iGift";
import { v4 as uuidv4 } from 'uuid';

const giftStore = create<iGifts>()(
    persist(
        (set, get) => (
            {
                gifts: [] as iGift[],
                add: (gift: iGift) => {
                    gift.id = uuidv4();
                    set(
                        (state) => ({ gifts: [...state.gifts, gift] })
                    );
                },
                delete: (id: string) => {
                    set(
                        state => ({ gifts: state.gifts.filter(s => s.id != id) })
                    )
                },
                deleteAll: () => {
                    set(
                        state => ({ gifts: [] })
                    )

                },
                edit: (gift: iGift) => {
                    set(
                        state => ({ gifts: state.gifts.map(s => gift.id == s.id ? gift : s) })
                    )
                },
                setEditingGift: (gift: iGift) => {
                    set(
                        state => ({ editingGift: gift })
                    )
                },
                editingGift: { id: "", amount: 1, price: 1, image: "", name: "", owner: "" } as iGift
            })
        , { name: "gifts" })
);

export default giftStore;



