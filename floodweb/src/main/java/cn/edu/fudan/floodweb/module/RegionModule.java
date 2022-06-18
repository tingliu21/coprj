package cn.edu.fudan.floodweb.module;

import cn.edu.fudan.floodweb.bean.Region;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.Ok;

import java.util.List;

@IocBean
@At("/region")
@Ok("json")
@Fail("http:500")
public class RegionModule {
    @Inject
    protected Dao dao;

    @At
    public Object fetchall() {
        List<Region> regionList = dao.query(Region.class, null);
        return regionList;
    }

}
