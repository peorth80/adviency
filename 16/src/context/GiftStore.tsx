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
                }
            })
        , { name: "gifts" })
);

export default giftStore;



