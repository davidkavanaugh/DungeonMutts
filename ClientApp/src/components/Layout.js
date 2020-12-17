import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
export class Layout extends Component {
  static displayName = Layout.name;
  constructor(props) {
    super(props);
    this.state = {
      clicked: "",
    };
  }

  handleClick = async (e) => {
    await this.setState({
      clicked: e.target,
    });
  };

  render() {
    return (
      <div onClick={(e) => this.handleClick(e)} style={{ minHeight: "100vh" }}>
        <NavMenu clicked={this.state.clicked} />
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}
