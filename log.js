var mysql = require("mysql");
var con = mysql.createConnection({
    mysql: "localhost",
    user: "root",
    password: null,
    database: "mylife"
});
con.connect((err) => {
    if (err) {
        return console.log(err.stack);
    }
    console.log("Connection succeddddd");
});
console.log('iinbisfgsajkfsad');
var html = '';

getRows(function (rows) {
    rows.forEach(function (row) {
        var d = new Date(row.waktu);
        //html += '<span>'+ d.getDate() +'-'+ d.getMonth() +'-'+ d.getFullYear() +' | '+ d.getHours() +':'+ d.getMinutes() +'</span>     <span>'+row.nama+'</span> <span>'+row.aktivitas+'</span><br>';
        html += '<tr>';
        html += '<td>'+ d.getDate() +'-'+ d.getMonth() +'-'+ d.getFullYear() +' | '+ d.getHours() +':'+ d.getMinutes() +'</td>';
        html += '<td>' + row.nama + '</td>';
        html += '<td>' + row.aktivitas + '</td>';
        html += '<td>' + row.keterangan + '</td>';
        html += '</tr>';
        console.log(row);
    })
    document.querySelector('.table > tbody').innerHTML = html;
}) //getRow tag

function getRows(callback) {

    $queryString = "SELECT * FROM log ORDER BY waktu DESC;"; 
    con.query($queryString, (err, rows, results) => {
        if (err) {
            return console.log("An eror query", err);
        }
        numRows = results.length;
        callback(rows);
        console.log("Query succesfully executed");
    });
}

