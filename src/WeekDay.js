import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

class WeekDay extends Component {
  inRange = () => this.props.range.contains(this.props.date)

  onClick = event => (this.inRange() ? this.props.onClick(this.props.date) : event.preventDefault())

  render() {
    const inRange = this.inRange()
    const className = cn(
      'calendar__day',
      { calendar__day_available: inRange },
      { calendar__day_disabled: !inRange },
      { calendar__day_current: this.props.current }
    )
    return (
      <td className="calendar__cell">
        <span className={className} onClick={this.onClick}>
          {this.props.date.getDate()}
        </span>
      </td>
    )
  }
}

WeekDay.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  range: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default WeekDay
