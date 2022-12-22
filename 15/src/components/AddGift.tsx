import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Input, Text, useDisclosure } from "@chakra-ui/react"
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { useGiftStore } from "../context/GiftContext"
import { iGift } from "../interfaces/iGift"

export const AddGift = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const fnAddGift = useGiftStore(state => state.addGift);
    const fnEditGift = useGiftStore(state => state.editGift);
    const fnDeleteGift = useGiftStore(state => state.deleteGift);
    const fnSetEditingGift = useGiftStore(state => state.setGiftToEdit);
    const giftToEdit = useGiftStore(state => state.giftToEdit);

    const [id, setId] = useState('');
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

        fnAddGift(newGift);
        onClose();
    }

    const handleEdit = () => {
        const editedGift = {
            id,
            amount,
            name,
            image,
            owner
        } as iGift;

        fnEditGift(editedGift);
        onClose();
    }

    useEffect(() => {
        setId(giftToEdit.id);
        setName(giftToEdit.name);
        setOwner(giftToEdit.owner);
        setAmount(giftToEdit.amount);
        setImage(giftToEdit.image);

        if (giftToEdit.id != "")
            onOpen();

    }, [giftToEdit]
    )

    const setEdit = (gift: iGift) => {
        setId(gift.id);
        setName(gift.name);
        setAmount(gift.amount);
        setOwner(gift.owner);
        setImage(gift.image);
    }

    const handleOpen = () => {
        resetGift();

        onOpen();
    }

    const handleClose = () => {
        resetGift();

        onClose();
    }

    const resetGift = () => {
        setId("");
        setName("");
        setImage("");
        setOwner("")
        setAmount(1);

        fnSetEditingGift({ id: "", amount: 1, image: "", name: "", owner: "" });
    }

    return (
        <>
            <Button colorScheme='teal' onClick={handleOpen} w="100%" mb={3}>
                Agregar regalo
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={handleClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Agregar regalo</DrawerHeader>

                    <DrawerBody>
                        <HStack p={2}>
                            <Input placeholder='Regalo...' w={150} onChange={(e: any) => setName(e.target.value)} defaultValue={name} />

                            <NumberInput w={20} defaultValue={amount} min={1} onChange={(n: any) => handleChangeAmount(n)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </HStack>
                        <Input m={2} placeholder='Duenio...' onChange={(e: any) => setOwner(e.target.value)} defaultValue={owner} />
                        <Input type="url" m={2} placeholder='Imagen...' onChange={(e: any) => setImage(e.target.value)} defaultValue={image} />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        {(id == "") &&
                            <Button colorScheme='green' onClick={handleAdd}>Agregar</Button>
                        }

                        {(id != "") &&
                            <Button colorScheme='green' onClick={handleEdit}>Editar</Button>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )

}

