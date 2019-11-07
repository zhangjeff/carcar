package com.jeff.carcar.controller.pachong;


import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import sun.net.www.http.HttpClient;

import java.io.IOException;

public class ReptileMainNew {

    public static void main(String[] args) {
        try {
//            Document doc = Jsoup.connect("https://book.jd.com/booktop/0-0-0.html?category=1713-0-0-0-10002-1#comfort").get();
//            String title = doc.title();
//            System.out.println(doc.body());
//            String body =  doc.body().html();
//            String bookname = doc.getElementsByClass("sku-name").html();
//            System.out.println("书名=" + bookname);
//            Elements authorNameEls = doc.getElementsByClass("p-author");
//            Element authorNameE = authorNameEls.get(0);
//            System.out.println("作者=" + authorNameE.getElementsByTag("a").text());
//            Elements bookinfo = doc.getElementsByClass("p-parameter");
//            Element els = bookinfo.get(0);
//            System.out.println("作者=" + authorNameE.getElementsByTag("a").text());

//             Document docPic = Jsoup.connect("https://p.3.cn/prices/mgets?type=1&skuIds=J_12538687&callback=jQuery5057230&_=1572660370747").ignoreContentType(true).
//                 get();
//            System.out.println(docPic);
//            HttpGet httpGet = new HttpGet("https://p.3.cn/prices/mgets?type=1&skuIds=J_12538687&callback=jQuery5057230&_=1572660370747");
//            // 响应模型
//            CloseableHttpResponse response = null;
//            CloseableHttpClient httpClient = HttpClientBuilder.create().build();
//
//            try {
//
//                // 由客户端执行(发送)Get请求
//                response = httpClient.execute(httpGet);
//                // 从响应模型中获取响应实体
//                HttpEntity responseEntity = response.getEntity();
//                System.out.println("响应状态为:" + response.getStatusLine());
//                if (responseEntity != null) {
//                    System.out.println("响应内容长度为:" + responseEntity.getContentLength());
//                    System.out.println("响应内容为:" + EntityUtils.toString(responseEntity));
//                }
//            } catch (ClientProtocolException e) {
//                e.printStackTrace();
//            } catch (ParseException e) {
//                e.printStackTrace();
//            } catch (IOException e) {
//                e.printStackTrace();
//            } finally {
//                try {
//                    // 释放资源
//                    if (httpClient != null) {
//                        httpClient.close();
//                    }
//                    if (response != null) {
//                        response.close();
//                    }
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
    } catch (Exception e) {
        e.printStackTrace();
        }
    }
}
