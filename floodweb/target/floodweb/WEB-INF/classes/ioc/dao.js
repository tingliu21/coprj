

var ioc = {
    conf : {
        type : "org.nutz.ioc.impl.PropertiesProxy",
        fields : {
            paths : ["custom/"] //指定了加载配置文件的路径。
        }
    },
    dao : {
        type : "org.nutz.dao.impl.NutDao",
        args : [{refer:"dataSource"}]
    },
    //定义数据库连接的相关信息，包括驱动类名、URL、用户名、密码
    dataSource : {
        type : "com.alibaba.druid.pool.DruidDataSource",
        events : {
            depose : 'close'
        },
        fields : {
            driverClassName : "com.mysql.cj.jdbc.Driver",
            url : "jdbc:mysql://localhost:3306/floodweb?serverTimezone=UTC&characterEncoding=utf-8 ",
            username : "root",
            password : "123456",//"3030644021",
            maxWait: 15000
        }
    },
    //定义 Geoserver 的 URL、用户名和密码
    geoserverConfig: {
        type: "cn.edu.fudan.floodweb.bean.GeoserverConfig",
        fields: {
            url: 'http://localhost:8088/geoserver',
            userName:'admin',
            passWord:'geoserver'
        }
    }
}