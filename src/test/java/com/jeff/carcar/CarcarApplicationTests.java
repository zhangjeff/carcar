package com.jeff.carcar;

import com.jeff.carcar.entity.JdBookInfo;
import com.jeff.carcar.service.JdBookInfoService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class CarcarApplicationTests {
    @Autowired
    JdBookInfoService jdBookInfoService;


    @Test
    public void contextLoads() {
        JdBookInfo jdBookInfo = new JdBookInfo();
        jdBookInfo.setBookname("111111");
        jdBookInfo.setPublisher("22222222");
        jdBookInfo.setAuthorname("33333333333");
        jdBookInfo.setSeqNum("4444444444");
        jdBookInfo.setSeqDay(new Date());
        jdBookInfo.setCreateDate(new Date());
        jdBookInfoService.insertJdBookInfo(jdBookInfo);
    }

}
