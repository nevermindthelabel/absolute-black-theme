import React from 'react';
import { Nav, ButtonGroup, Navbar, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppContext from '../../AppContext';
import API from '../../utils/API';
import './style.css';

const moment = require('moment');

let dateAndTime;

export default class Navigation extends React.Component {
  static contextType = AppContext;

  state = {
    user: {}
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    API.users
      .getUser()
      .then(res => {
        if (res.data.username && res.data.id) {
          this.setState({
            user: {
              username: res.data.username,
              id: res.data.id
            }
          });
        }
      })
      .catch(err => console.log(err));
  };

  logoutClick = event => {
    event.preventDefault();
    API.users.logout().then(res => {
      this.context.setUser({
        anonymous: true
      });
    });
  };
  getDateTime = () => {
    dateAndTime = moment().format('MMMM Do YYYY, h:mm a');
  };

  render() {
    this.getDateTime();
    return (
      <Navbar expand="lg" bg="dark">
        <Navbar.Brand>
          <span className="text-warning">Traffic</span>
          <span className="text-danger">Mon</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link as="strong">
            <Link to={'/'}>
              <strong>Home</strong>
            </Link>
          </Nav.Link>
          <Nav.Link as="strong">
            <Link to={'/new-user'}>
              <strong>New User</strong>
            </Link>
          </Nav.Link>
          <Nav.Link as="strong">
            <Link to={'/search'}>
              <strong>Search</strong>
            </Link>
          </Nav.Link>
          <Nav.Link as="strong">
            <Link to={'/new-report'}>
              <strong>New Report</strong>
            </Link>
          </Nav.Link>
          <Nav>
            <Row>
              <Col>
                {this.context.user.anonymous !== true ? (
                  <i className="fas fa-user" />
                ) : (
                    <ButtonGroup className="right btn btn-primary" size="small" variant="Login">
                      <Link to={'/login'}>
                        <strong className="text-white">Login</strong>
                      </Link>
                    </ButtonGroup>
                  )}
                <div className="divider" />
                <ButtonGroup
                  className="right btn btn-danger"
                  variant="Logout"
                  onClick={this.logoutClick}
                >
                  <strong>Logout</strong>
                </ButtonGroup>
                <Navbar.Text className="text-primary ml-2" as="strong">
                  <strong>{dateAndTime}</strong>
                </Navbar.Text>
              </Col>
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
