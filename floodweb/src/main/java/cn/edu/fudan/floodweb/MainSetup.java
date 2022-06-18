package cn.edu.fudan.floodweb;

import org.nutz.dao.Dao;
import org.nutz.dao.util.Daos;
import org.nutz.ioc.Ioc;
import org.nutz.mvc.NutConfig;
import org.nutz.mvc.Setup;

public class MainSetup implements Setup {
    @Override
    public void init(NutConfig nutConfig) {
        Ioc ioc = nutConfig.getIoc();
        Dao dao = ioc.get(Dao.class);
//        Properties prop = ioc.get(null, "properties");
        // 如果没有createTablesInPackage,请检查nutz版本
        Daos.createTablesInPackage(dao, "cn.edu.fudan.floodweb", false);
    }

    @Override
    public void destroy(NutConfig nutConfig) {

    }
}