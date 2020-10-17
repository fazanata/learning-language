import {  FETCH_CARD_LIST,  FETCH_CARD_LIST_REJECT,  FETCH_CARD_LIST_RESOLVE, SET_CARD_LIST, SET_CARD_LIST_RESOLVE} from './actionTypes';

export const fetchCardList = (getData) => {
    return (dispatch, getState) => {
        dispatch(cardListAction());
        getData().once('value').then(res => {
            console.log(res.val());
            dispatch(cardListResolveAction(res.val()));
        }).catch(err =>{
            dispatch(cardListRejectAction(err));
        });
    }
}

export const setCardList = (getData, payload) => {
    return (dispatch, getState) => {
        // экшен с типом REQUEST (запрос начался)
    // диспатчится сразу, как будто-бы перед реальным запросом
        dispatch({
        type: SET_CARD_LIST,
        payload: payload
      })    
      getData().set(payload);    
        dispatch({
          type: SET_CARD_LIST_RESOLVE,
          payload: payload
        })
    }
}

export const cardListAction = () => ({
    type: FETCH_CARD_LIST
});

export const cardListResolveAction = (payload) => ({
    type: FETCH_CARD_LIST_RESOLVE,
    payload,
})

export const cardListRejectAction = (err) => ({
    type: FETCH_CARD_LIST_REJECT,
    err,
});