import React from 'react';
import { Home, Playlist, Toll } from 'components/Icons';
import { Link } from 'react-router-dom';
import { Flex, Box, Button } from '@chakra-ui/react';
import useRouter from 'hooks/useRouter';
import { connect } from 'react-redux';
import theme from 'theme.js';

const MobileNavigation = ({
  playlistVisible,
  setPaylistVisibility,
  playlist,
  coins,
}) => {
  const router = useRouter();

  return (
    <div className='mobile-navigation'>
      <Link to='/'>
        <Box px={2}>
          <Button variant='link' style={{ minHeight: '44px' }}>
            <Home active={router.pathname === '/'} />
          </Button>
        </Box>
      </Link>

      <Flex align='center'>
        <Box px={2}>
          <Toll height='26px' width='26px' />
        </Box>
        <Box minWidth='25px' color={`${theme.colors.etBlue}`} fontFamily='Spotify-Light'>
          {coins}
        </Box>
      </Flex>

      <Box
        px={2}
        onClick={() => setPaylistVisibility(!playlistVisible)}
        style={{ position: 'relative' }}
      >
        <Button variant='link' style={{ minHeight: '44px' }}>
          <Playlist />
          {/* <Box
            style={{
              position: 'absolute',
              color: `${theme.colors.etGreen}`,
              top: '1px',
              right: '1px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {playlist.length === 0 ? '' : '•'}
          </Box> */}
        </Button>
      </Box>
    </div>
  );
};
export default connect((state) => ({
  playlist: state.user.playlist,
  updatedAt: state.user.updatedAt,
  coins: state.user.coins,
}))(MobileNavigation);
