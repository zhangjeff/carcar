package com.jeff.carcar.controller.pachong.redstar;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jeff.carcar.controller.pachong.DBconnect;
import com.jeff.carcar.controller.pachong.MongoDBConnect;
import com.mongodb.client.MongoCollection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.*;


@Controller
public class ChinappContent {
    private static  int count = 0;
    private static final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat datef = new SimpleDateFormat("yyyy-MM-dd");


    public static void main(String[] args) {
        ChinappContent content = new ChinappContent();
        content.getChinaAppContent();
    }

    //    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
//  `brand` varchar(500) DEFAULT NULL COMMENT '品牌',
//            `company` varchar(500) DEFAULT NULL COMMENT 'company',
//            `boss` varchar(500) DEFAULT NULL COMMENT 'boss',
//            `tel` varchar(500) DEFAULT NULL,
//  `from` varchar(500) DEFAULT NULL COMMENT '发源地',
//            `crate_date` varchar(500) DEFAULT NULL COMMENT '创建时间',
//            `main_brand` varchar(500) DEFAULT NULL COMMENT '主营品牌',
//            `url` varchar(500) DEFAULT NULL COMMENT 'url',
    public void insertData(List<DataBean> dataBeanList) {

        StringBuilder sql = new StringBuilder("insert into china_app(brand, company, boss,tel,from_area,create_date,main_brand, url)" +
                " values");
        for (DataBean dataBean : dataBeanList) {
            sql.append( "(" + "'" + dataBean.getBrand() + "','" + dataBean.company + "','")
                    .append(dataBean.getBoss() + "','" + dataBean.getTel() + "','")
                    .append(dataBean.getFromArea() + "','" + dataBean.getCreateDate() + "','" + dataBean.getMainBrand() + "','" + dataBean.getUrl() + "'),");
        }

        sql.deleteCharAt(sql.length()-1);
        System.out.println(sql.toString());
        dbDeal(sql.toString());
    }

    public void dbDeal(String sql) {
        Connection con = DBconnect.getConnect();
        try {
            Statement stmt = con.createStatement();
//            String sql = "select * from kuaishou_live_info";
            stmt.execute(sql);
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {

        }
//            String sql = "INSERT INTO signup_info(username, tel) VALUES ('"+ username +"','"+ tel +"')";
//            stmt.execute(sql);

    }

    public void getChinaAppContent() {
        Document doc = null;
        try {
            for (int i = 1; i < 961; i++) {
                String urlAll = "https://www.chinapp.com/pinpai/zhuangxiujiancai-0-0-" + i;
                doc = Jsoup.connect(urlAll).get();
                String title = doc.title();
                Element body = doc.body();
                Elements listitems = body.getElementsByClass("pplb_items_lists").first().getElementsByClass("pplb_item_tit");
                boolean flag = true;
                List<DataBean> dataBeanList = new ArrayList<>();
                for (Element element : listitems) {
                    if (flag) {
                        String href = element.getElementsByTag("a").attr("href");
//                    System.out.println(href);
                        String url = "https://www.chinapp.com" + href;
//                    System.out.println(url);
                        DataBean dataBean = getCoreContent(url);
                        dataBeanList.add(dataBean);
                    }
                    flag = true;
                }
                insertData(dataBeanList);
            }

//            for (Element e : items) {
//                String SpecialListCardbanner = e.getElementsByClass("SpecialListCard-banner").first().getElementsByTag("img").attr("src");
//            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public DataBean getCoreContent(String url) {
        Document doc = null;
        try {
            doc = Jsoup.connect(url).get();
            String title = doc.title();
            Element body = doc.body();
            Element listitem = body.getElementsByClass("pjct_xm_intro").first();
//            System.out.println(listitem);
            //公司名称
            String brand = listitem.getElementsByClass("pjct_xm_tit").first().tagName("p").text();
            String companyName = listitem.getElementsByClass("company").text();
            Elements lilist = listitem.getElementsByClass("newAdd_pjct_xm_intro").first().getElementsByTag("li");
            String boss = lilist.eq(0).text();
            String tel = lilist.eq(1).text();
            String fromArea = lilist.eq(2).text();
            String createYear = lilist.eq(3).text();
            String mainBrand = "";
            try{
                mainBrand = listitem.getElementsByClass("zypro").first().getElementsByTag("span").text();
            }catch (Exception e) {

            }
//            System.out.println("brand-----------" + brand);
//            System.out.println("companyName-----------" + companyName);
//            System.out.println("boss-----------" + boss);
//            System.out.println("tel-----------" + tel);
//            System.out.println("fromArea-----------" + fromArea);
//            System.out.println("createYear-----------" + createYear);
//            System.out.println("url-----------" + url);
//            System.out.println("mainBrand-----------" + mainBrand);
//            System.out.println(lilist);

            DataBean dataBean = new DataBean();
            dataBean.setBrand(brand);
            dataBean.setCompany(companyName);
            dataBean.setBoss(boss);
            dataBean.setTel(tel);
            dataBean.setFromArea(fromArea);
            dataBean.setCreateDate(createYear);
            dataBean.setUrl(url);
            dataBean.setMainBrand(mainBrand);
            return dataBean;


//            insertData(brand, companyName, boss, tel, fromArea, createYear, mainBrand, url);
//            Elements listitems =  body.getElementsByClass("pplb_items_lists").first().getElementsByClass("pplb_item_tit");


        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;

    }
}
