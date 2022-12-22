import { Box, Button, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import { useGiftStore } from "../context/GiftContext";
import { iGift } from "../interfaces/iGift";

export const ListGifts = () => {
    const gifts = useGiftStore(state => state.gifts);
    const fnDeleteAll = useGiftStore(state => state.deleteAllGifts);
    const fnDeleteOne = useGiftStore(state => state.deleteGift);
    const fnSetEditingGift = useGiftStore(state => state.setGiftToEdit);
    const editingGift = useGiftStore(state => state.giftToEdit);

    const handleDelete = (gift: iGift) => {
        fnDeleteOne(gift);
    }

    const handleEditing = (gift: iGift) => {
        fnSetEditingGift(gift);
    }

    const items =
        gifts.map(i => {
            return (
                <HStack key={i.id} p={2}>
                    <Image src={i.image} w="50"></Image>
                    <VStack>
                        <Text>{i.name} ({i.amount})</Text>
                        <Text fontSize="sm">{i.owner}</Text>
                    </VStack>
                    <Spacer></Spacer>
                    <Button colorScheme="green" size="sm" onClick={() => handleEditing(i)}>E</Button>
                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(i)}>X</Button>
                </HStack>
            )
        });

    return (
        <Box>
            {items.length > 0 &&
                <Box>
                    {items}
                    <Button onClick={fnDeleteAll} colorScheme="red" w="100%">Borrar todos los regalos</Button>
                </Box>
            }

            {items.length == 0 && <Text>No hay regalos</Text>}
        </Box>
    )
}