import { Box, Button, Center, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AddGiftsDrawer } from './components/AddGift'
import { ListGifts } from './components/ListGits';
import { iGift, iGifts } from './interfaces/iGift';

function App() {
  const GIFTS_LOCALSTORAGE = "gifts";
  const [items, setItems] = useState<iGift[]>([]);

  const addGift = (newGift: iGift) => {
    const existing = items.filter((x) => x.name == newGift.name);

    if (existing.length == 0 && newGift.name != "" && newGift.amount > 0)
      setItems([...items, newGift]);
  }

  useEffect(() => {
    const storedGifts = localStorage.getItem(GIFTS_LOCALSTORAGE);

    if (storedGifts) {
      setItems(JSON.parse(storedGifts));
    }
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      const gifts = JSON.stringify(items);
      localStorage.setItem(GIFTS_LOCALSTORAGE, gifts);
    } else {
      localStorage.removeItem(GIFTS_LOCALSTORAGE);
    }
  }, [items])

  const deleteAll = () => {
    setItems([]);
  }

  const deleteGift = (giftToDelete: iGift) => {
    setItems(items.filter((i) => i.name != giftToDelete.name));
  }

  return (
    <div className="App">
      <Flex justifyContent="center" align="center" bg="url('/xmas.jpg')" h="100vh" w="100vw">
        <Center>
          <Box bgColor="white" w={500} p={10}>
            <Heading>Regalos 11</Heading>
            <AddGiftsDrawer onSave={addGift}></AddGiftsDrawer>
            <ListGifts array={items} onDelete={() => deleteGift}></ListGifts>
            <Button colorScheme="red" w="100%" onClick={deleteAll}>Borrar todos los regalos</Button>
          </Box>
        </Center>
      </Flex>
    </div >
  )
}

export default App
