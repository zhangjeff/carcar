package com.jeff.carcar.controller.pachong.zhihu;

import com.jeff.carcar.controller.pachong.MongoDBConnect;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/zhihu")
public class ZhihuContentController {

    @RequestMapping(value="/zhihuContent", method = RequestMethod.GET)
    public List<Document> getzhihuContent(){
        MongoCollection<Document> collection = MongoDBConnect.getConnection("zhihu","special");
        Bson filter = Filters.eq("create_day", "2019-11-13");

        FindIterable<Document> findIterable =  collection.find(filter).limit(10);
        MongoCursor cursor = findIterable.iterator();
        List documentList = new ArrayList<Document>();
        Document document = (Document) findIterable.first();
        System.out.println(document);
        while (cursor.hasNext()) {
            documentList.add(cursor.next());
//            System.out.println(cursor.next());
        }
//        collection.find()
        return documentList;
    }
}
