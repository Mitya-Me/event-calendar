import { Layout, Menu, Row } from 'antd';
import {FC} from 'react' 
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RouteNames } from '../router';

const NavBar:FC = () => { 
    const router = useHistory();
    const { isAuth } = useTypedSelector(state => state.auth)

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth 
                ?   <>
                        <div style={{ color: "white" }}> User 1 </div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item key={1} onClick={() => console.log("EXIT")}>
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