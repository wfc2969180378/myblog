let express = require('express');
let router = express.Router();

let Category = require('../models/Category');
let Content = require('../models/Content');

let data;

/*
* 处理通用的数据
* */
router.use((req, res, next) => {
    data = {
        userInfo: req.userInfo,
        categories: []
    }

    Category.find().then((categories) => {
        data.categories = categories;
        next();
    });
});

/*
* 首页
* */
router.get('/', (req, res, next) => {

    data.category = req.query.category || '';
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 10;
    data.pages = 0;

    let where = {};
    if (data.category) {
        where.category = data.category
    }

    Content.where(where).count().then((count) => {

        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min(data.page, data.pages);
        //取值不能小于1
        data.page = Math.max(data.page, 1);

        let skip = (data.page - 1) * data.limit;

        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        });

    }).then((contents) => {
        data.contents = contents;
        res.render('main/index', data);
    })
});

router.get('/view', (req, res) => {

    let contentId = req.query.contentId || '';

    Content.findOne({
        _id: contentId
    }).then((content) => {
        data.content = content;

        content.views++;
        content.supports++;
        content.save();

        res.render('main/view', data);
    });

});


module.exports = router;
