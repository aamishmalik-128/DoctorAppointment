export const getDayName = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
    });
};

export const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

export const convertToTime = (minutes) => {
    const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mins = String(minutes % 60).padStart(2, "0");
    return `${hours}:${mins}`;
};

export const getAppointmentMinutes = (dateTime) => {
    return convertToMinutes(
        new Date(dateTime).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
    );
};

export const calculateAppointmentEndTime = (startTime, slotDuration) => {
    const startMinutes = convertToMinutes(startTime);
    const endMinutes = startMinutes + slotDuration;
    return convertToTime(endMinutes);
};

export const isTimeWithinWorkingHours = (
    startTime,
    endTime,
    workingStart,
    workingEnd
) => {
    const appointmentStart = convertToMinutes(startTime);
    const appointmentEnd = convertToMinutes(endTime);

    const workStart = convertToMinutes(workingStart);
    const workEnd = convertToMinutes(workingEnd);

    return appointmentStart >= workStart && appointmentEnd <= workEnd;
};

export const isBreakTime = (currentTime, breakStart, breakEnd) => {
    if (!breakStart || !breakEnd) {
        return false;
    }

    const current = convertToMinutes(currentTime);
    const start = convertToMinutes(breakStart);
    const end = convertToMinutes(breakEnd);

    return current >= start && current < end;
};

export const hasTimeOverlap = (start1, end1, start2, end2) => {
    const s1 = convertToMinutes(start1);
    const e1 = convertToMinutes(end1);

    const s2 = convertToMinutes(start2);
    const e2 = convertToMinutes(end2);

    return s1 < e2 && s2 < e1;
};

export const generateSlots = (availability, slotDuration) => {
    const slots = [];

    if (!availability?.startTime || !availability?.endTime) {
        return slots;
    }

    let current = convertToMinutes(availability.startTime);
    const end = convertToMinutes(availability.endTime);

    while (current + slotDuration <= end) {
        const slotStart = convertToTime(current);
        const slotEnd = convertToTime(current + slotDuration);

        let overlapsBreak = false;
        if (availability.breakStart && availability.breakEnd) {
            overlapsBreak = hasTimeOverlap(
                slotStart,
                slotEnd,
                availability.breakStart,
                availability.breakEnd
            );
        }

        if (!overlapsBreak) {
            slots.push(slotStart);
        }

        current += slotDuration;
    }

    return slots;
};