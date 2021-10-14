let page = 0;
let scroll_addition = 0;
const DEFUALT_LIMIT = 20;
const DEFAULT_PAGE = 1;

document.addEventListener("DOMContentLoaded", async function(){
    page = await readParamFromURL('page');
    if (page !== null) {    
        await renderData(Number(page)  + Number(scroll_addition));
    } else {
        await renderData(DEFAULT_PAGE);
    }
});

//const = document.querySelector('.js-table');
document.addEventListener("scroll", async function() {
    console.log(`${window.innerHeight} + ${window.scrollY}  === ${document.body.offsetHeight}`)
   if (window.innerHeight + window.scrollY  >= document.body.offsetHeight) {
        scroll_addition++;
        page = await readParamFromURL('page');
        await renderData(Number(page)  + Number(scroll_addition));
    };
  });

async function changeURL(page) {
    window.location.search = `?page=${page}&limit=${DEFUALT_LIMIT}`;
}

async function readParamFromURL(parameter) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const param = urlParams.get(parameter);

    return param;
}

async function renderData (page) {
    let response = '';
    try {
        let headers = {}
        response = await fetch(`http://localhost:3001/api/users?page=${page}&limit=${DEFUALT_LIMIT}`, {
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
                break;
            }

        }
    }
}