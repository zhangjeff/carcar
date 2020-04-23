package com.jeff.carcar.controller.pachong;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public  class DBconnect {
    public static Connection getConnect() {

        Connection con = null;
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            con = DriverManager.getConnection("jdbc:mysql://10.206.22.3:3306/reptile?characterEncoding=UTF-8", "root", "root");
            return  con;
//            Statement stmt = con.createStatement();
//            String sql = "INSERT INTO signup_info(username, tel) VALUES ('"+ username +"','"+ tel +"')";
//            stmt.execute(sql);
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    };
}
