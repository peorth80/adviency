import create from "zustand";
import { persist } from 'zustand/middleware';
import { iGift, iGifts } from "../interfaces/iGift";
import { v4 as uuidv4 } from 'uuid';

const giftStore = create<iGifts>()(
    persist((set) => (
        {
            gifts: [] as iGift[],
            giftToEdit: { amount: 0, id: "", image: "", name: "", owner: "" },
            setGiftToEdit: (gift: iGift) => {
                set(
                    () => ({
                        giftToEdit: gift
                    })
                )
            },
            addGift: (gift: iGift) => {
                gift.id = uuidv4();
                set(
                    (state) => ({
                        gifts: [...state.gifts, gift]
                    })
                )
            },

            deleteGift(gift) {
                set(
                    state => ({
                        gifts: [...state.gifts.filter(x => x.id != gift.id)]
                    })
                )
            },

            editGift(gift) {
                set(
                    state => ({
                        gifts: [...state.gifts.map(x => {
                            return (x.id == gift.id) ? gift : x;
                        })]
                    })
                )
            },

            setGifts(allgifts) {
                set(
                    () => ({
                        gifts: allgifts
                    })
                )
            },

            deleteAllGifts() {
                set(
                    () => ({
                        gifts: []
                    })
                )
            },
        }
    ), { name: "gifts" }),
);

export const useGiftStore = giftStore;