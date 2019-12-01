import React from "react";

class EventView extends React.Component {
  render() {
    const { events } = this.props;
    return (
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.timestamp + JSON.stringify(event)}</li>
        ))}
      </ul>
    );
  }
}

export default EventView;
