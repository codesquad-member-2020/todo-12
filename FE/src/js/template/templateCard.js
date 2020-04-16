export function templateCard(a) {
  const card = `
            <li class="column__card flex" draggable="true" data-card-id=${a.id}>
                <div class="card__left flex" >
                   <div class="card__contents" >
                      <i class="far fa-calendar-check card__icon"></i>
                      <span class="card__content">${a.content}</span>
                   </div>
                   <div class="card__btn">
                    <button type="button" class="close-btn">
                      <i class="fas fa-times" data-type='card-delete-btn'></i>
                    </button>
                  </div>
                </div>
                <div class="card__right">
                  <span class="card__author">Added by <strong>${a.author}</strong></span>
                </div>
            </li>
          `;
  return card;
}
