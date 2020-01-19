'use strict';

const Service = require('egg').Service;

class KnowService extends Service {
    async add(title, content, isShow) {
        let res = await this.app.mysql.insert("know", {
            title, content, isShow
        })
        return res;
    }
}

module.exports = KnowService;
