import { Box, Button, HStack, Icon, Image, Spacer, Text } from "@chakra-ui/react";
import { useStore } from "zustand"
import giftStore from "../context/GiftStore"
import { StarIcon } from "@chakra-ui/icons";
import { ShowPrice } from "./Price";
import { Total } from "./Total";
import { iGift } from "../interfaces/iGift";

export const ListGifts = () => {
    const gifts = giftStore(x => x.gifts);

    const fnDelete = giftStore(x => x.delete);
    const fnDeleteAll = giftStore(x => x.deleteAll);
    const fnSetGiftToEdit = giftStore(x => x.setGiftToEdit);

    const handleDelete = (gift: iGift) => {
        fnDelete(gift.id);
    }

    const handleDeleteAll = () => {
        fnDeleteAll();
    }

    const handleEdit = (gift: iGift) => {
        fnSetGiftToEdit(gift);
    }

    if (gifts.length == 0) {
        return <Text>No hay regalos</Text>
    } else
        return (
            <Box>
                {gifts.map(i => {
                    return (
                        <HStack key={i.id} padding={2}>
                            <Icon as={StarIcon}></Icon>
                            <Image src={i.image} w="30"></Image>
                            <Text>{i.name} x {i.amount}</Text>
                            <Text fontSize="sm">({i.owner}) </Text>
                            <ShowPrice price={i.price} amount={i.amount}></ShowPrice>
                            <Spacer></Spacer>
                            <Button size="sm" colorScheme="green" onClick={() => handleEdit(i)}>E</Button>
                            <Button size="sm" colorScheme="red" onClick={() => handleDelete(i)}>X</Button>
                        </HStack>
                    );
                })}
                <Total gifts={gifts}></Total>
                <Button colorScheme="red" w="100%" onClick={handleDeleteAll}>Borrar todo</Button>
            </Box>
        )
}