let page = 0;
let limit = 0;
let button = 0;
const MIN_PAGE_NUMBER = 1;
document.addEventListener("DOMContentLoaded", async function(){
    page = await readParamFromURL('page');
    limit = await readParamFromURL('limit');
    if (page !== null && limit !== null) {    
        await renderData(Number(page), limit)  + Number(button);
        document.querySelector('.js-page-number').innerHTML = page;
    } 
});

document.querySelector('.js-next').addEventListener('click', async function(){
    button = button + 1;
    page = await readParamFromURL('page');
    const calcPage = Number(button) + Number(page);
    limit = await readParamFromURL('limit');
    document.querySelector('.js-table').innerHTML = 
    `<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Country</th>
        <th>Company</th>
    </tr>`;
    
    document.querySelector('.js-page-number').innerHTML = calcPage;
    await renderData(calcPage, limit); 
    document.querySelector('.js-previous').disabled = false;
    window.location = `?page=${calcPage}&limit=${limit}`;
    
});

document.querySelector('.js-previous').addEventListener('click', async function(){
    button = button -1;
    page = await readParamFromURL('page');
    const calcPage = Number(button) + Number(page);
    limit = await readParamFromURL('limit');
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
        document.querySelector('.js-next').disabled = false;
        document.querySelector('.js-page-number').innerHTML = calcPage;
        await renderData(calcPage, limit);
        window.location = `?page=${calcPage}&limit=${limit}`;
    } else {
        document.querySelector('.js-page-number').innerHTML = MIN_PAGE_NUMBER;
        document.querySelector('.js-previous').disabled = true;
        await renderData(MIN_PAGE_NUMBER, limit);
    }
});

async function readParamFromURL(parameter) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const param = urlParams.get(parameter);

    return param;
}

async function renderData (page, limit) {
    let response = '';
    try {
        let headers = {}
        response = await fetch(`http://localhost:443/api/users?page=${page}&limit=${limit}`, {
        //response = await fetch(`https://pagination-ten.vercel.app/api/users?page=${page}&limit=${limit}`, {
            method : "GET",
            mode: 'cors',
            headers: headers
        });
    } catch (error) {
        console.error(error);
    }
    if(response.ok) {
        const data = await response.json();
        console.log(data);
          
        for (const el of data.results) {
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
            if (data.hasMore === false) {
                for (const el of data.results) {
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
                document.querySelector('.js-next').disabled = true;
                break;
            }

        }
            
        
    }
}