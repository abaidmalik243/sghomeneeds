import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Menu, Icon, Grid, Container, Segment, Sidebar, Header, Button } from 'semantic-ui-react';
import CompanyLogo from '../CompanyAsset/CompanyLogo';
import { links, phoneNumber } from './content';
import SearchBar from '../SearchBar';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import LinkWrapper from '../Base/Link';

import './styles.css';
import NavigationMenuItem from './NavigationMenuItem';

class NavigationBar extends React.Component {
  state = { visible: false, height: 0, first: 5, second: 4, three: 3, four: 4 }

  handleHideClick = () => this.setState({ visible: false }, () => { this.setState({ height: 0 }) })
  handleShowClick = () => this.setState({ visible: true, height: 200 })
  handleSidebarHide = () => this.setState({ visible: false }, () => { this.setState({ height: 0 }) })

  render() {
    const { visible } = this.state;
    const { showMenu, showToggle, onToggle, history } = this.props;
    window.onresize = () => {
      if (window.innerWidth < 1154) {
        this.setState(
          { first: 8, second: 8, three: 8, four: 8 })
      }
      else if (window.innerWidth > 1154) {
        this.setState({ first: 5, second: 4, three: 3, four: 4 })
      }
    }
    return (
      //   <Container fluid style={{padding:'10px 70px',position:'fixed',zIndex:200,background:'#ffffff'}}>
      //   <Grid doubling columns={4}>
      //   <Grid.Column width={6} >
      //   <div className="company-logo-wrapper">
      //            <LinkWrapper href="/">
      //            <CompanyLogo />
      //            </LinkWrapper>
      //         </div>
      //          <div className="phone-number-wrapper">
      //          <h4>{phoneNumber}</h4>
      //          </div>
      //   </Grid.Column>
      //   <Grid.Column width={2}>
      //   <p>Hello</p>
      //   </Grid.Column>
      //   <Grid.Column width={4} >
      //   <p>Hello</p>
      //   </Grid.Column>
      //   <Grid.Column width={4}>
      //   <p>Hello</p>
      //   </Grid.Column>
      // </Grid>
      // </Container>

      //     <div
      //       id="navbar-wrapper"
      //       className={classNames({
      //         desktop: !showToggle,
      //         mobile: showToggle,
      //         show: showMenu,
      //       })}
      //     >
      //       {/* <Grid width={4}>
      //      <Grid.Row> */}

      //       {/* <div> */}

      //       <Menu
      //         secondary
      //         stackable={showToggle}
      //         fixed="top" style={{ minHeight: '60px', }}
      //         className={classNames('navigation-menu', { show: showMenu })}
      //       >
      //         {/* <Grid columns={2} style={{margin: '0px'}}> */}
      //         <div
      //           style={{
      //             position: 'fixed',
      //             top: '20px',
      //             right: '20px',
      //             zIndex: 99,
      //             display: showToggle ? 'inherit' : 'none',
      //           }}
      //         >
      //           <Icon link name="bars" onClick={onToggle} size="large" />
      //         </div>
      //         {/* </Grid> */}
      // <Container fluid style={{padding:'10px 50px'}}>
      //         <Grid  style={{margin: '0px'}}>
      //         <Menu.Item className="">
      //           <div className="company-logo-wrapper">
      //             <LinkWrapper href="/">
      //               <CompanyLogo />
      //             </LinkWrapper>
      //           </div>
      //           <div className="phone-number-wrapper">
      //             <h4>{phoneNumber}</h4>
      //           </div>

      //         </Menu.Item>
      //         </Grid>
      //           <Grid  style={{margin: '0px'}}>
      //         {links.map(item => (
      //           <NavigationMenuItem
      //             key={item.key}
      //             a={{
      //               href: item.url,
      //               text: item.text,
      //               className: 'navigation-menu-item item',
      //             }}
      //           />
      //         ))}
      //         </Grid>

      //         <Grid  style={{margin: '0px'}}>
      //         {/* <Menu.Menu position='right'> */}
      //           <Menu.Item
      //             position="left"
      //             style={{ display: showMenu ? 'inherit' : 'none' }}
      //           >
      //             <SearchBar
      //               history={history}
      //               width="210px"
      //               placeholder="What service do you need?"
      //               inputStyle={{
      //                 borderRadius: '0px',
      //               }}
      //               buttonStyle={{}}
      //             />
      //           </Menu.Item>

      //           </Grid>
      //             <Grid className="nav_link_last_item1">
      //           <Menu.Item style={{ display: showMenu ? 'inherit' : 'none'}} >


      //               <LoginButton
      //                 onClick={() => {
      //                   history.push('/login');
      //                 }}
      //               />

      //             </Menu.Item>
      //             <Menu.Item style={{ display: showMenu ? 'inherit' : 'none'}} >
      //             <div style={{ margin: '0px 5px' }}>
      //               <RegisterButton
      //                 onClick={() => {
      //                   history.push('/register');
      //                 }}
      //               />

      //             </div>
      //           </Menu.Item>

      //         {/* </Menu.Menu> */}

      //         </Grid>
      //         </Container>
      //       </Menu>

      //       {/* </div> */}

      //       {/* </Grid.Row>
      //       </Grid> */}

      //       <div
      //         id="navbar-bottom"
      //         className={classNames({
      //           desktop: !showToggle,
      //           mobile: showToggle,
      //         })}
      //       />
      //     </div>
      //  mobeen
      <div className="box-show" style={{ /*position: 'fixed', */  width: '100%', zIndex: 200, background: 'white', padding: '28px 40px' }}>
        <Grid>


          <Grid.Row columns={4} only='computer'>
            <Grid.Column width={this.state.first} className="first" style={{ paddingTop: 10 }}>
              <div className="company-logo-wrapper">
                <LinkWrapper href="/">
                  <CompanyLogo />
                </LinkWrapper>
              </div>
              <div className="phone-number-wrapper">
                <h4>{phoneNumber}</h4>
              </div>
            </Grid.Column>
            <Grid.Column id="hoverable-item" className="second" width={this.state.second} style={{ marginTop: 10, textAlign: 'right', paddingTop: 10 }}>
              {links.map(item => (
                <NavigationMenuItem
                  key={item.key}
                  a={{
                    href: item.url,
                    text: item.text,
                    className: 'navigation-menu-item item',
                  }}
                />
              ))}
            </Grid.Column>
            <Grid.Column width={this.state.three} className="three" style={{ paddingTop: 10 }}>
              <SearchBar
                history={history}
                width="210px"
                placeholder="What service do you need?"
                inputStyle={{
                  borderRadius: '0px',
                }}
                buttonStyle={{}}
              />
            </Grid.Column>
            <Grid.Column id="LR" className="four" width={this.state.four} style={{ paddingTop: 10 }} >

              <LoginButton
                onClick={() => {
                  history.push('/login');
                }}
              />

              <RegisterButton
                onClick={() => {
                  history.push('/register');
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={4} only='tablet'>
            <Grid.Column width={8} style={{ marginRight: '0', paddingRight: '0' }}  >
              <div className="company-logo-wrapper" style={{ display: 'flex' }} >
                <LinkWrapper href="/">
                  <CompanyLogo />
                </LinkWrapper>
                <div className="phone-number-wrapper">
                  <h4>{phoneNumber}</h4>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={8} id="hoverable-item" style={{ textAlign: 'right',paddingTop:10 }} >
              {links.map(item => (
                <NavigationMenuItem
                  key={item.key}
                  a={{
                    href: item.url,
                    text: item.text,
                    className: 'navigation-menu-item item',
                  }}
                />
              ))}
            </Grid.Column>
            <Grid.Column width={8} style={{ paddingTop: 10 }} >
              <SearchBar
                history={history}
                width="210px"
                placeholder="What service do you need?"
                inputStyle={{
                  borderRadius: '0px',
                }}
                buttonStyle={{}}
              />
            </Grid.Column>
            <Grid.Column width={8} style={{ textAlign: 'right', paddingTop: 10 }}>
              <LoginButton
                onClick={() => {
                  history.push('/login');
                }}
              />

              <RegisterButton
                onClick={() => {
                  history.push('/register');
                }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3} only='mobile'>
            <Grid.Column width={12} >
              <div className="company-logo-wrapper">
                <LinkWrapper href="/">
                  <CompanyLogo />
                </LinkWrapper>
              </div>
            </Grid.Column >
            <Grid.Column style={{ textAlign: 'right' }} width={4} >
              {/* <Button disabled={visible} onClick={this.handleShowClick}>
                Show sidebar
          </Button> */}
              <Icon link name="bars" onClick={this.handleShowClick} size="large" />
            </Grid.Column>
            <Grid.Column width={16} style={{ marginTop: 15 }} >
              <SearchBar
                history={history}
                fluid
                placeholder="What service do you need?"
                inputStyle={{
                  borderRadius: '0px',
                }}
                buttonStyle={{}}
              />
            </Grid.Column>
          </Grid.Row>
          {/* side Nav on Mobile View */}

        </Grid>
        <Sidebar.Pushable as='div'>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            direction="top"
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <a href={links[0].url}>
                {links[0].text}
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href={links[1].url}>
                {links[1].text}
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href={links[2].url}>
                {links[2].text}
              </a>
            </Menu.Item>
            <Menu.Item>
              <LoginButton
                onClick={() => {
                  history.push('/login');
                }}
              />

              <RegisterButton
                onClick={() => {
                  history.push('/register');
                }}
              />
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <div style={{ height: this.state.height }}>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div >
    );
  }
}

NavigationBar.propTypes = {
  showMenu: PropTypes.bool,
  showToggle: PropTypes.bool,
  onToggle: PropTypes.func,
  history: PropTypes.object,
};

export default NavigationBar;
