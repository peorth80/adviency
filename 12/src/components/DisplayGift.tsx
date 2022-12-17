import { Image, Text, Button, Box, HStack, Icon, Flex, Spacer } from "@chakra-ui/react";
import { iGifts } from "../interfaces/iGift";
import { StarIcon } from "@chakra-ui/icons";

export const DisplayGift = (props: iGifts) => {
    const { gifts, onDelete, ...rest } = props;

    return (
        gifts.length == 0 ?
            <Text>No hay regalos</Text>
            :
            <ul>
                {gifts.map((i) => {
                    return (
                        <HStack key={i.name} p={3}>
                            <Box>
                                <Icon as={StarIcon}></Icon>
                            </Box>
                            <Box><Image src={i.image} w={50}></Image></Box>
                            <Box>
                                <Image></Image>
                                <Text>{i.name} ({i.amount})</Text>
                                <Text fontSize="xs">{i.recipient}</Text>
                            </Box>
                            <Spacer></Spacer>
                            <Box>
                                <Button colorScheme="red" size="sm" onClick={() => onDelete(i)}>X</Button>
                            </Box>
                        </HStack>);
                })}
            </ul>
    );
}