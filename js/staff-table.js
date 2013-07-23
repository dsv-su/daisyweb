function initStaffTable() {
    if (window.footable) {
        $('.dsv-staff-table-new').footable({
            breakpoints: {
                phone: 400,
                bigphone: 550,
                tablet: 650
            },
            parsers: {
                swedish: function (cell) {
                    return $.trim($(cell).text().replace('w', 'v').replace('W', 'V'));
                }
            }
        });
    }
}

$(initStaffTable);
