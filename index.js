let myChart = document.getElementById("myChart").getContext('2d');

const k = 0.03;

let price = parseFloat(document.getElementById('ExchangePrice').value);

let day = 1;

let cash = document.getElementById('cash').value;

let dollar = 0;

let clicked = true;

let config = {
    type: 'scatter',
    data: {
        datasets: [{
            label: "# Currency_Exchange",
            showLine: true,
            data: [],
            fill: false,
            pointRadius: 3,
            backgroundColor: '#0A75AD',
            borderColor: '#0A75AD'
        }]
    },
    options: {
        tooltips: {
            mode: 'index',
            intersect: true
        },
        hover: {
            mode: 'point',
            intersect: true
        },
        animation: {
            duration: 0 // general animation time
        },
        responsive: true,
        scales: {
            xAxes: [{
                ticks: {
                    min: 0,
                },
                gridLines: {
                    drawTicks: true
                },
            }],
            yAxes: [{
                gridLines: {
                    drawTicks: true
                }
            }]
        }
    }
};


window.onload = function () {
    window.myLine = new Chart(myChart, config);

};

document.getElementById('startBtn').addEventListener("click", function () {
    if (clicked === true) {
        removeData(myLine);
        addData(myLine, 0, price);
        day++;
        let equation = Math.random() - 0.5;
        price = price * (1 + k * (equation));
        addData(myLine, day, price.toFixed(2));
        clicked = false;
    } else {
        day++;
        let equation = Math.random() - 0.5;
        price = price * (1 + k * (equation));
        pushData(myLine, day, price.toFixed(2));

    }
    window.myLine.update();

});


document.getElementById('buyBtn').addEventListener("click", function () {
    console.log(price);
    console.log(cash);
    let resBuy = cash - price;
    dollar += 1;
    console.log(resBuy)
    if (resBuy > 0) {
        document.getElementById('dollar').value = dollar;
        console.log(resBuy);
        document.getElementById('cash').value = resBuy.toFixed(2);
        cash = document.getElementById('cash').value;
    } else
        alert("you don't have enough cash in your Wallet");


});


document.getElementById('sellBtn').addEventListener("click", function () {

    let resSell = Number(cash) + price;

    if (dollar > 0) {
        dollar -= 1;
        console.log("res" + resSell);
        document.getElementById('dollar').value = dollar;
        document.getElementById('cash').value = resSell.toFixed(2);
        cash = document.getElementById('cash').value;
        console.log("cash" + cash);
    } else
        alert("you don't have Dollar  in your Wallet to sell , try to buy first");


});

function addData(chart, day, price) {
    pushData(chart, day, price);
}


function pushData(chart, day, price) {
    chart.data.datasets[0].data.push({x: day, y: price});
}

function removeData(chart) { // FUNCTION OF REMOVING THE OLD DATA FROM THE CHART SO WE CAN DRAW A NEW ONE
    config.data.labels.length = 0;
    config.data.datasets.forEach((dataset) => {
        dataset.data.length = 0;
    });
    chart.update();
}
