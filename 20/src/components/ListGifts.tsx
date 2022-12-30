import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, HStack, Image, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import giftStore from "../context/GiftStore"
import { iGift } from "../interfaces/iGift";

export const ListGifts = () => {
    const gifts = giftStore(s => s.gifts);
    const fnDeleteAll = giftStore(s => s.deleteAll);
    const fnShowPreviewModal = giftStore(s => s.setShowPreviewModal);

    if (gifts.length == 0)
        return <Text>No hay regalos</Text>

    const handleDeleteAll = () => {
        fnDeleteAll();
    }

    const handlePreviewGifts = () => {
        fnShowPreviewModal(true);
    }

    return (
        <>
            {gifts.map(s => <GiftLine gift={s} showControls={true}></GiftLine>)}

            <TotalLine gifts={gifts}></TotalLine>

            <Button colorScheme="gray" w="100%" mb={3} onClick={handlePreviewGifts}>Previsualizar los regalos</Button>
            <Button colorScheme="red" w="100%" onClick={handleDeleteAll}>Borrar todos los regalos</Button>

            <PreviewGifts gifts={gifts}></PreviewGifts>
        </>
    )
}

const PreviewGifts = ({ gifts }: iGiftsProp) => {
    const cancelRef = React.useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const showPreviewModal = giftStore(s => s.showPreviewModal);
    const setShowPreviewModal = giftStore(s => s.setShowPreviewModal);

    useEffect(() => {
        if (showPreviewModal) onOpen();
    }, [showPreviewModal]);

    const handleClose = () => {
        setShowPreviewModal(false);
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
                        Mostrar regalos
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {gifts.map(s => {
                            return <GiftLine gift={s} showControls={false}></GiftLine>
                        })}

                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={handleClose}>
                            Cerrar
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}


type iGiftProp = {
    gift: iGift,
    showControls: boolean
}

type iGiftsProp = {
    gifts: iGift[]
}

const GiftLine = ({ gift, showControls }: iGiftProp) => {
    const fnDelete = giftStore(s => s.delete);
    const fnSetEditingGift = giftStore(s => s.setEditingGift);

    const handleDelete = (id: string) => {
        fnDelete(id);
    }

    const handleDuplicate = (gift: iGift) => {
        const duplicatedGift = {
            id: "",
            amount: 1,
            price: gift.amount,
            name: gift.name,
            owner: "",
            image: gift.image
        } as iGift;

        fnSetEditingGift(duplicatedGift);
    }

    const handleEdit = (gift: iGift) => {
        fnSetEditingGift(gift);
    }

    return (
        <HStack key={gift.id}>
            <Image src={gift.image} w="30"></Image>
            <VStack>
                <Text>{gift.name} para {gift.owner}
                    {!showControls && <> ({gift.amount})</>}
                </Text>
                {showControls && <Text fontSize="sm">({gift.amount} x ${gift.price})</Text>}

            </VStack>
            <Spacer></Spacer>
            {showControls && <Text>${gift.amount * gift.price}</Text>}
            {showControls &&
                <>
                    <Button colorScheme="green" size="sm" onClick={() => handleEdit(gift)}>E</Button>
                    <Button colorScheme="orange" size="sm" onClick={() => handleDuplicate(gift)}>D</Button>
                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(gift.id)}>X</Button>
                </>
            }
        </HStack >
    )
}

const TotalLine = ({ gifts }: iGiftsProp) => {
    let total = 0;

    gifts.map(s => total += s.amount * s.price);

    return (
        <Flex borderTop="1px solid black" justifyContent="right" p={3}>
            Total: ${total}
        </Flex >
    )
}