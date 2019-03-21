$(function() {

    let $loginBox = $('#loginBox');
    let $registerBox = $('#registerBox');
    let $userInfo = $('#userInfo');

    //切换到注册面板
    $loginBox.find('a.colMint').on('click', function() {
        $registerBox.show(500);
        $loginBox.hide(500);
    });

    //切换到登录面板
    $registerBox.find('a.colMint').on('click', function() {
        $loginBox.show(500);
        $registerBox.hide(500);
    });

    //注册
    $registerBox.find('button').on('click', function() {
        //通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: $registerBox.find('[name="username"]').val(),
                password: $registerBox.find('[name="password"]').val(),
                name: $registerBox.find('[name="name"]').val(),
                phone: $registerBox.find('[name="phone"]').val(),
                repassword:  $registerBox.find('[name="repassword"]').val()
            },
            dataType: 'json',
            success: function(result) {
                $registerBox.find('.colWarning').html(result.message);

                if (!result.code) {
                    //注册成功
                    setTimeout(function() {
                        $loginBox.show();
                        $registerBox.hide();
                    }, 1000);
                }

            }
        });
    });

    //登录
    $loginBox.find('button').on('click', function() {
        //通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $loginBox.find('[name="username"]').val(),

                password: $loginBox.find('[name="password"]').val()
            },
            dataType: 'json',
            success: function(result) {
                $loginBox.find('.colWarning').html(result.message);
                if (!result.code) {
                    //登录成功
                   setTimeout( () => {
                       $loginBox.hide();
                       $userInfo.show();
                        window.location.reload();
                       // 显示登录用户的信息
                       $userInfo.find('.username').html( result.userInfo.username );
                       $userInfo.find('.info').html('你好，欢迎光临我的个人博客');
                   }, 1000);
                }
            }
        })
    })



    //退出
    $('#logout').on('click', function() {
        $.ajax({
            url: '/api/user/logout',
            success: function(result) {
                if (!result.code) {
                    window.location.reload();
                }
            }
        });
    })

})

