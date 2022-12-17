async function submit() {
    const total = await parseInt(document.getElementById('machine').value);
    const fuel = await document.getElementById('subject').value;
    const amount = await parseInt(document.getElementById('amount').value);
    let type = '';

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const getdate = year + "-" + month + "-" + day;

    if (fuel === '0020') {
        type = '1003';
    } else if (fuel === '0042') {
        type = '1001';
    } else if (fuel === '0043') {
        type = '1001';
    }
    else {
        type = '1003';
    }

    const userData = {
        "region": "kr",
        "periodStartDt": date,
        "amount": amount,
        "activitySourceCode": fuel,
        "activityTypeCode": type
    }

    const data1 = {
        "region": "kr",
        "periodStartDt": date,
        "amount": amount,
        "activitySourceCode": "0020",
        "activityTypeCode": "1003"
    }

    const data2 = {
        "region": "kr",
        "periodStartDt": date,
        "amount": amount,
        "activitySourceCode": "0042",
        "activityTypeCode": "1001"
    }

    const data3 = {
        "region": "kr",
        "periodStartDt": date,
        "amount": amount,
        "activitySourceCode": "0043",
        "activityTypeCode": "1001"
    }

    const data4 = {
        "region": "kr",
        "periodStartDt": date,
        "amount": amount,
        "activitySourceCode": "0087",
        "activityTypeCode": "1003"
    }

    let result = {};

    await fetch('https://www.ecoloop.one/bapi/ghga/estimate-emissions', {
        // gas diesel-oil
        method: 'POST',
        headers: {
            'x-api-key': '4ab4e85d-2081-49e0-80ed-7e24a5ac5487',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data1)
    }).then((resp1) => resp1.json())
        .then(data1 => {
            result['gas diesel-oil'] = {
                "Date": date,
                "total": total,
                "CH4": data1['emissionsPerGas']['CH4']['emission'] * total,
                "CO2": data1['emissionsPerGas']['CO2']['emission'] * total,
                "N20": data1['emissionsPerGas']['N2O']['emission'] * total,
                "totalco2eq": data1['totalCO2eq'] * total,
                "energyconsumption": data1['energyConsumption'] * total
            }
        })

    await fetch('https://www.ecoloop.one/bapi/ghga/estimate-emissions', {
        // Sub-Bituminous Coal
        method: 'POST',
        headers: {
            'x-api-key': '4ab4e85d-2081-49e0-80ed-7e24a5ac5487',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data2)
    }).then((resp1) => resp1.json())
        .then(data2 => {
            result['Sub-Bituminous Coal'] = {
                "fuelType": "Sub-Bituminous Coal",
                "Date": date,
                "total": total,
                "CH4": data2['emissionsPerGas']['CH4']['emission'] * total,
                "CO2": data2['emissionsPerGas']['CO2']['emission'] * total,
                "N20": data2['emissionsPerGas']['N2O']['emission'] * total,
                "totalco2eq": data2['totalCO2eq'] * total,
                "energyconsumption": data2['energyConsumption'] * total
            }
            console.log(result)
        })

    await fetch('https://www.ecoloop.one/bapi/ghga/estimate-emissions', {
        // Other Bituminous Coal
        method: 'POST',
        headers: {
            'x-api-key': '4ab4e85d-2081-49e0-80ed-7e24a5ac5487',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data3)
    }).then((resp1) => resp1.json())
        .then(data3 => {
            result['Other Bituminous Coal'] = {
                "fuelType": "Other Bituminous Coal",
                "Date": date,
                "total": total,
                "CH4": data3['emissionsPerGas']['CH4']['emission'] * total,
                "CO2": data3['emissionsPerGas']['CO2']['emission'] * total,
                "N20": data3['emissionsPerGas']['N2O']['emission'] * total,
                "totalco2eq": data3['totalCO2eq'] * total,
                "energyconsumption": data3['energyConsumption'] * total
            }
            console.log(result)
        })

    await fetch('https://www.ecoloop.one/bapi/ghga/estimate-emissions', {
        // Other Bituminous Coal
        method: 'POST',
        headers: {
            'x-api-key': '4ab4e85d-2081-49e0-80ed-7e24a5ac5487',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data4)
    }).then((resp1) => resp1.json())
        .then(data3 => {
            result['biodiesel'] = {
                "Date": date,
                "total": total,
                "CH4": data3['emissionsPerGas']['CH4']['emission'] * total,
                "CO2": data3['emissionsPerGas']['CO2']['emission'] * total,
                "N20": data3['emissionsPerGas']['N2O']['emission'] * total,
                "totalco2eq": data3['totalCO2eq'] * total,
                "energyconsumption": data3['energyConsumption'] * total
            }
            console.log(result)
        })

    await fetch('https://ecoren-api.vercel.app/comparison', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
    }).then((resp) => {
        resp.json()
    }).then(data => console.log(data))
        .catch(err => console.log(err))

    await fetch('https://www.ecoloop.one/bapi/ghga/estimate-emissions', {
        method: 'POST',
        headers: {
            'x-api-key': '4ab4e85d-2081-49e0-80ed-7e24a5ac5487',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            fetch('https://ecoren-api.vercel.app/machine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Date": getdate,
                    "total": total,
                    "CH4": data['emissionsPerGas']['CH4']['emission'] * total,
                    "CO2": data['emissionsPerGas']['CO2']['emission'] * total,
                    "N20": data['emissionsPerGas']['N2O']['emission'] * total,
                    "totalco2eq": data['totalCO2eq'] * total,
                    "energyconsumption": data['energyConsumption'] * total
                })
            }).then((resp) => {
                resp.json()
            }).then(data => window.location.href = "result-analytic.html")
                .catch(err => console.log(err))
        })
        .catch((err) => {
            console.log(err);
        })
}