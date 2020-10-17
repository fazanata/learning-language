import React, { Component } from "react";
import HeaderBlock from "./../../components/HeaderBlock/HeaderBlock";
import ContentBlock from "./../../components/ContentBlock/ContentBlock";
import FooterBlock from "./../../components/FooterBlock/FooterBlock";
import Header from "./../../components/Header";
import Paragraph from "./../../components/Paragraph";
import CardList from "./../../components/CardList";
import FirebaseContext from "../../context/firebaseContext";
import s from './Home.module.scss';
import { bindActionCreators } from "redux";
import { fetchCardList, setCardList } from "../../actions/cardListAction";
import { connect } from 'react-redux';
import {  Spin } from "antd";
import  firebase  from 'firebase/app';
import { addUserAction } from "../../actions/userAction";

class HomePage extends Component {

  componentDidMount() {
  
    const {
      fetchCardList,
      userUid,
      addUser
    } = this.props;
    
    if (!userUid) {
      firebase.auth().onAuthStateChanged((user) => {
        console.log('делаем onAuthStateChanged в компоненте HomePage userUid =', user.uid);
        if (user) {
          addUser(user);
          console.log('auuuth ', user);
        } 
      })
    }
    console.log("#### запрос к базе ", this.props.userUid);
    //console.log('а это componentDidMount компонента HomePage где запрос к базе и userUid из state = ', userUid); 

    fetchCardList(() => firebase.database().ref(`/cards/${this.props.userUid}`));
  }

  
  onAddItem = (eng, rus) => {
    const {
      fetchCardList,
      setCardList,
      userUid,
      addUser,
      wordArr
    } = this.props;
    

    const wordId = `f${(~~(Math.random() * 1e8)).toString(16)}`;
    console.log({ eng: eng, rus: rus, id: wordId });

    setCardList(() => firebase.database().ref(`/cards/${userUid}`), [
      ...wordArr,
      {
        id: wordId,
        eng: eng,
        rus: rus,
      },
    ]);
  };

  handleDeleteItem = (id) => {
    const {
      setCardList,
      userUid,
      wordArr
    } = this.props;
    
    const newWordArr = wordArr.filter((word) => word.id !== id);

    setCardList(() => firebase.database().ref(`/cards/${userUid}`), newWordArr);
  };

  onSignOut = () => {
    
    
    const { addUser } = this.props;
    
    firebase.auth.signOut()
    
    //addUser(null);
    
    
    localStorage.removeItem("user");
    this.props.history.push('/login');
  };

  render() {
    
    
    const { wordArr, isBusy } = this.props;
    const {userEmail} = this.context;
    //console.log('это рендер компонента HomePage и userUid =', this.props.userUid)
    
    if (isBusy) {
      return (
        <>
        <Spin />
        <div>подождите данные загружаются</div>
        </>
    );
    }

    return (

      <div className="App">
        <header className="App-header">
          <ContentBlock>
            <div className="App-list">
              <CardList
                onDeletedItem={this.handleDeleteItem}
                onAddItem={this.onAddItem}
                item={wordArr}
              />
            </div>
          </ContentBlock>

          <HeaderBlock hideBackground backgroundColor="#3a5280">
          <Header>Вы зашли как пользователь - {userEmail}</Header>
            <Paragraph>Вы добавили - ____ слов</Paragraph>
              <a className={s.signoutlink} onClick={this.onSignOut} style={{ float: "right" }}>
              Выйти..
            </a>
          </HeaderBlock>

          
          <FooterBlock text=" (с) 2020, Наталья Мещерякова" />
        </header>
      </div>
    );
  }
}

HomePage.contextType = FirebaseContext;

const mapStateToProps = (state) => {
 //console.log("а это mapStateToProps компонента HomePage и userUid =   ", state.user.userUid)
  return {
    isBusy: state.cardList.isBusy,
    wordArr: state.cardList.payload || [],
    userUid: state.user.userUid || null,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchCardList: fetchCardList,
    setCardList: setCardList,
    addUser: addUserAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
