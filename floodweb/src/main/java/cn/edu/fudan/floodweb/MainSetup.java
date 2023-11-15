package cn.edu.fudan.floodweb;

import org.nutz.dao.Dao;
import org.nutz.dao.util.Daos;
import org.nutz.ioc.Ioc;
import org.nutz.mvc.NutConfig;
import org.nutz.mvc.Setup;
import org.nutz.integration.quartz.NutQuartzCronJobFactory;

public class MainSetup implements Setup {
    @Override
    public void init(NutConfig nutConfig) {
        Ioc ioc = nutConfig.getIoc();//获取应用程序的Ioc容器。
        Dao dao = ioc.get(Dao.class);//从Ioc容器中获取Dao对象。
//        Properties prop = ioc.get(null, "properties");
        // 如果没有createTablesInPackage,请检查nutz版本
        Daos.createTablesInPackage(dao, "cn.edu.fudan.floodweb", false);
        //使用Daos.createTablesInPackage方法在指定的包中创建数据库表。第一个参数是Dao对象，第二个参数是要创建表的包的路径，第三个参数表示是否在创建表之前先清空表。
        // 触发quartz 工厂,将扫描job任务
        ioc.get(NutQuartzCronJobFactory.class);
    }

    @Override
    public void destroy(NutConfig nutConfig) {

    }
}
//在应用程序初始化时，通过Nutz框架的Daos.createTablesInPackage方法在指定包中创建数据库表，并触发Quartz工厂进行作业任务的扫描。