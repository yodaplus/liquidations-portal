/** @jsx jsx */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Flex, NavLink, Container, Close, Box, IconButton, Divider, jsx, Text } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

import { getNetwork } from '../lib/maker';
import AccountSelect from './header/AccountSelect';
import { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuList } from '@reach/menu-button';
// name.charAt(0).toUpperCase() + name.slice(1)
const COLLATERAL_TYPES = ['link', 'yfi'];
const Header = (props: any): JSX.Element => {
  const network = getNetwork();
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <Box
      as="header"
      pt={3}
      pb={[4, 5]}
      px={[2, 0]}
      variant="styles.header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}
      {...props}
    >
      <Link href={{ pathname: '/', query: { network } }}>
        <IconButton aria-label="Maker home" sx={{ width: '40px', height: 4, p: 0 }}>
          <Icon name="maker" size="40px" sx={{ cursor: 'pointer' }} />
        </IconButton>
      </Link>
      <Flex sx={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <Link href={{ pathname: '/auctions', query: { network } }} passHref> */}
        <Menu>
          <MenuButton
            style={{
              borderWidth: 0,
              backgroundColor: 'inherit'
            }}
          >
            <Text
              p={2}
              sx={{
                fontSize: 3,
                display: ['none', 'block'],
                ml: [0, 4, 'auto'],
                color: router?.asPath?.startsWith('/auctions') ? 'primary' : undefined
              }}
            >
              Auctions
            </Text>
            <MenuList
              style={{
                padding: '32px',
                paddingTop: '16px',
                paddingLeft: '16px'
              }}
            >
              {COLLATERAL_TYPES.map((type, index) => {
                return (
                  <MenuItem key={index} onSelect={() => router.push(`/auctions/${type}`)}>
                    <Text py={2}>{type.toUpperCase()}</Text>
                  </MenuItem>
                );
              })}
            </MenuList>
          </MenuButton>
        </Menu>
        {/* </Link> */}

        <Link href={{ pathname: '/education', query: { network } }} passHref>
          <NavLink
            p={0}
            sx={{
              display: ['none', 'block'],
              ml: [0, 4, 4, 5],
              mr: [0, 'auto', 4, 5],
              color: router?.asPath?.startsWith('/education') ? 'primary' : undefined
            }}
          >
            Education
          </NavLink>
        </Link>

        <AccountSelect sx={{ ml: ['auto', 3, 0] }} />

        <IconButton
          aria-label="Show menu"
          ml="3"
          sx={{ display: [null, 'none'], height: '28px', width: '24px', p: 0 }}
          onClick={() => setShowMobileMenu(true)}
        >
          <Icon name="menu" sx={{ width: '18px' }} />
        </IconButton>
        {showMobileMenu && (
          <MobileMenu hide={() => setShowMobileMenu(false)} router={router} {...{ network }} />
        )}
      </Flex>
    </Box>
  );
};

const MobileMenu = ({ hide, network, router }) => {
  useEffect(() => {
    router.events.on('routeChangeComplete', hide);
  }, []);

  return (
    <Container variant="modal">
      <Close ml="auto" sx={{ display: ['block'], '> svg': { size: [4] } }} onClick={hide} />
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          mt: 4,
          justifyContent: 'space-between',
          height: '40vh',
          '> a': {
            fontSize: 6
          }
        }}
      >
        <Link href={{ pathname: '/', query: { network } }}>
          <NavLink>Home</NavLink>
        </Link>
        <Divider sx={{ width: '100%' }} />
        <Link href={{ pathname: '/auctions', query: { network } }}>
          <NavLink>Auctions</NavLink>
        </Link>
        {COLLATERAL_TYPES.map((type, index) => {
          return (
            <>
              <Divider sx={{ width: '100%' }} />
              <Link href={{ pathname: `/auctions/${type}`, query: { network } }}>
                <NavLink> - {type.toUpperCase()}</NavLink>
              </Link>
            </>
          );
        })}
        <Divider sx={{ width: '100%' }} />
        <Link href={{ pathname: '/education', query: { network } }}>
          <NavLink>Education</NavLink>
        </Link>
      </Flex>
    </Container>
  );
};

export default Header;
