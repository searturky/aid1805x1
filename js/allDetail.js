;(function () {
    ms.set('user', 'Admin');
    is_login();
    let id = get_order_id();
    let data = get_detail(id);
    show_detail(data);
})();

//从url得到唯一订单id号，以从数据库查出该条数据
function get_order_id() {
    let data = window.location.search;
    let order_id = data.split("=")[1];
    return order_id
}

//从数据库查出该条数据
function get_detail(order_id) {
    //ajax...
    //模拟从后端收到的json字符串
    let data = `{"user":"rj","receiver":"大壮","address":"Avneue Lorem 30#","total":"740","order_id":"ND201807290001","time":"2018-07-28 12:12:35","status":"complete",
        "courses":[
                    {"name":"大和寿司","price":90,"count":2,"total":180,"bz":"多辣椒"},
                    {"name":"神户牛肉","price":100,"count":1,"total":100,"bz":"少辣椒"},
                    {"name":"提拉米苏","price":80,"count":2,"total":160,"bz":"不要辣椒"},
                    {"name":"大阪牛肉","price":100,"count":3,"total":300,"bz":"要很多辣椒"}
                ]}`
    return JSON.parse(data)
}


//登出
function logout() {
    ms.set('user', null);
    ms.set('order', null);
    ms.set('data', null);
    ms.set('courses', null);
    window.location.href = "./home.html";
}

//检查是否登陆
function is_login() {
    let user = ms.get('user');
    if (!user || user !== 'Admin') {
        window.location.href = "./home.html";
    } else {
        let $login = $($('#login').children()[0]);
        $login.text(user);
        $($('#login').children()[1].children[2]).text('所有订单')
        $($('#login').children()[1].children[2]).on('click', () => {
            window.location.href = './allOrder.html'
        });
        $('.add-cources').show()
    }
}

//填充订单详情
function show_detail(data) {
    $('#user').text(data.user);
    $('#receiver').text(data.receiver);
    $('#address').text(data.address);
    $('#time').text(data.time);
    $('#total').text(data.total);
    $('#order_id').text(data.order_id);
    $('#status').text(data.status === 'complete' ? "完成" : "待收货");
    data.courses.forEach(item => {
        let template = `
                        <tr>
                            <td>`+ item.name + `</td>
                            <td>`+ item.price + `</td>
                            <td>`+ item.count + `</td>
                            <td>`+ item.total + `</td>
                            <td>`+ item.bz + `</td>
                        </tr>
        `;
        $('#courses_list').append(template)
    });
}
