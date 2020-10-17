import React from "react";
import Card from "../Card";
import s from "./CardList.module.scss";
import { Input } from "antd";
import getTranslateWord from "../../services/dictionary";

const { Search } = Input;

class CardList extends React.Component {
  state = {
    valueRu: "",
    valueEn: "",
    valueSearch: "",
    label: "Добавление новых слов",
    labelSearch: "Поиск слова",
    isBusy: false,
  };

  inputRu = React.createRef();

  handleInputRuChange = (e) => {
    this.setState({
      valueRu: e.target.value,
    });
  };

  handleInputEnChange = (e) => {
    this.setState({
      valueEn: e.target.value,
    });
  };

  getTheWord = async () => {
    const { valueSearch } = this.state;
    //console.log(valueSearch);
    const getWord = await getTranslateWord(valueSearch);
    this.setState({
      labelSearch: `${valueSearch} - ${getWord.translate}`,
      valueSearch: "",
      isBusy: false,
    });
  };

  handleSearchButton = async () => {
    this.setState(
      {
        isBusy: true,
      },
      this.getTheWord
    );
  };

  handleInputSearchChange = (e) => {
    this.setState({
      valueSearch: e.target.value,
    });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();

    this.setState(({ valueRu, valueEn }) => {
      return {
        label: "вы добавили слово - " + valueRu + " " + valueEn,
        valueRu: "",
        valueEn: "",
      };
    });
  };

  render() {
    const { item = [], onDeletedItem } = this.props;
    const { labelSearch, valueSearch, isBusy } = this.state;
    return (
      <>
        <div className={s.fonts}>{labelSearch}</div>
        <form className={s.form}>
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            style={{ width: 700 }}
            value={valueSearch}
            loading={isBusy}
            onSearch={this.handleSearchButton}
            onChange={this.handleInputSearchChange}
          />
        </form>
        <div className={s.fonts}>{this.state.label}</div>
        <form className={s.form} onSubmit={this.handleSubmitForm}>
          <input
            className={s.inputs}
            placeholder="Введи русское слово"
            type="text"
            value={this.state.valueRu}
            onChange={this.handleInputRuChange}
          />
          <input
            className={s.inputs}
            placeholder="Введи английское слово"
            type="text"
            value={this.state.valueEn}
            onChange={this.handleInputEnChange}
          />
          <button
            onClick={(eng, rus) =>
              this.props.onAddItem(this.state.valueEn, this.state.valueRu)
            }
          >
            Добавить
          </button>
        </form>
        <div className={s.centerroot}>
          <div className={s.root}>
            {item.map(({ eng, rus, id }, index) => (
              <Card
                onDeleted={() => {
                  onDeletedItem(id);
                }}
                key={id}
                eng={eng}
                rus={rus}
                index={index}
                stateAll={false}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default CardList;
