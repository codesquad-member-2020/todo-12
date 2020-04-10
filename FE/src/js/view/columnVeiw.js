initRender(columnsData){
    columnsData.forEach(columnData => {
      const {cards, name } = columnData
      const column = columnTpl(name, cards.length);      
    })
  }