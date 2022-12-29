import {
    useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader,
    DrawerBody, Input, DrawerFooter, NumberDecrementStepper, NumberIncrementStepper,
    NumberInput, NumberInputField, NumberInputStepper, Flex, HStack, Spacer, Text
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import giftStore from '../context/GiftStore';
import { createEmptyObject, iGift } from "../interfaces/iGift"
import { randomGifts } from '../data/gifts.json';

export const AddGift = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef(null)

    const [gift, setGift] = useState<iGift>(createEmptyObject<iGift>);
    const fnAdd = giftStore(s => s.add);
    const fnEdit = giftStore(s => s.edit);
    const fnSetEditingGift = giftStore(s => s.setEditingGift);
    const editingGift = giftStore(s => s.giftToEdit);

    useEffect(() => {
        if (editingGift.name != "") {
            setGift(editingGift);
            onOpen();
        }
    }, [editingGift])

    const handleOpen = () => {
        setGift(createEmptyObject<iGift>);

        onOpen();
    }

    const handleClose = () => {
        fnSetEditingGift(createEmptyObject<iGift>());
        onClose();
    }

    const handleAdd = () => {
        if (gift?.name != "" && gift?.price > 0 && gift?.amount > 0) {
            fnAdd(gift);
            handleClose();
        }
    }

    const handleEdit = () => {
        if (gift?.name != "" && gift?.price > 0 && gift?.amount > 0) {
            fnEdit(gift);
            handleClose();
        }

    }

    const handleRandom = () => {
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
                        <Button onClick={handleRandom} w="100%" colorScheme="yellow" disabled={editingGift.name != ""}>Randomazzo</Button>
                        <Input placeholder='Regalo' onChange={(e: any) => setGift({ ...gift, name: e.target.value } as iGift)} m={2} defaultValue={gift.name} />
                        <Input placeholder='Due#o' onChange={(e: any) => setGift({ ...gift, owner: e.target.value } as iGift)} m={2} defaultValue={gift.owner} />

                        <HStack p={2}>
                            <NumberInput defaultValue={gift.amount} min={1} onChange={(n: any) => setGift({ ...gift, amount: n } as iGift)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <Spacer></Spacer>

                            <Text>$</Text>
                            <NumberInput defaultValue={gift.price} min={1} onChange={(n: any) => setGift({ ...gift, price: n } as iGift)}>
                                <NumberInputField />
                            </NumberInput>

                        </HStack>

                        <Input placeholder='Image' onChange={(e: any) => setGift({ ...gift, image: e.target.value } as iGift)} m={2} defaultValue={gift.image} />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        {editingGift.id == "" &&
                            <Button colorScheme='blue' onClick={handleAdd}>Agregar</Button>
                        }
                        {editingGift.id != "" &&
                            <Button colorScheme='blue' onClick={handleEdit}>Editar</Button>
                        }

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}