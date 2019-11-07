package com.jeff.carcar;

import com.jeff.carcar.controller.pachong.JdList;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CarcarApplication {

    public static void main(String[] args) {
        JdList.productJDBookInfo();
        SpringApplication.run(CarcarApplication.class, args);
    }

}
