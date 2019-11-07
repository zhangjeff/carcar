package com.jeff.carcar.controller.pachong;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

public class ReptileMain {

    public static void main(String[] args) {
        try {
            Document doc = Jsoup.connect("https://item.jd.com/12508279.html").get();
            String title = doc.title();
            System.out.println(title);
            String body =  doc.body().html();
            String bookname = doc.getElementsByClass("sku-name").html();
            System.out.println("书名=" + bookname);
            Elements authorNameEls = doc.getElementsByClass("p-author");
            Element authorNameE = authorNameEls.get(0);
            System.out.println("作者=" + authorNameE.getElementsByTag("a").text());
            Elements bookinfo = doc.getElementsByClass("p-parameter");
            Element els = bookinfo.get(0);
            System.out.println("作者=" + authorNameE.getElementsByTag("a").text());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
