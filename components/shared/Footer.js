/** @jsx jsx */
// import { QRCode } from 'react-qr-svg';
import React from 'react';
import Link from 'next/link';
import { Flex, Grid, Box, Input, Button, NavLink, Link as ExternalLink, Container, jsx } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { translate } from '@makerdao/i18n-helper';
import url from 'url';

const FooterContainer = props => (
  <Container
    as="footer"
    sx={{
      px: [4, 0, 0],
      fontSize: '1.5rem',
      pt: 5,
      pb: 3,
      width: '100%',
      backgroundColor: 'background'
    }}
  >
    {props.children}
  </Container>
);

const LinkListHeader = props => (
  <Box
    as="div"
    sx={{
      fontWeight: 'semiBold',
      marginBottom: '0.2rem',
      color: 'black',
      fontSize: 14.3
    }}
  >
    {props.children}
  </Box>
);

const LinkList = props => (
  <Box
    as="ul"
    sx={{
      paddingLeft: 0,
      listStyle: 'none',
      lineHeight: '2.1rem',
      fontSize: 14,
      '& a': {
        color: 'footerText',
        fontWeight: '400',
        transition: 'color 0.2s ease-out',
        textDecoration: 'none',
        ':hover': { color: 'greenLinkHover' }
      }
    }}
  >
    {props.children}
  </Box>
);

const Icons = props => (
  <Flex
    sx={{
      flexDirection: 'row',
      justifyContent: 'left',
      marginTop: 22,
      '& svg': {
        width: 20,
        height: 20,
        transition: 'opacity 0.2s',
        cursor: 'pointer',
        opacity: 0.8,
        marginRight: 24,
        ':hover': {
          opacity: 1
        }
      }
    }}
  >
    {props.children}
  </Flex>
);

const withInternalLink = (InternalLinkComponent, host) => {
  class InternalLink extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const UniversalURL = (url && url.URL) || URL;
      const to = new UniversalURL(this.props.to);

      if (InternalLinkComponent && to.host === host && !this.props.external) {
        return <InternalLinkComponent to={to.pathname}>{this.props.children}</InternalLinkComponent>;
      } else {
        return (
          <a href={this.props.to} target="_blank" rel="noopener noreferrer">
            {this.props.children}
          </a>
        );
      }
    }
  }

  return InternalLink;
};

// eslint-disable-next-line
const rfc2822EmailRegex = /[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;

/**
 *Global footer component.
 */
class LongFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      message: '',
      subscribeState: '',
      showWeChatModal: false
    };

    this.Link = withInternalLink(Link, this.props.host);

    this.subscribeEmail = this.subscribeEmail.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.toggleWeChatModal = this.toggleWeChatModal.bind(this);
  }

  updateEmail(evt) {
    this.setState({
      email: evt.target.value,
      message: '',
      subscribeState: ''
    });
  }

  subscribeEmail() {
    const httpRequest = new XMLHttpRequest();

    if (!rfc2822EmailRegex.test(this.state.email)) {
      this.setState({
        message: 'Please enter a valid email address.',
        subscribeState: 'failure'
      });
      return;
    }

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          this.setState({
            email: '',
            message: "Thank you. You'll hear from us soon.",
            subscribeState: 'success'
          });
        } else {
          this.setState({
            message: 'An error occurred. Please try again later.',
            subscribeState: 'failure'
          });
        }
      }
    };

    httpRequest.onerror = () => {
      this.setState({
        message: 'An error occurred. Please try again later.',
        subscribeState: 'failure'
      });
    };

    httpRequest.open(
      'POST',
      'https://578v7re7h2.execute-api.us-east-2.amazonaws.com/default/addContactToMailingList',
      true
    );
    httpRequest.setRequestHeader('Content-Type', 'application/json');

    httpRequest.send(
      JSON.stringify({
        email: this.state.email
      })
    );
  }

  toggleWeChatModal() {
    this.setState({
      showWeChatModal: !this.state.showWeChatModal
    });
  }

  render() {
    const Link = this.Link;
    const t = text => translate(text, this.props.locale);

    return (
      <FooterContainer>
        <Grid
          sx={{ maxWidth: 'page' }}
          m="0 auto"
          columns={['1fr', '1fr 1fr', '1fr 1fr', 'repeat(4, 1fr) auto']}
          gap="2rem"
        >
          <div>
            <LinkListHeader>{t('Resources')}</LinkListHeader>
            <LinkList></LinkList>
          </div>
          <div>
            <LinkListHeader>{t('Products')}</LinkListHeader>
            <LinkList>
              <li>
                <Link to="https://borrow.yodaplus.net/">{t('Borrow')}</Link>
              </li>
            </LinkList>
          </div>
          <div>
            <LinkListHeader>{t('Developers')}</LinkListHeader>
            <LinkList></LinkList>
          </div>
          <div>
            <LinkListHeader>{t('Foundation')}</LinkListHeader>
            <LinkList></LinkList>
          </div>
          <Box gridColumn={['1 / 3', '1 / 3', 'unset']}>
            <Icons gap="20px" mt="1.8rem" columns="repeat(7, 20px)">
              <Link to="https://github.com/yodaplus">
                <Icon name="github" />
              </Link>
            </Icons>
            <Box mt="1.8rem" maxWidth="180px">
              {this.props.langDropdown}
            </Box>
          </Box>
        </Grid>
      </FooterContainer>
    );
  }
}

export default function Foot({ shorten = false }) {
  if (shorten) {
    return (
      <footer
        sx={{
          pt: 4,
          pb: 3,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          variant: 'styles.footer',
          fontSize: 2
        }}
      >
        <div sx={{ mx: 'auto' }} />
        <div sx={{ p: 2 }}>© 2022 Yodaplus</div>
      </footer>
    );
  } else {
    return <LongFooter />;
  }
}
