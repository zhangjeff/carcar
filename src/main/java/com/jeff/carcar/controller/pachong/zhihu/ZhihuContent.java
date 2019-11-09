package com.jeff.carcar.controller.pachong.zhihu;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ZhihuContent {

    public static void main(String[] args) {
        ZhihuContent zhihuContent = new ZhihuContent();
        zhihuContent.getJsonContent();
    }


    public void getContent(){
        Document doc = null;
        try {
            doc = Jsoup.connect("https://www.zhihu.com/special/all").get();
            String title = doc.title();
            Element body = doc.body();
//            System.out.println("--------------title-----------------"+title);
//            System.out.println("--------------body-----------------");

            Elements items =  body.getElementsByClass("SpecialListPage-specialCard");
            for (Element e : items) {
                String SpecialListCardbanner = e.getElementsByClass("SpecialListCard-banner").first().getElementsByTag("img").attr("src");
                System.out.println("SpecialListCardbanner=" + SpecialListCardbanner);
            }

//            System.out.println(items.html());
//            System.out.println(body.html());

        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public void getJsonContent(){
        int timeout = 3000;
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(timeout);// 设置超时
        requestFactory.setReadTimeout(timeout);
        RestTemplate restTemplate = new RestTemplate(requestFactory);
//            restTemplate.getMessageConverters().add(new WxMappingJackson2HttpMessageConverter());

        Map param = new HashMap<>();
        String url = "https://www.zhihu.com/api/v4/news_specials/list?limit=10&offset=1";

        Boolean is_end = false;
        do {
            ResponseEntity<String> loginResponseEntity = restTemplate.getForEntity(url, String.class);
            System.out.println("-------------------------------------");
            JSONObject jsonObject = JSON.parseObject(loginResponseEntity.getBody());
            JSONObject paging = jsonObject.getJSONObject("paging");
            is_end  = paging.getBoolean("is_end");
            url = paging.getString("next").replace("http","https");
            System.out.println("---next------" + url);

            JSONArray data = jsonObject.getJSONArray("data");
            System.out.println(data);
            for (int i = 0; i < data.size(); i++) {
                JSONObject item = data.getJSONObject(i);
                String banner = item.getString("banner");
                System.out.println("----------------banner---------------------" + banner);
                String view_count = item.getString("view_count");
                System.out.println("----------------view_count---------------------" + view_count);
                String followers_count = item.getString("followers_count");
                System.out.println("----------------followers_count---------------------" + followers_count);
                String is_following = item.getString("is_following");
                System.out.println("----------------is_following---------------------" + is_following);
                String title = item.getString("title");
                System.out.println("----------------title---------------------" + title);
                String introduction = item.getString("introduction");
                System.out.println("----------------introduction---------------------" + introduction);
                String updated = item.getString("updated");
                System.out.println("----------------updated---------------------" + updated);
                String id = item.getString("id");
                System.out.println("----------------id---------------------" + id);
                JSONArray section_list = item.getJSONArray("section_list");
                for (int j = 0; j < section_list.size(); j++) {
                    JSONObject subItem = section_list.getJSONObject(j);
                    String section_id = subItem.getString("section_id");
                    System.out.println("----------------section_id---------------------" + section_id);
                    String section_title = subItem.getString("section_title");
                    System.out.println("----------------section_title---------------------" + section_title);
                }



            }
        } while(!is_end);

        System.out.println("---------------end----------------------");

    }
}
