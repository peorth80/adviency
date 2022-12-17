import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, HStack, Input, useDisclosure } from "@chakra-ui/react";
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from "react";
import { useGiftStore } from "../context/GiftContext";
import { v4 as uuidv4 } from 'uuid';
import { iGift } from "../interfaces/iGift";

export const AddGift = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(1);
    const [owner, setOwner] = useState('');
    const [image, setImage] = useState('');
    const [editMode, setEditMode] = useState(false);

    const setNewGiftAmount = (n: number) => {
        setAmount(n);
    }

    const { addGift, updateGift, editingGift, setEditItem, gifts, setGifts } = useGiftStore();

    const handleAdd = () => {
        const exists = gifts.filter(i => i.name == name);

        if (exists.length == 0 && name != "" && amount > 0) {
            const id = uuidv4();
            addGift({
                id, name, amount, owner, image
            });
            onClose();
        }
    }

    const handleEdit = () => {
        const gift = {
            name, amount, id: editingGift.id, image, owner
        } as iGift;

        updateGift(gift);
        onClose();
    }

    useEffect(
        () => {
            console.log("editando item", editingGift)
            setName(editingGift.name);
            setOwner(editingGift.owner);
            setAmount(editingGift.amount);
            setImage(editingGift.image);

            setEditMode(editingGift.name != "");

            console.log("editMode", editMode);

            if (editingGift.name != "")
                onOpen();
        }, [editingGift]
    )

    useEffect(
        () => {
            const storedGifts = localStorage.getItem("gifts");

            if (storedGifts)
                setGifts(JSON.parse(storedGifts));
        }, []
    )

    const handleOnClose = () => {
        setEditItem({ name: "", amount: 1, owner: "", id: "", image: "" })
        onClose();
    }

    const handleOnOpen = () => {
        setEditItem({ name: "", amount: 1, owner: "", id: "", image: "" })
        onOpen();
    }

    return (
        <>
            <Button colorScheme='green' onClick={handleOnOpen} w="100%">
                Agregar regalo
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={handleOnClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Agregar regalo</DrawerHeader>

                    <DrawerBody>
                        <HStack p={2}>
                            <Input placeholder='Regalo...' w={40} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} defaultValue={name} />
                            <NumberInput w={20} defaultValue={1} min={1} onChange={(n: any) => setNewGiftAmount(n)} value={amount}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </HStack>
                        <Input m={2} placeholder='Due#o...' onChange={(e: ChangeEvent<HTMLInputElement>) => setOwner(e.target.value)} defaultValue={owner} />
                        <Input m={2} placeholder='Imagen...' onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.value)} defaultValue={image} />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        {!editMode ?
                            <Button colorScheme='red' onClick={() => handleAdd()}>Agregar</Button>
                            :
                            <Button colorScheme='teal' onClick={() => handleEdit()}>Editar</Button>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
