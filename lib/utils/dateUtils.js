const moment = require('moment');

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

  // Retorna a data atual como string no formato yyyy-mm-dd
  const getStringDate = () => {
    let today = new Date();
    return "" + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  };

  // Retorna a hora a tual no formato hh:mm:ss
  const getStringHora = () => {
    return new Date().toLocaleTimeString();
  };
  
  const verificarHorarioVisita = (hora) => {
    if (!hora) return false;
    let horaAtual = moment();
    let horaMin = moment(hora,"HH:mm:ss").subtract(90, "minutes");
    let horaMax = moment(hora,"HH:mm:ss").add(90, "minutes");
    return (horaAtual >= horaMin && horaAtual <= horaMax);
  };

  // Metodos Publicos
  return {
    getDayWeek,
    getDate,
    getMonth,
    getStringDate,
    getStringHora,
    verificarHorarioVisita
  };
}();