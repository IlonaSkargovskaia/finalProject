import React from 'react'

const EventsByLocation = (props) => {
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

export default EventsByLocation