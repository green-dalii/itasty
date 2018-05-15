"use strict";

var TastyItem = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.key = obj.key;
        // this.value = obj.value;
        this.timestamp = obj.timestamp;
        this.location = obj.location;
        this.latitude_longitude = obj.latitude_longitude;
        this.name = obj.name;
        this.category = obj.category;
        this.recommend = obj.recommend;
        this.finder = obj.finder;
        this.like = obj.like;
        this.dislike = obj.dislike;
        this.id = obj.id
        this.others = obj.others;
    } else {
        this.key = "";
        // this.value = "";
        this.timestamp = "";
        this.location = "";
        this.latitude_longitude = "";
        this.name = "";
        this.category = "";
        this.recommend = "";
        this.finder = "";
        this.like = 0;
        this.dislike = 0;
        this.id = "";
        this.others = "";
    }
};

TastyItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var TastyDictionary = function () {
    LocalContractStorage.defineMapProperty(this, "locationMap", null);
    LocalContractStorage.defineMapProperty(this, "itemMap", {
        parse: function (text) {
            return new TastyItem(text);
        },//get 读取方法:Strings -> TastyItem Object
        stringify: function (o) {
            return o.toString();
        }//set 保存方法:TastyItem Object -> Strings
    });
    // LocalContractStorage.defineProperty(this, "size");
    // LocalContractStorage.defineMapProperty(this, "repo", {
    //     parse: function (text) {
    //         return new TastyItem(text);
    //     },//get 读取方法:Strings -> TastyItem Object
    //     stringify: function (o) {
    //         return o.toString();
    //     }//set 保存方法:TastyItem Object -> Strings
    // });
};

TastyDictionary.prototype = {
    init: function () {
        // this.size = 0
    },

    save: function (key, location, name, category, recommend) {
        var _key = key.trim()
        var _location = location.trim();
        var _name = name.trim();
        var _category = category.trim()
        var _recommend = recommend
        var _finder = Blockchain.transaction.from;
        var tastyItem = new TastyItem()
        tastyItem.key = _key
        tastyItem.location = _location
        tastyItem.finder = _finder
        tastyItem.name = _name
        tastyItem.category = _category
        tastyItem.recommend = _recommend
        tastyItem.timestamp = String(Date.now())
        tastyItem.id = _finder + tastyItem.timestamp
        tastyItem.like = 0
        tastyItem.dislike = 0
        var idList = this.locationMap.get(_key)
        if (idList != null) {
            idList.push(tastyItem.id)
            this.locationMap.set(_key, idList)
            // return this.locationMap.get(_key)
        } else {
            this.locationMap.set(_key, [tastyItem.id])
            // return this.locationMap.get(_key)
        }
        this.itemMap.set(tastyItem.id, tastyItem)
        return this.itemMap.get(tastyItem.id)
    },

    get: function (locationKey) {
        locationKey = locationKey.trim();
        if (locationKey === "") {
            console.log('No input')
            return 0
            throw new Error("empty key")
        }
        var itemIdList = this.locationMap.get(locationKey)
        if (itemIdList === null) {
            console.log('No item')
            return -1
            throw new Error("empty item")
        }
        // return itemIdList
        var p=[]
        var that = this
        itemIdList.forEach(function(item,index) {
            var temp = that.itemMap.get(item)
            p.push(temp.recommend)
        });
        return p;
    },

    test: function () {
        return 'Test Message from Nebulas!'
    }
};
module.exports = TastyDictionary;