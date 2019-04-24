let pageSize = 10;
let page = 1;
let pages = 0;
let comments = [];

//提交评论
$('#messageBtn').on('click', function () {
    $.ajax({
        type: 'POST',
        url: '/api/comment/post',
        data: {
            contentId: $('#contentId').val(),
            content: $('#messageContent').val()
        },
        success: function (responseData) {
            $('#messageContent').val('');
            renderComment();
            commentSuccess()

            comments = responseData.data.comments.reverse();
        },
        fail: function (error) {
            alert(error);
        }
    })
});

//每次页面重载的时候获取一下该文章的所有评论
$.ajax({
    url: '/api/comment',
    data: {
        contentId: $('#contentId').val()
    },
    success: function (responseData) {
        comments = responseData.data.reverse();
        renderComment();
    }
});

$('.pager').delegate('a', 'click', function () {
    if ($(this).parent().hasClass('previous')) {
        page--;
    } else {
        page++;
    }
    renderComment();
});

function renderComment() {
    $('#messageCount').html(comments.length);
    pages = Math.max(Math.ceil(comments.length / pageSize), 1);
    let start = Math.max(0, (page - 1) * pageSize);
    let end = Math.min(start + pageSize, comments.length);

    let $lis = $('.pager li');
    $lis.eq(1).html(page + ' / ' + pages);

    if (page <= 1) {
        page = 1;
        $lis.eq(0).html('<span>没有上一页了</span>');
    } else {
        $lis.eq(0).html('<a href="javascript:;">上一页</a>');
    }
    if (page >= pages) {
        page = pages;
        $lis.eq(2).html('<span>没有下一页了</span>');
    } else {
        $lis.eq(2).html('<a href="javascript:;">下一页</a>');
    }

    if (comments.length === 0) {
        $('.messageList').html('<div class="messageBox" style="position:  absolute;left: 50%;/' +
            'transform:  translate;transform:  translate(-50%);"><p style="font-size: 16px;">暂无评论，点击抢沙发</p></div>');
    } else {
        let html = '';
        for (let i = start; i < end; i++) {
            html += '<div class="messageBox">' +
                '<p class="name clear"><img class="avatar" src="/public/images/avatar.png"/><span class="fl" style="color: rgb(105,87,207);">' + comments[i].username + '</span><span class="fr">' + formatDate(comments[i].postTime) + '</span></p><p ' +
                'class="content_p">' + comments[i].content + '</p>' +
                '</div>';
        }
        $('.messageList').html(html);
    }

}

function commentSuccess() {
    let $alert = $('#alert')
    $alert.css('display','block')
    window.location.reload();
}

function formatDate(d) {
    let date = new Date(d);
    let myDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    /*
    * 做一个时间的校验，如果当时分秒小于10时在前面补0
    * */
    if (date.getMinutes() < 10 || date.getSeconds() < 10) {
        if (date.getMinutes() < 10 && date.getSeconds() < 10) {
            myDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() + ':' + '0' + date.getMinutes() + ':' + '0' + date.getSeconds()
        } else if (date.getMinutes() < 10) {
            myDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() + ':' + '0' + date.getMinutes() + ':' + date.getSeconds()
        } else if (date.getSeconds() < 10) {
            myDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() + ':' + date.getMinutes() + ':' + '0' + date.getSeconds()
        }
    } else {
        myDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }

    return myDate;
}

