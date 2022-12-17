import { HStack, Icon, StackProps, Text } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'

export const Gifts = (props: StackProps) => {
    const { children, ...rest } = props;
    return (
        <HStack {...rest} as="li" spacing="10px">
            <Icon as={StarIcon} h={4} w={4} m={0} />
            <Text pt="8px">{children}</Text>
        </HStack>
    )
}