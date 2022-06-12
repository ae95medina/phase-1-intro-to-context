function createEmployeeRecord(employeeData){
   const employeeDataObject = {
       firstName: employeeData [0],
       familyName: employeeData[1],
       title: employeeData[2],
       payPerHour: employeeData[3],
       timeInEvents: [],
       timeOutEvents: []
   }
   return employeeDataObject
}
function createEmployeeRecords(arrayOfarrays){
    let employeeArray = arrayOfarrays.map(array => createEmployeeRecord(array))
    return employeeArray
}
function createTimeInEvent(empRecordObj, dateStamp){
    let [date, hour] = dateStamp.split(" ")
    empRecordObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return empRecordObj
}
function createTimeOutEvent(empRecordObj, dateStamp) {
        let [date, hour] = dateStamp.split(" ")
       empRecordObj.timeOutEvents.push({
            type: "TimeOut",
            hour: parseInt(hour, 10), 
            date: date
        })
        return empRecordObj
}
function hoursWorkedOnDate(empRecordObj, dateStamp){
   let timeInDate = empRecordObj.timeInEvents.find(function(e){
       return e.date === dateStamp
   })
//    console.log("my log",timeInDate)
   let timeOutDate = empRecordObj.timeOutEvents.find(function(e){
       return e.date === dateStamp
   })
   return (timeOutDate.hour - timeInDate.hour)/ 100
}
function wagesEarnedOnDate(empRecordObj, dateStamp){
    let wage = hoursWorkedOnDate(empRecordObj, dateStamp) * empRecordObj.payPerHour
    return parseFloat(wage.toString())
}
function allWagesFor(empRecordObj){
    let sum = 0 
    for(let i = 0; i < empRecordObj.timeInEvents.length;i++){
        let wagePerDate = wagesEarnedOnDate(empRecordObj, empRecordObj.timeInEvents[i].date)
        sum += wagePerDate
    }
    return sum
}
function calculatePayroll(employeeArray){
    let sum = 0
    for(let i = 0; i < employeeArray.length;i++){
        let totalWages = allWagesFor(employeeArray[i])
        sum += totalWages
}
return sum
}