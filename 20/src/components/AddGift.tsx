import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Box, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { emptyGift, iGift } from "../interfaces/iGift"
import { randomGifts } from '../data/random.json';
import giftStore from "../context/GiftStore";

export const AddGift = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef(null)
    const fnAdd = giftStore(s => s.add);
    const fnEdit = giftStore(s => s.edit);
    const fnSetEditingGift = giftStore(s => s.setEditingGift);
    const editingGift = giftStore(s => s.giftToEdit);

    const [gift, setGift] = useState<iGift>(emptyGift);

    const handleRandom = () => {
        const rnd = Math.floor(Math.random() * (randomGifts.length - 0));

        setGift({ ...gift, name: randomGifts[rnd] });
    }

    useEffect(
        () => {
            if (editingGift.name != "") {
                setGift(editingGift);
                onOpen();
            }
        }, [editingGift]
    )

    const handleOpen = () => {
        fnSetEditingGift(emptyGift);
        setGift(emptyGift);
        onOpen();
    }

    const handleClose = () => {
        fnSetEditingGift(emptyGift);
        onClose();
    }

    const handleAdd = () => {
        if (gift.name != "" && gift.price > 0 && gift.amount > 0) {
            fnAdd(gift);
            handleClose();
        }
    }

    const handleEdit = () => {
        if (gift.name != "" && gift.price > 0 && gift.amount > 0) {
            fnEdit(gift);
            handleClose();
        }
    }

    return (
        <>
            <Button ref={btnRef} colorScheme='green' onClick={handleOpen} w="100%">
                Agregar regalo
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={handleClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Regalos</DrawerHeader>

                    <DrawerBody>
                        <Button onClick={handleRandom} colorScheme="yellow" w="100%" m={2} disabled={gift.id != ""}>Randomazzo</Button>
                        <Input placeholder='Regalo' onChange={(e: any) => setGift({ ...gift, name: e.target.value })} m={2} defaultValue={gift.name} />
                        <Input placeholder='Due#o' onChange={(e: any) => setGift({ ...gift, owner: e.target.value })} m={2} defaultValue={gift.owner} />

                        <HStack p={2}>
                            <NumberInput defaultValue={gift.amount} min={1} onChange={(n: any) => setGift({ ...gift, amount: n })}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>

                            <NumberInput defaultValue={gift.price} min={1} onChange={(n: any) => setGift({ ...gift, price: n })}>
                                <NumberInputField />
                            </NumberInput>

                        </HStack>
                        <Input placeholder='Image' onChange={(e: any) => setGift({ ...gift, image: e.target.value })} m={2} defaultValue={gift.image} />

                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        {gift.id == "" &&
                            <Button colorScheme='blue' onClick={handleAdd}>Agregar</Button>
                        }
                        {gift.id != "" &&
                            <Button colorScheme='green' onClick={handleEdit}>Editar</Button>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}