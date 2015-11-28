function sort() {
    var count = 1;
    return function() {
        $("th").click(function() {
            var index = $(this).index();
            var table = $(this).parent().parent().parent();
            var sortable = table.children("tbody").find("tr").get();
            if (count == 1) {
                sortable.sort(function(a, b) {
                    var a_ = $(a), b_ = $(b);
                    return a_.children().eq(index).text().localeCompare(b_.children().eq(index).text());
                });
            } else {
                sortable.sort(function(a, b) {
                    var a_ = $(a), b_ = $(b);
                    return (-1) * a_.children().eq(index).text().localeCompare(b_.children().eq(index).text());
                });
            }
            count = 1 - count;
            $(table).find("tbody").html("");
            $(table).find("tbody").append(sortable);
        });
    }
}
sort()();
