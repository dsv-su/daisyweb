/*$(function () {
    $('.dsv-staff-table-new').footable({
        breakpoints: {
            smallphone: 400,
            bigphone: 550,
            tablet: 650
        }
    });
*/
$('.dsv-staff-table').dataTable({
    bPaginate: false,
    bInfo: false,
    oLanguage: {
        sSearch: 'Sök:'
    }
});

/*
$(function () {
    $.tablesorter.addParser({
        id: 'swedish',
        is: function (s) {
            return false;
        },
        format: function (s) {
            return s.replace('w', 'v').replace('W', 'V');
        },
        type: 'text'
    });

    $('.dsv-staff-table').tablesorter({
        sortList: [[0, 0], [1, 0]],
        headers: {
            0: { sorter: 'swedish' },
            1: { sorter: 'swedish' }
        }
    });
});
*/
