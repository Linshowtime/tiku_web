export const model = {
  paperTypes: ['入学诊断', '课前诊断', '课堂小测', '课后作业', '期中期末诊断'],
  years: ['2018', '2017', '2016'],
  lessYears: ['2016'],
  lects: [
    {
      id: '1',
      name: '第一讲'
    },
    {
      id: '2',
      name: '第二讲'
    },
    {
      id: '3',
      name: '第三讲'
    },
    {
      id: '4',
      name: '第四讲'
    },
    {
      id: '5',
      name: '第五讲'
    },
    {
      id: '6',
      name: '第六讲'
    }
  ],
  periods: [
    {
      id: '',
      name: '全部'
    },
    {
      id: '2',
      name: '春季'
    },
    {
      id: '3',
      name: '暑假'
    },
    {
      id: '0',
      name: '秋季'
    },
    {
      id: '1',
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




