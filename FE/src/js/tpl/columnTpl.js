export function columnTpl(title, count) {
  const column = `
              <section id="todo__done" class="todo__column">
                <h2 class="blind">${title}</h2>
                <div class="column__header flex">
                  <div>
                    <span class="column__card-count">${count}</span>
                    <span class="column__title">${title}</span>
                  </div>
                  <div>
                    <button type="button" class="plus-btn">
                      <i class="fas fa-plus"></i>
                    </button>
                    <button type="button" class='close-btn'>
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
      
                <!-- add 입력창 -->
                <div id="add__todo">
                </div>
                <!-- add 입력창 -->
      
                <!-- card -->
                <div id="column__card-wrap">
                </div>
                <!-- //card -->
              
              </section>
              `;

  return column;
}
