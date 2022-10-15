package cn.edu.fudan.floodweb.bean;

import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.Id;
import org.nutz.dao.entity.annotation.Table;

@Table("inunriver")
public class InunRiver {
    @Id
    @Column("org_fid")
    private int org_fid;
    @Column
    private String no;
    @Column("oid_")
    private int oid;
    @Column
    public Double depth_2;
    @Column
    public Double depth_5;
    @Column
    public Double depth_10;
    @Column
    public Double depth_25;
    @Column
    public Double depth_50;
    @Column
    public Double depth_100;
    @Column
    public Double depth_250;
    @Column
    public Double depth_500;
    @Column
    public Double depth_1000;
    @Column
    private Double lng_c;
    @Column
    private Double lat_c;

    public int getOrg_fid() {
        return org_fid;
    }

    public void setOrg_fid(int org_fid) {
        this.org_fid = org_fid;
    }

    public String getNo() {
        return no;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public int getOid() {
        return oid;
    }

    public void setOid(int oid) {
        this.oid = oid;
    }

    public Double getLng_c() {
        return lng_c;
    }

    public void setLng_c(Double lng_c) {
        this.lng_c = lng_c;
    }

    public Double getLat_c() {
        return lat_c;
    }

    public void setLat_c(Double lat_c) {
        this.lat_c = lat_c;
    }
}
