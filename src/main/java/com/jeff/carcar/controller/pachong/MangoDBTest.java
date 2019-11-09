package com.jeff.carcar.controller.pachong;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;

public class MangoDBTest {

    public static void main( String args[] ){
        try{ // 连接到 mongodb 服务
             MongoClient mongoClient = new MongoClient( "10.8.27.5" , 27017 );
             // 连接到数据库
             MongoDatabase mongoDatabase = mongoClient.getDatabase("zhihu");
             System.out.println("Connect to database successfully" + mongoDatabase);
        }catch(Exception e){
            System.err.println( e.getClass().getName() + ": " + e.getMessage());
        }
    }
}




