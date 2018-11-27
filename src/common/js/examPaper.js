//试卷用途类型
export const paperTypes=['真题试卷','名校考试','竞赛（杯赛）','模拟题','其他']
//年份
export const years=['2018','2017','2016']
export const lessYears=['2016']
//日期
export const dates=[{text:'近一周',value:1,type:'week',compare:'more'},{text:'近一月',value:1,type:'month',compare:'more'},{text:'近半年',value:6,type:'month',compare:'more'},{text:'近一年',value:1,type:'year',compare:'more'},{text:'近两年',value:2,type:'year',compare:'more'},{text:'两年以上',value:2,type:'year',compare:'less'}]
export function getCommonAreas(allAreas) {
  var citys = '广州东莞深圳珠海佛山中山南宁上海';
  if(allAreas == null || allAreas.length ==0){
    return [];
  }
  var aas = new Array();
  for(var i=0; i<allAreas.length; i++){
    if(citys.indexOf(allAreas[i].name) != -1){
      aas.push(allAreas[i]);
    }
  }
  return aas;
}
