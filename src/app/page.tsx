"use client";

import { NFT_CONTRACTS } from "@/consts/nft_contracts";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Home() {
  const bgColor = useColorModeValue("white", "brand.dark");
  const cardBg = useColorModeValue("gray.50", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "brand.secondary");

  return (
    <Box bg={bgColor} minH="100vh">
      <Box mt="24px" m="auto" maxW="1200px" px="20px">
        <Flex direction="column" gap="8">
          {/* Hero Section */}
          <Box textAlign="center" py="60px">
            <Heading 
              size="2xl" 
              color="brand.primary" 
              mb="4"
              fontWeight="bold"
            >
              Welcome to OrangeNFT
            </Heading>
            <Text fontSize="xl" color={textColor} opacity="0.8">
              Discover, collect and trade the finest digital art and collectibles
            </Text>
          </Box>
          
          <Heading ml="20px" mt="40px" color="brand.primary">
            Trending Collections
          </Heading>
          <Flex
            direction="row"
            wrap="wrap"
            mt="20px"
            gap="6"
            justifyContent="center"
          >
            {NFT_CONTRACTS.map((item) => (
              <Link
                _hover={{ textDecoration: "none", transform: "translateY(-4px)" }}
                w={300}
                h={400}
                key={item.address}
                href={`/collection/${item.chain.id.toString()}/${item.address}`}
                transition="all 0.2s"
              >
                <Box 
                  bg={cardBg}
                  p="4" 
                  borderRadius="lg" 
                  border="1px" 
                  borderColor={cardBorder}
                  _hover={{ borderColor: "brand.primary" }}
                >
                  <Image 
                    src={item.thumbnailUrl} 
                    borderRadius="md"
                    mb="3"
                  />
                  <Text fontSize="large" color={textColor} fontWeight="medium">
                    {item.title}
                  </Text>
                </Box>
              </Link>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
