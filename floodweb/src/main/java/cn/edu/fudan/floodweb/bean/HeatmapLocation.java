package cn.edu.fudan.floodweb.bean;

public class HeatmapLocation {
    private double lng; //经度
    private double lat;//维度
    private int count;

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
//表示地点热量图