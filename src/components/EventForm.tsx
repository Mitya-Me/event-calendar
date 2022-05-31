import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { Moment } from 'moment';
import { FC, useState } from 'react' 
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';
import { IUser } from '../models/IUser';
import { rules } from '../utils/rules';
const { Option } = Select;

interface EventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void; 
}

const EventForm:FC<EventFormProps> = ({guests, submit}) => {
    const [event, setEvent] = useState<IEvent>({ 
        author: '',
        guest: '',
        date: '',
        description: '',
    } as IEvent);
    const {user} = useTypedSelector(state => state.auth)

    const selectDate = (date: Moment | null) => {
        if (date) setEvent({...event, date: date?.format('YYYY.MM.DD')})
    }

    const submitForm = () => {
        submit({...event, author: user.username});
    }

    return (
        <Form onFinish={submitForm}>  
            <Form.Item label="Event name" name="description" rules={[rules.required()]}>
                <Input
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                    value={event.description}
                />
            </Form.Item>

            <Form.Item label="Event date" name="date" rules={[rules.required(), rules.isDateAfter("You can't create an event for a past date")]}>
                <DatePicker onChange={(date) => selectDate(date) }/>
            </Form.Item>
            <Form.Item>
                    <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
                        {guests.map((guest) => (
                            <Option key={guest.username} value={guest.username}>
                                {guest.username}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
} 

export default EventForm;