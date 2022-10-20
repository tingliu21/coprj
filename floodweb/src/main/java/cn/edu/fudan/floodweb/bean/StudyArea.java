package cn.edu.fudan.floodweb.bean;

import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.Name;
import org.nutz.dao.entity.annotation.Table;

@Table("dd_studyarea")
public class StudyArea {
    @Name
    @Column("gridno")
    private String girdno;
    @Column("lon")
    private double lon;
    @Column("lat")
    private double lat;
    @Column("locid")
    private int locid;

    public String getGirdno() {
        return girdno;
    }

    public void setGirdno(String girdno) {
        this.girdno = girdno;
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

    public int getLocid() {
        return locid;
    }

    public void setLocid(int locid) {
        this.locid = locid;
    }
}
