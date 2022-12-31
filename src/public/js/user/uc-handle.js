

let option = '';
let key_srch = '';
let type_srch = 'none';
let cur_page = 1;

function reGetUserData(e) {
    let target = e.target;
    if(target.id) {
        cur_page = target.id;
        renderUC(cur_page, option, key_srch, type_srch);
    }
    else {
        cur_page = target.parentElement.id;
        renderUC(cur_page, option, key_srch, type_srch);
    }
}

export function renderUC(page = 1, sortQ = 'none', searchK = '', typeS = 'none') {
    fetch('http://localhost:3000/admin/usercenter/get-users-data?page=' + page + '&sort=' + sortQ + '&search=' + searchK + '&type=' + typeS )
        .then((response) => {return response.json()})
        .then((data) => {
            const users = data.data.users;
            const pageList = data.data.pageList;
            const pageIndex = data.data.pageIndex;
    
            const source = $("#userlist-template").html();
            const template = Handlebars.compile(source);
            const html = template({ users, pageIndex });
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
            const banUserBtn = document.querySelectorAll('.ban-btn-ud');
            if(banUserBtn) {
                banUserBtn.forEach(btn => {
                    btn.addEventListener('click', handleBanUser);
                })
            }
            const unbanUserBtn = document.querySelectorAll('.unban-btn-ud');
            if(unbanUserBtn) {
                unbanUserBtn.forEach(btn => {
                    btn.addEventListener('click', handleBanUser);
                })
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

export function handleClearSearchboxUser(e) {
    const searchbox = document.getElementById('user-search-box');
    if(searchbox.value.trim() !== '') {
        searchbox.value = '';
    }
}

export function handleSelectType(e) {
    const target_key = e.target.innerText;
    $('#user-typesearch-btn').html(target_key);
    document.getElementById('user-typesearch-btn').dataset.type = target_key;
};

export function handleSearch(e) {
    key_srch = document.getElementById('user-search-box').value.trim();
    type_srch = document.getElementById('user-typesearch-btn').dataset.type;
    if(key_srch !== '' && type_srch != 'none') {
        renderUC(1, option, key_srch, type_srch);
    }
}

export function handleFilter(e) {
    option = ''; //refresh
    let cur_target = e.target;
    if(!$(cur_target).hasClass('filter-btn-active')) {
        switch(cur_target.id) {
            case 'user-name-filter': 
                option += 'name';
                break;
            case 'user-email-filter': 
                option += 'email';
                break;
            case 'user-registime-filter': 
                option += 'registime';
                break;
            case 'user-spent-filter': 
                option += 'spent';
                break;
            case 'user-desorder-filter': 
                option += 'desorder';
                break;
            default: 
                break;
        }
        let filterBtnList = document.querySelectorAll('.filter-btn');
        if(filterBtnList) {
            filterBtnList.forEach(btn => {
                if($('#' + btn.id).hasClass('filter-btn-active')) {
                    option += ('-' + btn.id.split('-')[1]);
                }
            })
        }
        $(cur_target).addClass('filter-btn-active');
        renderUC(1, option);
    }
    else {
        // Handle active button
        $(cur_target).removeClass('filter-btn-active');
        // Get option
        let filterBtnList = document.querySelectorAll('.filter-btn');
        if(filterBtnList) {
            filterBtnList.forEach(btn => {
                if($('#' + btn.id).hasClass('filter-btn-active')) {
                    option += ('-' + btn.id.split('-')[1]);
                }
            })
        }
        option = (option).slice(1, option.length);
        renderUC(1, option);
    }
}
export function banUser(id = 'none', type = 'none') {
    fetch('http://localhost:3000/admin/usercenter/ban-user?id=' + id + '&type=' + type)
        .then((response) => {return response.json()})
        .catch((err) => {
            console.log(err);
        });
}
export function handleBanUser(e) {
    let id = e.target.dataset.userid;
    let ban_type = e.target.dataset.type;
    banUser(id, ban_type);
    setTimeout(() => {
        renderUC(cur_page, option, key_srch, type_srch);
    }, 500);
}
