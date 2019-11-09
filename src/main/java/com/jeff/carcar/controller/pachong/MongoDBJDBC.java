package com.jeff.carcar.controller.pachong;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class MongoDBJDBC {
    public static void main(String args[]) {
        try {
            // 连接到 mongodb 服务
//            MongoClient mongoClient = new MongoClient("10.8.27.5", 27017);
//            // 连接到数据库
//            MongoDatabase mongoDatabase = mongoClient.getDatabase("zhihu");
//            System.out.println("Connect to database successfully");
//            MongoCollection<Document> collection = mongoDatabase.getCollection("test");
            MongoCollection<Document> collection = MongoDBConnect.getConnection("zhihu","test");
            System.out.println("集合 test 选择成功");
            //插入文档
            /**       * 1. 创建文档 org.bson.Document 参数为key-value的格式 * 2. 创建文档集合List<Document>
             * * 3. 将文档集合插入数据库集合中   mongoCollection.insertMany(List<Document>)
             * 插入单个文档可以用 mongoCollection.insertOne(Document)            * */
//            Document document = new Document("title", "MongoDB").append("description", "database").append("likes", 100).append("by", "Fly");
            Document doc = new Document("name", "MongoDB")
                    .append("type", "database")
                    .append("count", 1)
                    .append("info", new Document("x", 203).append("y", 102));

            List<Document> documents = new ArrayList<Document>();
            for (int i = 0; i < 100; i++) {
                documents.add(new Document("i", i));
            }
//            List<Document> documents = new ArrayList<Document>();
            documents.add(doc);
            collection.insertMany(documents);
            System.out.println("文档插入成功");
        } catch (Exception e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
        }
    }
}