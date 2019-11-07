package com.jeff.carcar.controller.pachong;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Timer;
import java.util.TimerTask;

public class JdList {

    public static void main(String[] args) {
        productJDBookInfo();
    }

    public static void productJDBookInfo() {
        TimerTask timertask = new TimerTask() {
            @Override
            public void run() {
                for (int i = 1; i< 6; i++) {
                    String url = "https://book.jd.com/booktop/0-0-0.html?category=1713-0-0-0-10002-"+i+"#comfort";
                    produceData(url);
                }
            }
        };

        Timer timer = new Timer();
        long delay = 0;
        long iintevalPeriod = 1*1000*60*60*24;
        timer.scheduleAtFixedRate(timertask,delay,iintevalPeriod);
//        produceData("https://book.jd.com/booktop/0-0-0.html?category=1713-0-0-0-10002-2#comfort");
    }
    private static void produceData(String url){
        try {
            Document doc = Jsoup.connect(url).get();
            String title = doc.title();
            Element body = doc.getElementsByClass("m-list").get(0);
            Elements mlist = body.getElementsByTag("li");
            for (Element e : mlist) {
                System.out.println("-----------------begin-----------------------");
                String  bookname = e.getElementsByClass("p-name").first().html();
                System.out.println("bookname = " + bookname);
                String seqNum = e.getElementsByClass("p-num").first().html();
                System.out.println("seqNum = " + seqNum);
                String authorname = e.getElementsByClass("p-detail").first().getElementsByTag("dl").first().getElementsByTag("dd").first().getElementsByTag("a").first().html();
                System.out.println("authorname = " + authorname);
                String publisher = e.getElementsByClass("p-detail").first().getElementsByTag("dl").get(1).getElementsByTag("dd").first().getElementsByTag("a").first().html();
                System.out.println("publisher = " + publisher);
                insertIntoDB(bookname, authorname, publisher, seqNum);
                System.out.println("-----------------end-----------------------");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static  void insertIntoDB(String bookname, String authorname, String publisher, String seqNum) {
        Connection con = DBconnect.getConnect();
        Statement stmt = null;
        try {
            stmt = con.createStatement();
            String sql = "insert into jd_book_info(bookname, authorname, publisher, seq_num) value ('"+ bookname+"','"+ authorname +"','"+ publisher +"','"+ seqNum +"')";
            stmt.execute(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }
}
