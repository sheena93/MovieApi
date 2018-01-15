import {FormGroup,ControlLabel,FormControl,HelpBlock,Button,Grid, Row, Col} from 'react-bootstrap';
import React, { Component } from 'react';

class LoginPage extends React.Component{

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          onChange={this.props.handleChange}
        >
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type="text"
                name="username"
                value={this.props.username}
                placeholder="Enter username"
              />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={6} md={4}>
              <ControlLabel>Passphrase</ControlLabel>
              <FormControl
                type="text"
                name="password"
                value={this.props.password}
                placeholder="Enter password"
              />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={12} md={4}>
              <Button bsStyle="primary" onClick={()=>{this.props.isUserAuthorized();}}>Login</Button>
            </Col>
          </Row>

        </Grid>
      </FormGroup>
    </form>
    );

  }
};

export default LoginPage;
