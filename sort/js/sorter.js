function ascend() {
    var col = $(this).index();
    var rows;
    var which;
    if ($(this).parents("table").attr("id") == "todo") {
        rows = $("#todo tbody tr");
        which = "#todo";
    } else {
        rows = $("#staff tbody tr");
        which = "#staff";
    }
    var sortable = rows.get();
    sortable.sort(function(a, b) {
        var a_ = $(a);
        var b_ = $(b);
        return a_.children().eq(col).text().localeCompare(b_.children().eq(col).text());
    });
    $(which + " tbody").html("");
    $(which + " tbody").append(sortable);
}

function descend() {
    var col = $(this).index();
    var rows;
    var which;
    if ($(this).parents("table").attr("id") == "todo") {
        rows = $("#todo tbody tr");
        which = "#todo";
    } else {
        rows = $("#staff tbody tr");
        which = "#staff";
    }
    var sortable = rows.get();
    sortable.sort(function(a, b) {
        var a_ = $(a);
        var b_ = $(b);
        return (-1) * a_.children().eq(col).text().localeCompare(b_.children().eq(col).text());
    });
    $(which + " tbody").html("");
    $(which + " tbody").append(sortable);
}

function sort() {
    $(this).siblings().each(function() {
        $(this).removeClass("select");
        $(this)[0].sort_method = 0;
    });
    $(this).addClass("select");
    if($(this)[0].sort_method == 0) {
        $(this)[0].sort_method = 1;
        $(this).children("img").attr("src", "ascend.png");
        ascend.apply(this);
    } else {
        $(this)[0].sort_method  = 3 - $(this)[0].sort_method;
        if ($(this)[0].sort_method == 1) {
            $(this).children("img").attr("src", "ascend.png");
            ascend.apply(this);
        } else {
            $(this).children("img").attr("src", "descend.png");
            descend.apply(this);
        }
    }
    $(".alternate").removeClass("alternate");
    $("tr:even").addClass("alternate");
}

$(function() {
    $("th").each(function() {
        this.sort_method = 0;
    });
    $("th").click(sort);
});
