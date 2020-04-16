export function templateCard(a) {
  const card = `
            <li class="column__card flex" data-focus='true' draggable="true" data-card-id=${a.id}>
                <div class="card__left flex" data-focus='true' >
                   <div class="card__contents" data-focus='true' >
                      <i class="far fa-calendar-check card__icon" data-focus='true' ></i>
                      <span class="card__content" data-focus='true' >${a.content}</span>
                   </div>
                   <div class="card__btn">
                    <button type="button" class="close-btn">
                      <i class="fas fa-times" data-type='card-delete-btn'></i>
                    </button>
                  </div>
                </div>
                <div class="card__right" data-focus='true' >
                  <span class="card__author" data-focus='true' >Added by <strong>${a.author}</strong></span>
                </div>
            </li>
          `;
  return card;
}
