import { HStack, Button, DrawerOverlay, Drawer, useDisclosure, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Heading, Center } from "@chakra-ui/react"
import { useState } from "react"
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

interface DrawerProps {
    onSave: Function
}

export const AddGiftsDrawer = (props: DrawerProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(1);
    const [image, setImage] = useState('');

    const { onSave, ...rest } = props;

    const handleSave = () => {
        onSave({ name, amount, image });
        onClose();
    }

    return (
        <>
            <Center>
                <Button colorScheme='teal' onClick={onOpen} w="100%">
                    Agregar regalo
                </Button>
            </Center>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Heading size="lg">Agregar regalo
                        </Heading>
                    </DrawerHeader>

                    <DrawerBody>
                        <Input placeholder='Type here...' onChange={(e: any) => setName(e.target.value)} />
                        <HStack pt={5}>
                            <NumberInput w={32} defaultValue={1} min={1} onChange={(n: any) => setAmount(n)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <Input onChange={(e: any) => setImage(e.target.value)}></Input>
                        </HStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='green' onClick={handleSave}>Agregar</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}