;(function () {
    ms.set('user', 'Admin');
    is_login();
    let list_data = get_listdata()
    show_list(list_data);
    pagebar()
})();

function go_home() {
    window.location.href = "./home.html";
}

function logout() {
    ms.set('user', null);
    ms.set('order', null);
    ms.set('data', null);
    ms.set('courses', null);
    window.location.href = "./home.html";
}

function is_login() {
    let user = ms.get('user');
    if (!user) {
        window.location.href = "./home.html";
    } else {
        let $login = $($('#login').children()[0]);
        $login.text(user);
        if (user === 'Admin') {
            console.log($($('#login').children()[1].children[2]));

            $($('#login').children()[1].children[2]).text('所有订单')
            $($('#login').children()[1].children[2]).on('click', () => {
                window.location.href = './allOrder.html'
            });
            $('.add-cources').show()
        } else {
            $($('#login').children()[1].children[2]).on('click', () => {
                window.location.href = './myOrder.html'
            });
        }
    }
}

function get_datalen() {
    let name = ms.get('user')
    //$.ajax.. 通过用户名去寻找数据的总共条数,进行分页 
    // ...
    // ... 
    // ... 
    let len = 50;//模拟从后端接受到的4条总数
    return len
}

function get_listdata(page = 1) {
    let username = ms.get('user');
    if(!username) window.location.href="./home.html";
    if(username === "Admin") {                                                                                                                                                                                                              

    } else {

    }
    let order = ms.get("order");
    if (!order) order = "default";
    //模拟从后端收到的json字符串
    let data;
    if (page == 1) {
        data = `[
        {"receiver":"大壮","address":"Avneue Lorem 30#","total":"740","order_id":"ND201807290001","time":"2018-07-28 12:12:35","status":"complete",
        "courses":[
                    {"name":"大和寿司","price":90,"count":2,"total":180,"bz":"多辣椒"},
                    {"name":"神户牛肉","price":100,"count":1,"total":100,"bz":"少辣椒"},
                    {"name":"提拉米苏","price":80,"count":2,"total":160,"bz":"不要辣椒"},
                    {"name":"大阪牛肉","price":100,"count":3,"total":300,"bz":"要很多辣椒"}
                ]},
        {"receiver":"二壮","address":"Avneue Lorem 35#","total":"440","order_id":"ND201807290002","time":"2018-07-23 14:01:33","status":"uncomplete",
        "courses":[
                    {"name":"大和寿司","price":90,"count":2,"total":180,"bz":"多芥末"},
                    {"name":"神户牛肉","price":100,"count":1,"total":100,"bz":"少芥末"},
                    {"name":"提拉米苏","price":80,"count":2,"total":160,"bz":"不要芥末"}
                ]}
    ]`;
    }
    else if (page == 2) {
        data = `[
        {"receiver":"大壮","address":"Avneue Lorem 30#","total":"740","order_id":"ND201807290001","time":"2018-07-28 12:12:35","status":"complete",
        "courses":[
                    {"name":"大和寿司","price":90,"count":2,"total":180,"bz":"多辣椒"},
                    {"name":"神户牛肉","price":100,"count":1,"total":100,"bz":"少辣椒"},
                    {"name":"提拉米苏","price":80,"count":2,"total":160,"bz":"不要辣椒"},
                    {"name":"大阪牛肉","price":100,"count":3,"total":300,"bz":"要很多辣椒"}
                ]},
        {"receiver":"大壮","address":"Avneue Lorem 30#","total":"740","order_id":"ND201807290001","time":"2018-07-28 12:12:35","status":"complete",
        "courses":[
                    {"name":"大和寿司","price":90,"count":2,"total":180,"bz":"多辣椒"},
                    {"name":"神户牛肉","price":100,"count":1,"total":100,"bz":"少辣椒"},
                    {"name":"提拉米苏","price":80,"count":2,"total":160,"bz":"不要辣椒"},
                    {"name":"大阪牛肉","price":100,"count":3,"total":300,"bz":"要很多辣椒"}
                ]},
        {"receiver":"二壮","address":"Avneue Lorem 35#","total":"440","order_id":"ND201807290002","time":"2018-07-23 14:01:33","status":"uncomplete",
        "courses":[
                    {"name":"大和寿司","price":90,"count":2,"total":180,"bz":"多芥末"},
                    {"name":"神户牛肉","price":100,"count":1,"total":100,"bz":"少芥末"},
                    {"name":"提拉米苏","price":80,"count":2,"total":160,"bz":"不要芥末"}
                ]}
    ]`;
    } else {
        data = `[
        {"receiver":"大壮","address":"Avneue Lorem 30#","total":"740","order_id":"ND201807290001","time":"2018-07-28 12:12:35","status":"complete",
        "courses":[
                    {"name":"大和寿司","price":90,"count":2,"total":180,"bz":"多辣椒"},
                    {"name":"神户牛肉","price":100,"count":1,"total":100,"bz":"少辣椒"},
                    {"name":"提拉米苏","price":80,"count":2,"total":160,"bz":"不要辣椒"},
                    {"name":"大阪牛肉","price":100,"count":3,"total":300,"bz":"要很多辣椒"}
                ]},
        {"receiver":"大壮","address":"Avneue Lorem 30#","total":"740","order_id":"ND201807290001","time":"2018-07-28 12:12:35","status":"complete",
        "courses":[
                    {"name":"大和寿司","price":90,"count":2,"total":180,"bz":"多辣椒"},
                    {"name":"神户牛肉","price":100,"count":1,"total":100,"bz":"少辣椒"},
                    {"name":"提拉米苏","price":80,"count":2,"total":160,"bz":"不要辣椒"},
                    {"name":"大阪牛肉","price":100,"count":3,"total":300,"bz":"要很多辣椒"}
                ]},
        {"receiver":"三壮","address":"Avneue Lorem 30#","total":"740","order_id":"ND201807290001","time":"2018-07-28 12:12:35","status":"complete",
        "courses":[
                    {"name":"大和寿司","price":90,"count":2,"total":180,"bz":"多辣椒"},
                    {"name":"神户牛肉","price":100,"count":1,"total":100,"bz":"少辣椒"},
                    {"name":"提拉米苏","price":80,"count":2,"total":160,"bz":"不要辣椒"},
                    {"name":"大阪牛肉","price":100,"count":3,"total":300,"bz":"要很多辣椒"}
                ]},
        {"receiver":"四壮","address":"Avneue Lorem 35#","total":"440","order_id":"ND201807290002","time":"2018-07-23 14:01:33","status":"uncomplete",
        "courses":[
                    {"name":"大和寿司","price":90,"count":2,"total":180,"bz":"多芥末"},
                    {"name":"神户牛肉","price":100,"count":1,"total":100,"bz":"少芥末"},
                    {"name":"提拉米苏","price":80,"count":2,"total":160,"bz":"不要芥末"}
                ]}
    ]`;
    }
    data = JSON.parse(data)
    ms.set("data", data)
    return data
}

function show_list(data) {
    $('#list').children().remove()

    data.forEach(item => {
        let status = item.status;
        if (status === "uncomplete") {
            let courses = '';
            item.courses.forEach(j => {
                courses += j.name + ' '
            });
            let template = `
                    <tr>
                        <td>` + item.order_id + `</td>
                        <td>` + item.receiver + `</td>
                        <td style="min-width:100px;">` + courses + `</td>
                        <td>` + item.time + `</td>
                        <td>` + item.address + `</td>
                        <td>` + item.total + `</td>
                        <td>` + `<a href="#1" onclick="got_it(this)">待收货</a>` + `</td>
                        <td>` + `<a href="#1" onclick="show_detail(this)">详情>></a>` + `</td>
                    </tr>`;
            $('#list').append(template);
        }
        if (status === "complete") {
            let courses = '';
            item.courses.forEach(j => {
                courses += j.name + ' '
            });
            let template = `
                    <tr>
                        <td>` + item.order_id + `</td>
                        <td>` + item.receiver + `</td>
                        <td style="min-width:100px;">` + courses + `</td>
                        <td>` + item.time + `</td>
                        <td>` + item.address + `</td>
                        <td>` + item.total + `</td>
                        <td>` + "已完成" + `</td>
                        <td>` + `<a href="#1" onclick="show_detail(this)">详情>></a></td>
                    </tr>`;
            $('#list').append(template);
        };
    });

}

function show_detail(e) {
    let order_id = $(e).parent().parent().children()[0].innerText;
    let data = ms.get('data')
    console.log(data);
    console.log(order_id);

    data.forEach(item => {
        if (item.order_id === order_id) {
            window.location.href = "./detail.html?order_id=" + order_id;
        }
    });
}

function pagebar(start = 1) {
    $('#fy').children().remove()
    $('#fy').append(`
                    <input type="number" min="0" id="page-input">
                    <a href="#" onclick="go_otherpage(this)">跳转</a>
                    <li id="home">
                        <a href="#" id="home-page">首页</a>
                    </li>
            `)
    let length = get_datalen();
    let pages = Math.ceil(length / 7);
    $('#page-input').attr('oninput', "if(value>" + pages + "||value<0)value=1")
    if (pages == 0) {

    } else if (pages - start <= 5) {
        for (let i = start; i <= pages; i++) {
            let template = '';
            if (i == start) {
                template = `
                    <li>
                        <a href="#1" class="this-page" onclick="go_page(this)">` + i + `</a>
                    </li>
                    `;
            } else {
                template = `
                    <li>
                        <a href="#1" onclick="go_page(this)">` + i + `</a>
                    </li>
                    `;
            }
            $('#fy').append(template)
        }
    } else {
        for (let i = start; i < start + 5; i++) {
            let template = '';
            if (i == start) {
                template = `
                    <li>
                        <a href="#1" class="this-page" onclick="go_page(this)">` + i + `</a>
                    </li>
                    `;
            } else {
                template = `
                    <li>
                        <a href="#1" onclick="go_page(this)">` + i + `</a>
                    </li>
                    `;
            }
            $('#fy').append(template)
        }
        $('#fy').append(
            `<li>
                <a href="#1">..</a>
            </li>
            <li>
                <a href="#1">` + pages + `</a>
            </li>
            <li id="next-five">
                <a href="#1" id="next-five-page">下五页</a>
            </li>`
        )
    }

}

function got_it() {
    var r = confirm("您确定已经收货了吗？");
    if (r == true) {

    }
}

function go_page(e) {
    $('.this-page').removeClass('this-page')
    $(e).addClass("this-page")
    let page = $(e).text()
    console.log(page);
    let data = get_listdata(page);
    show_list(data);
}

function go_otherpage(e) {
    let page = $(e).prev().val() * 1;
    console.log(page);
    let data = get_listdata(page);
    show_list(data);
    pagebar(page);
}

function asc(e) {
    $(".click-button").removeClass("click-button")
    $(e).addClass("click-button")
    ms.set("order", "asc");
    let list_data = get_listdata();
    show_list(list_data);
    pagebar();
}

function desc(e) {
    $(".click-button").removeClass("click-button")
    $(e).addClass("click-button")
    ms.set("order", "desc");
    let list_data = get_listdata();
    show_list(list_data);
    pagebar();
}