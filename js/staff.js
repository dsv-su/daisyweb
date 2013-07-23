/*$(function () {
    $('.dsv-staff-table-new').footable({
        breakpoints: {
            smallphone: 400,
            bigphone: 550,
            tablet: 650
        }
    });
*/
$(function () {
    var responsiveHelper;
    var breakpointDefinition = {
        tablet: 1024,
        phone : 480
    };
    var tableContainer = $('.dsv-staff-table-new').parent();

    $('.dsv-staff-table-new').dataTable({
        bPaginate: false,
        bInfo: false,
        oLanguage: {
            sSearch: 'Sök:'
        }

        /*
        // Setup for responsive datatables helper.
        bAutoWidth     : false,
        fnPreDrawCallback: function () {
            // Initialize the responsive datatables helper once.
            if (!responsiveHelper) {
                responsiveHelper = new ResponsiveDatatablesHelper(tableContainer, breakpointDefinition);
            }
        },
        fnRowCallback  : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            responsiveHelper.createExpandIcon(nRow);
        },
        fnDrawCallback : function (oSettings) {
            responsiveHelper.respond();
        }
        */
    });
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
