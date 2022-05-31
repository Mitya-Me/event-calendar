import { AppDispatch } from './../../index';
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { EventActionEnum, SetEventsAction, SetGuestsAction } from "./types";
import UserService from '../../../api/UserService';


export const EventActionCreator = {
    setGuests: (payload: IUser[]):SetGuestsAction => (
        {type: EventActionEnum.SET_GUESTS, payload}
    ),
    setEvents: (payload: IEvent[]):SetEventsAction => (
        {type: EventActionEnum.SET_EVENTS, payload}
    ),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUser()
            dispatch(EventActionCreator.setGuests(response.data))
        } catch (error) {
            
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            json.push(event)
            dispatch(EventActionCreator.setEvents(json))
            localStorage.setItem('events', JSON.stringify(json))
        } catch (e) {
            
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username)
            dispatch(EventActionCreator.setEvents(currentUserEvents))
        } catch (error) {
            alert(error)
        }
    }
    
}