//          //PARSE THE CRV
$(function () {

    var results = Papa.parse("BookList2016.csv", {
        header: true,
        download: true,
        complete: function (results) {
            console.log("Remote file parsed!", results.data);
            $.each(results.data, function (i, el) {
                var row = $("<tr/>");
                row.append($("<td/>").text());
                $.each(el, function (j, cell) {
                    row.append($("<td/>").text(cell));
                });
                $("#books tbody").append(row);
            });
            var str = $('#books td:nth-child(4)').text();
//            str.prepend(("https://www.google.com/#q=").text());
//            $('#books td:nth-child(4)').append("test");
        }
    });

});
makeLinks();
function makeLinks(){
    var table, tr, td, i, x;
    table = document.getElementById("books");
    tr = table.getElementsByTagName("tr");
    
    for (i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName("td")[3];
        td.setAttribute('href',"https://www.google.com");
    }
}


//My Search Function
function searchTable() {
    // Declare variables 
    var input, filter, table, tr, td, i, x, multi, y, filtered;


    input = document.getElementById("emp_search");
    //User Search Inputs
    filter = input.value.toUpperCase();
    //Split Up Search
    multi = filter.split(" ");
    table = document.getElementById("books");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query

    for (i = 0; i < tr.length; i++) {
        //Rows are hidden until proven found
        filtered = false;
        for (x = 0; x < 9; x++) {


            td = tr[i].getElementsByTagName("td")[x];
            for (y = 0; y < multi.length; y++) {
                if (td) {
                    //If you find at least one matching column keep it found
                    if (td.innerHTML.toUpperCase().indexOf(multi[y]) > -1) {

                        filtered = true;

                    }

                }
            }
        }
        
        if (filtered) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";

        }
    }
    //Keep the header always on
    tr[0].style.display = "";
}
