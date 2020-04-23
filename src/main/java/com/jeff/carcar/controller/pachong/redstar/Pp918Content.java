package com.jeff.carcar.controller.pachong.redstar;

import com.jeff.carcar.controller.pachong.DBconnect;
import org.apache.commons.lang3.RandomUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;


@Controller
public class Pp918Content {
    private static int count = 0;
    private static final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat datef = new SimpleDateFormat("yyyy-MM-dd");

    private static String[] ua = {"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36 OPR/37.0.2178.32",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586",
            "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
            "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)",
            "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)",
            "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0)",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 BIDUBrowser/8.3 Safari/537.36",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36 Core/1.47.277.400 QQBrowser/9.4.7658.400",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 UBrowser/5.6.12150.8 Safari/537.36",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36 SE 2.X MetaSr 1.0",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36 TheWorld 7",
            "Mozilla/5.0 (Windows NT 6.1; W…) Gecko/20100101 Firefox/60.0",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36 Edg/80.0.361.111"};

    public static void main(String[] args) {
        long startTime = System.currentTimeMillis();
        Pp918Content content = new Pp918Content();
        content.getChinaAppContent();
        long endTime = System.currentTimeMillis();

        System.out.println((endTime - startTime) / 1000);
    }
//map.put("45.117.101.64", 9000);

    //  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
//  `brandName` varchar(500) DEFAULT NULL COMMENT '品牌',
//            `companyName` varchar(500) DEFAULT NULL COMMENT 'company',
//            `boss` varchar(500) DEFAULT NULL COMMENT 'boss',
//            `fromArea` varchar(500) DEFAULT NULL COMMENT '发源地',
//            `levelName` varchar(500) DEFAULT NULL COMMENT '级别',
//            `priceRange` varchar(500) DEFAULT NULL COMMENT '价格区间',
//            `tel` varchar(500) DEFAULT NULL,
//  `shopName` varchar(500) DEFAULT NULL COMMENT '店铺名称',
//            `adv` varchar(500) DEFAULT NULL COMMENT '广告',
    public void insertData(List<Pp918DataBean> dataBeanList) {
        StringBuilder sql = new StringBuilder("insert into pp918(brandName, companyName, boss,fromArea,levelName,priceRange,tel, shopName,adv)" +
                " values");
        for (Pp918DataBean dataBean : dataBeanList) {
            sql.append("(" + "'" + dataBean.getBrandName() + "','" + dataBean.getCompanyName() + "','")
                    .append(dataBean.getBoss() + "','" + dataBean.getFromArea() + "','")
                    .append(dataBean.getLevelName() + "','" + dataBean.getPriceRange() + "','" + dataBean.getTel() + "','" + dataBean.getShopName() + "','" + dataBean.getAdv() + "'),");
        }

        sql.deleteCharAt(sql.length() - 1);
        System.out.println(sql.toString());
        dbDeal(sql.toString());
    }

    public void dbDeal(String sql) {
        Connection con = DBconnect.getConnect();
        try {
            Statement stmt = con.createStatement();
//            String sql = "select * from kuaishou_live_info";
            stmt.execute(sql);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("33333333333333");
        } finally {
            try{
                con.close();
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
//            String sql = "INSERT INTO signup_info(username, tel) VALUES ('"+ username +"','"+ tel +"')";
//            stmt.execute(sql);

    }

    public void getChinaAppContent() {
        try {
            ExecutorService exec = new ThreadPoolExecutor(1, 1,
                    0L, TimeUnit.MILLISECONDS,
                    new LinkedBlockingQueue<Runnable>());


//            Thread thread = new Thread(new Runnable() {
//                @Override
//                public void run() {
//                    dealSubContent(0, 20);
//                }
//            });
            dealSubContent(1, 341);
//            for (int i = 1; i < 341; i = i + 5) {
//
//                System.out.println("start=" + i + "--- end=" + (i+5));
//                Future<Integer> task = exec.submit(dealSubContent(i, i + 5));
//            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void dealSubContent(int from, int to) {

        for (int i = 1; i <= 337; i++) {
            try {
                Document doc = null;

                String urlAll = "https://www.pp918.com/brandlist_1_" + i + ".html";
//                map.put("45.117.101.64", 9000);
                doc = Jsoup.connect(urlAll).ignoreContentType(true).proxy("45.117.101.64", 9000).userAgent(ua[RandomUtils.nextInt(1, ua.length)]).get();

//                doc = Jsoup.connect(urlAll).get();
                String title = doc.title();
                Element body = doc.body();
                Elements listitems = body.getElementsByClass("brand-list animate-sm").first().getElementsByClass("bdlis-cont");
//            System.out.println(listitems);
                boolean flag = true;
                List<Pp918DataBean> dataBeanList = new ArrayList<>();
                for (Element element : listitems) {
                    if (flag) {
                        String href = element.getElementsByTag("a").attr("href");
                        System.out.println(href);
                        String url = "https://www.pp918.com" + href;
//                        System.out.println(url);
                        Pp918DataBean dataBean = getCoreContent(url);
                        Thread.sleep(500);
                        if (dataBean.getBrandName() != null && dataBean.getBrandName() != "") {
                            dataBeanList.add(dataBean);
                        }
                    }
                    flag = true;
                }

                insertData(dataBeanList);
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("22222222222");
            }
        }


//        return true;
    }
//        Callable<Boolean> callable = new Callable() {
//            @Override
//            public Boolean call() throws Exception {
//                for (int i = from; i < to; i++) {
//                    Document doc = null;
//                    String urlAll = "https://www.pp918.com/brandlist_1_" + 1 + ".html";
//                    doc = Jsoup.connect(urlAll).get();
//                    String title = doc.title();
//                    Element body = doc.body();
//                    Elements listitems = body.getElementsByClass("brand-list animate-sm").first().getElementsByClass("bdlis-cont");
////            System.out.println(listitems);
//                    boolean flag = true;
//                    List<Pp918DataBean> dataBeanList = new ArrayList<>();
//                    for (Element element : listitems) {
//                        if (flag) {
//                            String href = element.getElementsByTag("a").attr("href");
//                            System.out.println(href);
//                            String url = "https://www.pp918.com" + href;
////                    System.out.println(url);
//                            Pp918DataBean dataBean = getCoreContent(url);
//                            dataBeanList.add(dataBean);
//                        }
//                        flag = false;
//                    }
//                    insertData(dataBeanList);
//                }
//                return true;
//            }
//        };


//        return callable;
//    }

    public Pp918DataBean getCoreContent(String url) {
        Document doc = null;
        try {
            doc = Jsoup.connect(url).get();
            String title = doc.title();
            Element body = doc.body();
            Element listitem = body.getElementsByClass("bdmain-rt list-right report")
                    .first().getElementsByClass("brand-info").first()
                    .tagName("ul");
//            System.out.println(listitem);
            //公司名称
//            System.out.println(listitem);
            Element newele = listitem.getElementsByClass("info-col").first();
            String brandName = newele.tagName("span").text();
            newele = newele.nextElementSibling();
            String companyName = newele.text();
            newele = newele.nextElementSibling();
            String boss = newele.text();
            newele = newele.nextElementSibling();
            String fromArea = newele.text();
            newele = newele.nextElementSibling();
            String levelName = newele.text();
            newele = newele.nextElementSibling();
            String priceRange = newele.text();
            newele = newele.nextElementSibling();
            String network = newele.text();
            newele = newele.nextElementSibling();
            String tel = newele.text();
            newele = newele.nextElementSibling();
            String shopName = newele.text();
            newele = newele.nextElementSibling();
            String adv = newele.text();
//            System.out.println("brandName-----------" + brandName);
//            System.out.println("companyName-----------" + companyName);
//            System.out.println("boss-----------" + boss);
//            System.out.println("fromArea-----------" + fromArea);
//            System.out.println("levelName-----------" + levelName);
//            System.out.println("priceRange-----------" + priceRange);
//            System.out.println("network-----------" + network);
//            System.out.println("tel-----------" + tel);
//            System.out.println("shopName-----------" + shopName);
//            System.out.println("adv-----------" + adv);


            Pp918DataBean dataBean = new Pp918DataBean();
            dataBean.setBrandName(brandName);
            dataBean.setCompanyName(companyName);
            dataBean.setBoss(boss);
            dataBean.setFromArea(fromArea);
            dataBean.setLevelName(levelName);
            dataBean.setPriceRange(priceRange);
            dataBean.setNetwork(network);
            dataBean.setTel(tel);
            dataBean.setShopName(shopName);
            dataBean.setAdv(adv);
            return dataBean;
//            insertData(brand, companyName, boss, tel, fromArea, createYear, mainBrand, url);
//            Elements listitems =  body.getElementsByClass("pplb_items_lists").first().getElementsByClass("pplb_item_tit");


        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;

    }
}
