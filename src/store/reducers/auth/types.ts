export default interface IAuthState {
    isAuth: boolean;
}

export enum AuthActionEnum {
    SET_AUTH = 'SET_AUTH'
}

interface ISetAuthAction {
    type: AuthActionEnum.SET_AUTH;
    payload: boolean;
}

export type AuthAction = ISetAuthAction 