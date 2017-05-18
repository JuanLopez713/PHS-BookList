//PARSE THE CRV
//(function(){
//    alert("Make note of the course codes for future searches.");
//})();
$(function () {
    var results = Papa.parse("BookList2017.csv", {
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
        }
    });
});

function urlEncoder() {
    console.log("encoder called");
    var table = document.getElementById("books");
    var tr = table.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[3];
        if (td) {
            var str = td.innerHTML;
            td.innerHTML = '<a target="_blank" href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=' + str + '">' + str + '</a>';
        }
    }
}
var tr, td;
var column, row;
function searchTable() {
    var input, filter, table, i, x, y, terms, found;
    input = document.getElementById("emp_search");
    filter = input.value.toUpperCase();
    terms = filter.split(" ");
    table = document.getElementById("books");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        found = false;
        for (x = 0; x < 9; x++) {
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
 var doc = new jsPDF('landscape');

$('#printbutt').click(function () {
    var columns = ["Grade", "Department", "Course", "ISBN", "Author","Title","Publisher","Edition","Course Code","Notes"];
    var myBooks = [];
    
    myBooks.push(columns);
    
   $("#books tr").each(function() {
    var arrayOfThisRow = [];
    var tableData = $(this).find('td');
    if (tableData.length > 0) {
        tableData.each(function() { arrayOfThisRow.push($(this).text()); });
        myBooks.push(arrayOfThisRow);
    }
});
    

var rowsd=[];
    
    var input = document.getElementById("emp_search");
    filter = input.value;
    
    if(!filter){
        alert("Please Type your Course Codes into the Search Bar");
    }else{
    
    for (var i=1; i<tr.length; i++){
        
        if(tr[i].style.display==""){
            rowsd.push(myBooks[i]);
            console.log("concatenating: " + tr[i]);
        }else{
            
        }
        
    }
    console.log("This is the rows: " + rowsd);
       
doc.autoTable(myBooks[0], rowsd, {
    theme: 'striped',
    styles: {
        
      overflow: 'linebreak',
      
      columnWidth: 27
    }
  });
doc.save('table.pdf');
}});

