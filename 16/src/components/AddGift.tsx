import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, HStack } from "@chakra-ui/react"
import React, { useState } from "react"
import { iGift } from "../interfaces/iGift";
import giftStore from "../context/GiftStore";

export const AddGift = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const addGift = giftStore(s => s.add);

  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [image, setImage] = useState('');


  const handleAdd = () => {
    const newGift = {
      name, amount, owner, image, price
    } as iGift;

    addGift(newGift);
  }

  const handleEdit = (gift: iGift) => {

  }

  return (
    <>
      <Button colorScheme='teal' onClick={onOpen} w="100%">
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
              <Input placeholder='Regalo' w="75" onChange={(e: any) => setName(e.target.value)} />
              <NumberInput w="25" defaultValue={1} min={1} onChange={(n: any) => setAmount(n)}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput w="25" defaultValue={1} min={1} onChange={(n: any) => setPrice(n)} placeholder="Costo">
                <NumberInputField />
              </NumberInput>

            </HStack>
            <Input placeholder='Due#o' m={2} onChange={(e: any) => setOwner(e.target.value)} />
            <Input placeholder='Imagen' type="url" m={2} onChange={(e: any) => setImage(e.target.value)} />
          </DrawerBody>


          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='green' onClick={handleAdd}>Guardar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}