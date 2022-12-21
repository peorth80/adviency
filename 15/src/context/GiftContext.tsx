import create from "zustand";
import { iGift, iGifts } from "../interfaces/iGift";
import { v4 as uuidv4 } from 'uuid';

const giftStore = create<iGifts>(
    (set) => (
        {
            gifts: [] as iGift[],

            addGift: (gift: iGift) => {
                gift.id = uuidv4();
                set(
                    (state) => ({
                        gifts: [...state.gifts, gift]
                    })
                )
            }
        }
    )
);

export const useGiftStore = giftStore;