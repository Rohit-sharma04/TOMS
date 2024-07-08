export const fillMissingMonths = (data, startDate, endDate) => {
    const filledData = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-based
        //check if data exist for the given year and month
        const monthData = data.find(item => item._id.year === year && item._id.month === month);

        if (monthData) {
            filledData.push(monthData);
        } else {
            filledData.push({ _id: { year, month }, count: 0 });
        }

        // Move to the next month
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return filledData;
}

export const getMonthYearLabel = (month, year) => {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${monthNames[month - 1]} ${year}`;
}