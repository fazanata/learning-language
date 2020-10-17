import React, { Component } from "react";
import Card from "../../components/Card";
import { withFirebase } from "../../context/firebaseContext";
import { Typography, Spin } from "antd";
import s from "./CurrentCard.module.scss";
const { Title } = Typography;

class CurrentCard extends React.PureComponent {
  state = {
    word: {
      _id: 0,
      eng: "",
      rus: "",
    },
  };

  componentDidMount() {
    const {
      firebase,
      match: { params },
    } = this.props;
    if (params.id) {
      firebase
        .getUserCurrentCardRef(params.id)
        .once("value")
        .then((res) => {
          this.setState({
            word: res.val(),
          });
        });
    }
  }

  render() {
    const {
      word: { eng, rus },
    } = this.state;

    if (eng == "" && rus === "") {
      return (
        <div className={s.root}>
          <Spin />
        </div>
      );
    }

    return (
      <div className={s.root}>
        <Title>Текущее слово - {eng}</Title>
        <Card eng={eng} rus={rus} />
      </div>
    );
  }
}

export default withFirebase(CurrentCard);
