import { Button, chakra, HStack, Icon, Spacer, StackProps, Text } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';

import React from 'react';

interface GiftProps extends StackProps {
    onDelete: Function;
}

export const Gifts = (props: GiftProps) => {
    const { children, onDelete, ...rest } = props;

    return (
        <HStack m={3}>
            <Icon as={StarIcon} />
            <Text>{children}</Text>
            <Spacer />
            <Button colorScheme="red" size="sm" onClick={() => onDelete({ name: children })}>X</Button>
        </HStack>
    )
}