import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, HStack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { iGift } from "../interfaces/iGift";
import giftStore from "../context/GiftStore";

export const AddGift = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fnAddGift = giftStore(s => s.add);
  const fnEditGift = giftStore(s => s.edit);
  const giftToEdit = giftStore(s => s.giftToEdit);
  const fnSetGiftToEdit = giftStore(s => s.setGiftToEdit);

  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(1);
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    setName(giftToEdit.name);
    setAmount(giftToEdit.amount);
    setPrice(giftToEdit.price);
    setImage(giftToEdit.image);
    setOwner(giftToEdit.owner);

    if (giftToEdit.name != "")
      onOpen();

  }, [giftToEdit])

  const handleAdd = () => {
    if (name != "" && amount > 0 && price > 0) {
      const newGift = {
        name, amount, owner, image, price
      } as iGift;

      fnAddGift(newGift);
      handleClose();
    }
  }

  const handleEdit = (gift: iGift) => {
    gift.amount = amount;
    gift.image = image;
    gift.name = name;
    gift.owner = owner;
    gift.price = price;

    fnEditGift(gift);

    handleClose();
  }

  const handleClose = () => {
    setEmptyGift();

    onClose();
  }

  const handleOpen = () => {
    setEmptyGift();

    onOpen();
  }

  const setEmptyGift = () => {
    setName("");
    setAmount(1);
    setPrice(1);
    setImage("");
    setOwner("");

    const emptyGift = {
      amount: 1,
      id: "",
      image: "",
      name: "",
      owner: "",
      price: 1
    } as iGift;

    fnSetGiftToEdit(emptyGift);
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
          <DrawerHeader>Agregar regalo</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Regalo' w="75" onChange={(e: any) => setName(e.target.value)} defaultValue={name} m={2} />
            <HStack p={2}>
              <NumberInput w="25" defaultValue={amount} min={1} onChange={(n: any) => setAmount(n)}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput w="25" defaultValue={price} min={1} onChange={(n: any) => setPrice(n)} placeholder="Costo">
                <NumberInputField />
              </NumberInput>

            </HStack>


            <Input placeholder='Due#o' m={2} onChange={(e: any) => setOwner(e.target.value)} defaultValue={owner} />
            <Input placeholder='Imagen' type="url" m={2} onChange={(e: any) => setImage(e.target.value)} defaultValue={image} />
          </DrawerBody>


          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={handleClose}>
              Cancelar
            </Button>
            {giftToEdit.id == "" &&
              <Button colorScheme='green' onClick={handleAdd}>Guardar</Button>
            }
            {giftToEdit.id != "" &&
              <Button colorScheme='green' onClick={() => handleEdit(giftToEdit)}>Editar</Button>
            }
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}