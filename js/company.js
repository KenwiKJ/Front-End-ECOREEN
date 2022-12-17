
fetch("https://ecoren-api.vercel.app/analytics").then((data)=>{
    return data.json();
}).then((objectData)=>{
    let tableData="";
    objectData.map((values)=>{
        tableData+=
        `<tr>
            <td>${values.Date}</td>
            <td>${values.activityObject}</td>
            <td>${values.totalObject}</td>
            <td>${values.fuelType}</td>
            <td>${parseInt(values.totalEmissions)}</td>
            <td>${parseInt(values.finance)}</td>
            <td>${parseInt(values.recover)}</td>
        </tr>`;
    });
    document.getElementById("table_body").innerHTML=tableData;
}).catch((err)=>{
    console.log(err);
})