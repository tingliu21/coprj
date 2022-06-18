package cn.edu.fudan.floodweb.module;

import cn.edu.fudan.floodweb.bean.Wts;
import cn.edu.fudan.floodweb.bean.WtsReform;
import org.apache.poi.ss.usermodel.*;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.Scope;
import org.nutz.mvc.annotation.*;
import org.nutz.mvc.upload.TempFile;
import org.nutz.mvc.upload.UploadAdaptor;
import org.nutz.trans.Atom;
import org.nutz.trans.Trans;

import java.io.File;
import java.util.Iterator;
import java.util.List;

/**
 * 灾害事件
 * @author maofeng
 *
 */

@IocBean
@At("/wts")
@Ok("json")
@Fail("http:500")
public class WtsModule {
    @Inject
    protected Dao dao;

    @At
    public Object query(@Param("region")String region, @Param("name")String name) {
        Cnd cnd = Cnd.where(null);
        if (region != null && !region.equals("")) {
            cnd = cnd.and("wts_region", "=", region);
        }
        if (name != null && !name.equals("")) {
            cnd = cnd.and("wts_name", "like", "%" + name + "%");
        }
        List<Wts> wtsList = dao.query(Wts.class, cnd);
        return wtsList;
    }

    @At
    public Object queryReform(@Param("wts_id")String wtsId) {
        NutMap re = new NutMap();
        Cnd cnd = Cnd.where(null);
        if (wtsId != null && !wtsId.equals("")) {
            try {
                int intWtsId = Integer.parseInt(wtsId);
                cnd = cnd.and("wts_id", "=", intWtsId);
            } catch (Exception e) {
                e.printStackTrace();
                return re.setv("ok", false).setv("msg", e.getMessage());
            }
        }
        List<WtsReform> wtsReformList = dao.query(WtsReform.class, cnd);
        return wtsReformList;
    }

    @At
    public Object fetch(@Param("id")int id) {
        if (id != 0) {
            Wts wts = dao.fetch(Wts.class, id);
            return wts;
        } else {
            return null;
        }
    }

    @At
    public Object updateWts(@Param("id")int id, @Param("name")String name,
                            @Param("region")String region, @Param("addr")String addr,
                            @Param("lon")double lon, @Param("lat")double lat,
                            @Param("starttimeyear")int startTimeYear, @Param("starttimemonth")int startTimeMonth,
                            @Param("dailycapacity")double dailyCapacity, @Param("treatment")String treatment,
                            @Param("reform")String reform) {
        NutMap re = new NutMap();
        Wts wts = new Wts();
        wts.setId(id);
        wts.setName(name);
        wts.setRegion(region);
        wts.setAddr(addr);
        wts.setLon(lon);
        wts.setLat(lat);
        wts.setStartTimeYear(startTimeYear);
        wts.setStartTimeMonth(startTimeMonth);
        wts.setDailyCapacity(dailyCapacity);
        wts.setTreatment(treatment);
        wts.setReform(reform);

        try {
            dao.update(wts);
            return re.setv("ok", true);
        } catch (Exception e) {
            return re.setv("ok", false).setv("msg", e.getMessage());
        }
    }

    @At
    public Object deleteWts(@Param("id")final int id) {
        NutMap re = new NutMap();
        try {
            Trans.exec(new Atom(){
                public void run() {
                    dao.clear(WtsReform.class,Cnd.where("wts_id", "=", id));
                    dao.delete(Wts.class, id);
                }
            });
            return re.setv("ok", true);
        } catch (Exception e) {
            return re.setv("ok", false).setv("msg", e.getMessage());
        }
    }

    @At
    public Object insertWts(@Param("name")String name,
                            @Param("region")String region, @Param("addr")String addr,
                            @Param("lon")double lon, @Param("lat")double lat,
                            @Param("starttimeyear")int startTimeYear, @Param("starttimemonth")int startTimeMonth,
                            @Param("dailycapacity")double dailyCapacity, @Param("treatment")String treatment,
                            @Param("reform")String reform) {
        NutMap re = new NutMap();
        Wts wts = new Wts();
        wts.setName(name);
        wts.setRegion(region);
        wts.setAddr(addr);
        wts.setLon(lon);
        wts.setLat(lat);
        wts.setStartTimeYear(startTimeYear);
        wts.setStartTimeMonth(startTimeMonth);
        wts.setDailyCapacity(dailyCapacity);
        wts.setTreatment(treatment);
        wts.setReform(reform);

        try {
            dao.insert(wts);
            return re.setv("ok", true);
        } catch (Exception e) {
            return re.setv("ok", false).setv("msg", e.getMessage());
        }
    }

    @AdaptBy(type= UploadAdaptor.class, args={"${app.root}/WEB-INF/tmp/files", "8192", "utf-8", "20000", "10240000"})
    @POST
    @At
    public Object upload(@Param("excel-file") TempFile tf, @Attr(scope = Scope.SESSION, value="admin")String admin) {
        NutMap re = new NutMap();

        if (admin == null || admin.isEmpty()) {
            return re.setv("ok", false).setv("msg", "登录过期，请重新登录");
        } else {
            final File file = tf.getFile();
            try {
                Trans.exec(new Atom() {
                    public void run() {
                        Workbook wb = null;
                        try {
                            wb = WorkbookFactory.create(file);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        Sheet sheet = wb.getSheetAt(0);
                        Iterator<Row> iterable = sheet.rowIterator();
                        iterable.next();
                        while (iterable.hasNext()) {
                            Row row = iterable.next();
                            String region = row.getCell(0).getStringCellValue();
                            String addr = row.getCell(1).getStringCellValue();
                            String name = row.getCell(2).getStringCellValue();
                            int startTimeYear = 0;
                            int startTimeMonth = 0;
                            if (row.getCell(3).getCellType() == CellType.STRING) {
                                String originStartTime = row.getCell(3).getStringCellValue();
                                startTimeYear = Integer.parseInt(originStartTime.split("-")[0]);
                                startTimeMonth = Integer.parseInt(originStartTime.split("-")[1]);
                            } else  if (row.getCell(3).getCellType() == CellType.NUMERIC) {
                                startTimeYear = (int)row.getCell(3).getNumericCellValue();
                            }
                            String reform = row.getCell(4).getStringCellValue();
                            double lon = row.getCell(5).getNumericCellValue();
                            double lat = row.getCell(6).getNumericCellValue();
                            double dailyCapacity = row.getCell(7).getNumericCellValue();
                            String treatment = row.getCell(8).getStringCellValue();

                            Wts wts = new Wts();
                            wts.setRegion(region);
                            wts.setName(name);
                            wts.setAddr(addr);
                            wts.setStartTimeYear(startTimeYear);
                            wts.setStartTimeMonth(startTimeMonth);
                            wts.setReform(reform);
                            wts.setLon(lon);
                            wts.setLat(lat);
                            wts.setDailyCapacity(dailyCapacity);
                            wts.setTreatment(treatment);

                            dao.insert(wts);
                        }
                    }
                });
                return re.setv("ok", true);
            } catch (Exception e) {
                return re.setv("ok", false).setv("msg", e.toString());
            }
        }
    }
}
