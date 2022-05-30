import {FC, useEffect} from 'react' 
import AppRouter from './components/AppRouter';
import './App.css'
import NavBar from './components/NavBar';
import { Layout } from 'antd';
import './App.css'
import { useActions } from './hooks/useActions';
import { IUser } from './models/IUser';

const App:FC = () => { 
    const { setAuth, setUser} = useActions() 

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setUser({username: localStorage.getItem('username' || '')} as IUser)
            setAuth(true)
        }
    })

    return (
        <Layout>
            <NavBar />
                <Layout.Content>
                    <AppRouter />
                </Layout.Content>
        </Layout>
    )
}

export default App;