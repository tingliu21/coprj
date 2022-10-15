package cn.edu.fudan.floodweb.utils;

import java.lang.reflect.Field;

public class ReflectUtil {
    public static Object getFieldValueByObject(Object object, String targetFieldName) throws Exception {
        // 获取该对象的Class
        Class objClass = object.getClass();
        // 初始化返回值
        Object result = null;
        // 获取所有的属性数组
        Field[] fields = objClass.getDeclaredFields();
        for (Field field : fields) {
            // 属性名称
            String currentFieldName = field.getName();
            try {
                if (currentFieldName.equals(targetFieldName)) {
                    field.setAccessible(true);
                    result = field.get(object);
                    return result; // 通过反射拿到该属性在此对象中的值(也可能是个对象)
                }
            } catch (SecurityException e) {
                // 安全性异常
                e.printStackTrace();
            } catch (IllegalArgumentException e) {
                // 非法参数
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                // 无访问权限
                e.printStackTrace();
            }
        }
        return result;
    }
}
