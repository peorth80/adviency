import create from 'zustand'
import { persist } from 'zustand/middleware';
import { iGift, iGifts } from "../interfaces/iGift";
import { v4 as uuidv4 } from 'uuid';

const giftStore = create<iGifts>()(
    persist(
        (set, get) => (
            {
                gifts: [] as iGift[],
                giftToEdit: { amount: 0, id: "", image: "", name: "", owner: "", price: 0 },
                add: (gift: iGift) => {
                    gift.id = uuidv4();
                    set(
                        (state) => ({ gifts: [...state.gifts, gift] })
                    );
                },
                delete: (id: string) => {
                    set
                        (
                            state => ({ gifts: state.gifts.filter(x => x.id != id) })
                        )
                },
                edit: (gift: iGift) => {
                    set(
                        state => ({ gifts: state.gifts.map(x => (x.id == gift.id) ? gift : x) })
                    )
                },
                setEditingGift: (gift: iGift) => {
                    set(
                        state => ({ editingGift: gift })
                    )
                },
                deleteAll: () => {
                    set(
                        state => ({ gifts: [] })
                    )
                },
                editingGift: { id: "", amount: 1, image: "", name: "", owner: "", price: 1 } as iGift
            })
        , { name: "gifts" })
);

export default giftStore;

