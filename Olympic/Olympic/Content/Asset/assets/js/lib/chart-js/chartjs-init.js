
(function ($) {
    "use strict";

    /*  Sales Chart
    --------------------*/
    
   
    var team = {
        type: 'line',
        data: {
            labels: ["2012", "2013", "2014", "2015", "2016", "2018", "2019"],
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [{
                label: "Tasks Completed",
                data: [0, 25, 10, 3, 20, 5, 30],
                backgroundColor: 'rgba(255,163,161,.5)',
                borderColor: 'rgba(237,127,126,.5)',
                borderWidth: 0.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(255,163,161,1)',
                    }, {
                label: "Cards Completed",
                data: [0, 7, 3, 12, 6, 27, 0],
                backgroundColor: 'rgba(135,222,117,.5)',
                borderColor: 'rgba(135,222,117,.5)',
                borderWidth: 0.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(135,222,117,1)',
                    }
                    , {
                label: "Product Release",
                data: [0, 15, 23, 8, 4, 14, 17],
                backgroundColor: 'rgba(95,180,250,.5)',
                borderColor: 'rgba(135,222,117,.5)',
                borderWidth: 0.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(95,180,250,1)',
                    }]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },


            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                        }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                        }]
            },
            title: {
                display: false,
            }
        }
    };

    window.onload = function () {
        var ctx = document.getElementById("sales-chart").getContext("2d");

        $.ajax({
            url: '/HomeAd/GetlineChart',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            async: "true",
            cache: "false",
            success: function (rs) {
                if (rs.status == true) {
                    var lstnam = [];
                    var lstData = [];
                    $.each(rs.lstNam, function (i, item) {
                        lstnam.push(item);
                    });
                    $.each(rs.data, function (i, item1) {
                        lstData.push(item1.SoLuong);
                    });
                    var sales1 = {
                        type: 'line',
                        data: {
                            labels: lstnam,
                            type: 'line',
                            defaultFontFamily: 'Montserrat',
                            datasets: [{
                                label: "Sinh vien",
                                data: lstData,
                                backgroundColor: 'transparent',
                                borderColor: '#e6a1f2',
                                borderWidth: 3,
                                pointStyle: 'circle',
                                pointRadius: 5,
                                pointBorderColor: 'transparent',
                                pointBackgroundColor: '#e6a1f2',

                            }]
                        },
                        options: {
                            responsive: true,

                            tooltips: {
                                mode: 'index',
                                titleFontSize: 12,
                                titleFontColor: '#000',
                                bodyFontColor: '#000',
                                backgroundColor: '#fff',
                                titleFontFamily: 'Montserrat',
                                bodyFontFamily: 'Montserrat',
                                cornerRadius: 3,
                                intersect: false,
                            },
                            legend: {
                                labels: {
                                    usePointStyle: true,
                                    fontFamily: 'Montserrat',
                                },
                            },
                            scales: {
                                xAxes: [{
                                    display: true,
                                    gridLines: {
                                        display: false,
                                        drawBorder: false
                                    },
                                    scaleLabel: {
                                        display: false,
                                        labelString: 'Month'
                                    }
                                }],
                                yAxes: [{
                                    display: true,
                                    gridLines: {
                                        display: false,
                                        drawBorder: false
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Value'
                                    }
                                }]
                            },
                            title: {
                                display: false,
                                text: 'Normal Legend'
                            }
                        }
                    };
                    window.myLine = new Chart(ctx, sales1);
                }
            }
        });

        var ctx1 = document.getElementById("team-chart").getContext("2d");
        window.myLine = new Chart(ctx1, team);

        //var ctx = document.getElementById("barChart").getContext("2d");
        //window.myLine = new Chart(ctx, barChart);

        //var ctx = document.getElementById("radarChart").getContext("2d");
        //window.myLine = new Chart(ctx, radarChart);

        //var ctx = document.getElementById("lineChart").getContext("2d");
        //window.myLine = new Chart(ctx, lineChart);

        //var ctx = document.getElementById("pieChart").getContext("2d");
        //window.myLine = new Chart(ctx, pieChart);

        //var ctx = document.getElementById("doughutChart").getContext("2d");
        //window.myLine = new Chart(ctx, doughutChart);

        //var ctx = document.getElementById("polarChart").getContext("2d");
        //window.myLine = new Chart(ctx, polarChart);

        //var ctx = document.getElementById("singelBarChart").getContext("2d");
        //window.myLine = new Chart(ctx, singelBarChart);
    }; 
    
})(jQuery);









(function ($) {
    "use strict";



    // single bar chart
    var ctx = document.getElementById("singelBarChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat"],
            datasets: [
                {
                    label: "My First dataset",
                    data: [40, 55, 75, 81, 56, 55, 40],
                    borderColor: "rgba(55, 160, 0, 0.9)",
                    borderWidth: "0",
                    backgroundColor: "rgba(55, 160, 0, 0.5)"
                            }
                        ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                                }]
            }
        }
    });




})(jQuery);