import React, { Component } from "react";
import { Form, Input, Button } from "antd";

import s from "./Login.module.scss";
import FirebaseContext from "../../context/firebaseContext";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addUserAction, OutUserAction } from "../../actions/userAction";

import firebase from "firebase/app";


class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };
  onFinish = ({ email, password }) => {
    
    const { history, addUser } = this.props;

    this.setState(() => {
      return {
        error: "",
      };
    });
    
    firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
      addUser(res.user);
      localStorage.setItem('user', res.user.uid);
      history.push('/');
    });

  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onFinishFailed = (errorMsg) => {
    console.log(errorMsg);
  };

  onSignIn = () => {
    const { email, password } = this.state;
    console.log({ email, password });
    if (email === "" || password === "") {
      this.setState({
        error: "вы не ввели все данные для регистрации!",
      });
    } else {
      const { createNewUser } = this.context;
      createNewUser(email, password).then((res) => {
        this.props.history.push('/');
      });
    }
  };

  renderForm = () => {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };
    return (
      <div>
        <div className={s.headertext}>
          Войдите или зарегистрируйтесь, чтобы начать обучение
        </div>

        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            onChange={this.onChangeEmail}
            rules={[
              {
                required: true,
                message: "Пожалуйста, заполните данные email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            onChange={this.onChangePassword}
            rules={[
              {
                required: true,
                message: "Пожалуйста, заполните данные пароля!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Залогиниться
            </Button>
            <Button htmlType="button" onClick={this.onSignIn}>
              Зарегистрироваться..
            </Button>
          </Form.Item>
        </Form>
        <div className={s.error}>{this.state.error}</div>
      </div>
    );
  };
  render() {
      
    return (
      <div className={s.root}>
        <div className={s.form_wrap}>{this.renderForm()}</div>
      </div>
    );
  }
}

LoginPage.contextType = FirebaseContext;

const mapStateToProps = (state) => {
 
  return {
    userUid: state.user.userUid,
    userEmail: state.user.userEmail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addUser: addUserAction
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
