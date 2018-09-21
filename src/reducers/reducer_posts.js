import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
        case DELETE_POST:
            //Usunięcie z widoku "ominięcie" usunięto widoku
            return _.omit(state, action.payload);
        case FETCH_POST:
            //Iteracja po id i dodawanie ich jako klucz do danych z payload
            //a nastepnie dodanie ich do ogólnego state
            return {...state, [action.payload.data.id]: action.payload.data};
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}

