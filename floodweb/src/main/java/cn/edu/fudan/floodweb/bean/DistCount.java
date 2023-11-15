package cn.edu.fudan.floodweb.bean;

public class DistCount {
    private String county;
    private int count;

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
//用于表示某个县区的计数信息。它包含了"county"和"count"两个属性，用于存储县区名称和计数值。