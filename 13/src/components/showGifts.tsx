import { HStack, Text, Button, Box, Icon, Flex, Image, VStack, Spacer } from "@chakra-ui/react";
import { iGifts } from "../interfaces/iGifts";
import { StarIcon, EditIcon } from "@chakra-ui/icons";

export const ShowGifts = (props: iGifts) => {
    const { gifts, onDelete, onShow, onEdit, ...rest } = props;

    return (
        gifts.length == 0 ?
            <Text>No hay regalos</Text>
            :
            <Box>
                {
                    gifts.map((i) => {
                        return (
                            <Flex w="100%" key={i.name}>
                                <HStack w="100%">
                                    <Icon as={StarIcon}></Icon>
                                    <Image src={i.image} w={50}></Image>
                                    <VStack p={3}>
                                        <Text>{i.name} ({i.amount})</Text>
                                        <Text fontSize="sm">{i.owner}</Text>
                                    </VStack>
                                    <Spacer></Spacer>
                                    <Button colorScheme="green" size="sm" onClick={() => onShow(i)}><Icon as={EditIcon}></Icon></Button>
                                    <Button colorScheme="red" size="sm" onClick={() => onDelete(i)}>X</Button>
                                </HStack>
                            </Flex>
                        )
                    })
                }
            </Box>
    );
}