import { useContext } from "react";
import { iGift, iGifts } from "../interfaces/iGift";
import { Image, HStack, Icon, Spacer, Text, VStack, Button, Box } from "@chakra-ui/react";
import { useGiftStore } from "../context/GiftContext";
import { StarIcon } from "@chakra-ui/icons";
export const ShowGifts = () => {

    const { gifts, setEditItem, deleteGift, deleteAll } = useGiftStore();

    const handleEditItem = (gift: iGift) => {
        setEditItem(gift);
        console.log(gift);
    }

    const handleDelete = (gift: iGift) => {
        deleteGift(gift);
    }

    const handleDeleteAll = () => {
        deleteAll();
    }

    return (
        <Box>
            {gifts.length > 0 &&
                gifts.map(i => {
                    return (
                        <HStack key={i.id} p={3}>
                            <Icon as={StarIcon}></Icon>
                            <Image w={50} src={i.image}></Image>
                            <VStack justifyItems="left">
                                <Text>{i.name} ({i.amount})</Text>
                                <Text fontSize="sm">{i.owner}</Text>
                            </VStack>
                            <Spacer></Spacer>
                            <Button colorScheme="green" size="sm" onClick={() => handleEditItem(i)}>E</Button>
                            <Button colorScheme="red" size="sm" onClick={() => handleDelete(i)}>X</Button>
                        </HStack>
                    )
                }
                )
            }
            {gifts.length > 0 &&
                <Button p={3} onClick={handleDeleteAll} colorScheme="red" w="100%">Borrar todos los regalos</Button>
            }


            {
                gifts.length == 0 &&
                <Text p={5}>No hay regalos</Text>

            }
        </Box>
    )
}
