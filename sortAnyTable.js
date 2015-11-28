function sort() {
    var count = 1;
    return function() {
        var button = $("th");
        if (button.length == 0) {
            button = $($("table").find("tr")[0]).children();
        }
        button.click(function() {
            var index = $(this).index();
            var table = $(this).parent().parent().parent();
            var sortable = table.children("tbody").find("tr").get();
            if (count == 1) {
                sortable.sort(function(a, b) {
                    var a_ = $(a).children().eq(index).text(), b_ = $(b).children().eq(index).text();
                    var isString = false;
                    for (var i = 0; i < a_.length; i++) {
                        if (!(a_[i] >= '0' && a_[i] <= '9' || a_[i] == '.')) {
                            isString = true;
                            break;
                        }
                    }
                    if (isString) {
                        return a_.localeCompare(b_);
                    }
                    return parseInt(a_) - parseInt(b_);
                });
            } else {
                sortable.sort(function(a, b) {
                    var a_ = $(a).children().eq(index).text(), b_ = $(b).children().eq(index).text();
                    var isString = false;
                    for (var i = 0; i < a_.length; i++) {
                        if (!(a_[i] >= '0' && a_[i] <= '9' || a_[i] == '.')) {
                            isString = true;
                            break;
                        }
                    }
                    if (isString) {
                        return b_.localeCompare(a_);
                    }
                    return parseInt(b_) - parseInt(a_);
                });
            }
            count = 1 - count;
            $(table).find("tbody").html("");
            $(table).find("tbody").append(sortable);
        });
    }
}
sort()();
