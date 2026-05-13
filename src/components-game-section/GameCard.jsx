import { Box, Image, Text, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Link, VStack, HStack, useDisclosure, Stack } from "@chakra-ui/react";
const generateRandomRequirements = () => {
  const osOptions = ["Windows 10 64-bit", "Windows 11 64-bit"];
  const processorOptions = ["Intel Core i5-4460 / AMD FX-6300", "Intel Core i5-6600K / AMD Ryzen 5 2600", "Intel Core i7-4770 / AMD Ryzen 5 1600"];
  const memoryOptions = ["8 GB RAM", "16 GB RAM"];
  const graphicsOptions = ["NVIDIA GeForce GTX 960 / AMD Radeon R9 280", "NVIDIA GeForce GTX 1060 / AMD Radeon RX 580", "NVIDIA GeForce RTX 2060 / AMD Radeon RX 5600 XT"];
  const storageOptions = ["20 GB available space", "50 GB available space"];
  const os = osOptions[Math.floor(Math.random() * osOptions.length)];
  const processor = processorOptions[Math.floor(Math.random() * processorOptions.length)];
  const memory = memoryOptions[Math.floor(Math.random() * memoryOptions.length)];
  const graphics = graphicsOptions[Math.floor(Math.random() * graphicsOptions.length)];
  const storage = storageOptions[Math.floor(Math.random() * storageOptions.length)];
  return `Minimum System Requirements:\n\nOS: ${os}\nProcessor: ${processor}\nMemory: ${memory}\nGraphics: ${graphics}\nStorage: ${storage}`;
};
const GameCard = ({
  game
}) => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure();
  const description = game.description_raw || game.description || "No description available.";
  const requirements = game.requirements_en || generateRandomRequirements();
  return <>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer" onClick={onOpen} _hover={{
      shadow: "md",
      transform: "scale(1.01)"
    }} transition="all 0.2s" w="full" maxW="sm" h="full" minH="400px" display="flex" flexDirection="column">
        {game.background_image && <Image src={game.background_image} alt={game.name} objectFit="cover" h="200px" w="full" />}
        <Box p={4} flex="1" display="flex" flexDirection="column">
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            {game.name}
          </Text>

          <HStack spacing={2} wrap="wrap" mb={3}>
            {typeof game.rating === "number" && <Badge colorScheme="green">Rating: {game.rating}</Badge>}
            {game.genres?.slice(0, 2).map(genre => <Badge key={genre.id} colorScheme="blue">
                {genre.name}
              </Badge>)}
          </HStack>

          <Text noOfLines={3} fontSize="sm" color="gray.600" flex="1">
            {description}
          </Text>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{game.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={4}>
              {game.background_image && <Image src={game.background_image} alt={game.name} borderRadius="md" />}

              <Stack spacing={2}>
                {game.released && <Text fontSize="sm" color="gray.500">
                    Released: {game.released}
                  </Text>}
                <Text fontWeight="semibold">Description:</Text>
                <Text>{description}</Text>
                {game.platforms?.length > 0 && <Box>
                    <Text fontWeight="semibold">Platforms:</Text>
                    <HStack wrap="wrap" spacing={2} mt={2}>
                      {game.platforms.map(platform => <Badge key={platform.platform.id} colorScheme="purple">
                          {platform.platform.name}
                        </Badge>)}
                    </HStack>
                  </Box>}
                <Box>
                  <Text fontWeight="semibold">System Requirements:</Text>
                  <Text mt={2} whiteSpace="pre-line">
                    {requirements}
                  </Text>
                </Box>
              </Stack>

              <Box width="100%">
                <Text fontWeight="semibold">Where to get it:</Text>
                <VStack align="start" spacing={2} mt={2}>
                  <Link href="https://store.steampowered.com" isExternal color="blue.500">
                    Steam
                  </Link>
                  <Link href="https://store.playstation.com" isExternal color="blue.500">
                    PlayStation
                  </Link>
                  <Link href="https://www.xbox.com/games/store" isExternal color="blue.500">
                    Xbox
                  </Link>
                  <Link href="https://www.nintendo.com/store" isExternal color="blue.500">
                    Nintendo
                  </Link>
                  <Link href="https://store.epicgames.com" isExternal color="blue.500">
                    Epic Games
                  </Link>
                </VStack>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>;
};
export default GameCard;