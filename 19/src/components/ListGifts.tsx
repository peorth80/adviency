import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, HStack, Image, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import giftStore from "../context/GiftStore"
import { iGift } from "../interfaces/iGift"

export const ListGifts = () => {
    const gifts = giftStore(s => s.gifts);
    const fnDeleteAll = giftStore(s => s.deleteAll);

    if (gifts.length == 0)
        return <Text>No hay regalos</Text>

    const handleDeleteAll = () => {
        fnDeleteAll();
    }

    return (
        <Box>
            {gifts.map(x => {
                return <GiftLine gift={x}></GiftLine>
            })}
            <ConfirmModal></ConfirmModal>
            <Total gifts={gifts}></Total>
            <Button onClick={handleDeleteAll} colorScheme="red" w="100%" mt={3}>Borrar todos los regalos</Button>
        </Box>

    )
}

type iGiftsListProps = {
    gifts: iGift[]
}

type iGiftProps = {
    gift: iGift
}



const GiftLine = ({ gift }: iGiftProps) => {
    const fnSetEditingGift = giftStore(s => s.setEditingGift);
    const fnSetDeletingGift = giftStore(s => s.setDeletingGift);

    const handleDuplicate = (gift: iGift) => {
        const dupeGift = {
            id: "",
            name: gift.name,
            amount: 1,
            price: gift.price,
            owner: "",
            image: gift.image
        } as iGift
        fnSetEditingGift(dupeGift);
    }

    const handleEdit = (gift: iGift) => {
        fnSetEditingGift(gift);
    }

    const handleDelete = (gift: iGift) => {
        fnSetDeletingGift(gift.id);
    }

    return (
        <HStack p={2}>
            <Image src={gift.image} w="50"></Image>
            <Text>{gift.amount} {gift.name} para {gift.owner}</Text>
            <Text fontSize="sm">${gift.price} (${gift.amount * gift.price})</Text>
            <Spacer></Spacer>
            <Button colorScheme="green" size="sm" onClick={() => handleEdit(gift)}>E</Button>
            <Button colorScheme="orange" size="sm" onClick={() => handleDuplicate(gift)}>D</Button>
            <Button colorScheme="red" size="sm" onClick={() => { handleDelete(gift) }}>X</Button>
        </HStack>
    )
}

const Total = ({ gifts }: iGiftsListProps) => {
    let total = 0;
    gifts.map(s => total += s.amount * s.price)

    return (
        <Flex borderTop="1px solid black" justifyContent="right">
            Total: ${total}
        </Flex>
    )
}


const ConfirmModal = () => {
    const giftToDelete = giftStore(s => s.giftToDelete);
    const fnSetDeletingGift = giftStore(s => s.setDeletingGift);

    useEffect(() => {
        if (giftToDelete != "")
            onOpen();
    }, [giftToDelete])

    const { isOpen, onOpen, onClose } = useDisclosure();

    const fnDelete = giftStore(s => s.delete);
    const cancelRef = React.useRef(null)

    const handleDelete = () => {
        fnDelete(giftToDelete);
        onClose();
    }

    const handleClose = () => {
        fnSetDeletingGift("");
        onClose();
    }

    return (
        < AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={handleClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Borrar regalo
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Borramos el regalo?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='red' onClick={handleDelete} ml={3}>
                            Borrar
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog >)
}