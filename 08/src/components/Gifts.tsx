import { Button, HStack, Icon, Spacer, StackProps, Text } from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons';

interface GiftProps extends StackProps {
    name: string,
    ammount: number,
    onDelete: Function
}

export const Gifts = (props: GiftProps) => {
    const { children, onDelete, ammount, ...rest } = props;

    return (
        <HStack m={2}>
            <Icon as={StarIcon}></Icon>
            <Text>{children} ({ammount})</Text>
            <Spacer></Spacer>
            <Button colorScheme="red" size="sm" onClick={() => onDelete({ name: children })}>X</Button>
        </HStack>
    )
}