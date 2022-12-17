import { Text, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure, Heading } from "@chakra-ui/react"
import React, { ChangeEvent, useEffect, useState } from "react"
import { iGift } from "../interfaces/iGifts";

interface iDrawerProps {
    onAdd: Function,
    onEdit: Function,
    onShow: Function,
    onCloseDrawer: Function
    giftToEdit?: iGift
}

export const AddGift = (props: iDrawerProps) => {
    const { onAdd, onEdit, onCloseDrawer, giftToEdit, ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isEdit, setEdit] = useState(false);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(1);
    const [image, setImage] = useState('');
    const [owner, setOwner] = useState('');

    const handleAdd = () => {
        onAdd({ name, amount, image, owner });
        onClose();
    }

    const handleEdit = () => {
        onEdit({ id, name, amount, image, owner });
        onClose();
    }

    const handleClose = () => {
        onCloseDrawer();
        onClose();
    }

    const handleOpen = () => {
        setEdit(false);

        setName('');
        setAmount(1);
        setImage('');
        setOwner('');
        onOpen();
    }

    useEffect(() => {
        if (giftToEdit) {
            setEdit(true);

            setId(giftToEdit.id);
            setName(giftToEdit.name);
            setAmount(giftToEdit.amount);
            setImage(giftToEdit.image);
            setOwner(giftToEdit.owner);
            onOpen();
        }
    }, [giftToEdit])

    return (
        <>
            <Button colorScheme='green' onClick={handleOpen} tabIndex={1} w="100%">
                Agregar regalos
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={handleClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Heading size="l">
                            {isEdit ? <Text>Editar</Text> : <Text>Agregar</Text>} regalo
                        </Heading>
                    </DrawerHeader>

                    <DrawerBody>
                        <HStack p={2}>
                            <Input placeholder='Regalo...' w={60} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} tabIndex={2} value={name} />
                            <NumberInput w={20} defaultValue={1} min={1} onChange={(n: any) => setAmount(n)} tabIndex={3} value={amount}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </HStack>
                        <Input m={2} placeholder='Due#o...' onChange={(e: ChangeEvent<HTMLInputElement>) => setOwner(e.target.value)} tabIndex={4} value={owner} />
                        <Input m={2} placeholder='Imagen...' onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.value)} tabIndex={5} value={image} />

                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={handleClose} tabIndex={7}>
                            Cancel
                        </Button>
                        {
                            !isEdit ?
                                <Button colorScheme='green' onClick={handleAdd} tabIndex={6}>Agregar regalo</Button>
                                :
                                <Button colorScheme='green' onClick={handleEdit} tabIndex={6}>Editar regalo</Button>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}