"use client";

import { MARKETPLACE_CONTRACTS } from "@/consts/marketplace_contract";
import type { NftContract } from "@/consts/nft_contracts";
import { client } from "@/consts/client";
import {
  Box,
  Flex,
  Image,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getContract } from "thirdweb";
import { getAllValidListings } from "thirdweb/extensions/marketplace";
import { useReadContract } from "thirdweb/react";
import { toEther } from "thirdweb/utils";
import Link from "next/link";

type Props = {
  nftContract: NftContract;
};

export function CollectionCard({ nftContract }: Props) {
  const cardBg = useColorModeValue("gray.50", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "brand.secondary");
  const glassBg = useColorModeValue(
    "rgba(255, 255, 255, 0.6)",
    "rgba(0, 0, 0, 0.6)"
  );

  const marketplaceForChain = MARKETPLACE_CONTRACTS.find(
    (m) => m.chain.id === nftContract.chain.id
  );

  const marketplaceContract = marketplaceForChain
    ? getContract({
        address: marketplaceForChain.address,
        chain: marketplaceForChain.chain,
        client: client,
      })
    : undefined;

  const { data: listings, isLoading } = useReadContract(getAllValidListings, {
    contract: marketplaceContract!,
    queryOptions: {
      enabled: !!marketplaceContract,
    },
  });

  const collectionListings = listings?.filter(
    (l) => l.assetContractAddress.toLowerCase() === nftContract.address.toLowerCase()
  );

  const itemsAvailable = collectionListings?.length || 0;
  
  let floorPrice = "N/A";
  if (collectionListings && collectionListings.length > 0) {
    const prices = collectionListings.map(l => l.pricePerToken);
    const minPriceWei = prices.reduce((a, b) => (a < b ? a : b));
    const minPriceEther = toEther(minPriceWei);
    floorPrice = `${parseFloat(minPriceEther).toFixed(3)} ${nftContract.chain.nativeCurrency?.symbol}`;
  }


  return (
    <Box
      as={Link}
      href={`/collection/${nftContract.chain.id.toString()}/${
        nftContract.address
      }`}
      style={{ textDecoration: "none" }}
    >
      <Box
        position="relative"
        bg={cardBg}
        p="4"
        borderRadius="lg"
        border="1px"
        borderColor={cardBorder}
        transition="all 0.2s"
        _hover={{
          transform: "translateY(-4px)",
          borderColor: "brand.primary",
          boxShadow: "lg",
        }}
        w={300}
        h={350}
        overflow="hidden"
        _groupHover={{}} // Chakra UI feature to style children on parent hover
      >
        <Image
          src={nftContract.thumbnailUrl}
          borderRadius="md"
          mb="3"
          w="100%"
          h="80%"
          objectFit="cover"
        />
        <Text fontSize="large" color={textColor} fontWeight="medium" noOfLines={1}>
          {nftContract.title}
        </Text>
        
        {/* Glassmorphism Overlay */}
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg={glassBg}
          backdropFilter="blur(10px)"
          p={4}
          direction="column"
          align="center"
          justify="center"
          opacity={0}
          _groupHover={{ opacity: 1 }}
          transition="opacity 0.2s"
        >
          {isLoading ? (
            <Spinner color="white" />
          ) : (
            <>
              <Text fontSize="xl" fontWeight="bold" color="white">
                Floor Price
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="white" mb={4}>
                {floorPrice}
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="white">
                Items Available
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {itemsAvailable}
              </Text>
            </>
          )}
        </Flex>
      </Box>
    </Box>
  );
} 