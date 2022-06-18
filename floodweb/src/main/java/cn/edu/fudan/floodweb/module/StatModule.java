package cn.edu.fudan.floodweb.module;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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

/**
 * 统计信息
 * @author maofeng
 *
 */
@IocBean
@At("/stat")
@Ok("json")
@Fail("http:500")
public class StatModule {
    @Inject
    protected Dao dao;

    /**
     * 按区县统计各个污染源数量：企业、市政源、重点企业
     * @return
     */
    @At
    public Object source() {
        ((NutDao)dao).setSqlManager(new FileSqlManager("sqls/all.sqls"));
        Sql sql = dao.sqls().create("sql_stat_source");

        sql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet rs, Sql sql) throws SQLException {
//                JSONArray root = new JSONArray();
                JSONObject obj = new JSONObject();
                while (rs.next()) {
                    JSONArray counts = new JSONArray();
                    counts.add(0, rs.getInt("count1"));
                    counts.add(1, rs.getInt("count2"));
                    counts.add(2, rs.getInt("count3"));
                    obj.put(rs.getString("county"), counts);
//                    root.add(obj);
                }
                return obj;
            }
        });
        dao.execute(sql);
        return sql.getObject(JSONObject.class);
    }

    /**
     * 按区县统计排放量：VOC、SO2、氮氧化物、颗粒物
     * @return
     */
    @At
    public Object emission() {
        ((NutDao)dao).setSqlManager(new FileSqlManager("sqls/all.sqls"));
        Sql sql = dao.sqls().create("sql_stat_emission");

        sql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet rs, Sql sql) throws SQLException {
//                JSONArray root = new JSONArray();
                JSONObject obj = new JSONObject();
                while (rs.next()) {
                    JSONObject counts = new JSONObject();
                    counts.put("vocs", rs.getInt("vocs"));
                    counts.put("so2", rs.getInt("so2"));
                    counts.put("nox", rs.getInt("nox"));
                    counts.put("dust", rs.getInt("dust"));
                    obj.put(rs.getString("county"), counts);
//                    root.add(obj);
                }
                return obj;
            }
        });
        dao.execute(sql);
        return sql.getObject(JSONObject.class);
    }
}
