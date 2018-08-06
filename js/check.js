; (function () {
    ms.set('user', 'Admin');
    is_login();
    let data = get_courselist();
    set_eaterlist(data);
    set_eatername();
    $('input[name="eater"]').on('input propertychange',
        function () {
            $('#eater').attr('hidden', '')
        });
    $('input[name="address"]').on('input propertychange',
        function () {
            $('#address').attr('hidden', '')
        });
})();

function logout() {
    ms.set('user', null);
    ms.set('order', null);
    ms.set('data', null);
    ms.set('courses', null);
    window.location.href = "./home.html";
}

//得到菜单详情
function get_courselist() {
    //模拟从购物车得到的数据           
    // let data = `[{"name":"大和寿司","price":90,"count":2,"total":180},
    //              {"name":"神户牛肉","price":100,"count":1,"total":100},
    //              {"name":"提拉米苏","price":80,"count":2,"total":160},
    //              {"name":"大阪牛肉","price":100,"count":3,"total":300}
    //             ]`;
    //$.ajax...
    if(window.location.search === '')window.location.href="./home.html";
    let data = decodeURI(window.location.search.split("=")[1]);
    data = JSON.parse(data);
    return data
}

//填充下方菜单购物车详情
function set_eaterlist(data) {
    let total = 0;
    data.forEach(item => {
        let template = `
                <tr>
                    <td>` + item.name + `</td>
                    <td>` + item.count + `</td>
                    <td>` + item.price + `</td>
                    <td>
                        <input name="bz" type="text">
                    </td>
                </tr>`;
        $('#course-list').append(template);
        total += item.total
    });


    $('#total').append("总价:" + total);
}

//检查是否登陆
function is_login() {
    let user = ms.get('user');
    if (!user) {
        window.location.href = "./home.html";
    } else {
        let $login = $($('#login').children()[0]);
        $login.text(user);
        if (user === 'Admin') {
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

function goto_login() {
    window.location.href = "./index.html";
}

//设置默认的用餐人信息
function set_eatername() {
    let eater = ms.get('user')
    $('input[name="eater"]').val(eater)
}

function hide(e) {
    $(e).parent()[0].setAttribute('hidden', "");
}

//确认支付方法
function pay(e) {
    let list = get_courselist();
    for (let i = 0; i < list.length; i++) {
        list[i].bz = $('input[name="bz"]')[i].value;
    }

    let guest = $('input[name="eater"]').val()
    let address = $('input[name="address"]').val()
    if (address && guest) {
        $(e).attr('data-toggle', "modal")
        $(e).attr('data-target', "#myModal")
        let data = []
        data.push(list)
        let total = $('#total').text().split(":")[1]
        //data中第一个数组为菜品的详情，第二个数组是用户的名字和收货地址和总价
        data.push([guest, address, total])
        JSON.stringify(data)
        console.log(data);
        //向服务端提交数据
        //$.ajax...
    } else {
        if (!address) {
            $('#address').removeAttr("hidden")
        }

        if (!guest) {
            $('#eater').removeAttr("hidden")
        }

    }
}

function go_home() {
    window.location.href = "./home.html";
}

function back() {
    window.history.back();
}