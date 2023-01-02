import { AlertDialog, AlertDialogBody, Image, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, Heading, HStack, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import giftStore from "../context/giftStore"
import { iGift } from "../interfaces/iGift";

export const ListGifts = () => {
    const gifts = giftStore(s => s.gifts);
    const fnSetModalPreviewOpen = giftStore(s => s.setModalPreviewOpen);

    const fnDeleteAll = giftStore(s => s.deleteAll);

    const handlePreview = () => {
        fnSetModalPreviewOpen(true);
    }

    return (
        <>
            {gifts.length > 0 &&
                <>
                    {gifts.map(s => <GiftLine key={s.id} gift={s} showControls={true}></GiftLine>)}

                    <TotalLine gifts={gifts}></TotalLine>
                    <Button colorScheme="red" w="100%" onClick={fnDeleteAll}>Borrar todos los regalos</Button>
                    <Button colorScheme="gray" w="100%" onClick={handlePreview} mt={10}>Previsualizar</Button>
                    <ModalPreview></ModalPreview>
                </>
            }

            {gifts.length == 0 &&
                <>
                    <Text>No hay regalos</Text>
                </>
            }
        </>
    )
}



interface iGiftLine {
    gift: iGift
    showControls: Boolean
}

interface iGiftsList {
    gifts: iGift[]
}

const TotalLine = ({ gifts }: iGiftsList) => {
    let total = 0;

    gifts.map(s => total += s.amount * s.price);

    return (
        <Flex borderTop="1px solid black" justifyContent="right">
            <Text>Total: ${total}</Text>
        </Flex>
    )
}

const GiftLine = ({ gift, showControls }: iGiftLine) => {
    const fnSetEditingGift = giftStore(s => s.setEditingGift);
    const fnDelete = giftStore(s => s.delete);

    const handleEdit = (g: iGift) => {
        fnSetEditingGift(g);
    }

    const handleDuplicate = (g: iGift) => {
        const dup = {
            id: "",
            name: g.name,
            amount: 1,
            price: g.price,
            image: g.image,
            owner: ""
        } as iGift;

        fnSetEditingGift(dup);
    }

    const handleDelete = (id: string) => {
        fnDelete(id);
    }

    return (
        <HStack p={2}>
            <Image w="50" src={gift.image}></Image>
            <Text>{gift.amount} {gift.name} para {gift.owner}</Text>
            <Text fontSize="sm">(${gift.price} c/u)</Text>
            <Spacer></Spacer>
            <Text>${gift.price * gift.amount}</Text>
            <Spacer></Spacer>
            {showControls &&
                <>
                    <Button colorScheme="green" size="sm" onClick={() => handleEdit(gift)}>E</Button>
                    <Button colorScheme="orange" size="sm" onClick={() => handleDuplicate(gift)}>D</Button>
                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(gift.id)}>X</Button>
                </>
            }
        </HStack>
    )
}


const ModalPreview = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef(null)

    const gifts = giftStore(s => s.gifts);
    const modalPreviewOpen = giftStore(s => s.modalPreviewOpen);
    const fnSetModalPreviewOpen = giftStore(s => s.setModalPreviewOpen);

    const handlePrint = () => {
        window.print();
    }

    useEffect(() => {
        modalPreviewOpen ? onOpen() : onClose()
    }, [modalPreviewOpen])

    const handleClose = () => {
        fnSetModalPreviewOpen(false);
        onClose();
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={handleClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    </AlertDialogHeader>

                    <AlertDialogBody className="section-to-print">
                        <Heading className="section-to-print">Regalos</Heading>
                        {gifts.map(s => <GiftLine key={s.id} gift={s} showControls={false}></GiftLine>)}

                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='orange' onClick={handlePrint} ml={3}>
                            Imprimir
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
