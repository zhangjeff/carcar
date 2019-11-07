package com.jeff.carcar;

import com.jeff.carcar.controller.pachong.JdList;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.jeff.carcar")
public class CarcarApplication {
    public static void main(String[] args) {
        SpringApplication.run(CarcarApplication.class, args);
    }
}
