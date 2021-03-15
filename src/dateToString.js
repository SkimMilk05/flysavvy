//dateToString function


export const dateToString = (date) => { //date must be in YYYY-MM-DD format
    var year = date.getFullYear();
    var month = date.getMonth() + 1; //getMonth returns 0-11, 0 for Jan
    var day = date.getDate();

    const single_digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    if (single_digits.includes(month)) {
        month = "0" + month.toString();
    }
    if (single_digits.includes(day)) {
        day = "0" + day.toString();
    }
    var d = `${year}-${month}-${day}`;
    return d;
}
