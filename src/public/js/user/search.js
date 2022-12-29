
// // import $ from 'jquery'
// Handlebars.registerHelper("stringConcat", (str_1, str_2) => new Handlebars.SafeString(str_1 + str_2));

// function a(e) {
//     console.log(e.target.dataset.id);
// } 


// document.querySelectorAll('.admin-ban-btn').forEach(btn => {
//     btn.addEventListener('click', a)
// })

export function handleClearSearchboxUser(e) {
    const searchbox = document.getElementById('user-search-box');
    if(searchbox.value.trim() !== '') {
        searchbox.value = '';
    }
}

export function handleSearch(e) {
    const searchbox = document.getElementById('user-search-box');
    const key_search = searchbox.value.trim();
    if(key_search !== '') {
        // Handle
    }
}

export function handleFilter(e) {
    let link = window.location.href;
    let sq = link.substring(link.indexOf("/admin"), link.length);
    let target = '&sort=';
    switch(e.target.dataset.id) {
        case 'user-name-filter': 
            target += 'name';
            break;
        case 'user-email-filter': 
            sq += 'email';
            break;
        case 'user-registime-filter': 
            sq += 'registime';
            break;
        case 'user-spent-filter': 
            sq += 'spent';
            break;
        default: 
            break;
    }
    window.history.pushState({}, "Final project", sq + target);
    loadUserPage(target)
}

function reGetUserData(e) {
    let cur_target = e.target;
    if(cur_target.id) {
        renderUC(cur_target.id);
    }
    else {
        renderUC(cur_target.parentElement.id);
    }
}

export function renderUC(page = 1) {
    fetch('http://localhost:3000/admin/usercenter/get-users-data?page=' + page)
        .then((response) => {return response.json()})
        .then((data) => {
            const users = data.data.users;
            const pageList = data.data.pageList;
            const pageIndex = data.data.pageIndex;
    
            const source = $("#userlist-template").html();
            const template = Handlebars.compile(source);
            const html = template({ users });
            $(".user-list").html(html);
    
            const psource = $("#userpagination-template").html();
            const ptemplate = Handlebars.compile(psource);
            const phtml = ptemplate({ pageList, pageIndex });
            $(".admin-pagination-wrapper").html(phtml);

            const numpage_btn = document.querySelectorAll(".page-number-btn");
            if(numpage_btn) {
                numpage_btn.forEach(btn => {
                    btn.addEventListener('click', reGetUserData);
                })
            }
        })
        .catch((err) => {
            console.log(err);
        });
};