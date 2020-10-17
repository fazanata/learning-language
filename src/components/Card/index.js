import React, { Component } from "react";
import s from "./Card.module.scss";
import cl from "classnames";
import { CheckSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import { withRouter } from 'react-router-dom';

class Card extends React.Component {
  state = {
    done: false,
    isRemembered: false,
  };

  componentDidMount(){
    //console.log("props =", this.props);
    const { match: {params}, index} = this.props;
    //console.log("index=",index );
    if (index === +params.id) {
      this.setState({
        done: params.isDone
      })
    }
  }

  handleCardClick = () => {
    if (!this.state.isRemembered) {
      this.setState(({ done, isRemembered }) => {
        return {
          done: !done,
        };
      });
    }
  };

  handleIsRememberClick = () => {
    this.setState(({ isRemembered }) => {
      return {
        isRemembered: !isRemembered,
        done: true,
      };
    });
  };

  handleDeletedClick = () => {
    this.props.onDeleted();
  };

  render() {
    const { eng, rus } = this.props;
    const { done, isRemembered } = this.state;

    return (
      <div className={s.root}>
        <div
          className={cl(s.card, {
            [s.done]: done,
            [s.isRemembered]: isRemembered,
          })}
          onClick={this.handleCardClick}
        >
          <div className={s.cardInner}>
            <div className={s.cardFront}>{eng}</div>
            <div className={s.cardBack}>{rus}</div>
          </div>
        </div>
        <div
          className={cl(s.icons, {
            [s.clicked]: isRemembered,
          })}
        >
          <CheckSquareOutlined onClick={this.handleIsRememberClick} />
        </div>
        <div className={s.icons}>
          <DeleteOutlined onClick={this.handleDeletedClick} />
        </div>
      </div>
    );
  }
}
export default withRouter(Card);
