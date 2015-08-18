var MONTH_NAMES = {
    RU: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ],
    EN: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ],
    DE: [
        'Januari', 'Februari', 'March', 'April', 'Kan', 'June',
        'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
    ],
    FR: [
        'Janvier', 'Février', 'Mars', 'Avril', 'Peut', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ],
    ITA: [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giu',
        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ],
    POR: [
        'Janeiro', 'Fevereiro', 'Março', 'April', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'November', 'Dezembro'
    ],
    ESP: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Puede', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
};

var WEEK_NAMES = {
    RU: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    EN: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    DE: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
    FR: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
    IT: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
    POR: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    ESP: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.']
};

var WEEK_NAMES_SHORT = {
    RU: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    EN: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    DE: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    FR: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
    IT: ['D', 'L', 'Ma', 'Me', 'G', 'V', 'S'],
    POR: ['Dom', '2ª', '3ª', '4ª', '5ª', '6ª', 'Sáb'],
    ESP: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']
};

module.exports = {
    MONTH_NAMES: MONTH_NAMES,
    WEEK_NAMES: WEEK_NAMES,
    WEEK_NAMES_SHORT: WEEK_NAMES_SHORT
};
