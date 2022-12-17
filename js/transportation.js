async function submit() {
    const engine = document.getElementById('enginesize').value;
    const cylinders = document.getElementById('cylinders').value;
    const fcc = document.getElementById('fcc').value;
    const fch = document.getElementById('fch').value;
    const type = document.getElementById('fuel').value;
    const total = document.getElementById('total').value;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const getdate = year + "-" + month + "-" + day;

    await fetch('https://ecoren-api.vercel.app/transportation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            enginesize: parseFloat(engine), cylinders: parseFloat(cylinders),
            fuelconsumptioncity: parseFloat(fcc), fuelconsumptionhwy: parseFloat(fch),
            type: type, total: total, date: getdate
        })
    })
        .then((resp) => resp.json())
        .then(() => window.location.href = "result-transportation.html")
        .catch(err => console.log(err));
}