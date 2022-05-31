import { Badge, Calendar } from 'antd';
import { Moment } from 'moment';
import { FC } from 'react' 
import { IEvent } from '../models/IEvent';

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar:FC<EventCalendarProps> = ({events}) => { 
    function dateCellRender(value: Moment) {
        const formatedDate = value.format('YYYY.MM.DD')
        const currentDayEvents = events.filter(ev => ev.date === formatedDate)
        return(
            <div>
                {currentDayEvents.map((ev, index) => 
                    <div key={`${ev.description} + ${index}`}>{ev.description}</div>    
                )}
            </div>
        )
    } 

    return (
        <Calendar dateCellRender={dateCellRender}/>
    )
} 

export default EventCalendar;