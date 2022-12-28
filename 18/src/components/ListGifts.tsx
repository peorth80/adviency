import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, HStack, Image, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react"
import React from "react"
import giftStore from "../context/giftContext"
import { iGift } from "../interfaces/iGift"


interface iGiftProp {
    gift: iGift
}
interface iGiftsProps {
    gifts: iGift[]
}

export const ListGifts = () => {
    const gifts = giftStore(s => s.gifts);
    const fnDeleteAll = giftStore(s => s.deleteAll);

    if (gifts.length == 0)
        return <Text>No hay regalos</Text>

    const handleDeleteAll = () => {
        fnDeleteAll();
    }

    return (
        <Box pt={2}>
            {gifts.map(i => {
                return <GiftLine gift={i} key={i.id}></GiftLine>
            })}
            <TotalPrice gifts={gifts}></TotalPrice>
            <Button colorScheme="red" w="100%" onClick={handleDeleteAll}>Borrar todos los regalos</Button>
        </Box>
    )
}

const GiftLine = ({ gift }: iGiftProp) => {

    const fnSetEditingGift = giftStore(s => s.setEditingGift);
    const fnDelete = giftStore(s => s.delete);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef(null)

    const handleDelete = (id: string) => {
        fnDelete(id);
    }

    const handleEdit = (gift: iGift) => {
        fnSetEditingGift(gift);
    }

    return (
        <>
            <HStack>
                <Image src={gift.image} w="30"></Image>
                <VStack align="left">
                    <Text>{gift.name} para {gift.owner}</Text>
                    <LinePrice gift={gift}></LinePrice>
                </VStack>
                <Spacer></Spacer>
                <Button colorScheme="green" size="sm" onClick={() => handleEdit(gift)}>E</Button>
                <Button colorScheme="red" size="sm" onClick={onOpen}>X</Button>
            </HStack>

            <AlertDialog
                leastDestructiveRef={cancelRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Borrar regalo
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Estas seguro?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' onClick={() => handleDelete(gift.id)} ml={3}>
                                Borrar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

const TotalPrice = ({ gifts }: iGiftsProps) => {
    let total = 0;
    gifts.map(s => total += (s.amount * s.price));

    return <Flex borderTop="1px solid black" justifyContent="right"><Text>Total: ${total}</Text></Flex>
}


const LinePrice = ({ gift }: iGiftProp) => {
    return <Text fontSize="sm">${gift.price} (x {gift.amount})</Text>
}