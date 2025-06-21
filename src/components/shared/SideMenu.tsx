"use client";

import { client } from "@/consts/client";
import { useGetENSAvatar } from "@/hooks/useGetENSAvatar";
import { useGetENSName } from "@/hooks/useGetENSName";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaRegMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";

export function SideMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { disconnect } = useDisconnect();
  const account = useActiveAccount();
  const { data: ensName } = useGetENSName({ address: account?.address });
  const { data: ensAvatar } = useGetENSAvatar({ ensName });
  const { colorMode, toggleColorMode } = useColorMode();
  const wallet = useActiveWallet();

  const menuBg = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(9, 8, 9, 0.8)"
  );
  const borderColor = useColorModeValue(
    "rgba(0, 0, 0, 0.1)",
    "rgba(255, 255, 255, 0.1)"
  );
  const textColor = useColorModeValue("gray.700", "gray.300");
  const buttonBg = useColorModeValue("white", "gray.800");

  return (
    <>
      <Button
        display={{ lg: "none", base: "block" }}
        ref={btnRef}
        onClick={onOpen}
        bg={buttonBg}
        border="1px solid"
        borderColor={borderColor}
        _hover={{ bg: buttonBg }}
      >
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay backdropFilter="blur(8px)" />
        <DrawerContent
          bg={menuBg}
          backdropFilter="blur(20px)"
          borderLeft="1px solid"
          borderColor={borderColor}
        >
          <DrawerCloseButton 
            size="lg"
            color={textColor}
            top="24px"
            right="24px"
          />
          
          <Box p="6">
            <Flex direction="column" gap="6">
              <Button
                height="44px"
                w="44px"
                onClick={toggleColorMode}
                bg={buttonBg}
                border="1px solid"
                borderColor={borderColor}
                _hover={{ bg: buttonBg }}
              >
                {colorMode === "light" ? <FaRegMoon /> : <IoSunny />}
              </Button>

              <Box>
                <ConnectButton 
                  theme={colorMode} 
                  client={client}
                  connectButton={{
                    style: { 
                      width: "100%",
                      height: "44px",
                      backgroundColor: buttonBg,
                      color: textColor,
                      border: `1px solid ${borderColor}`,
                      borderRadius: "8px",
                      padding: "0 16px",
                      fontSize: "14px",
                      fontWeight: "500"
                    }
                  }}
                />
              </Box>

              {account && (
                <Flex direction="column" gap="4">
                  <Link 
                    href="/profile"
                    style={{
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: `1px solid ${borderColor}`,
                      color: textColor,
                      fontSize: "14px",
                      fontWeight: "500",
                      textDecoration: "none"
                    }}
                    _hover={{
                      bg: buttonBg
                    }}
                  >
                    <Text>Profile {ensName ? `(${ensName})` : ""}</Text>
                  </Link>

                  <Button
                    onClick={() => {
                      if (wallet) {
                        disconnect(wallet);
                        onClose();
                      }
                    }}
                    height="44px"
                    bg={buttonBg}
                    border="1px solid"
                    borderColor={borderColor}
                    color={textColor}
                    fontSize="14px"
                    _hover={{ bg: buttonBg }}
                  >
                    Logout
                  </Button>
                </Flex>
              )}
            </Flex>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
}
