import { useGiftStore } from "../context/GiftContext";

export const ListGifts = () => {
    const gifts = useGiftStore(state => state.gifts);

    const items =
        gifts.map(i => {
            return (i.name + i.id + <br />)
        });

    return (
        <ul>
            {items}
        </ul>
    )
}