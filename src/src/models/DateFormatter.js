export default class DateFormatter {

    months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]

    constructor(date, from_timezone = 'utc', to_timezone = 'America/Santiago') {

        if (typeof date != 'undefined' && date != null) {
            const { DateTime } = require("luxon");
            this.date = DateTime.fromSQL(date, { zone: from_timezone }).setZone(to_timezone)
        } else {
            this.date = null
        }
    }

    isValidDate() {
        return this.date != null
    }

    getMonthName() {
        return this.months[this.date.toFormat('L') - 1]
    }

    friendly(break_html = '&nbsp', default_date = '- -', weight = 'bold') {
        if (!this.isValidDate()) {
            return default_date
        }
        let year = this.date.toFormat('yyyy')
        let month = this.getMonthName()
        let day = this.date.toFormat('dd')
        let time = this.date.toFormat('HH:mm');
        weight = `font-weight-${weight}`
        return `<span class="${weight}">${day} de ${month}, ${year}</span>${break_html}${time}`;
    }
    friendly_no_time(default_date = '- -', weight = 'bold') {
        if (!this.isValidDate()) {
            return default_date
        }
        let year = this.date.toFormat('yyyy')
        let month = this.getMonthName()
        let day = this.date.toFormat('dd')
        weight = `font-weight-${weight}`
        return `<span class="${weight}">${day} de ${month}, ${year}</span>`;
    }
    shortYear(default_date = '- -') {
        if (!this.isValidDate()) {
            return default_date
        }
        return this.date.toFormat('dd-LL-yy')
    }

}