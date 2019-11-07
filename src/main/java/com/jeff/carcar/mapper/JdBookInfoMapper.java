package com.jeff.carcar.mapper;

import com.jeff.carcar.entity.JdBookInfo;
import com.jeff.carcar.entity.JdBookInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface JdBookInfoMapper {
    long countByExample(JdBookInfoExample example);

    int deleteByExample(JdBookInfoExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(JdBookInfo record);

    int insertSelective(JdBookInfo record);

    List<JdBookInfo> selectByExample(JdBookInfoExample example);

    JdBookInfo selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") JdBookInfo record, @Param("example") JdBookInfoExample example);

    int updateByExample(@Param("record") JdBookInfo record, @Param("example") JdBookInfoExample example);

    int updateByPrimaryKeySelective(JdBookInfo record);

    int updateByPrimaryKey(JdBookInfo record);
}