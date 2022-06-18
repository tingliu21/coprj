package cn.edu.fudan.floodweb.module;

import cn.edu.fudan.floodweb.bean.Log;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.Scope;
import org.nutz.mvc.annotation.*;

import java.util.Date;
import java.util.List;

@IocBean
@At("/log")
@Ok("json")
@Fail("http:500")
public class LogModule {
    @Inject
    protected Dao dao;

    @At
    public Object add(@Param("user")String user, @Param("source")String source, @Param("op")String op, @Attr(scope= Scope.SESSION, value="me")String me) {
        if (me == null) {
            return null;
        }
        if (user == null || user.equals("")) {
            user = me;
        }
        NutMap re = new NutMap();
        Log log = new Log();
        log.setUser(user);
        log.setSource(source);
        log.setOp(op);
        log.setTime(new Date());
        try {
            dao.insert(log);
            return re.setv("ok", true).setv("data", log);
        } catch (Exception ex) {
            return re.setv("ok", false).setv("msg", ex.getMessage());
        }
    }

    @At
    public Object query(@Param("name")String username, @Param("source")String source, @Param("op")String op,
                        @Param("startdate")String startdate, @Param("enddate")String enddate) {
        Cnd cnd = Cnd.where(null);
        if (username != null && !username.equals("")) {
            cnd = cnd.and("username", "=", username);
        }
        if (source != null && !source.equals("")) {
            cnd.and("source", "=", source);
        }
        if (op != null && !op.equals("")) {
            cnd.and("operation", "=", op);
        }
        if (startdate != null && !startdate.equals("")) {
            cnd = cnd.and("time", ">", startdate);
        }
        if (enddate != null && !enddate.equals("")) {
            cnd = cnd.and("time", "<", enddate + " 23:59:59");
        }
        List<Log> logList = dao.query(Log.class, cnd);
        return logList;
    }
}