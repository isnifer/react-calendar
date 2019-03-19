import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import DateRange from 'moment-range'
import { MONTH_NAMES } from './locale'

const TODAY_MONTH = new Date().getMonth()
class MonthPicker extends Component {
  state = {
    month: parseInt(props.currentMonth, 10) || TODAY_MONTH,
  }

  componentWillReceiveProps({ month }) {
    if (month !== this.props.month) {
      this.setState({ month })
    }
  }

  onClick = ({ target }) => {
    const props = target.id.split('_')
    if (props[2] === 'true') {
      return false
    }

    const id = props[1]
    this.props.onClick(parseInt(id, 10))
  }

  render() {
    return (
      <div className="calendar__months">
        {MONTH_NAMES[this.props.locale].map((item, i) => {
          const range = new DateRange(
            new Date(this.props.year, i, 1),
            new Date(this.props.year, i, 31)
          )
          const disabled = !range.overlaps(this.props.range)
          return (
            <div
              className={cn(
                'calendar__month-item',
                { 'calendar__month-item_current': i === this.state.month },
                { 'calendar__month-item_disabled': disabled }
              )}
              onClick={this.onClick}
              id={`month_${i}_${disabled}`}
              key={i}>
              {item}
            </div>
          )
        })}
      </div>
    )
  }
}

MonthPicker.propTypes = {
  locale: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  range: PropTypes.instanceOf(DateRange).isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default MonthPicker
