import create from 'zustand'
import { persist } from 'zustand/middleware';
import { createEmptyGift, iGift, iGifts } from "../interfaces/iGift";
import { v4 as uuidv4 } from 'uuid';

const giftStore = create<iGifts>()(
    persist(
        (set, get) => (
            {
                gifts: [] as iGift[],
                idToDelete: "",
                editingGift: createEmptyGift(),
                add: (gift: iGift) => {
                    gift.id = uuidv4();
                    set(
                        (state) => ({ gifts: [...state.gifts, gift] })
                    );
                },
                setEditingGift: (g: iGift) => {
                    set(
                        state => ({ editingGift: g })
                    )
                },
                delete: (id: string) => {
                    set(
                        state => ({ gifts: state.gifts.filter(g => g.id != id) })
                    )
                },
                edit: (gift: iGift) => {
                    set(
                        state => ({ gifts: state.gifts.map(g => (g.id == gift.id) ? gift : g) })
                    )
                },
                deleteAll: () => {
                    set(
                        () => ({ gifts: [] })
                    )
                },

                modalPreviewOpen: false,
                setModalPreviewOpen: (open: boolean) => {
                    set(
                        () => ({ modalPreviewOpen: open })
                    )
                }
            })
        , { name: "gifts" })
);

export default giftStore;