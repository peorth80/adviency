import React, { useEffect, useState } from "react";
import { iGift, iGifts } from "../interfaces/iGift";
import create from 'zustand'

export const useGiftStore = create<iGifts>((set, get) => ({
    gifts: [],
    editingGift: { id: "", name: "", amount: 0, image: "", owner: "" },
    addGift: (gift: iGift) => {
        const newGift = {
            name: gift.name,
            amount: gift.amount,
            owner: gift.owner,
            id: gift.id,
            image: gift.image
        } as iGift;

        set((state) => ({
            gifts: [
                ...state.gifts, newGift
            ]
        }))

        localStorage.setItem("gifts",
            JSON.stringify(get().gifts)
        );
    },

    deleteGift: (gift: iGift) => {
        set(
            (get) => ({
                gifts: get.gifts.filter(i => i.id != gift.id)
            })
        )

        localStorage.setItem("gifts",
            JSON.stringify(get().gifts)
        );
    },

    updateGift: (gift: iGift) => {
        set(
            (get) => (
                {
                    gifts: get.gifts.map(i => {
                        if (i.id == gift.id) {
                            return gift
                        } else {
                            return i;
                        }
                    })
                }
            )
        )

        localStorage.setItem("gifts",
            JSON.stringify(get().gifts)
        );
    }
    ,

    deleteAll: () => {
        set(
            () => ({
                gifts: []
            })
        )

        localStorage.removeItem("gifts");
    },

    setEditItem: (gift: iGift) => {
        set(
            () => ({
                editingGift: gift
            })
        )
    },

    setGifts: (fullGifts: iGift[]) => {
        set(
            { gifts: fullGifts }
        )
    }
}));

//     const [gifts, setGifts] = useState<iGift[]>(() => {
//         const localGifts = localStorage.getItem("gifts");
//         return localGifts ? JSON.parse(localGifts) : [];
//     })

//     const addGift = (gift: iGift) => {
//         setGifts([...gifts, gift]);
//     }

//     const deleteGift = (gift: iGift) => {
//         setGifts(gifts.filter(i => i.id != gift.id));
//     }

//     const deleteAll = () => {
//         setGifts([]);
//     }

//     const updateGift = (gift: iGift) => {
//         gifts.map(i => {
//             i.id === gift.id ? gift : i
//         });
//     }

//     useEffect(() => {
//         if (gifts && gifts.length > 0)
//             localStorage.setItem("gifts", JSON.stringify(gifts));
//         else
//             localStorage.removeItem("gifts");
//     }, [gifts])


//     return (
//         <GiftContext.Provider value={{
//             gifts,
//             addGift,
//             deleteGift,
//             updateGift,
//             deleteAll
//         }}
//         >{children}</GiftContext.Provider>
//     )
// });

// export default GiftStore;