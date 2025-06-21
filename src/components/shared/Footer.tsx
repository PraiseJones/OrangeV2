"use client";

import { Box, Container, Flex, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

export function Footer() {
  const footerBg = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(9, 8, 9, 0.8)");
  const borderColor = useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const year = new Date().getFullYear();

  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      py="20px"
      bg={footerBg}
      backdropFilter="blur(20px)"
      borderTop="1px solid"
      borderColor={borderColor}
    >
      <Container maxW="1200px">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={{ base: "4", md: "0" }}
        >
          <Text fontSize="sm" color={textColor}>
            © {year} OrangeNFT. All rights reserved.
          </Text>

          <Flex gap="6" align="center">
            <Link
              href="#"
              color={textColor}
              fontSize="sm"
              _hover={{ color: "brand.primary" }}
            >
              Terms
            </Link>
            <Link
              href="#"
              color={textColor}
              fontSize="sm"
              _hover={{ color: "brand.primary" }}
            >
              Privacy
            </Link>
            <Link
              href="#"
              color={textColor}
              fontSize="sm"
              _hover={{ color: "brand.primary" }}
            >
              About
            </Link>
          </Flex>

          <Flex gap="4">
            <Link
              href="#"
              color={textColor}
              _hover={{ color: "brand.primary" }}
            >
              <FaTwitter size={20} />
            </Link>
            <Link
              href="#"
              color={textColor}
              _hover={{ color: "brand.primary" }}
            >
              <FaDiscord size={20} />
            </Link>
            <Link
              href="#"
              color={textColor}
              _hover={{ color: "brand.primary" }}
            >
              <FaGithub size={20} />
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
} 