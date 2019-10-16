package com.jeff.carcar.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DrawService {

    public boolean addSignUpinfo(String username, String tel) {

        Connection con = null;
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            con = DriverManager.getConnection("jdbc:mysql://45.117.101.64:3306/db_draw", "wwy", "wwy123");
            Statement stmt = con.createStatement();
            String sql = "INSERT INTO signup_info(username, tel) VALUES ('"+ username +"','"+ tel +"')";
            stmt.execute(sql);
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return true;
    };

    public static void main(String[] args) {
        DrawService drawService = new DrawService();
        drawService.addSignUpinfo("张三","1376126598");
    }
}



//    Connection con = null; //定义一个MYSQL链接对象
//            Class.forName("com.mysql.jdbc.Driver").newInstance(); //MYSQL驱动
//                    con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/test", "root", "root"); //链接本地MYSQL
//
//                    Statement stmt; //创建声明
//                    stmt = con.createStatement();
//
//                    //新增一条数据
//                    stmt.executeUpdate("INSERT INTO user (username, password) VALUES ('init', '123456')");
//                    ResultSet res = stmt.executeQuery("select LAST_INSERT_ID()");
//                    int ret_id;
//                    if (res.next()) {
//                    ret_id = res.getInt(1);
//                    System.out.print(ret_id);
//                    }
//
//                    //删除一条数据
//                    String sql = "DELETE FROM user WHERE id = 1";
//                    long deleteRes = stmt.executeUpdate(sql); //如果为0则没有进行删除操作，如果大于0，则记录删除的条数
//                    System.out.print("DELETE:" + deleteRes);
//
//                    //更新一条数据
//                    String updateSql = "UPDATE user SET username = 'xxxx' WHERE id = 2";
//                    long updateRes = stmt.executeUpdate(updateSql);
//                    System.out.print("UPDATE:" + updateRes);
//
//                    //查询数据并输出
//                    String selectSql = "SELECT * FROM user";
//                    ResultSet selectRes = stmt.executeQuery(selectSql);
//                    while (selectRes.next()) { //循环输出结果集
//                    String username = selectRes.getString("username");
//                    String password = selectRes.getString("password");
//                    System.out.print("\r\n\r\n");
//                    System.out.print("username:" + username + "password:" + password);
//                    }
