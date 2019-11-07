package com.jeff.carcar.controller.pachong;

import java.math.BigDecimal;

public class JDprice {

    private BigDecimal cbf;

    private BigDecimal id;

    private BigDecimal m;

    private BigDecimal op;

    private BigDecimal p;

    public BigDecimal getCbf() {
        return cbf;
    }



    public void setCbf(BigDecimal cbf) {
        this.cbf = cbf;
    }

    public BigDecimal getId() {
        return id;
    }

    public void setId(BigDecimal id) {
        this.id = id;
    }

    public BigDecimal getM() {
        return m;
    }

    public void setM(BigDecimal m) {
        this.m = m;
    }

    public BigDecimal getOp() {
        return op;
    }

    public void setOp(BigDecimal op) {
        this.op = op;
    }

    public BigDecimal getP() {
        return p;
    }

    public void setP(BigDecimal p) {
        this.p = p;
    }

    @Override
    public String toString() {
        return "JDprice{" +
                "cbf=" + cbf +
                ", id=" + id +
                ", m=" + m +
                ", op=" + op +
                ", p=" + p +
                '}';
    }
}
