package cn.edu.fudan.floodweb.bean;

import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.Id;
import org.nutz.dao.entity.annotation.Table;

/**
 * 灾害事件信息
 * @author maofeng
 *
 */

@Table("t_wts")
public class Wts {
    @Id
    @Column("wts_id")
    private int id;
    @Column("wts_region")
    private String region;
    @Column("wts_addr")
    private String addr;
    @Column("wts_name")
    private String name;
    @Column("start_time_y")
    private int startTimeYear;
    @Column("start_time_m")
    private int startTimeMonth;
    @Column("lon")
    private double lon;
    @Column("lat")
    private double lat;
    @Column("daily_capacity")
    private double dailyCapacity;
    @Column("treatment")
    private String treatment;
    @Column("reform")
    private String reform;
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getRegion() {
        return region;
    }
    public void setRegion(String region) {
        this.region = region;
    }
    public String getAddr() {
        return addr;
    }
    public void setAddr(String addr) {
        this.addr = addr;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getStartTimeYear() {
        return startTimeYear;
    }
    public void setStartTimeYear(int startTimeYear) {
        this.startTimeYear = startTimeYear;
    }
    public int getStartTimeMonth() {
        return startTimeMonth;
    }
    public void setStartTimeMonth(int startTimeMonth) {
        this.startTimeMonth = startTimeMonth;
    }
    public double getLon() {
        return lon;
    }
    public void setLon(double lon) {
        this.lon = lon;
    }
    public double getLat() {
        return lat;
    }
    public void setLat(double lat) {
        this.lat = lat;
    }
    public double getDailyCapacity() {
        return dailyCapacity;
    }
    public void setDailyCapacity(double dailyCapacity) {
        this.dailyCapacity = dailyCapacity;
    }
    public String getTreatment() {
        return treatment;
    }
    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }
    public String getReform() {
        return reform;
    }
    public void setReform(String reform) {
        this.reform = reform;
    }
}