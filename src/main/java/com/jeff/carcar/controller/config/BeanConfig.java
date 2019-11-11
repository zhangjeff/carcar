package com.jeff.carcar.controller.config;

import com.jeff.carcar.controller.pachong.JdList;
import com.jeff.carcar.controller.pachong.zhihu.ZhihuContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Autowired
    private JdList jdList;

    @Autowired
    private ZhihuContent zhihuContent;

    @Bean
    public void jdData(){
        jdList.productJDBookInfo();
    }

    @Bean
    public void zhihuContentData(){
        zhihuContent.getJsonContent();
    }
}
