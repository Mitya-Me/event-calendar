import { AppDispatch } from './../../index';
import { IUser } from './../../../models/IUser';
import { AuthActionEnum, ISetAuthAction, ISetErrorAction, ISetIsLoadingAction, ISetUserAction } from './types';
import axios from 'axios';


export const AuthActionCreators = {
    setIsLoading: (payload: boolean):ISetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}), 
    setError: (payload: string): ISetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    setAuth: (payload: boolean): ISetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload}),
    setUser: (payload: IUser): ISetUserAction => ({type: AuthActionEnum.SET_USER, payload}),
    login: (username: string, password: string) => async(dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));

            setTimeout(async () => {
                const response = await axios.get<IUser[]>('./users.json');
                const checkUser = response.data.find(
                    (el) => el.username === username && el.password === password
                );

                if (checkUser) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', checkUser.username);

                    dispatch(AuthActionCreators.setUser(checkUser));
                    dispatch(AuthActionCreators.setAuth(true));
                } else {
                    dispatch(AuthActionCreators.setError('Username or password incorrect'));
                }
            }, 2000);
        } catch (error) {
            dispatch(AuthActionCreators.setError('Oops! Something went wrong..'))
        }        
    },
    logout: () => async (dispatch: AppDispatch) => {
            localStorage.removeItem('auth')
            localStorage.removeItem('username')

            dispatch(AuthActionCreators.setUser({} as IUser))
            dispatch(AuthActionCreators.setAuth(false))
    } 
}