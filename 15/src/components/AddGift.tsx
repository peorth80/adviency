import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Input, Text, useDisclosure } from "@chakra-ui/react"
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { useState } from "react"
import { useGiftStore } from "../context/GiftContext"
import { iGift } from "../interfaces/iGift"

export const AddGift = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const fnAddGift = useGiftStore(state => state.addGift);

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [image, setImage] = useState('');
    const [amount, setAmount] = useState(1);

    const handleChangeAmount = (n: number) => {
        setAmount(n);
    }

    const handleAdd = () => {
        const newGift = {
            amount: amount,
            name: name,
            owner: owner,
            image: image
        } as iGift;

        console.log(newGift);

        fnAddGift(newGift);
    }

    return (
        <>
            <Button colorScheme='teal' onClick={onOpen}>
                Agregar regalo
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Agregar regalo</DrawerHeader>

                    <DrawerBody>
                        <HStack p={2}>
                            <Input placeholder='Regalo...' w={150} onChange={(e: any) => setName(e.target.value)} />

                            <NumberInput w={20} defaultValue={1} min={1} onChange={(n: any) => handleChangeAmount(n)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </HStack>
                        <Input m={2} placeholder='Duenio...' onChange={(e: any) => setOwner(e.target.value)} />
                        <Input m={2} placeholder='Imagen...' onChange={(e: any) => setImage(e.target.value)} />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='green' onClick={handleAdd}>Agregar</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )

}

