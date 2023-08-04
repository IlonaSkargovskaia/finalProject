import React from 'react'

const EventsByCategory = (props) => {
    const {events} = props;
  return (
    <div>
        {
            events.map((item) => {
                return (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>  
                )
            })
        }
    </div>
  )
}

export default EventsByCategory