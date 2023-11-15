package cn.edu.fudan.floodweb.module;

import cn.edu.fudan.floodweb.bean.HeatmapLocation;
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
import org.nutz.mvc.annotation.Param;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@IocBean
@At("/heatmap")
@Ok("json")
@Fail("http:500")
public class HeatmapModule {
    @Inject
    protected Dao dao;

    @At
    public Object ent(@Param("region")String region) {
        ((NutDao)dao).setSqlManager(new FileSqlManager("sqls/all.sqls"));
        Sql sql = null;
        if (region == null || region.equals("")) {
            sql = dao.sqls().create("sql_get_all_ent");
        } else {
            sql = dao.sqls().create("sql_get_ent_by_region").setParam("region", region);
        }
        sql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet resultSet, Sql sql) throws SQLException {
                return getHeatmapLocation(resultSet, 1);
            }
        });
        dao.execute(sql);
        return sql.getList(HeatmapLocation.class);
    }

    @At
    public Object vocs(@Param("region")String region) {
        ((NutDao)dao).setSqlManager(new FileSqlManager("sqls/all.sqls"));
        Sql sql = null;
        if (region == null || region.equals("")) {
            sql = dao.sqls().create("sql_get_vocs");
        } else {
            sql = dao.sqls().create("sql_get_vocs_by_region").setParam("region", region);
        }
        sql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet resultSet, Sql sql) throws SQLException {
                return getHeatmapLocation(resultSet);
            }
        });
        dao.execute(sql);
        return sql.getList(HeatmapLocation.class);
    }
    @At
    public Object so2(@Param("region")String region) {
        ((NutDao)dao).setSqlManager(new FileSqlManager("sqls/all.sqls"));
        Sql sql = null;
        if (region == null || region.equals("")) {
            sql = dao.sqls().create("sql_get_so2");
        } else {
            sql = dao.sqls().create("sql_get_so2_by_region").setParam("region", region);
        }
        sql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet resultSet, Sql sql) throws SQLException {
                return getHeatmapLocation(resultSet);
            }
        });
        dao.execute(sql);
        return sql.getList(HeatmapLocation.class);
    }

    @At
    public Object nox(@Param("region")String region) {
        ((NutDao)dao).setSqlManager(new FileSqlManager("sqls/all.sqls"));
        Sql sql = null;
        if (region == null || region.equals("")) {
            sql = dao.sqls().create("sql_get_nox");
        } else {
            sql = dao.sqls().create("sql_get_nox_by_region").setParam("region", region);
        }
        sql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet resultSet, Sql sql) throws SQLException {
                return getHeatmapLocation(resultSet);
            }
        });
        dao.execute(sql);
        return sql.getList(HeatmapLocation.class);
    }

    @At
    public Object dust(@Param("region")String region) {
        ((NutDao)dao).setSqlManager(new FileSqlManager("sqls/all.sqls"));
        Sql sql = null;
        if (region == null || region.equals("")) {
            sql = dao.sqls().create("sql_get_dust");
        } else {
            sql = dao.sqls().create("sql_get_dust_by_region").setParam("region", region);
        }
        sql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet resultSet, Sql sql) throws SQLException {
                return getHeatmapLocation(resultSet);
            }
        });
        dao.execute(sql);
        return sql.getList(HeatmapLocation.class);
    }

    @At
    public Object gov() {
        ((NutDao)dao).setSqlManager(new FileSqlManager("sqls/all.sqls"));
        Sql sql = dao.sqls().create("sql_get_all_gov");
        sql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet resultSet, Sql sql) throws SQLException {
                return getHeatmapLocation(resultSet, 2);
            }
        });
        dao.execute(sql);
        return sql.getList(HeatmapLocation.class);
    }

    @At
    public Object key() {
        ((NutDao)dao).setSqlManager(new FileSqlManager("sqls/all.sqls"));
        Sql sql = dao.sqls().create("sql_get_all_key");
        sql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet resultSet, Sql sql) throws SQLException {
                return getHeatmapLocation(resultSet, 3);
            }
        });
        dao.execute(sql);
        return sql.getList(HeatmapLocation.class);
    }

    private List<HeatmapLocation> getHeatmapLocation(ResultSet rs, int count) throws SQLException {
        List<HeatmapLocation> list = new ArrayList<>();
        while (rs.next()) {
            HeatmapLocation heatmapLocation = new HeatmapLocation();
            heatmapLocation.setCount(count);
            heatmapLocation.setLat(rs.getDouble("lat"));
            heatmapLocation.setLng(rs.getDouble("lon"));
            list.add(heatmapLocation);
        }
        return list;
    }
    private List<HeatmapLocation> getHeatmapLocation(ResultSet rs) throws SQLException {
        List<HeatmapLocation> list = new ArrayList<>();
        while (rs.next()) {
            HeatmapLocation heatmapLocation = new HeatmapLocation();
            heatmapLocation.setCount(rs.getInt("count"));
            heatmapLocation.setLat(rs.getDouble("lat"));
            heatmapLocation.setLng(rs.getDouble("lon"));
            list.add(heatmapLocation);
        }
        return list;
    }
}
