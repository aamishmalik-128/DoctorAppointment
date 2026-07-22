



export const getDayName = (date) => {
    return new Date(date).toLocaleDateString('en-us',{
        weekday:"long"
    })
}
export const convertToMinutes = (time) => {
    const [hours,minutes]= time.split(":").map(Number);
    return hours * 60 + minutes;
}
export const getAppointmentMinutes = (dateTime) => {
    return convertToMinutes(
        new Date(dateTime).toLocaleTimeString("en-GB",{
            hour:"2-digit",
            minute:"2-digit",
            hour12:false
        })
    )
}
export const calculateAppointmentEndTime = () => {};

export const isTimeWithinWorkingHours = () => {};

export const isBreakTime = () => {};

export const hasTimeOverlap = () => {};