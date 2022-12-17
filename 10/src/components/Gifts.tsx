import { HStack, Icon, Text, Image, Spacer, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
interface Gifts {
    name: string,
    amount: number,
    image: string,
    onDelete: Function
}

export const Gifts = (props: Gifts) => {
    const { name, amount, image, onDelete, ...rest } = props;

    return (
        <HStack p={2}>
            <Icon as={StarIcon} />
            <Text>{name} ({amount})</Text>
            <Image src={image} w={50}></Image>
            <Spacer />
            <Button colorScheme="red" size="sm" onClick={() => onDelete(props)}>X</Button>
        </HStack>
    )
}