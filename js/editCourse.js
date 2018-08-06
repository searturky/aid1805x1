; (function () {
    ms.set('user', 'Admin');
    is_login();
    let coursename = get_course_name();
    let detail = get_detail(coursename);
    show_detail(detail);
})();

function get_course_name() {
    let data = window.location.search;
    let course_name = data.split("=")[1];
    return course_name
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

function get_detail(course_name) {
    //ajax...
    //模拟收到的json字符串
    let data = `
        {"name":"提拉米苏","kind":"Cake","price":80,"url":"./img/link1.png","detail":"Some example text some example text"}
    `
    return JSON.parse(data)
}


function show_detail(data) {
    $('#course-name').val(data.name);
    $('#kind').val(data.kind);
    $('#detail').val(data.detail);
    $('#price').val(data.price);
    let img = new Image();
    img.src = data.url;
    img.style.width = "100%";
    img.style.height = "100%";
    $('.demo').append(img)
}

document.getElementById("image").addEventListener("change", function (e) {
    console.log("file[0]:", this.files[0].type);

    if (this.files[0].type === "image/png" || this.files[0].type === "image/jpg" || this.files[0].type === "image/jpeg") {
        let files = this.files;
        let img = new Image();

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        console.log("reader:", reader);

        reader.onload = function (e) {
            let dx = (e.total / 1024) / 1024;
            if (dx >= 1) {
                alert("文件大小大于1M");
                $('.demo').children().remove()
                document.getElementById("image").value = '';
                return;
            }
            console.log("this.result", this.result);
            img.src = this.result;
            img.style.width = "100%";
            img.style.height = "100%";
            $('.demo').children().remove()
            document.querySelector('.demo').appendChild(img);
        }
    } else {
        alert('请上传正确的图片(png,jpg,jpeg)');
        $('.demo').children().remove()
        document.getElementById("image").value = '';
        return
    }

})

$('#submit-form').on('submit', function () {
    let name = $("#course-name").val().trim();
    let kind = $("#kind").val().trim();
    let price = $("#price").val().trim();
    let detail = $("#detail").val().trim();
    let image = $("#image").val().trim();
    //判断是否为空
    if (name == "") {
        alert("商品名称不能为空");
        return false;
    } if (kind == "") {
        alert("请选择商品类别");
        return false;
    }
    if (!(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(price))) {
        alert("请输入正确的商品价格");
        return false;
    }
    if (detail == "") {
        alert("商品描述不能为空");
        return false;
    }
    if (image == "") {
        alert("请选择上传图片");
        return false;
    }
    return true;
})