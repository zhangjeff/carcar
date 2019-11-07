package com.jeff.carcar.service;

import com.jeff.carcar.entity.JdBookInfo;
import com.jeff.carcar.mapper.JdBookInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JdBookInfoService {

    @Autowired
    private JdBookInfoMapper jdBookInfoMapper;

    public void insertJdBookInfo(JdBookInfo jdBookInfo) {
        jdBookInfoMapper.insert(jdBookInfo);
    }
}
