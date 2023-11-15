package cn.edu.fudan.floodweb.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Date;

@Table("t_precipitation")
@PK({"time","lon","lat"})
public class Precipitation {

    @Column("p_id")
    private int id;

    @Column("p_time")
    private Date time;

    @Column("lon")
    private double lon;

    @Column("lat")
    private double lat;
    @Column("precip")
    private double precip;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
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

    public double getPrecip() {
        return precip;
    }

    public void setPrecip(double precip) {
        this.precip = precip;
    }
}

