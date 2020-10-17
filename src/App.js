import React, { Component } from "react";
import s from "./App.module.css";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import { Layout, Menu, Spin } from "antd";
import FirebaseContext from "./context/firebaseContext";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./utils/privateRoute";
import SomePage from "./pages/SomePage";
import CurrentCard from "./pages/CurrentCard";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addUserAction, OutUserAction } from "./actions/userAction";
import firebase from "firebase/app";
import history from "./services/history";

const { Content, Header } = Layout;
console.log('app')

class App extends Component {
  componentDidMount() {
    const { addUser, outUser, userUid } = this.props;
    console.log('componentDidMount')

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user.uid));
        addUser(user);
      } else {
        console.log('out')
        outUser();
        localStorage.removeItem("user");
        this.props.history.push("/");
      }
    });
    
  }

  onSignOut = () => {
    const { outUser } = this.props;
    firebase.auth().signOut();
    outUser();
    localStorage.removeItem("user");
  };

  render() {
    const { userUid, userEmail, signOut } = this.props;
   console.log('render')
    
   if (!userUid && !signOut) {
    return (
      <div className={s.loader_wrap}>
        <Spin size="large" />
      </div>
    );
  }
    return (
      <>
        <Route path="/login" exact component={LoginPage} />
        <Route
          render={(props) => {
            const { history: { push } } = props;
            return (
              <Layout>
                <Header>
                  <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1">
                      <Link href to="/">
                        На главную
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Link href to="/about">
                        О проекте
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Link href to="/contacts">
                        Контакты
                      </Link>
                    </Menu.Item>

                    <Menu.Item
                      key="4"
                      onClick={this.onSignOut}
                      style={{ float: "right" }}
                    >
                      {userEmail} Выйти..
                    </Menu.Item>
                  </Menu>
                </Header>
                <Content>
                  <Switch>
                    <PrivateRoute path="/" exact component={HomePage} />
                    <PrivateRoute
                      path="/home/:id?/:isDone?"
                      component={HomePage}
                    />
                    <PrivateRoute path="/about" component={SomePage} />
                    <PrivateRoute path="/contacts" component={SomePage} />
                    <PrivateRoute path="/word/:id?" component={CurrentCard} />
                  </Switch>
                </Content>
              </Layout>
            );
          }}
        />
      </>
    );
  }
}

App.contextType = FirebaseContext;

const mapStateToProps = (state) => {
 
  return {
    userUid: state.user.userUid,
    userEmail: state.user.userEmail,
    signOut: state.user.signOut,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addUser: addUserAction,
      outUser: OutUserAction,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
