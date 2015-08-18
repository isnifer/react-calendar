# react-date-range-picker
DateRange Picker as React Component

### Installation 
`npm install -s react-date-range-picker`

### Example  
```js
import React from 'react';
import Datepicker from 'react-date-range-picker';

class Demo extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            date: new Date().toLocaleString()
        };
    }

    onClick (date) {
        this.setState({date: date.toLocaleString()});
    }
    
    render () {
        return (
            <div className="demo">
                <input
                    type="text"
                    name="date"
                    className="demo__input"
                    value={this.state.date}
                    readOnly />
                <Datepicker onClick={::this.onClick} />
            </div>
        );   
    }
}
```

![2015-08-18 11-30-21 react daterange picker](https://cloud.githubusercontent.com/assets/1788245/9325674/bc1df256-459c-11e5-9bb4-5d113eef9e8e.png)

## Demo is here
https://isnifer.github.io/react-date-range-picker/  