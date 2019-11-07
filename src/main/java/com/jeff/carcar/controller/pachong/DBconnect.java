package com.jeff.carcar.controller.pachong;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public  class DBconnect {
    public static Connection getConnect() {

        Connection con = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
            con = DriverManager.getConnection("jdbc:mysql://45.117.101.64:3306/db_draw", "wwy", "wwy123");
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
