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

var html = '';

document.getElementById("btnCari").addEventListener("click", () => {
    
    getRows(function (rows) {
        rows.forEach(function (row) {
            //var nama = row.nama;
            //if (nama.match(/^.*knama.*$/)) {
            html += '<tr>';
            html += '<td>' + row.nim + '</td>';
            html += '<td>' + row.nama + '</td>';
            html += '<td>' + row.prodi + '</td>';
            html += '<td>' + row.phone + '</td>';
            html += '</tr>';
            //}
            
            console.log(row);
        })
        document.querySelector('.table > tbody').innerHTML = html;
    }) //getRow tag

    function getRows(callback) {
        var knama = document.getElementById('n_mhs').value;
        $queryString = "SELECT * FROM mahasiswa WHERE nama LIKE '%" + knama + "%';";
        con.query($queryString, (err, rows, results) => {
            if (err) {
                return console.log("An eror query", err);
            }
            numRows = results.length;
            callback(rows);
            console.log("Query succesfully executed");
        });
    }

}, false);

