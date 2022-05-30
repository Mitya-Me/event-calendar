import IAuthState, { AuthAction, AuthActionEnum } from "./types";

const initialState: IAuthState = {
    isAuth: false
}

export default function authReducer(state = initialState, action: AuthAction): IAuthState {
    switch (action.type) {
        case AuthActionEnum.SET_AUTH:
            return {...state, isAuth: action.payload}
        default:
            return state;
    }
}