;(function () {
    ms.set('user', 'Admin')
    $('.shop-cart-mini').hide();
    is_login();
    let data = get_data();
    get_kindList(data);
    get_coursesList(data);
})();

//购物车拦里的总价
var price = 0;

//从后端得到菜单数据
function get_data() {
    //ajax..
    // ...
    // ...
    // ...

    //此为测试变量，模拟从后端接受到的ajax json数据
    let b = `[
        {"name":"提拉米苏","kind":"Cake","price":80,"url":"./img/link1.png","detail":"Some example text some example text. John Doe is an architect and engineerSome example text some example text. John Doe is an architect and engineer John Doe is an architect and engineer John Doe is an architect and engineer John Doe is an architect and engineer John Doe is an architect and engineer John Doe is an architect and engineer"},
        {"name":"大和寿司","kind":"Sushi","price":90,"url":"./img/link2.jpg","detail":"Some example text some example text. John Doe is an architect and engineer"},
        {"name":"神湖牛肉","kind":"Meat","price":100,"url":"./img/link3.png","detail":"Some example text some example text. John Doe is an architect and engineer"},
        {"name":"大阪牛肉","kind":"Meat","price":100,"url":"./img/link3.png","detail":"Some example text some example text. John Doe is an architect and engineer"},
        {"name":"极品拉面","kind":"Noddle","price":110,"url":"./img/link4.png","detail":"Some example text some example text. John Doe is an architect and engineer"}
    ]`;
    return JSON.parse(b)
}


//此方法用来显示菜品上方的分类bar
function get_kindList(b) {
    b = b.map(item => item.kind);
    b = Array.from(new Set(b));
    b.forEach(item => {
        let template = `<li>
                            <a href="#" onclick="go_thisList(this)">` + item + `</a>
                        </li>`
        $('#kind-list').append(template)
    });
}

//分类里面控制显示已点击的分类，all-kind类-->显示为蓝色
function go_thisList(e) {
    let kind = $(e).text();
    let data = get_data();
    get_coursesList(data,kind);
    $('.all-kind').removeClass('all-kind')
    $(e).addClass('all-kind')
}


//显示菜单列表
function get_coursesList(b,kind = '全部') {
    $('#course-list').children().remove()
    
    if (kind === '全部') {
        for (let i = 0; i < b.length; i++) {
            if (i % 2 == 1) {
                let template = `<div class="row">
                    <div class="col-sm-6">
                        <div class="card course-card" style="width:100%">
                            <img class="card-img-top" src="` + b[i - 1].url + `" alt="Card image" style="width:100%">
                            <div class="card-body ">
                                <div class="row">
                                    <div class="col">
                                        <h4 class="card-title">` + b[i - 1].name + `</h4>
                                    </div>
                                    <div class="col" style="text-align:right;">
                                        <span>¥ : </span>
                                        <h3 style="display: inline;">` + b[(i - 1)].price + `</h3>
                                    </div>
                                </div>
                                <p style="height:72px;margin-bottom:16px;overflow:auto;" class="card-text">` + b[(i - 1)].detail + `</p>
                                <div class="row">
                                    <div class="col-6">
                                        <a href="#1" class="btn btn-info" onclick="add_cart(this)">ORDER IT NOW!!</a>
                                    </div>
                                    <div class="col-6" style="text-align:right;">
                                        <a onclick="reduce(this)" class="reduce">
                                            <img src="./img/reduce.png">
                                        </a>
                                        <input id="c1" type="number" class="form-control" value="0" min="0">
                                        <a onclick="add(this)" class="add">
                                            <img src="./img/add.png">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card course-card" style="width:100%">
                            <img class="card-img-top" src="` + b[i].url + `" alt="Card image" style="width:100%">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <h4 class="card-title">` + b[i].name + `</h4>
                                    </div>
                                    <div class="col" style="text-align:right;">
                                        <span>¥ : </span>
                                        <h3 style="display: inline;">` + (b[i].price) + `</h3>
                                    </div>
                                </div>
                                <p style="height:72px;margin-bottom:16px;overflow:auto;" class="card-text">`+ b[i].detail + `</p>
                                <div class="row">
                                    <div class="col-6">
                                        <a href="#1" class="btn btn-info" onclick="add_cart(this)">ORDER IT NOW!!</a>
                                    </div>
                                    <div class="col-6" style="text-align: right;">
                                        <a onclick="reduce(this)" class="reduce">
                                            <img src="./img/reduce.png">
                                        </a>
                                        <input id="c1" type="number" class="form-control" value="0" min="0">
                                        <a onclick="add(this)" class="add">
                                            <img src="./img/add.png">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
                $('#course-list').append(template)
            }
            if (i == b.length - 1 && i % 2 == 0) {
                let template = `<div class="row">
                    <div class="col-sm-6">
                        <div class="card course-card" style="width:100%">
                            <img class="card-img-top" src="` + b[i].url + `" alt="Card image" style="width:100%">
                            <div class="card-body ">
                                <div class="row">
                                    <div class="col">
                                        <h4 class="card-title">` + b[i].name + `</h4>
                                    </div>
                                    <div class="col" style="text-align:right;">
                                        <span>¥ : </span>
                                        <h3 style="display: inline;">` + b[i].price + `</h3>
                                    </div>
                                </div>
                                <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                                <div class="row">
                                    <div class="col-6">
                                        <a href="#1" class="btn btn-info" onclick="add_cart(this)">ORDER IT NOW!!</a>
                                    </div>
                                    <div class="col-6" style="text-align:right;">
                                        <a onclick="reduce(this)" class="reduce">
                                            <img src="./img/reduce.png">
                                        </a>
                                        <input id="c1" type="number" class="form-control" value="0" min="0">
                                        <a onclick="add(this)" class="add">
                                            <img src="./img/add.png">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>`
                $('#course-list').append(template)
            }
        }
    } else {
        //筛选出等于要求的kind的数组
        let ft = b.filter(obj => obj.kind == kind);

        for (let i = 0; i < ft.length; i++) {
            if (ft[i].kind === kind) {
                if (i % 2 == 1) {
                    let template = `<div class="row">
                    <div class="col-sm-6">
                        <div class="card course-card" style="width:100%">
                            <img class="card-img-top" src="` + ft[i - 1].url + `" alt="Card image" style="width:100%">
                            <div class="card-body ">
                                <div class="row">
                                    <div class="col">
                                        <h4 class="card-title">` + ft[i - 1].name + `</h4>
                                    </div>
                                    <div class="col" style="text-align:right;">
                                        <span>¥ : </span>
                                        <h3 style="display: inline;">` + ft[(i - 1)].price + `</h3>
                                    </div>
                                </div>
                                <p style="height:72px;margin-bottom:16px;overflow:auto;" class="card-text">` + ft[(i - 1)].detail + `</p>
                                <div class="row">
                                    <div class="col-6">
                                        <a href="#1" class="btn btn-info" onclick="add_cart(this)">ORDER IT NOW!!</a>
                                    </div>
                                    <div class="col-6" style="text-align:right;">
                                        <a onclick="reduce(this)" class="reduce">
                                            <img src="./img/reduce.png">
                                        </a>
                                        <input id="c1" type="number" class="form-control" value="0" min="0">
                                        <a onclick="add(this)" class="add">
                                            <img src="./img/add.png">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card course-card" style="width:100%">
                            <img class="card-img-top" src="` + ft[i].url + `" alt="Card image" style="width:100%">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <h4 class="card-title">` + ft[i].name + `</h4>
                                    </div>
                                    <div class="col" style="text-align:right;">
                                        <span>¥ : </span>
                                        <h3 style="display: inline;">` + ft[i].price + `</h3>
                                    </div>
                                </div>
                                <p style="height:72px;margin-bottom:16px;overflow:auto;" class="card-text">`+ ft[i].detail + `</p>
                                <div class="row">
                                    <div class="col-6">
                                        <a href="#1" class="btn btn-info" onclick="add_cart(this)">ORDER IT NOW!!</a>
                                    </div>
                                    <div class="col-6" style="text-align: right;">
                                        <a onclick="reduce(this)" class="reduce">
                                            <img src="./img/reduce.png">
                                        </a>
                                        <input id="c1" type="number" class="form-control" value="0" min="0">
                                        <a onclick="add(this)" class="add">
                                            <img src="./img/add.png">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
                    $('#course-list').append(template)
                }
                if (i == ft.length - 1 && i % 2 == 0) {
                    let template = `<div class="row">
                    <div class="col-sm-6">
                        <div class="card course-card" style="width:100%">
                            <img class="card-img-top" src="` + ft[i].url + `" alt="Card image" style="width:100%">
                            <div class="card-body ">
                                <div class="row">
                                    <div class="col">
                                        <h4 class="card-title">` + ft[i].name + `</h4>
                                    </div>
                                    <div class="col" style="text-align:right;">
                                        <span>¥ : </span>
                                        <h3 style="display: inline;">` + ft[i].price + `</h3>
                                    </div>
                                </div>
                                <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                                <div class="row">
                                    <div class="col-6">
                                        <a href="#1" class="btn btn-info" onclick="add_cart(this)">ORDER IT NOW!!</a>
                                    </div>
                                    <div class="col-6" style="text-align:right;">
                                        <a onclick="reduce(this)" class="reduce">
                                            <img src="./img/reduce.png">
                                        </a>
                                        <input id="c1" type="number" class="form-control" value="0" min="0">
                                        <a onclick="add(this)" class="add">
                                            <img src="./img/add.png">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>`
                    $('#course-list').append(template)
                }
            }
        }
    }
}


//判断是否登陆
function is_login() {
    let user = ms.get('user');
    if (!user) {
        let login = $($('#login').children()[0]);
        login.text('登陆');
        login.removeAttr('data-toggle')
        login.attr('onclick', 'goto_login()')
    } else {
        let $login = $($('#login').children()[0]);
        $login.text(user);
        if (user === 'Admin') {
            $($('#login').children()[1].children[2]).text('所有订单')
            $($('#login').children()[1].children[2]).on('click',()=>{
                window.location.href='./allOrder.html'
            });
            $('.add-cources').show()
        }else{
            $($('#login').children()[1].children[2]).on('click',()=>{
                window.location.href='./myOrder.html'
            });
        }
    }
}

//跳转到编辑菜单
function edit_courses() {
    window.location.href = "./editOrder.html";
}

function logout() {
    ms.set('user', null)
    ms.set('order',null);
    ms.set('data',null);
    ms.set('courses', null);
    $('#dropdown-list').hide()
    is_login()
}

function goto_login() {
    window.location.href = "./index.html";
}

function is_in_cartList(name) {
    let list = $("#list").children();
    for (let i = 0; i < list.length; i++) {
        let courseName = list[i].children[0].children[0].children[0].children[0].innerText.split("¥")[0];
        if (courseName === name)
            return true
    }
    return false
}

function removeAll() {
    $('#list').children().remove();
    price = 0;
    $('#total_cost').text(price);
}

function get_cart(e) {
    return $($($(e).parent().parent().parent().parent().parent().parent().parent().prev().children()[1]).children()[1])
}

function get_courceCount(e) {
    return $($($(e).parent().next().children()[0]).children()[1]).val()
}

function get_courseName(e) {
    return $($($(e).parent().parent().prev().prev().children()[0]).children()[0]).html();
}

function get_price(e) {
    return parseInt($($(e).parent().parent().prev().prev().children()[1].children[1]).text())
}

function get_count(e) {
    return $($(e).parent().next().children()[1]).val()
}

function get_image(e) {
    return $(e).parent().parent().parent().prev().prop('src');
}

function add_cart(e) {
    let img = get_image(e);
    //console.log("img:",img);
    let count = get_count(e);
    //console.log("count:",count);
    let name = get_courseName(e);
    //console.log("name:",name);
    let course_price = get_count(e) * get_price(e);
    //console.log("price:",price);
    let list = get_cart(e);
    //console.log(list);
    let in_cart = is_in_cartList(name);
    if (course_price > 0) {
        if (!in_cart) {
            price = 0;
            $(e).addClass('animated zoomOutRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('animated zoomOutRight');
            })
            let template = `<div class="dropdown-item animated bounceInUp" href="#">
                <div class="container">
                    <div class="row">
                        <div class="col-7 dropdown-item-courseName">
                            <span>` + name + `<div style="display:inline-block;margin-left:8px;color:#dc3545;">` + `<span style="font-size:5px;">` + "¥" + `</span>` + get_price(e) + `</div>` + `</span>
                        </div>
                        <div class="col-5 dropdown-item-count">
                            <a onclick="reduce_course(this)" class="reduce">
                                <img src="./img/reduce.png">
                                        </a>
                                <input id="c1" type="number" class="form-control" value="` + count + `" min="0">
                                    <a onclick="add_course(this)" class="add">
                                        <img src="./img/add.png">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            list.append(template);
            let list_children = list.children();
            for (let i = 0; i < list_children.length; i++) {
                let item_price = parseInt(list_children[i].children[0].children[0].children[0].innerText.split('¥')[1]);
                let item_count = list_children[i].children[0].children[0].children[1].children[1].value
                let item_value = item_price * item_count
                price += item_value;
            }
            $('#total_cost').text(price)
        }
    }
}

function add_course(e) {
    let count = $(e).prev().val();
    count++;
    $(e).prev().val(count);
    let row = $(e).parent().prev().children()[0].innerText;
    let list_name = row.split("¥")[0]
    //得到菜单里的list
    let list = $("#course-list").children()
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].children.length; j++) {
            //console.log(list[i].children[j].children[0].children[1].children[0].children[0].children[0].innerHTML);

            let course = list[i].children[j].children[0].children[1].children[0].children[0].children[0].innerHTML;
            if (course === list_name) {
                list[i].children[j].children[0].children[1].children[2].children[1].children[1].value = count
            }
        }
    }
    price = 0
    let list_children = $("#list").children();
    for (let i = 0; i < list_children.length; i++) {
        let item_price = parseInt(list_children[i].children[0].children[0].children[0].innerText.split('¥')[1]);
        let item_count = list_children[i].children[0].children[0].children[1].children[1].value
        let item_value = item_price * item_count
        price += item_value;
    }
    $('#total_cost').text(price)
}

function reduce_course(e) {
    let count = $(e).next().val();
    if (count > 1) {
        count--;
        $(e).next().val(count);
        let row = $(e).parent().prev().children()[0].innerText;
        let list_name = row.split("¥")[0]
        //得到菜单里的list
        let list = $("#course-list").children()
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].children.length; j++) {
                let course = list[i].children[j].children[0].children[1].children[0].children[0].children[0].innerHTML;
                if (course === list_name) {
                    list[i].children[j].children[0].children[1].children[2].children[1].children[1].value = count;
                }
            }
        }
        price = 0;
        let list_children = $("#list").children();
        for (let i = 0; i < list_children.length; i++) {
            let item_price = parseInt(list_children[i].children[0].children[0].children[0].innerText.split('¥')[1]);
            let item_count = list_children[i].children[0].children[0].children[1].children[1].value
            let item_value = item_price * item_count
            price += item_value;
        }
        $('#total_cost').text(price)

    } else if (count == 1) {
        let row = $(e).parent().prev().children()[0].innerText;
        let list_name = row.split("¥")[0];
        let list = $("#course-list").children();
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].children.length; j++) {
                let course = list[i].children[j].children[0].children[1].children[0].children[0].children[0].innerHTML;
                if (course === list_name) {
                    list[i].children[j].children[0].children[1].children[2].children[1].children[1].value = count - 1;
                }
            }
        }
        $(e).parent().parent().parent().parent().remove()
        price = 0
        let list_children = $("#list").children();
        for (let i = 0; i < list_children.length; i++) {
            let item_price = parseInt(list_children[i].children[0].children[0].children[0].innerText.split('¥')[1]);
            let item_count = list_children[i].children[0].children[0].children[1].children[1].value
            let item_value = item_price * item_count
            price += item_value;
        }
        $('#total_cost').text(price)
    }

}

function reduce(e) {
    let name = $(e).parent().parent().prev().prev().children()[0].children[0].innerHTML;
    let value = $(e).next().val();
    if (value > 0) {
        value--;
        $(e).next().val(value)
    }
    let cart_list = $('#list').children();
    for (let i = 0; i < cart_list.length; i++) {
        let courseName = cart_list[i].children[0].children[0].children[0].children[0].innerText.split("¥")[0];
        if (courseName === name) {
            let cart_value = cart_list[i].children[0].children[0].children[1].children[1].value;
            cart_value = parseInt(cart_value);
            if (cart_value == 1) {
                $(cart_list[i]).remove();
                let list_children = $("#list").children();
                for (let i = 0; i < list_children.length; i++) {
                    let item_price = parseInt(list_children[i].children[0].children[0].children[0].innerText.split('¥')[1]);
                    let item_count = list_children[i].children[0].children[0].children[1].children[1].value
                    let item_value = item_price * item_count
                    price += item_value;
                }
                $('#total_cost').text(price)
            } else {
                cart_list[i].children[0].children[0].children[1].children[1].value = cart_value - 1;
            }

        }
    }
    price = 0;
    let list_children = $("#list").children();
    for (let i = 0; i < list_children.length; i++) {
        let item_price = parseInt(list_children[i].children[0].children[0].children[0].innerText.split('¥')[1]);
        let item_count = list_children[i].children[0].children[0].children[1].children[1].value
        let item_value = item_price * item_count
        price += item_value;
    }
    $('#total_cost').text(price)
}

function add(e) {
    let name = $(e).parent().parent().prev().prev().children()[0].children[0].innerHTML;
    let value = $(e).prev().val();
    value++;
    $(e).prev().val(value);
    let cart_list = $('#list').children();
    for (let i = 0; i < cart_list.length; i++) {
        let courseName = cart_list[i].children[0].children[0].children[0].children[0].innerText.split("¥")[0];
        if (courseName === name) {
            let cart_value = cart_list[i].children[0].children[0].children[1].children[1].value;
            cart_value = parseInt(cart_value);
            cart_list[i].children[0].children[0].children[1].children[1].value = cart_value + 1;
        }
    }
    price = 0
    let list_children = $("#list").children();
    for (let i = 0; i < list_children.length; i++) {
        let item_price = parseInt(list_children[i].children[0].children[0].children[0].innerText.split('¥')[1]);
        let item_count = list_children[i].children[0].children[0].children[1].children[1].value
        let item_value = item_price * item_count
        price += item_value;
    }
    $('#total_cost').text(price)
}

function hide() {
    $('.shop-cart').hide()
    $('.shop-cart-mini').show()
}

function hide_mini() {
    $('.shop-cart-mini').hide()
    $('.shop-cart').show()
}

function check(e) {
    let log = ms.get('user');
    if (log) {
        let course_list = []
        let list_children = $("#list").children();
        for (let i = 0; i < list_children.length; i++) {
            let item_price = list_children[i].children[0].children[0].children[0].innerText.split('¥')[1] * 1;
            let item_count = list_children[i].children[0].children[0].children[1].children[1].value * 1;
            let item_value = item_price * item_count;
            let course_name = list_children[i].children[0].children[0].children[0].innerText.split('¥')[0];
            let j = { name: course_name, price: item_price, count: item_count, total: item_value }
            course_list.push(j)
        }
        console.log(JSON.stringify(course_list));

        if (!$.isEmptyObject(course_list)) {
            //将购物车数据变成json字符串
            course_list = JSON.stringify(course_list);
            course_list = encodeURI("./check.html?data="+course_list)
            window.location.href=course_list;
        }

    } else {
        window.location.href = "./index.html";
    }

}