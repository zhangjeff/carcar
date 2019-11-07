package com.jeff.carcar.controller.pachong;

import com.jeff.carcar.entity.JdBookInfo;
import com.jeff.carcar.mapper.JdBookInfoMapper;
import com.jeff.carcar.service.JdBookInfoService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

@Controller
public class JdList {

    @Autowired
    JdBookInfoService jdBookInfoService;

    public  void productJDBookInfo() {
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
    }
    private  void produceData(String url){
        try {
            Document doc = Jsoup.connect(url).get();
            String title = doc.title();
            Element body = doc.getElementsByClass("m-list").get(0);
            Elements mlist = body.getElementsByTag("li");
            for (Element e : mlist) {
                JdBookInfo jdBookInfo = new JdBookInfo();
                System.out.println("-----------------begin-----------------------");
                String  bookname = e.getElementsByClass("p-name").first().html();
                System.out.println("bookname = " + bookname);
                String seqNum = e.getElementsByClass("p-num").first().html();
                System.out.println("seqNum = " + seqNum);
                String authorname = e.getElementsByClass("p-detail").first().getElementsByTag("dl").first().getElementsByTag("dd").first().getElementsByTag("a").first().html();
                System.out.println("authorname = " + authorname);
                String publisher = e.getElementsByClass("p-detail").first().getElementsByTag("dl").get(1).getElementsByTag("dd").first().getElementsByTag("a").first().html();
                System.out.println("publisher = " + publisher);

                jdBookInfo.setBookname(bookname);
                jdBookInfo.setAuthorname(authorname);
                jdBookInfo.setPublisher(publisher);
                jdBookInfo.setSeqDay(new Date());
                jdBookInfo.setSeqNum(seqNum);
                jdBookInfo.setCreateDate(new Date());
                insertIntoDB(jdBookInfo);
                System.out.println("-----------------end-----------------------");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private  void insertIntoDB(JdBookInfo jdBookInfo) {
//        Connection con = DBconnect.getConnect();
//        Statement stmt = null;
//        try {
//            stmt = con.createStatement();
//            String sql = "insert into jd_book_info(bookname, authorname, publisher, seq_num) value ('"+ bookname+"','"+ authorname +"','"+ publisher +"','"+ seqNum +"')";
//            stmt.execute(sql);
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
        jdBookInfoService.insertJdBookInfo(jdBookInfo);
    }
}
