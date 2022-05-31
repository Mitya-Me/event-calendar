import { Button, Layout, Modal, Row } from 'antd';
import {FC, useEffect, useState} from 'react' 
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

const Event:FC = () => { 
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const {fetchGuests, fetchEvents, createEvent} = useActions()
    const {guests, events} = useTypedSelector(state => state.event)
    const {user} = useTypedSelector(state => state.auth)

    useEffect(() => { 
        fetchGuests()
        fetchEvents(user.username)
    })

    const addNewEvent = (event: IEvent) => {
        createEvent(event)
        setModalVisible(false)
    }

    return (
        <Layout>
            <EventCalendar events={events} />
            <Row justify="center">
                <Button onClick={() => setModalVisible(true)}> Add event </Button>
            </Row>
            <Modal
                title="Add event"
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            > 
                <EventForm submit={addNewEvent} guests={guests}/>
            </Modal>
        </Layout>
    );
} 

export default Event;