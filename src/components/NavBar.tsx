import { Layout, Menu, Row } from 'antd';
import {FC} from 'react' 
import { useHistory } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RouteNames } from '../router';

const NavBar:FC = () => { 
    const router = useHistory()
    const { isAuth, user } = useTypedSelector(state => state.auth)
    const { logout } = useActions()

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth 
                ?   <>
                        <div style={{ color: "white" }}> {user.username} </div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item key={1} onClick={() => logout()}>
                                Exit
                            </Menu.Item>
                        </Menu>
                    </>
                :   <Menu theme="dark" mode="vertical" selectable={false}>
                        <Menu.Item key={1} onClick={() => router.push(RouteNames.LOGIN)}>
                            Login
                        </Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
} 

export default NavBar;