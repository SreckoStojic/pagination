let page = 0;
let limit = 0;
let button = 0;

document.addEventListener("DOMContentLoaded", async function(){
    page = await readPageFromURL();
    limit = await readLimitFromURL();
    await renderData(Number(page), limit)  + Number(button);
});

document.querySelector('.js-next').addEventListener('click', async function(){
    button++;
    page = await readPageFromURL();
    const calcPage = button + page;
    limit = await readLimitFromURL();
    document.querySelector('.js-table').innerHTML = 
    `<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Country</th>
        <th>Company</th>
    </tr>`;
    await renderData(calcPage, limit);
});

document.querySelector('.js-previous').addEventListener('click', async function(){
    button--;
    page = await readPageFromURL();
    const calcPage = button + page;
    limit = await readLimitFromURL();
    document.querySelector('.js-table').innerHTML = 
    `<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Country</th>
        <th>Company</th>
    </tr>`;
    if (calcPage > 0) {
        await renderData(calcPage, limit);
    }
});

async function readPageFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get('page');

    return page;
}

async function readLimitFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const limit = urlParams.get('limit');

    return limit;
}

async function renderData (page, limit) {
    let response = '';
    try {
        let headers = {}
        //response = await fetch(`http://localhost:3001/api/users?page=${page}&limit=${limit}`, {
        response = await fetch(`https://pagination-ten.vercel.app/api/users?page=${page}&limit=${limit}`, {
            method : "GET",
            mode: 'cors',
            headers: headers
        });
    } catch (error) {
        console.error(error);
    }
    if(response.ok){
        const data = await response.json();
        console.log(data);
        for (const el of data.results){
            document.querySelector('.js-table').innerHTML += `
            <tr>
                <td>${el.id}</td>
                <td>${el.name}</td>
                <td>${el.email}</td>
                <td>${el.address}</td>
                <td>${el.country}</td>
                <td>${el.company}</td>
            </tr>
            `;
        }
        
    }
}