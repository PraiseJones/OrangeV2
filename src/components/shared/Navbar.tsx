"use client";

import { client } from "@/consts/client";
import { useGetENSAvatar } from "@/hooks/useGetENSAvatar";
import { useGetENSName } from "@/hooks/useGetENSName";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { blo } from "blo";
import { FaRegMoon } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoSunny } from "react-icons/io5";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import type { Wallet } from "thirdweb/wallets";
import { SideMenu } from "./SideMenu";

export function Navbar() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { colorMode } = useColorMode();
  
  const navbarBg = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(9, 8, 9, 0.8)"
  );
  const borderColor = useColorModeValue(
    "rgba(0, 0, 0, 0.1)",
    "rgba(255, 255, 255, 0.1)"
  );

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      py="12px"
      px={{ base: "20px", lg: "50px" }}
      bg={navbarBg}
      backdropFilter="blur(20px)"
      borderBottom="1px solid"
      borderColor={borderColor}
    >
      <Flex direction="row" justifyContent="space-between" maxW="1200px" mx="auto">
        <Box my="auto">
          <Heading
            as={Link}
            href="/"
            _hover={{ textDecoration: "none" }}
            color="brand.primary"
            fontWeight="extrabold"
            size="md"
          >
            OrangeNFT
          </Heading>
        </Box>
        <Box display={{ lg: "block", base: "none" }}>
          <ToggleThemeButton />
          {account && wallet ? (
            <ProfileButton address={account.address} wallet={wallet} />
          ) : (
            <ConnectButton
              client={client}
              theme={colorMode}
              connectButton={{
                style: { 
                  height: "44px",
                  backgroundColor: "white",
                  color: "#090809",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "0 16px",
                  fontSize: "14px",
                  fontWeight: "500"
                }
              }}
            />
          )}
        </Box>
        <SideMenu />
      </Flex>
    </Box>
  );
}

function ProfileButton({
  address,
  wallet,
}: {
  address: string;
  wallet: Wallet;
}) {
  const { disconnect } = useDisconnect();
  const { data: ensName } = useGetENSName({ address });
  const { data: ensAvatar } = useGetENSAvatar({ ensName });
  const { colorMode } = useColorMode();
  return (
    <Menu>
      <MenuButton as={Button} height="44px">
        <Flex direction="row" gap="4">
          <Box my="auto">
            <FiUser size={24} />
          </Box>
          <Image
            src={ensAvatar ?? blo(address as `0x${string}`)}
            height="32px"
            rounded="6px"
          />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem display="flex">
          <Box mx="auto">
            <ConnectButton 
              client={client} 
              theme={colorMode}
              connectButton={{
                style: { 
                  height: "44px",
                  backgroundColor: "white",
                  color: "#090809",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "0 16px",
                  fontSize: "14px",
                  fontWeight: "500"
                }
              }}
            />
          </Box>
        </MenuItem>
        <MenuItem as={Link} href="/profile" _hover={{ textDecoration: "none" }}>
          Profile {ensName ? `(${ensName})` : ""}
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (wallet) disconnect(wallet);
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button height="44px" w="44px" onClick={toggleColorMode} mr="10px">
      {colorMode === "light" ? <FaRegMoon /> : <IoSunny />}
    </Button>
  );
}
