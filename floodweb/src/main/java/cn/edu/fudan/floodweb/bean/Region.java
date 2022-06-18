package cn.edu.fudan.floodweb.bean;

import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.Id;
import org.nutz.dao.entity.annotation.Table;

@Table("t_region")
public class Region {
    @Id
    @Column("region_id")
    private int regionID;
    @Column("region_name")
    private String regionName;
    public int getRegionID() {
        return regionID;
    }
    public void setRegionID(int regionID) {
        this.regionID = regionID;
    }
    public String getRegionName() {
        return regionName;
    }
    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }
}
