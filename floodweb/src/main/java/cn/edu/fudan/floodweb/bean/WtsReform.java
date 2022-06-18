package cn.edu.fudan.floodweb.bean;

import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.Table;

/**
 * 灾害事件发生信息
 * @author maofeng
 *
 */

@Table("t_wts_reform")
public class WtsReform {
    @Column("wts_id")
    private int id;
    @Column("reform_time_y")
    private int year;
    @Column("reform_time_m")
    private int month;
    @Column("remark")
    private int remark;
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getYear() {
        return year;
    }
    public void setYear(int year) {
        this.year = year;
    }
    public int getMonth() {
        return month;
    }
    public void setMonth(int month) {
        this.month = month;
    }
    public int getRemark() {
        return remark;
    }
    public void setRemark(int remark) {
        this.remark = remark;
    }
}
