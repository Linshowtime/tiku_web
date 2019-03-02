export const model = {
  paperTypes: [
    {
      id:1,
      name:'入学诊断',
    }, {
    id:'2',
    name:'课前诊断'
    },
    {
      id:3,
      name:'课堂小测'
    },
    {
      id:4,
     name: '课后作业'
    },
    {id:5,
      name:'期中期末诊断'
    }],
  years: ['2018', '2017', '2016'],
  lessYears: ['2016'],
  periods: [
    {
      id: '1',
      name: '春季'
    },
    {
      id: '2',
      name: '暑假'
    },
    {
      id: '3',
      name: '秋季'
    },
    {
      id: '4',
      name: '寒假'
    }
  ]

}

export const controller = {
  getCommonAreas: function (allAreas) {
    var citys = '广州东莞深圳珠海佛山';
    if (allAreas == null || allAreas.length == 0) {
      return [];
    }
    var aas = new Array();
    for (var i = 0; i < allAreas.length; i++) {
      if (citys.indexOf(allAreas[i].name) != -1) {
        aas.push(allAreas[i]);
      }
    }
    return aas;
  }
}


export default {
  model,
  controller
}




