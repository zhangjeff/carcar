package com.jeff.carcar.controller.config;

import com.jeff.carcar.controller.pachong.JdList;
import com.jeff.carcar.controller.pachong.zhihu.ZhihuContent;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;

@Configuration
public class BeanConfig implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private JdList jdList;

    @Autowired
    private ZhihuContent zhihuContent;

//    @Bean
//    public Boolean jdData(){
//        System.out.println("222222222222222222222222222222222222222222222222222222222");
//        return true;
////        jdList.productJDBookInfo();
//    }



//    @Override
//    public void onApplicationEvent(ApplicationEvent applicationEvent) {
//
//        System.out.println("222222222222222222222222222222222222222222222222222222222");
//    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        //root application context 没有parent，他就是老大.
        if(event.getApplicationContext().getParent() == null){
            System.out.println("--------------------begin--------------");
            jdList.productJDBookInfo();
            System.out.println("--------------------end productJDBookInfo --------------");

            zhihuContent.getJsonContent();
            System.out.println("--------------------end getJsonContent --------------");

            //需要执行的逻辑代码，当spring容器初始化完成后就会执行该方法。
//            System.out.println("222222222222222222222222222222222222222222222222222222222");
        }
    }

//    @Bean
//    public void zhihuContentData(){
//        System.out.println("3333333333333333333333333333333333333333333333333333333333");
//
////        zhihuContent.getJsonContent();
//    }
}
