package com.jeff.carcar.entity;

import java.util.Date;

public class JdBookInfo {
    /**
     * 
     */
    private Integer id;

    /**
     * 
     */
    private String bookname;

    /**
     * 
     */
    private String authorname;

    /**
     * 
     */
    private String publisher;

    /**
     * 
     */
    private Date seqDay;

    /**
     * 
     */
    private String seqNum;

    /**
     * 创建时间
     */
    private Date createDate;

    /**
     * 
     * @return id 
     */
    public Integer getId() {
        return id;
    }

    /**
     * 
     * @param id 
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 
     * @return bookname 
     */
    public String getBookname() {
        return bookname;
    }

    /**
     * 
     * @param bookname 
     */
    public void setBookname(String bookname) {
        this.bookname = bookname == null ? null : bookname.trim();
    }

    /**
     * 
     * @return authorname 
     */
    public String getAuthorname() {
        return authorname;
    }

    /**
     * 
     * @param authorname 
     */
    public void setAuthorname(String authorname) {
        this.authorname = authorname == null ? null : authorname.trim();
    }

    /**
     * 
     * @return publisher 
     */
    public String getPublisher() {
        return publisher;
    }

    /**
     * 
     * @param publisher 
     */
    public void setPublisher(String publisher) {
        this.publisher = publisher == null ? null : publisher.trim();
    }

    /**
     * 
     * @return seq_day 
     */
    public Date getSeqDay() {
        return seqDay;
    }

    /**
     * 
     * @param seqDay 
     */
    public void setSeqDay(Date seqDay) {
        this.seqDay = seqDay;
    }

    /**
     * 
     * @return seq_num 
     */
    public String getSeqNum() {
        return seqNum;
    }

    /**
     * 
     * @param seqNum 
     */
    public void setSeqNum(String seqNum) {
        this.seqNum = seqNum == null ? null : seqNum.trim();
    }

    /**
     * 创建时间
     * @return create_date 创建时间
     */
    public Date getCreateDate() {
        return createDate;
    }

    /**
     * 创建时间
     * @param createDate 创建时间
     */
    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}