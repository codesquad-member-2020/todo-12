export function tplColumn() {
  const column = `
              <section class="todo__column">
                <h2 class="column__title blind"></h2>
                <div class="column__header flex">
                  <div>
                    <span class="column__card-count"></span>
                    <span class="column__title"></span>
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

export function tplAddColumn() {
  const addColumn = `
  <section id="todo__add-column" class="todo__column flex">
  <div class="add-column__btn">
    <button type="button">
      <i class="fas fa-plus"></i> 
      <span>Add column</span>
    </button>
  </div>
  </section>
  `;

  return addColumn;
}
