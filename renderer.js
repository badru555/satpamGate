// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

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

var t = new Date();
var day = ["Ahad","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById("hari").innerHTML = day[t.getDay()];
document.getElementById("tanggal").innerHTML = t.getDate();
document.getElementById("bulan").innerHTML = months[t.getMonth()];
document.getElementById("tahun").innerHTML = t.getFullYear();


$queryCount1 = "SELECT * FROM keluar WHERE DATE(DTKeluar) = CURDATE();";
con.query($queryCount1, (err, results) => {
    if (err) {
        return console.log("An eror query num keluar", err);
    }
    numRows1 = results.length;
    console.log("Query num keluar succesfully executed");
    document.querySelector('.count > #mk').innerHTML = numRows1;
});
$queryCount2 = "SELECT * FROM datamasuk WHERE DATE(DTMasuk) = CURDATE();";
con.query($queryCount2, (err, results) => {
    if (err) {
        return console.log("An eror query num keluar", err);
    }
    numRows2 = results.length;
    console.log("Query num keluar succesfully executed");
    document.querySelector('.count > #mbk').innerHTML = numRows2;
});


//SELECT MAHASISWA
document.getElementById("btnA").addEventListener("click", () => {
    var nim = document.getElementById('nim').value;
    var html = '';
    let T = 1;
    getRows_keluar(function (rows) {
        if (numRows != null) {
            rows.forEach(function (row) {
                $queryClick = "DELETE FROM keluar WHERE nim = '" + row.nim + "';";
                con.query($queryClick, (err, rows, fields) => {
                    if (err) {
                        alert("MAHASISWA SUDAH ADA DI DALAM KAMPUS");
                        return console.log("An eror query", err);
                    }
                    getRows_masuk(function (rows) {
                        rows.forEach(function (row) {
                            //alert("MAHASISWA MASUK DIKONFIRMASI\n Keluar kampus pada '" + row.DTKeluar + "'\n Masuk Kampus pada '" + row.DTMasuk + "'");
                            html += '<div class="col-sm-3">';
                            html += '<img src="./img/'+ row.filefoto +'" alt="INI FOTO" class="img-responsive img-rounded">';
                            html += '</div>';
                            html += '<div class="col-sm-3">';
                            html += '<p>' + row.nim + '</p>';
                            html += '<p><strong>' + row.nama + '</strong></p>';
                            html += '<p>' + row.prodi + '</p>';
                            html += '</div>';
                            html += '<div class="col-sm-3">';
                            html += '<p><strong>Waktu Keluar</strong></p>';
                            html += '<p>' + row.DTKeluar + '</p><br>';
                            html += '</div>';
                            html += '<div class="col-sm-3">';
                            html += '<p><strong>Waktu Masuk</strong></p>';
                            html += '<p>' + row.DTMasuk + '</p><br>';
                            html += '</div>';
                            
                            //console.log(d.getHours());
                        });
                        document.querySelector('.well > #panelmahasiswa').innerHTML = html;
                        console.log("Queryyy succesfully executed");
                        rows.forEach(function (row){
                            var d = new Date(row.DTMasuk);
                            var f = new Date(row.DTKeluar);
                            if (f.getDate() < d.getDate()){
                                var fd = d.getDate() - f.getDate();
                                $queryTelad = "INSERT INTO log (nim,nama,aktivitas,keterangan) VALUES('" + row.nim +"','" + row.nama +"','masuk kampus','"+ fd + " overday');";
                                con.query($queryTelad);
                                console.log('telat overday');
                                alert("MAHASISWA TELAT MASUK KAMPUS "+ (d.getDate() - f.getDate()) +" HARI");
                            } else if (d.getHours() >= 23){
                                $queryTelad = "INSERT INTO log (nim,nama,aktivitas,keterangan) VALUES('" + row.nim +"','" + row.nama +"',masuk kampus,'overnight');";
                                con.query($queryTelad);
                                console.log('telat overnight');
                                alert("MAHASISWA TELAT MASUK KAMPUS HARI INI");
                            }
                                                      
                        })
                    });
                }); //tag delete

                T = 2;
                console.log(row);
            });
            

        }

    })
    getRows(function (rows) {
        if (T == 1) {
            rows.forEach(function (row) {
                html += '<div class="col-sm-3">';
                html += '<img src="./img/'+ row.filefoto +'" alt="INI FOTO" class="img-responsive img-rounded">'; //width="150px"
                html += '</div>';
                html += '<div class="col-sm-3">';
                html += '<p>' + row.nim + '</p>';
                html += '<p><strong>' + row.nama + '</strong></p>';
                html += '<p>' + row.prodi + '</p>';
                html += '</div>';
                html += '<div class="col-sm-6">';
                html += '<h2>Tafadhol...</h2>';
                html += '<h2>Be carefull!</h2>';
                html += '</div>';
                console.log(row);
            })
            document.querySelector('.well > #panelmahasiswa').innerHTML = html;
            rows.forEach(function (row) {
                $queryClick = "INSERT INTO keluar(nim,nama,prodi) VALUES ('" + row.nim + "','" + row.nama + "','" + row.prodi + "');";
                con.query($queryClick, (err, rows, fields) => {
                    if (err) {
                        return console.log("An eror query insert ke tabel keluar", err);
                    }

                    console.log("Query succesfully executed");
                });
            });
        }

    }) //getRow tag

    function getRows(callback) {

        $queryString = "SELECT * FROM mahasiswa WHERE nim = '" + nim + "';";
        con.query($queryString, (err, rows, results) => {
            if (err) {
                return console.log("An eror query", err);
            }
            numRows = results.length;
            callback(rows);
            console.log("Query succesfully executed");
        });
    }
    function getRows_keluar(callback) {

        //var nim = document.getElementById('nim').value;
        $queryStirng = "SELECT * FROM keluar WHERE nim = '" + nim + "';";
        con.query($queryStirng, (err, rows, results) => {
            if (err) {
                return console.log("An eror query", err);
            }
            numRows = results.length;
            callback(rows);
            console.log("Query keluar executed");
        });
    }

    function getRows_masuk(callback) {

        var nim = document.getElementById('nim').value;
        $queryStirng = "SELECT a.nim, a.DTKeluar, a.DTMasuk, b.nama, b.prodi, b.filefoto FROM datamasuk a, mahasiswa b WHERE a.nim = '" + nim + "' AND a.nim = b.nim ORDER BY a.DTMasuk DESC LIMIT 1;";
        con.query($queryStirng, (err, rows, fields) => {
            if (err) {
                return console.log("An eror query", err);
            }

            callback(rows);
            console.log("Query succesfully executed");
        });
    }

    window.setTimeout(function () {
        window.location.reload();
    }, 4000);


}, false);