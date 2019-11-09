package com.jeff.carcar.controller.pachong;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class MongoDBConnect {

    public static MongoCollection<Document> getConnection(String databaseName,String collectionName){
        MongoClient mongoClient = new MongoClient("10.8.27.5", 27017);
        // 连接到数据库
        MongoDatabase mongoDatabase = mongoClient.getDatabase(databaseName);
        MongoCollection<Document> collection = mongoDatabase.getCollection(collectionName);
        return collection;
    }


}
