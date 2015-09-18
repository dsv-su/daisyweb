function dsvInitFootable() {
    $('.footable').footable({
        parsers: {
            swedish: function (cell) {
                return $.trim($(cell).text().replace('w', 'v').replace('W', 'V'));
            }
        }
    });
}

dsvInitFootable();
