package cn.edu.fudan.floodweb.module;

import cn.edu.fudan.floodweb.bean.*;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.dao.FieldFilter;
import org.nutz.dao.util.Daos;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.annotation.*;

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
public class PopModule {
    @Inject
    protected Dao dao;

    /**
     * 查询人口
     * @return
     */
    @At
    public Object querylite(@Param("region")String region) {
        Cnd cnd = Cnd.where(null);
        if (region != null && !region.equals("")) {
            cnd = cnd.and("county", "=", region);
        }
        FieldFilter ff = FieldFilter.create(Pop.class, "^creditCode|name|address|lon|lat$");
        List<Pop> popList = Daos.ext(dao, ff).query(Pop.class, cnd);
        return popList;
    }

    /**
     * 查询人口
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
        List<Pop> popList = dao.query(Pop.class, cnd);
        return popList;
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
            Pop pop = dao.fetch(Pop.class, id);
            return pop;
        } else {
            return null;
        }
    }






    @At
    public void updatePop(@Param("id")String id, @Param("name")String name, @Param("address")String address,
                          @Param("industrylevel1")String industryLevel1, @Param("industryLevel2")String industryLevel2,
                          @Param("inenv")boolean inEnv, @Param("legalrepre")String legalRepre, @Param("procedure")String procedure,
                          @Param("medical")boolean medical, @Param("papermaking")boolean papermaking, @Param("synleather")boolean synLeather,
                          @Param("managetype")String manageType, @Param("industrylevel1code")String industryLevel1Code,
                          @Param("industrylevel2code")String industryLevel2Code, @Param("street")String street) {
        Pop pop = new Pop();
        pop.setCreditCode(id);
        pop.setName(name);
        pop.setStreet(street);
        pop.setAddress(address);
        pop.setIndustryLevel1Code(industryLevel1Code);
        pop.setIndustryLevel2Code(industryLevel2Code);
        pop.setIndustryLevel1(industryLevel1);
        pop.setIndustryLevel2(industryLevel2);
        pop.setInEnv(inEnv);
        pop.setLegalRepre(legalRepre);
        pop.setProcedure(procedure);
        pop.setMedical(medical);
        pop.setPapermaking(papermaking);
        pop.setSynLeather(synLeather);
        pop.setManageType(manageType);

        dao.update(pop, "^(name|street|address|industryLevel1Code|industryLevel2Code|industryLevel1|industryLevel2|inEnv|legalRepre|procedure|medical|papermaking|synLeather|manageType)$");
    }



    @At
    public Object deletePop(@Param("id")final String id) {
        NutMap re = new NutMap();
        try {
            dao.delete(Pop.class, id);
            return re.setv("ok", true);
        } catch (Exception e) {
            return re.setv("ok", false).setv("msg", e.getMessage());
        }

    }


    @At
    public Object insertPop(@Param("entid")final String entId, @Param("name")String name, @Param("province")String province,
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
            final Pop pop = new Pop();
            pop.setCreditCode(entId);
            pop.setName(name);
            pop.setProvince(province);
            pop.setCity(city);
            pop.setCounty(county);
            pop.setStreet(street);
            pop.setAdCode(adCode);
            pop.setAddress(address);
            pop.setIndustryLevel1Code(industryLevel1Code);
            pop.setIndustryLevel2Code(industryLevel2Code);
            pop.setIndustryLevel1(industryLevel1);
            pop.setIndustryLevel2(industryLevel2);
            pop.setInEnv(inEnv);
            pop.setLegalRepre(legalRepre);
            pop.setLon(lon);
            pop.setLat(lat);
            pop.setProcedure(procedure);
            pop.setMedical(medical);
            pop.setPapermaking(papermaking);
            pop.setSynLeather(synLeather);
            pop.setManageType(manageType);


            return re.setv("ok", true);
        } catch (Exception e) {
            return re.setv("ok", false).setv("msg", e.getMessage());
        }
    }

}
