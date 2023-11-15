package cn.edu.fudan.floodweb.bean;

import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.Id;
import org.nutz.dao.entity.annotation.Table;

@Table("dd_rain_flood")
public class RainFlood {
    @Id
    @Column("dd_id")
    private int id;
    //precip 降水
    @Column
    private Double precip_min;
    @Column
    private Double precip_max;
    @Column
    private String returnperiod;
    @Column
    private String layername;//图层名??
    @Column
    private String fieldname;//字段名??

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Double getPrecip_min() {
        return precip_min;
    }

    public void setPrecip_min(Double precip_min) {
        this.precip_min = precip_min;
    }

    public Double getPrecip_max() {
        return precip_max;
    }

    public void setPrecip_max(Double precip_max) {
        this.precip_max = precip_max;
    }

    public String getReturnperiod() {
        return returnperiod;
    }

    public void setReturnperiod(String returnperiod) {
        this.returnperiod = returnperiod;
    }

    public String getLayername() {
        return layername;
    }

    public void setLayername(String layername) {
        this.layername = layername;
    }
    public String getFieldname() {
        return fieldname;
    }

    public void setFieldname(String fieldname) {
        this.fieldname = fieldname;
    }

}
