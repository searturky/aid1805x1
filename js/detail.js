(function () {
    ms.set('user', 'Admin');
    is_login();
    let id = get_order_id();
    let data = get_detail(id);
    show_detail(data);
})();

function get_order_id() {
    let data = window.location.search;
    let order_id = data.split("=")[1];
    return order_id
}

function get_detail(order_id) {
    //ajax...
    //模拟从后端收到的json字符串
    let data = `{"receiver":"大壮","address":"Avneue Lorem 30#","total":"740","order_id":"ND201807290001","time":"2018-07-28 12:12:35","status":"complete",
        "courses":[
                    {"name":"大和寿司","price":90,"count":2,"total":180,"bz":"多辣椒"},
                    {"name":"神户牛肉","price":100,"count":1,"total":100,"bz":"少辣椒"},
                    {"name":"提拉米苏","price":80,"count":2,"total":160,"bz":"不要辣椒"},
                    {"name":"大阪牛肉","price":100,"count":3,"total":300,"bz":"要很多辣椒"}
                ]}`
    return JSON.parse(data)
}

function logout() {
    ms.set('user', null);
    ms.set('order', null);
    ms.set('data', null);
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

function show_detail(data) {
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