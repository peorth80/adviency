import { StarIcon } from "@chakra-ui/icons"
import { HStack, Icon, Text, Image, Button, Spacer } from "@chakra-ui/react"
import { iGift } from "../interfaces/iGift"
export const Gift = (props: iGift) => {
    const { name, amount, image, onDelete, ...rest } = props;

    return (
        <HStack m={2}>
            <Icon as={StarIcon}></Icon>
            <Text>{name} ({amount})</Text>
            <Image src={image} w={50} />
            <Spacer />
            <Button colorScheme="red" size="sm" onClick={() => onDelete(props)}>X</Button>
        </HStack >
    )
}