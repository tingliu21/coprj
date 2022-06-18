package cn.edu.fudan.floodweb.bean;

import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.Name;
import org.nutz.dao.entity.annotation.Table;

/**
 * 人口
 * @author maofeng
 *
 */
@Table("t_ent")
public class Ent {
    @Name
    @Column("ent_credit_code")
    private String creditCode;
    @Column("ent_name")
    private String name;
    @Column("province")
    private String province;
    @Column("city")
    private String city;
    @Column("county")
    private String county;
    @Column("street")
    private String street;
    @Column("ad_code")
    private String adCode;
    @Column("address")
    private String address;
    @Column("industry_level1_code")
    private String industryLevel1Code;
    @Column("industry_level1")
    private String industryLevel1;
    @Column("industry_level2_code")
    private String industryLevel2Code;
    @Column("industry_level2")
    private String industryLevel2;
    @Column("is_in_env")
    private Boolean inEnv;
    @Column("legal_repre")
    private String legalRepre;
    @Column("procedure")
    private String procedure;
    @Column("is_medical")
    private Boolean medical;
    @Column("is_papermaking")
    private Boolean papermaking;
    @Column("is_syn_leather")
    private Boolean synLeather;
    @Column("lon")
    private double lon;
    @Column("lat")
    private double lat;
    @Column("manage_type")
    private String manageType;
    public String getCreditCode() {
        return creditCode;
    }
    public void setCreditCode(String creditCode) {
        this.creditCode = creditCode;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getProvince() {
        return province;
    }
    public void setProvince(String province) {
        this.province = province;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getCounty() {
        return county;
    }
    public void setCounty(String county) {
        this.county = county;
    }
    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }
    public String getAdCode() {
        return adCode;
    }
    public void setAdCode(String adCode) {
        this.adCode = adCode;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getIndustryLevel1() {
        return industryLevel1;
    }
    public void setIndustryLevel1(String industryLevel1) {
        this.industryLevel1 = industryLevel1;
    }
    public String getIndustryLevel2() {
        return industryLevel2;
    }
    public void setIndustryLevel2(String industryLevel2) {
        this.industryLevel2 = industryLevel2;
    }

    public String getIndustryLevel1Code() {
        return industryLevel1Code;
    }

    public void setIndustryLevel1Code(String industryLevel1Code) {
        this.industryLevel1Code = industryLevel1Code;
    }

    public String getIndustryLevel2Code() {
        return industryLevel2Code;
    }

    public void setIndustryLevel2Code(String industryLevel2Code) {
        this.industryLevel2Code = industryLevel2Code;
    }

    public Boolean isInEnv() {
        return inEnv;
    }

    public void setInEnv(Boolean inEnv) {
        this.inEnv = inEnv;
    }

    public Boolean isMedical() {
        return medical;
    }

    public void setMedical(Boolean medical) {
        this.medical = medical;
    }

    public Boolean isPapermaking() {
        return papermaking;
    }

    public void setPapermaking(Boolean papermaking) {
        this.papermaking = papermaking;
    }

    public Boolean isSynLeather() {
        return synLeather;
    }

    public void setSynLeather(Boolean synLeather) {
        this.synLeather = synLeather;
    }

    public String getLegalRepre() {
        return legalRepre;
    }
    public void setLegalRepre(String legalRepre) {
        this.legalRepre = legalRepre;
    }
    public String getProcedure() {
        return procedure;
    }
    public void setProcedure(String procedure) {
        this.procedure = procedure;
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
    public String getManageType() {
        return manageType;
    }
    public void setManageType(String manageType) {
        this.manageType = manageType;
    }
}