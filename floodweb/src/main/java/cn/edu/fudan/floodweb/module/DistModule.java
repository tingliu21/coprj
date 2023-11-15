package cn.edu.fudan.floodweb.module;

import cn.edu.fudan.floodweb.bean.DistCount;
import org.nutz.dao.Dao;
import org.nutz.dao.impl.FileSqlManager;
import org.nutz.dao.impl.NutDao;
import org.nutz.dao.sql.Sql;
import org.nutz.dao.sql.SqlCallback;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.Ok;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@IocBean
@At("/dist")
@Ok("json")
@Fail("http:500")
public class DistModule {
    @Inject
    protected Dao dao;

    @At
    public Object ent() {
        ((NutDao)dao).setSqlManager(new FileSqlManager("sqls/all.sqls"));
        Sql sql = dao.sqls().create("sql_count_ent");
        sql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet resultSet, Sql sql) throws SQLException {
                return getDistCount(resultSet);
            }
        });
        dao.execute(sql);
        return sql.getList(DistCount.class);
    }

    @At
    public Object gov() {
        ((NutDao)dao).setSqlManager(new FileSqlManager("sqls/all.sqls"));
        Sql sql = dao.sqls().create("sql_count_gov");
        sql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet resultSet, Sql sql) throws SQLException {
                return getDistCount(resultSet);
            }
        });
        dao.execute(sql);
        return sql.getList(DistCount.class);
    }

    @At
    public Object key() {
        ((NutDao)dao).setSqlManager(new FileSqlManager("sqls/all.sqls"));
        Sql sql = dao.sqls().create("sql_count_key");
        sql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet resultSet, Sql sql) throws SQLException {
                return getDistCount(resultSet);
            }
        });
        dao.execute(sql);
        return sql.getList(DistCount.class);
    }

    private List<DistCount> getDistCount(ResultSet rs) throws SQLException {
        List<DistCount> list = new ArrayList<>();
        while (rs.next()) {
            DistCount distCount = new DistCount();
            distCount.setCount(rs.getInt("count"));
            distCount.setCounty(rs.getString("county"));
            list.add(distCount);
        }
        return list;
    }
}
