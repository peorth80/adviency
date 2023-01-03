import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import giftStore from "../context/giftStore"
import { createEmptyGift, iGift } from "../interfaces/iGift"
import { randomGifts } from '../data/randomgifts.json'

export const AddGift = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef(null)
    const [gift, setGift] = useState<iGift>(createEmptyGift);
    const fnAdd = giftStore(s => s.add);
    const fnEdit = giftStore(s => s.edit);
    const editingGift = giftStore(s => s.editingGift);
    const fnSetEditingGift = giftStore(s => s.setEditingGift);


    const handleOpen = () => {
        setGift(createEmptyGift);
        fnSetEditingGift(createEmptyGift());
        onOpen();
    }

    const handleClose = () => {
        setGift(createEmptyGift);
        fnSetEditingGift(createEmptyGift());
        onClose();
    }

    const handleEdit = () => {
        if (gift.name != "" && gift.amount > 0 && gift.price > 0) {
            fnEdit(gift);
            setGift(createEmptyGift);
            handleClose();
        }
    }

    useEffect(() => {
        if (editingGift.name != "") {
            setGift(editingGift);
            onOpen();
        }
    }, [editingGift])

    const handleAdd = () => {
        if (gift.name != "" && gift.amount > 0 && gift.price > 0) {
            fnAdd(gift);
            setGift(createEmptyGift);
            handleClose();
        }
    }

    const handleRandomGift = () => {
        const rnd = Math.floor(Math.random() * (randomGifts.length - 0));

        setGift({ ...gift, name: randomGifts[rnd] });
    }


    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={handleOpen} w="100%">
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
                        <Button colorScheme="purple" onClick={handleRandomGift} w="100%">Sugerir</Button>
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
                        <Button variant='outline' mr={3} onClick={handleClose}>
                            Cancelar
                        </Button>
                        {gift.id == "" &&
                            <Button colorScheme='blue' onClick={handleAdd}>Agregar</Button>
                        }
                        {gift.id != "" &&
                            <Button colorScheme='blue' onClick={handleEdit}>Editar</Button>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}