package com.jeff.carcar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DrawController {
    private  DrawService drawService = new DrawService();

    @ResponseBody
    @PostMapping("/signup")
    public Boolean addSignUpInfo(@RequestBody UserInfo userInfo){
        return drawService.addSignUpinfo(userInfo.getUsername(),userInfo.getTel());
    };
}
