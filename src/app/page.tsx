"use client";

import { Box, useColorModeValue } from "@chakra-ui/react";

export default function Home() {
  const bgColor = useColorModeValue("white", "brand.dark");

  return (
    <Box bg={bgColor} minH="100vh">
      <Box mt="24px" m="auto" maxW="1200px" px="20px">
        {/* We will build the marketplace components here */}
      </Box>
    </Box>
  );
}
