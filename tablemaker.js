//PARSE THE CRV

$(function () {
    var results = Papa.parse("BookList2016.csv", {
        header: true
        , download: true
        , complete: function (results) {
            console.log("Remote file parsed!", results.data);
            $.each(results.data, function (i, el) {
                var row = $("<tr/>");
                row.append($("<td/>").text());
                $.each(el, function (j, cell) {
                    row.append($("<td/>").text(cell));
                    
                });
                $("#books tbody").append(row);
                
            });
            urlEncoder();
//            var str = $('#books td:nth-child(4)').text();
//            console.log(str);
////            var str2 = 'https://www.google.com/#q=' + str;
////            $('#books td:nth-child(4)').empty();
//            $('#books td:nth-child(4)').prepend('<a href="https://www.w3schools.com">'+"test"+'</a>');
            
//            $('#books td:nth-child(4)').prepend('https://www.google.com/#q=');
//            $('#books td:nth-child(4)').append("test");
             
        }
       
    });
    
});


function urlEncoder(){
    console.log("encoder called");
    var table = document.getElementById("books");
    var tr = table.getElementsByTagName("tr");
    for (var i =0; i<tr.length; i++){
       var td = tr[i].getElementsByTagName("td")[3];
        
        
        if(td){
            var str = td.innerHTML;
        
            td.innerHTML = '<a target="_blank" href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=' +str+'">'+str+'</a>';
        
        }
//    var str = $('#books td:nth-child(4)').text();
//            var str2 = 'https://www.google.com/#q=' + str;
//            $('#books td:nth-child(4)').empty();
//            $('#books td:nh-child(4)').append(str2);
}
}


function searchTable() {
    var input, filter, table, i, x, y, terms, td, tr, found;
    input = document.getElementById("emp_search");
    filter = input.value.toUpperCase();
    terms = filter.split(" ");
    table = document.getElementById("books");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        for (x = 0; x < 9; x++) {
            found = false;
            td = tr[i].getElementsByTagName("td")[x];
            if (td) {
                for (y = 0; y < terms.length; y++) {
                    if (td.innerHTML.toUpperCase().indexOf(terms[y]) > -1) {
                        found = true;
                    }
                }
            }
        }
        if (found) {
            tr[i].style.display = "";
        }
        else {
            tr[i].style.display = "none";
        }
        tr[0].style.display = "";
    }
}