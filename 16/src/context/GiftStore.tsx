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
                delete: (id) => {
                    set(
                        (state) => ({ gifts: state.gifts.filter(x => x.id != id) })
                    )
                },
                deleteAll: () => {
                    set(
                        () => ({ gifts: [] })
                    )
                },
                edit: (gift: iGift) => {
                    set(
                        (state) => ({
                            gifts: state.gifts.map(x => {
                                return (x.id == gift.id) ? gift : x;
                            }
                            )
                        })
                    )

                }
                ,
                setGiftToEdit: (gift: iGift) => {
                    set(
                        () => ({ giftToEdit: gift })
                    )
                },
            })
        , { name: "gifts" })
);

export default giftStore;



