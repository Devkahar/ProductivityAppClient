import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function App({selectedDate, handleDateChange}) {
  // const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
     <DatePicker
        autoOk
        orientation="landscape"
        variant="static"
        openTo="date"
        value={selectedDate}
        onChange={handleDateChange}
        style={{width: '300px'}}
      />
    </MuiPickersUtilsProvider>
  );
}
export default App;
