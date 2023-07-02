export const generateDataSet = (n = 450) => {
    return new Array(n)
    //   .fill({ id: '1', title: 'Account Linda Mathew ABCDEFGHIJ102900299800000' })
      .fill({ id: '1', title: 'ABCDEFGHIJ102900299800000ABCDEFGHIJ102900299800000' })
      .map((item, i) => ({ ...item, id: i.toString(), title: item.title + i }))
  }