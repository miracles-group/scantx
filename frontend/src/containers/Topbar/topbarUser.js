import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { Link } from "react-router-dom";
import IntlMessages from "../../components/utility/intlMessages";
import TopbarDropdownWrapper from "./topbarDropdown.style";
import {
  IconButtons,
  TopbarDropdown,
  UserInformation,
  SettingsList,
  Icon
} from "./topbarDropdown.style";
import authAction from "../../redux/auth/actions";
import { role } from "helpers/user";

const { logout } = authAction;

const theme = createMuiTheme({
  overrides: {
    MuiModal: {
      root: {
        zIndex: 1800
      }
    },
    MuiPopover: {
      paper: {
        maxWidth: 290
      }
    }
  }
});

class TopbarUser extends Component {
  state = {
    visible: false,
    anchorEl: null
  };
  hide = () => {
    this.setState({ visible: false });
  };
  handleVisibleChange = () => {
    this.setState({
      visible: !this.state.visible,
      anchorEl: findDOMNode(this.button)
    });
  };
  render() {
    const { profile } = this.props;
    const content = (
      <TopbarDropdown>
        <UserInformation>
          <div className="userImage">
            <img
              src="http://www.myiconfinder.com/uploads/iconsets/256-256-5d8cab7b01ffef290b73909d06d92705.png"
              alt="user"
            />
          </div>

          <div className="userDetails">
            <h3>
              {profile.givenName} {profile.familyName}
            </h3>
            <p>{role(profile.roleID)}</p>
          </div>
        </UserInformation>

        <SettingsList>
          <Link to="/" onClick={this.props.logout} className="dropdownLink">
            <Icon>input</Icon>
            <IntlMessages id="topbar.logout" />
          </Link>
        </SettingsList>
      </TopbarDropdown>
    );
    return (
      <div id="topbarUserIcon">
        <IconButtons
          ref={node => {
            this.button = node;
          }}
          onClick={this.handleVisibleChange}
        >
          <div className="userImgWrapper">
            <img
              src="http://www.myiconfinder.com/uploads/iconsets/256-256-5d8cab7b01ffef290b73909d06d92705.png"
              alt="#"
            />
          </div>
        </IconButtons>

        <MuiThemeProvider theme={theme}>
          <TopbarDropdownWrapper
            open={this.state.visible}
            anchorEl={this.state.anchorEl}
            onClose={this.hide}
            // marginThreshold={66}
            className="userPopover"
            anchorOrigin={{
              horizontal: "right",
              vertical: "top"
            }}
            transformOrigin={{
              horizontal: "right",
              vertical: "bottom"
            }}
          >
            {content}
          </TopbarDropdownWrapper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.App,
    customizedTheme: state.ThemeSwitcher.topbarTheme,
    profile: state.Auth.profile
  }),
  { logout }
)(TopbarUser);
