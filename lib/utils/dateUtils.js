module.exports = function dateUtils() {
// Metodos Privados

//Retorna o dia a semana como string formatado no esquema do front
const getDayWeek = (n) => {
    let week = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    let day = new Date();
    n ? day.setDate(day.getDate() + n) : null;
    return week[day.getDay()];
};

//Retorna o int do dia solicitado pelo front
const getDate = (n) => {
    let day = new Date();
    n ? day.setDate(day.getDate() + n) : null;
    return day.getDate();
};

// Retorna o Mes apartir do dia solicitado pelo front
const getMonth = (n) => {
    let month = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let day = new Date();
    n ? day.setDate(day.getDate() + n) : null;
    return month[day.getMonth()];
};

// Metodos Publicos

return {
    getDayWeek:getDayWeek,
    getDate:getDate,
    getMonth:getMonth
}
}();
