package cn.edu.fudan.floodweb;

import org.nutz.mvc.annotation.IocBy;
import org.nutz.mvc.annotation.Modules;
import org.nutz.mvc.annotation.SetupBy;
import org.nutz.mvc.ioc.provider.ComboIocProvider;

@SetupBy(value=MainSetup.class) //使用@SetupBy注解指定了应用程序的初始化设置类为MainSetup
@IocBy(type= ComboIocProvider.class, args={"*js", "ioc/", //使用JavaScript文件配置IoC对象，JavaScript文件的路径为"ioc/"
        "*anno", "cn.edu.fudan.floodweb", //基于注解的方式配置IoC对象，扫描"cn.edu.fudan.floodweb"包
        "*quartz", // 加载Quartz
        "*tx", // 事务拦截 aop
        "*async"}) // 异步执行aop
@Modules(scanPackage=true) //自动扫描包加载模块
public class MainModule {
}
//配置应用程序的模块、IoC容器和其他设置。它指定了应用程序的初始化设置类、IoC容器的配置方式，并自动扫描包来加载模块。