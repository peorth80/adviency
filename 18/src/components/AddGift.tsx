import {
    useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Flex,
    NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, HStack
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import giftStore from "../context/giftContext";
import { iGift } from "../interfaces/iGift";
import { randomGifts } from '../data/gifts.json';

export const AddGift = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const fnAdd = giftStore(s => s.add);
    const fnEdit = giftStore(s => s.edit);
    const fnSetEditingGift = giftStore(s => s.setEditingGift);
    const editingGift = giftStore(s => s.editingGift);

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(1);
    const [amount, setAmount] = useState(1);


    useEffect(() => {
        if (editingGift.id != "") {
            setName(editingGift.name);
            setOwner(editingGift.owner);
            setAmount(editingGift.amount);
            setPrice(editingGift.price);
            setImage(editingGift.image);

            onOpen();
        }
    }, [editingGift]);

    const handleOpen = () => {
        resetEditingGift();
        onOpen();
    }

    const handleClose = () => {
        resetEditingGift();
        onClose();
    }

    const handleAdd = () => {
        if (name != "" && price > 0 && amount > 0) {
            const gift = {
                name, owner, image, price, amount
            } as iGift;

            fnAdd(gift);
            resetEditingGift();
        } else {

        }
    }

    const handleEdit = () => {
        const gift = {
            id: editingGift.id,
            amount,
            name,
            image,
            price,
            owner
        } as iGift;

        fnEdit(gift);
        handleClose();
    }

    const resetEditingGift = () => {
        setName("");
        setAmount(1);
        setOwner("");
        setImage("");
        setPrice(1);

        const emptyGift = {
            id: "", amount: 1, price: 1, owner: "", name: "", image: ""
        } as iGift;

        fnSetEditingGift(emptyGift);
    }

    const randomGift = () => {
        const rnd = Math.floor(Math.random() * randomGifts.length);

        setName(randomGifts[rnd]);
    }

    return (
        <>
            <Button colorScheme='teal' onClick={handleOpen} w="100%">
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
                    <DrawerHeader>Regalos</DrawerHeader>

                    <DrawerBody>
                        <Flex justifyContent="right">
                            <Button onClick={randomGift}>Randomazzo</Button>
                        </Flex>

                        <Flex m={2}>
                            <Input placeholder='Regalo' onChange={(e: any) => setName(e.target.value)} defaultValue={name} />
                            <Input placeholder='Due#o' onChange={(e: any) => setOwner(e.target.value)} ml={2} defaultValue={owner} />
                        </Flex>

                        <HStack m={2}>
                            <Text fontSize="sm">Cant.</Text>
                            <NumberInput w={20} defaultValue={amount} min={1} onChange={(n: any) => setAmount(n)} >
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

                        <Input placeholder='Imagen' onChange={(e: any) => setImage(e.target.value)} defaultValue={image} />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        {editingGift.id == "" &&
                            <Button colorScheme='blue' onClick={handleAdd}>Agregar</Button>
                        }
                        {editingGift.id != "" &&
                            <Button colorScheme='green' onClick={handleEdit}>Editar</Button>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

