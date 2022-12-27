import {
    useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody,
    Input, DrawerFooter, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
    NumberInputField, NumberInputStepper, HStack, Text, Flex
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { randomGifts } from '../data/gifts.json';
import giftStore from "../context/GiftStorage";
import { iGift } from "../interfaces/iGift";

export const AddGift = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [image, setImage] = useState('');
    const [amount, setAmount] = useState(1);
    const [price, setPrice] = useState(1);

    const fnAdd = giftStore(s => s.add);
    const fnEdit = giftStore(s => s.edit);
    const fnSetEditingGift = giftStore(s => s.setEditingGift);
    const editingGift = giftStore(s => s.editingGift);

    const handleOpen = () => {
        setEmptyGift();

        onOpen();
    }

    const handleClose = () => {
        setEmptyGift();

        onClose();
    }

    useEffect(() => {
        setName(editingGift.name);
        setOwner(editingGift.owner);
        setAmount(editingGift.amount);
        setImage(editingGift.image);
        setPrice(editingGift.price);

        if (editingGift.name != "")
            onOpen();

    }, [editingGift])

    const handleAdd = () => {
        if (name != "" && amount > 0 && price > 0) {
            const gift = {
                amount,
                image, name, owner, price
            } as iGift;

            fnAdd(gift);
            handleClose();
        }
    }

    const handleEdit = () => {
        const gift = {
            amount,
            name,
            price,
            owner,
            image,
            id: editingGift.id
        } as iGift;

        fnEdit(gift);

        handleClose();
    }

    const handleRandomGift = () => {
        const randomNumber = Math.floor(Math.random() * randomGifts.length);

        setName(randomGifts[randomNumber]);
    }

    const setEmptyGift = () => {
        setName('');
        setAmount(1);
        setPrice(1);
        setOwner('');
        setImage('');

        const gift = {
            id: "",
            amount: 1,
            image: "",
            name: "",
            owner: "",
            price: 1
        } as iGift;

        fnSetEditingGift(gift);
    }

    return (
        <>
            <Button colorScheme='green' onClick={handleOpen} w="100%">
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
                    <DrawerHeader>Agregar Regalo</DrawerHeader>

                    <DrawerBody>
                        <Flex justifyContent="right">
                            <Button colorScheme="teal" onClick={handleRandomGift} disabled={editingGift.id != ""}>Randomazzo</Button>
                        </Flex>
                        <Input placeholder='Regalo' onChange={(e: any) => setName(e.target.value)} defaultValue={name} m={2} />

                        <HStack p={2}>
                            <Text fontSize="sm">Cantidad</Text>
                            <NumberInput w={20} defaultValue={amount} min={1} onChange={(n: any) => setAmount(n)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <Text fontSize="sm">$</Text>
                            <NumberInput w={20} defaultValue={price} min={1} onChange={(n: any) => setPrice(n)}>
                                <NumberInputField />
                            </NumberInput>

                        </HStack>
                        <Input placeholder='Due#o' onChange={(e: any) => setOwner(e.target.value)} defaultValue={owner} m={2} />

                        <Input placeholder='Imagen' onChange={(e: any) => setImage(e.target.value)} defaultValue={image} m={2} />

                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        {editingGift.id == "" &&
                            <Button colorScheme='red' onClick={handleAdd}>Agregar</Button>
                        }
                        {editingGift.id != "" &&
                            <Button colorScheme="red" onClick={handleEdit}>Editar</Button>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}