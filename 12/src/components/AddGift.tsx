import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, HStack, Input, Text, useDisclosure } from "@chakra-ui/react"
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

import { useState } from "react";

export interface iDrawerProps {
    onAdd: Function
}

export const AddGift = (props: iDrawerProps) => {

    const { onAdd, ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(1);
    const [image, setImage] = useState('');
    const [recipient, setRecipient] = useState('');

    const handleAdd = () => {
        onAdd({ name, amount, image, recipient });
        onClose();
    }

    return (
        <>
            <Button colorScheme='green' onClick={onOpen} w="100%">
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
                    <DrawerHeader>
                        <Heading size="l">Agregar regalo</Heading>
                    </DrawerHeader>

                    <DrawerBody>
                        <HStack m={2}>
                            <Input placeholder='Regalo...' onChange={(e: any) => setName(e.target.value)} w='40' />
                            <NumberInput w={20} defaultValue={1} min={1} onChange={(n: any) => setAmount(n)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </HStack>
                        <Input m={2} placeholder='Due#o...' onChange={(e: any) => setRecipient(e.target.value)} />
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