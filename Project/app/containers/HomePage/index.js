/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import BugReportIcon from '@material-ui/icons/BugReport';
import HomeIcon from '@material-ui/icons/Home';
import {
  FaUser,
  FaUserMd,
  FaWrench,
  FaPeopleCarry,
  FaPlug,
  FaSnowflake,
  FaShoppingBasket,
} from 'react-icons/fa';
import { IoIosConstruct } from 'react-icons/io';
import { TiTree } from 'react-icons/ti';
import NavBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import Img1 from '../../images/18505_Bedroom-.jpg';
import Img2 from '../../images/18509_bedroom-1.jpg';
import Img3 from '../../images/18512_bomb-shelther-1.jpg';
import SearchBar from '../../components/SearchBar';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  state = {
    searchInput: '',
  };

  renderProjects() {
    const projects = [
      { title: 'Interior Design', icon: <HomeIcon />, url: '#' },
      { title: 'Carpenters', icon: <TiTree />, url: '#' },
      { title: 'Handyman', icon: <IoIosConstruct />, url: '#' },
      { title: 'Pest Control', icon: <BugReportIcon />, url: '#' },
      { title: 'Air Conditioner', icon: <FaSnowflake />, url: '#' },
      { title: 'Smart Home', icon: <SignalCellularAltIcon />, url: '#' },
      { title: 'Electricans', icon: <FaPlug />, url: '#' },
      { title: 'Cleaning', icon: <FaShoppingBasket />, url: '#' },
      { title: 'Home Moving', icon: <FaPeopleCarry />, url: '#' },
      { title: 'Plumbers', icon: <FaWrench />, url: '#' },
      { title: 'Elderly Caregivers', icon: <FaUserMd />, url: '#' },
      { title: 'Maids', icon: <FaUser />, url: '#' },
    ];
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="baseline"
        style={{ paddingRight: 100, paddingLeft: 100 }}
      >
        <Grid item xs={12}>
          <Paper>
            <Grid
              container
              spacing={16}
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Typography
                  variant="title"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Popular Home Projects
                </Typography>
              </Grid>
              {projects.map(e => (
                <Grid item key={e.title} xs={3} align="center">
                  <a href={e.url} style={{ textDecoration: 'none' }}>
                    {e.icon}
                    <Typography align="center" color="textPrimary" gutterBottom>
                      {e.title}
                    </Typography>
                  </a>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <div>
        <NavBar />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="baseline"
          style={{ flexGrow: 1, padding: 100 }}
        >
          <Grid item>
            <Typography
              variant="display3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Reliable Home Professionals In Singapore
            </Typography>
            <Typography
              variant="title"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              SGHomeNeeds is the trusted partner for your home
            </Typography>
          </Grid>
          <SearchBar
            onTextChange={event => {
              const {
                target: { value },
              } = event;
              if (value != null) {
                this.setState(() => ({ searchInput: value }));
              }
            }}
            onSearch={() => {
              window.location = `/directory?q=${this.state.searchInput}`;
            }}
          />
          <Grid
            container
            xs={12}
            direction="row"
            justify="center"
            alignItems="baseline"
            style={{ flexGrow: 1, padding: '20px 100px' }}
          >
            <div style={{ display: 'inline-block' }}>
              <Typography align="left" color="textPrimary" gutterBottom>
                View all <a href="/services">Home Categories</a>
              </Typography>
            </div>
          </Grid>
        </Grid>
        {this.renderProjects()}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="baseline"
          spacing={40}
          style={{ flexGrow: 1, padding: 100, backgroundColor: '#fff' }}
        >
          <Grid item xs={12}>
            <Typography
              variant="title"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Popular services in Your Area.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <img alt="complex" src={Img1} width="100%" />
            <Typography
              variant="subheading"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Marine Parade
            </Typography>
            <Typography align="left" color="textPrimary" gutterBottom>
              Lux Design Pte Ltd was started with the foremost priority to build
              our customer dream house. Every customer’s needs and concerns form
              our core responsibility. ...
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <img alt="complex" src={Img2} width="100%" />
            <Typography
              variant="subheading"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Marine Parade
            </Typography>
            <Typography align="left" color="textPrimary" gutterBottom>
              Lux Design Pte Ltd was started with the foremost priority to build
              our customer dream house. Every customer’s needs and concerns form
              our core responsibility. ...
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <img alt="complex" src={Img3} width="100%" />
            <Typography
              variant="subheading"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Marine Parade
            </Typography>
            <Typography align="left" color="textPrimary" gutterBottom>
              Lux Design Pte Ltd was started with the foremost priority to build
              our customer dream house. Every customer’s needs and concerns form
              our core responsibility. ...
            </Typography>
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}
