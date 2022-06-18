package cn.edu.fudan.floodweb.module;

import cn.edu.fudan.floodweb.bean.Admin;
import cn.edu.fudan.floodweb.bean.User;
import cn.edu.fudan.floodweb.utils.BCrypt;
import org.nutz.dao.Chain;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.Ok;
import org.nutz.mvc.annotation.Param;

import javax.servlet.http.HttpSession;
import java.util.List;

@IocBean
@At("/user")
@Ok("json")
@Fail("http:500")
public class UserModule {
    @Inject
    protected Dao dao;

    @At
    public int count() {
        return dao.count(User.class);
    }

    @At
    public Object login(@Param("username")String username, @Param("password")String password, @Param("ismobile")Boolean isMobile, HttpSession session) {
        NutMap re = new NutMap();
        User user = dao.fetch(User.class, username);
        if (user == null ) {
            return re.setv("ok", false).setv("msg", "不存在该用户");
        }
        if (!user.isVerified()) {
            return re.setv("ok", false).setv("msg", "该用户被禁用");
        }
        if (isMobile != null && isMobile && user.isIslogin()) {
            return re.setv("ok", false).setv("msg", "该用户已在其他设备登录");
        }
        if (!BCrypt.checkpw(password, user.getPassword())) {
            return re.setv("ok", false).setv("msg", "密码错误");
        }
        session.setAttribute("me", user.getName());
        session.setAttribute("region", user.getRegion());
        if (isMobile != null && isMobile) {
            try {
                dao.update(User.class, Chain.make("islogin", true), Cnd.where("user_name", "=", username));
            } catch (Exception ex) {
                return re.setv("ok", false).setv("msg", "登录失败");
            }

        }
        return re.setv("ok", true).setv("data", user);

    }

    @At
    public Object loginadmin(@Param("adminname")String adminname, @Param("password")String password, HttpSession session) {
        NutMap re = new NutMap();
        Admin admin = dao.fetch(Admin.class, adminname);
        if (admin == null ) {
            return re.setv("ok", false).setv("msg", "不存在该用户");
        } else {
            if (!BCrypt.checkpw(password, admin.getPassword())) {
                return re.setv("ok", false).setv("msg", "密码错误");
            } else {
                session.setAttribute("admin", admin.getName());
                session.setAttribute("region", admin.getRegion());
                return re.setv("ok", true).setv("data", admin);
            }
        }
    }

    @At
    public Object add(@Param("username")String username, @Param("password")String password, @Param("region")String regionID,
                      @Param("organization")String organization, @Param("phone")String phone) {
        NutMap re = new NutMap();
        User user = new User();
        user.setName(username);
        String hashed = BCrypt.hashpw(password, BCrypt.gensalt());
        user.setPassword(hashed);
        user.setRegion(Integer.parseInt(regionID));
        user.setOrganization(organization);
        user.setPhone(phone);
        user.setVerified(true);

        try {
            dao.insert(user);
            return re.setv("ok", true).setv("data", user);
        } catch (Exception ex) {
            return re.setv("ok", false).setv("msg", ex.getMessage());
        }

    }

    @At
    @Ok(">>:/")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @At
    public void logoutmobile(@Param("username")String username) {
        if (username != null) {
            dao.update(User.class, Chain.make("islogin", false), Cnd.where("user_name", "=", username));
        }
    }

    @At
    public Object checkname(@Param("username")String username) {
        User member = dao.fetch(User.class, username);
        if (member == null) {
            return false;
        } else {
            return true;
        }
    }

    @At
    public Object query(@Param("name")String username, @Param("organization")String organization, @Param("phone")String phone,
                        @Param("region")String region, @Param("verified")Boolean verified) {
        Cnd cnd = Cnd.where(null);
        if (username != null && !username.equals("")) {
            cnd = cnd.and("user_name", "=", username);
        }
        if (organization != null && !organization.equals("")) {
            cnd.and("organization", "like", "%" + organization + "%");
        }
        if (phone != null && !phone.equals("")) {
            cnd.and("phone", "=", phone);
        }
        if (region != null && !region.equals("")) {
            cnd = cnd.and("region", "=", region);
        }
        if (verified != null) {
            cnd = cnd.and("verified", "=", verified);
        }
        List<User> userList = dao.query(User.class, cnd);
        return userList;
    }

    @At
    public void verify(@Param("username")String username, @Param("verified")boolean verified, @Param("islogin")boolean islogin) {
        User user = new User();
        user.setName(username);
        user.setVerified(verified);
        user.setIslogin(islogin);
        dao.update(user, "^(verified|islogin)$");
    }
}
