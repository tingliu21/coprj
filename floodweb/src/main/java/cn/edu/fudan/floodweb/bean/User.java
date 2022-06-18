package cn.edu.fudan.floodweb.bean;

import org.nutz.dao.entity.annotation.*;

@Table("t_user")
@View("v_user")
public class User {
    @Name
    @Column("user_name")
    private String name;
    @Column("password")
    private String password;
    @Column("region_name")
    @Readonly
    private String regionName;
    @Column("region")
    private int region;
    @Column("organization")
    private String organization;
    @Column("phone")
    private String phone;
    @Column("verified")
    private boolean verified;
    @Column("islogin")
    private boolean islogin;

    public boolean isIslogin() {
        return islogin;
    }
    public void setIslogin(boolean islogin) {
        this.islogin = islogin;
    }
    public boolean isVerified() {
        return verified;
    }
    public void setVerified(boolean verified) {
        this.verified = verified;
    }
    public int getRegion() {
        return region;
    }
    public void setRegion(int region) {
        this.region = region;
    }
    public String getOrganization() {
        return organization;
    }
    public void setOrganization(String organization) {
        this.organization = organization;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }
}