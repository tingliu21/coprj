package cn.edu.fudan.floodweb.module;

import cn.edu.fudan.floodweb.bean.*;
import cn.edu.fudan.floodweb.utils.DateTimeUtil;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.*;
import org.joda.time.DateTime;
import org.joda.time.DateTimeUtils;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.dao.FieldFilter;
import org.nutz.dao.util.Daos;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.Scope;
import org.nutz.mvc.annotation.*;
import org.nutz.mvc.upload.TempFile;
import org.nutz.mvc.upload.UploadAdaptor;
import org.nutz.trans.Atom;
import org.nutz.trans.Trans;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * 企业
 * @author maofeng
 *
 */
@IocBean
@At("/ent")
@Ok("json")
@Fail("http:500")
public class EntModule {
    @Inject
    protected Dao dao;

    /**
     * 查询企业
     * @return
     */
    @At
    public Object querylite(@Param("region")String region) {
        Cnd cnd = Cnd.where(null);
        if (region != null && !region.equals("")) {
            cnd = cnd.and("county", "=", region);
        }
        FieldFilter ff = FieldFilter.create(Ent.class, "^creditCode|name|address|lon|lat$");
        List<Ent> entList = Daos.ext(dao, ff).query(Ent.class, cnd);
        return entList;
    }

    /**
     * 查询企业
     * @param region
     * @return
     */
    @At
    public Object query(@Param("region")String region, @Param("name")String name,
                        @Param("managetype")String manageType, @Param("street")String street) {
        Cnd cnd = Cnd.where(null);
        if (region != null && !region.equals("")) {
            cnd = cnd.and("county", "=", region);
        }
        if (name != null && !name.equals("")) {
            cnd = cnd.and("ent_name", "like", "%" + name + "%");
        }
        if (manageType != null && !manageType.equals("")) {
            cnd = cnd.and("manage_type", "=", manageType);
        }
        if (street != null && !street.equals("")) {
            cnd = cnd.and("street", "like", "%" + street + "%");
        }
        List<Ent> entList = dao.query(Ent.class, cnd);
        return entList;
    }
    /**
     * 查询企业
     * @param id
     * @return
     */
    @At
    public Object fetch(@Param("id")String id) {
//        Cnd cnd = Cnd.where(null);
//        if (id != null && !id.equals("")) {
//            cnd = cnd.and("credit_code", "=", id);
//        }
//        FieldFilter ff = FieldFilter.create(Ent.class, "^creditCode|name|lon|lat$");
        if (id != null && !id.equals("")) {
            Ent ent = dao.fetch(Ent.class, id);
            return ent;
        } else {
            return null;
        }
    }






    @At
    public void updateEnt(@Param("id")String id, @Param("name")String name, @Param("address")String address,
                          @Param("industrylevel1")String industryLevel1, @Param("industryLevel2")String industryLevel2,
                          @Param("inenv")boolean inEnv, @Param("legalrepre")String legalRepre, @Param("procedure")String procedure,
                          @Param("medical")boolean medical, @Param("papermaking")boolean papermaking, @Param("synleather")boolean synLeather,
                          @Param("managetype")String manageType, @Param("industrylevel1code")String industryLevel1Code,
                          @Param("industrylevel2code")String industryLevel2Code, @Param("street")String street) {
        Ent ent = new Ent();
        ent.setCreditCode(id);
        ent.setName(name);
        ent.setStreet(street);
        ent.setAddress(address);
        ent.setIndustryLevel1Code(industryLevel1Code);
        ent.setIndustryLevel2Code(industryLevel2Code);
        ent.setIndustryLevel1(industryLevel1);
        ent.setIndustryLevel2(industryLevel2);
        ent.setInEnv(inEnv);
        ent.setLegalRepre(legalRepre);
        ent.setProcedure(procedure);
        ent.setMedical(medical);
        ent.setPapermaking(papermaking);
        ent.setSynLeather(synLeather);
        ent.setManageType(manageType);

        dao.update(ent, "^(name|street|address|industryLevel1Code|industryLevel2Code|industryLevel1|industryLevel2|inEnv|legalRepre|procedure|medical|papermaking|synLeather|manageType)$");
    }



    @At
    public Object deleteEnt(@Param("id")final String id) {
        NutMap re = new NutMap();
        try {
            dao.delete(Ent.class, id);
            return re.setv("ok", true);
        } catch (Exception e) {
            return re.setv("ok", false).setv("msg", e.getMessage());
        }

    }


    @At
    public Object insertEnt(@Param("entid")final String entId, @Param("name")String name, @Param("province")String province,
                            @Param("city")String city, @Param("county")String county, @Param("street")String street,
                            @Param("adcode")String adCode, @Param("address")String address,
                            @Param("industrylevel1code")String industryLevel1Code, @Param("industrylevel2code")String industryLevel2Code,
                            @Param("industrylevel1")String industryLevel1, @Param("industrylevel2")String industryLevel2,
                            @Param("inenv")boolean inEnv, @Param("legalrepre")String legalRepre,
                            @Param("lon")double lon, @Param("lat")double lat,
                            @Param("procedure")String procedure, @Param("production")final String production,
                            @Param("productionvolumn")final String productionVolumn, @Param("productionunit")final String productionUnit,
                            @Param("capacity")final String capacity, @Param("capacityunit")final String capacityUnit,
                            @Param("energytype")final String energyType, @Param("energyconsume")final String energyConsume,
                            @Param("energyconsumeunit")final String energyConsumeUnit, @Param("medical")boolean medical,
                            @Param("papermaking")boolean papermaking, @Param("synleather")boolean synLeather,
                            @Param("managetype")String manageType) {
        NutMap re = new NutMap();
        try {
            final Ent ent = new Ent();
            ent.setCreditCode(entId);
            ent.setName(name);
            ent.setProvince(province);
            ent.setCity(city);
            ent.setCounty(county);
            ent.setStreet(street);
            ent.setAdCode(adCode);
            ent.setAddress(address);
            ent.setIndustryLevel1Code(industryLevel1Code);
            ent.setIndustryLevel2Code(industryLevel2Code);
            ent.setIndustryLevel1(industryLevel1);
            ent.setIndustryLevel2(industryLevel2);
            ent.setInEnv(inEnv);
            ent.setLegalRepre(legalRepre);
            ent.setLon(lon);
            ent.setLat(lat);
            ent.setProcedure(procedure);
            ent.setMedical(medical);
            ent.setPapermaking(papermaking);
            ent.setSynLeather(synLeather);
            ent.setManageType(manageType);


            return re.setv("ok", true);
        } catch (Exception e) {
            return re.setv("ok", false).setv("msg", e.getMessage());
        }
    }

}
