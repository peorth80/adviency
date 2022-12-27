import { Box, HStack, Text, Image, Spacer, Button, Flex } from "@chakra-ui/react"
import giftStore from "../context/GiftStorage"
import { iGift, iGifts } from "../interfaces/iGift"

export const ListGifts = () => {
    const gifts = giftStore(s => s.gifts);

    const fnDeleteAll = giftStore(s => s.deleteAll);

    const handleDeleteAll = () => {
        fnDeleteAll();
    }

    if (gifts.length == 0)
        return <Text>No hay regalos</Text>
    else {
        return (
            <Box>
                {gifts.map(i => {
                    return <SingleGift gift={i} key={i.id}></SingleGift>
                })}

                <ShowTotals gifts={gifts}></ShowTotals>
                <Button colorScheme="red" onClick={handleDeleteAll} w="100%">Borrar todos los regalos</Button>
            </Box>
        )
    }
}

interface iTotalProps {
    gifts: iGift[]
}

const ShowTotals = (gifts: iTotalProps) => {
    let total = 0;

    const listOfGifts = gifts.gifts;

    listOfGifts.map(x => total += x.amount * x.price);

    return (
        <Flex justifyContent="right" borderTop={"1px solid black"}>
            <Text>Total: ${total}</Text>
        </Flex>
    )
}

interface iSingleGiftProps {
    gift: iGift
}

const SingleGift = (gift: iSingleGiftProps) => {
    const line = gift.gift;

    const fnDelete = giftStore(s => s.delete);
    const fnSetEditingGift = giftStore(s => s.setEditingGift)

    const handleDelete = (gift: iGift) => {
        fnDelete(gift.id);
    }

    const handleEdit = (gift: iGift) => {
        fnSetEditingGift(gift);
    }

    return (
        <HStack p={2}>
            <Image src={line.image} w="50"></Image>
            <Text>{line.amount} x {line.name} (${line.price}) para {line.owner}</Text>
            <ShowPrice gift={line}></ShowPrice>
            <Spacer></Spacer>
            <Button size="sm" colorScheme="green" onClick={() => handleEdit(line)}>E</Button>
            <Button size="sm" colorScheme="red" onClick={() => handleDelete(line)}>X</Button>
        </HStack>
    )
}

const ShowPrice = (gift: iSingleGiftProps) => {
    const line = gift.gift;

    return (
        <Text>${line.amount * line.price}</Text>
    )
}