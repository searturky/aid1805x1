(function () {
    ms.set('user', 'Admin');
    is_login();
    let data = get_allcourses();
    show_courses(data)
})();

function is_delete(e) {
    let r = confirm("您确定要删除这个商品吗？");
    if (r == true) {
        let name = $(e).parent().parent().children()[0].innerText
        console.log(name);
        //ajax...
    }
}

function edit(e) {
    let name = $(e).parent().parent().children()[0].innerText
    window.location.href="./editCourse.html?name="+name;
}


function get_allcourses() {
    let data = ms.get("courses");
    if (data) return data

    //ajax...
    //模拟从后端收到的json字符串
    data = `[
        {"name":"提拉米苏","kind":"Cake","price":80,"url":"./img/link1.png","detail":"Some example text some example text"},
        {"name":"大和寿司","kind":"Sushi","price":90,"url":"./img/link2.jpg","detail":"Some example text some example text. John Doe is an architect and engineer"},
        {"name":"神湖牛肉","kind":"Meat","price":100,"url":"./img/link3.png","detail":"Some example text some example text. John Doe is an architect and engineer"},
        {"name":"大阪牛肉","kind":"Meat","price":100,"url":"./img/link3.png","detail":"Some example text some example text. John Doe is an architect and engineer"},
        {"name":"极品拉面","kind":"Noddle","price":110,"url":"./img/link4.png","detail":"Some example text some example text. John Doe is an architect and engineer"}
    ]`;
    data = JSON.parse(data)
    ms.set("courses", data)
    return data
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

function show_courses(data) {
    $('#show-courses').children().remove()
    data.forEach(item => {
        let template = `
        <tr>
            <td>` + item.name + `</td>
            <td>` + item.kind + `</td>
            <td>` + item.price + `</td>
            <td>` + item.detail + `</td>
            <td>
                <i class="fa fa-pencil-square-o hover-change" onclick="edit(this)"></i>
            </td>
            <td>
                <i class="fa fa-close hover-change" onclick="is_delete(this)"></i>
            </td>
        </tr>
        `;
        $('#show-courses').append(template)
    });
}

