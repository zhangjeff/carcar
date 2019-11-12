package com.jeff.carcar.controller.pachong.zhihu;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/zhihu")
public class ZhihuContentController {

    @RequestMapping("/zhihuContent")
    public String getzhihuContent(){
        return "hello";
    }
}
