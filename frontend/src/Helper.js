export const formatDate = (date) => {
    let dateObj = new Date(date);
    let month = (dateObj.getMonth() + 1).toString();
    let day = dateObj.getDate().toString();
    let year = dateObj.getFullYear();
    month = month.length < 2 ? '0' + month : month;
    day = day.length < 2 ? '0' + day : day;
    return [year, month, day].join('-');
}